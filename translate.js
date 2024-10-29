import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';
import { translate } from '@vitalets/google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the localization folder inside src
const localesPath = path.join(__dirname, 'src', 'locales');

// Map file names to Google Translate language codes
const languageMap = {
  'pt-br.json': 'pt', // Portuguese (Brazil)
  'ja.json': 'ja', // Japanese
};

// Function to translate missing keys
const translateKeys = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Error translating ${text} to ${targetLang}:`, error);
    return text; // Return the original text if translation fails
  }
};

// Recursive function to merge and translate missing keys
const mergeAndTranslate = async (englishObj, targetObj, targetLang) => {
  for (const key in englishObj) {
    if (typeof englishObj[key] === 'object') {
      if (!targetObj[key]) {
        targetObj[key] = {};
      }
      await mergeAndTranslate(englishObj[key], targetObj[key], targetLang);
    } else if (!targetObj[key]) {
      targetObj[key] = await translateKeys(englishObj[key], targetLang);
    }
  }
};

// Check which JSON files are staged
const getStagedLocaleFiles = async () => {
  const git = simpleGit();
  const status = await git.status();
  console.log('Staged files:', status.staged); // Debugging: Print staged files
  return status.staged.filter(
    (file) => file.endsWith('.json') && file.includes('locales/'),
  );
};

// Main function
const syncTranslations = async () => {
  const stagedFiles = await getStagedLocaleFiles();
  console.log('Staged locale files:', stagedFiles); // Debugging: Print filtered staged files

  const englishFile = stagedFiles.find((file) => file.includes('en.json')); // Dynamically check if en.json is staged
  if (!englishFile) {
    console.log('No changes detected in en.json. Aborting.');
    return;
  }

  const englishFilePath = path.join(localesPath, 'en.json');
  const englishContent = await fs.readJson(englishFilePath);

  // Loop through the target language files (pt-br.json and ja.json)
  for (const langFile in languageMap) {
    const filePath = path.join(localesPath, langFile);
    const targetLang = languageMap[langFile]; // Get the correct target language code

    let targetContent = {};
    try {
      targetContent = await fs.readJson(filePath);
    } catch (error) {
      console.warn(
        `${filePath} not found. Creating a new file for ${targetLang}.`,
      );
    }

    console.log(`Translating missing keys to: ${targetLang}`);

    await mergeAndTranslate(englishContent, targetContent, targetLang);

    await fs.writeJson(filePath, targetContent, { spaces: 2 });
    const git = simpleGit();
    await git.add(filePath); // Add the modified or new file to the staging area
  }

  console.log('Translation sync completed.');
};

// Run the syncTranslations function
syncTranslations().catch(console.error);
