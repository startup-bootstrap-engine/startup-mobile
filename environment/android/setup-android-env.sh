#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to print messages
echo_msg() {
    echo "=================================================================="
    echo "$1"
    echo "=================================================================="
}

# Function to check if required environment variables are set
check_env_vars() {
    local missing_vars=()
    for var in "$@"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done

    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo "Error: The following environment variables are not set:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo "Please set them in your .env file before running the script."
        exit 1
    fi
}

# Load environment variables from the .env file
ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    echo "Loading environment variables from $ENV_FILE..."
    # Export variables to make them available to the script
    set -o allexport
    source "$ENV_FILE"
    set +o allexport  # Disable allexport after sourcing
else
    echo "Error: Environment file '$ENV_FILE' not found."
    exit 1
fi

# Validate required environment variables for keystore generation
REQUIRED_ENV_VARS=("APK_KEY_ALIAS" "APK_KEY_STORE_PASSWORD" "APK_KEY_PASSWORD" "APP_COMPANY_NAME")
check_env_vars "${REQUIRED_ENV_VARS[@]}"

# Determine the shell configuration file
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
else
    echo "Unsupported shell. Please use bash or zsh."
    exit 1
fi

# Step 1: Install Java 17
echo_msg "Step 1: Installing Java 17"

# Check if Java 17 is already installed
if java -version 2>&1 | grep -q "17."; then
    echo "Java 17 is already installed. Skipping installation."
else
    echo "Updating package list..."
    sudo apt-get update -y

    echo "Installing OpenJDK 17..."
    sudo apt-get install -y openjdk-17-jdk
fi

# Configure Java 17 as the default version if not already set
CURRENT_JAVA_PATH=$(readlink -f "$(which java)")
JAVA_17_PATH="/usr/lib/jvm/java-17-openjdk-amd64/bin/java"

if [ "$CURRENT_JAVA_PATH" != "$JAVA_17_PATH" ]; then
    echo "Configuring Java 17 as the default version..."
    sudo update-alternatives --set java "$JAVA_17_PATH"
    sudo update-alternatives --set javac "/usr/lib/jvm/java-17-openjdk-amd64/bin/javac"
else
    echo "Java 17 is already set as the default version."
fi

echo "Setting JAVA_HOME environment variable..."
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"

# Avoid duplicating entries
grep -qxF "export JAVA_HOME=${JAVA_HOME}" "$SHELL_RC" || echo "export JAVA_HOME=${JAVA_HOME}" >> "$SHELL_RC"
grep -qxF 'export PATH=$JAVA_HOME/bin:$PATH' "$SHELL_RC" || echo 'export PATH=$JAVA_HOME/bin:$PATH' >> "$SHELL_RC"

echo "Applying JAVA_HOME changes..."
source "$SHELL_RC"

echo "Verifying Java installation..."
java -version

# Step 2: Install Android SDK
echo_msg "Step 2: Installing Android SDK"

# Install required packages if not already installed
REQUIRED_PACKAGES=(wget unzip)
for pkg in "${REQUIRED_PACKAGES[@]}"; do
    if dpkg -s "$pkg" &> /dev/null; then
        echo "Package '$pkg' is already installed. Skipping."
    else
        echo "Installing package '$pkg'..."
        sudo apt-get install -y "$pkg"
    fi
done

ANDROID_CMDLINE_ZIP="commandlinetools-linux-7583922_latest.zip"
ANDROID_CMDLINE_URL="https://dl.google.com/android/repository/${ANDROID_CMDLINE_ZIP}"
ANDROID_CMDLINE_DIR="$HOME/Android/cmdline-tools"

# Download the Command-Line Tools if not already downloaded
if [ -f "$ANDROID_CMDLINE_ZIP" ]; then
    echo "Android Command-Line Tools zip already downloaded. Skipping download."
else
    echo "Downloading Android SDK Command-Line Tools..."
    wget -q "$ANDROID_CMDLINE_URL" -O "$ANDROID_CMDLINE_ZIP"
fi

# Extract Command-Line Tools only if not already extracted
if [ -d "$ANDROID_CMDLINE_DIR/latest" ]; then
    echo "Android Command-Line Tools already extracted. Skipping extraction."
