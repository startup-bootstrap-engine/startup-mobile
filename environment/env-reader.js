const fs = require('fs');

// Function to read and parse the .env file
const getEnvVariable = (filePath, variableName) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const envFileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = envFileContent.split('\n');

  for (const line of lines) {
    // Ignore comments and empty lines
    if (line.trim() === '' || line.startsWith('#')) continue;

    const [name, value] = line.split('=');

    if (name === variableName) {
      return value.trim();
    }
  }

  throw new Error(`Variable not found: ${variableName}`);
};

module.exports = { getEnvVariable };
