#!/bin/bash

# Get the project root directory (where the script is located)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Load environment variables, ignoring lines that are comments or empty
while IFS= read -r line; do
  # Ignore lines starting with '#' and empty lines
  if [[ ! "$line" =~ ^# ]] && [[ -n "$line" ]]; then
    export "$line"
  fi
done < "$PROJECT_ROOT/.env"

echo "🏗️ Building mobile application..."
cd "$PROJECT_ROOT" && yarn build

echo "🔄 Syncing Capacitor..."
cd "$PROJECT_ROOT" && yarn cap:sync

echo "💡 Building Android resources..."
cd "$PROJECT_ROOT" && yarn mobile:resources:android

echo "🧹 Cleaning all caches..."
cd "$PROJECT_ROOT" && yarn cache clean
cd "$PROJECT_ROOT/android" && ./gradlew clean

echo "🔨 Building Android APK..."
if [ "$1" == "debug" ]; then
  cd "$PROJECT_ROOT/android" && ./gradlew assembleDebug
  echo "✅ Debug APK built successfully. You can find it at ./android/app/build/outputs/apk/debug/app-debug.apk"
elif [ "$1" == "release" ]; then
  cd "$PROJECT_ROOT/android" && ./gradlew bundleRelease

  # Check if a custom name is provided as the second argument
  if [ -n "$2" ]; then
    # Add .aab extension if not already present
    if [[ "$2" != *.aab ]]; then
      CUSTOM_NAME="$2.aab"
    else
      CUSTOM_NAME="$2"
    fi
  else
    CUSTOM_NAME="app-release.aab" # Default name
  fi

  # Path to the generated bundle
  BUNDLE_PATH="./app/build/outputs/bundle/release/app-release.aab"

  # Check if the bundle was generated successfully
  if [ -f "$BUNDLE_PATH" ]; then
    # Rename the bundle with the custom name
    mv "$BUNDLE_PATH" "./app/build/outputs/bundle/release/$CUSTOM_NAME"
    echo "✅ Bundle release file built successfully. You can find it at ./android/app/build/outputs/bundle/release/$CUSTOM_NAME"
  else
    echo "❌ Failed to build the release bundle."
  fi
else
  echo "❌ Invalid argument. Please use 'debug' or 'release'."
fi
