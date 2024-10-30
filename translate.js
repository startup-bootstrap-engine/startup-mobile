/* eslint-disable no-undef */
import { translate } from '@vitalets/google-translate-api';
import fs from 'fs-extra';
import path from 'path';
import simpleGit from 'simple-git';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesPath = path.join(__dirname, 'src', 'locales');

const languageMap = {
  'pt-br.json': 'pt',
  'ja.json': 'ja',
};

const translateKeys = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Error translating ${text} to ${targetLang}:`, error);
    return text;
  }
};

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

const getStagedLocaleFiles = async () => {
  const git = simpleGit();
  const status = await git.status();
  return status.staged.filter(
    (file) => file.endsWith('.json') && file.includes('locales/'),
  );
};

const syncTranslations = async () => {
  const stagedFiles = await getStagedLocaleFiles();

  console.log('📚 Translating staged locale files...');

  const englishFile = stagedFiles.find((file) => file.includes('en.json'));
  if (!englishFile) {
    console.log('No changes detected in en.json. Skipping...');
    return;
  }

  const englishFilePath = path.join(localesPath, 'en.json');
  const englishContent = await fs.readJson(englishFilePath);

  for (const langFile in languageMap) {
    const filePath = path.join(localesPath, langFile);
    const targetLang = languageMap[langFile];

    let targetContent = {};
    try {
      targetContent = await fs.readJson(filePath);
    } catch (error) {
      console.warn(
        `${filePath} not found. Creating a new file for ${targetLang}.`,
      );
      console.log('Error:', error);
    }

    console.log(`✅ Translating missing keys to: ${targetLang}`);

    await mergeAndTranslate(englishContent, targetContent, targetLang);

    await fs.writeJson(filePath, targetContent, { spaces: 2 });
    const git = simpleGit();
    await git.add(filePath);
  }

  console.log('Translation sync completed.');
};

syncTranslations().catch(console.error);