else
    echo "Creating Android SDK directories..."
    mkdir -p "$ANDROID_CMDLINE_DIR"

    echo "Extracting Command-Line Tools..."
    unzip -q "$ANDROID_CMDLINE_ZIP" -d "$ANDROID_CMDLINE_DIR"

    echo "Organizing Command-Line Tools..."
    mkdir -p "$ANDROID_CMDLINE_DIR/latest"
    mv "$ANDROID_CMDLINE_DIR/cmdline-tools/"* "$ANDROID_CMDLINE_DIR/latest/"

    # Clean up the extracted cmdline-tools directory if empty
    if [ -d "$ANDROID_CMDLINE_DIR/cmdline-tools" ] && [ -z "$(ls -A "$ANDROID_CMDLINE_DIR/cmdline-tools")" ]; then
        rmdir "$ANDROID_CMDLINE_DIR/cmdline-tools"
    fi

    # Clean up the downloaded zip file
    rm -f "$ANDROID_CMDLINE_ZIP"
fi

echo "Setting ANDROID_HOME environment variable and updating PATH..."

ANDROID_HOME="$HOME/Android"

# Avoid duplicating entries
grep -qxF "export ANDROID_HOME=\$HOME/Android" "$SHELL_RC" || echo "export ANDROID_HOME=\$HOME/Android" >> "$SHELL_RC"
grep -qxF 'export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH' "$SHELL_RC" || echo 'export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH' >> "$SHELL_RC"
grep -qxF 'export PATH=$ANDROID_HOME/platform-tools:$PATH' "$SHELL_RC" || echo 'export PATH=$ANDROID_HOME/platform-tools:$PATH' >> "$SHELL_RC"

echo "Applying ANDROID_HOME changes..."
source "$SHELL_RC"

# Step 3: Install Required Android SDK Components
echo_msg "Step 3: Installing Required Android SDK Components"

# Initialize sdkmanager if not already initialized
SDK_MANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager"

if [ ! -x "$SDK_MANAGER" ]; then
    echo "sdkmanager not found or not executable. Exiting."
    exit 1
fi

# Accept licenses only if not already accepted
LICENSES_FILE="$HOME/.android/repositories.cfg"

if [ -f "$LICENSES_FILE" ] && grep -q "android-sdk-license" "$LICENSES_FILE"; then
    echo "Android SDK licenses already accepted. Skipping."
else
    echo "Accepting Android SDK licenses..."
    yes | "$SDK_MANAGER" --licenses
fi

# Function to check if an SDK component is installed
is_sdk_installed() {
    local component="$1"
    "$SDK_MANAGER" --list | grep -q "$component"
}

# Define required SDK components
declare -a SDK_COMPONENTS=("platform-tools" "platforms;android-34" "build-tools;30.0.3" "emulator")

# Install each SDK component if not already installed
for component in "${SDK_COMPONENTS[@]}"; do
    if is_sdk_installed "$component"; then
        echo "SDK component '$component' is already installed. Skipping."
    else
        echo "Installing SDK component '$component'..."
        "$SDK_MANAGER" --install "$component"
    fi
done

# Step 4: Generate app.jks Keystore
echo_msg "Step 4: Generating app.jks Keystore"

# Define the keystore directory and file
KEYSTORE_DIR="./environment/android"
KEYSTORE_FILE="${KEYSTORE_DIR}/app.jks"

# Create the keystore directory if it doesn't exist
mkdir -p "$KEYSTORE_DIR"

# Check if the keystore already exists
if [ -f "$KEYSTORE_FILE" ]; then
    echo "Keystore already exists at ${KEYSTORE_FILE}. Skipping generation."
else
    echo "Generating a new Java KeyStore (app.jks) at ${KEYSTORE_FILE}..."

    # Generate the keystore using keytool with environment variables
    keytool -genkeypair \
        -alias "$APK_KEY_ALIAS" \
        -keyalg RSA \
        -keysize 2048 \
        -keystore "$KEYSTORE_FILE" \
        -validity 10000 \
        -storepass "$APK_KEY_STORE_PASSWORD" \
        -keypass "$APK_KEY_PASSWORD" \
        -dname "CN=${APP_COMPANY_NAME}, OU=Mobile, O=${APP_COMPANY_NAME}, L=Unknown, S=Unknown, C=BR"

    echo "Keystore generated successfully at ${KEYSTORE_FILE}."
fi

echo_msg "Setup Complete!"
echo "Please restart your terminal or run 'source $SHELL_RC' to apply all environment variable changes."
