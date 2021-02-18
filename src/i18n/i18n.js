import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import csLocales from "./locales/cs.json";
import enLocales from "./locales/en.json";
import csFlagSrc from "./flags/cs.png";
import enFlagSrc from "./flags/en.png";

export const supportedLanguages = {
  cs: {
    translation: csLocales,
    flagSrc: csFlagSrc,
    countryName: "Česká republika"
  },
  en: {
    translation: enLocales,
    flagSrc: enFlagSrc,
    countryName: "United Kingdom"
  }
};

export function getCurrentLanguage() {
  return i18n.language;
}

export function getCurrentFlagSrc() {
  return supportedLanguages[getCurrentLanguage()].flagSrc;
}

export function changeLanguage(languageCode) {
  i18n.changeLanguage(languageCode);
}

export async function setupI18n() {
  let language = window.navigator?.language?.split("-")[0] || "en";
  if (language === "sk") language = "cs";
  if (!supportedLanguages[language]) language = "en";

  // TODO:
  // setup dates library and its localization

  // i18next setup
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: supportedLanguages.en.translation
        },
        cs: {
          translation: supportedLanguages.cs.translation
        }
      },
      lng: language,
      // lng: "cs",
      fallbackLng: false,
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false
      }
    });
}
