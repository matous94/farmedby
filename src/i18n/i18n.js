import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import csLocales from "./locales/cs.json";
import enLocales from "./locales/en.json";
import csFlagSrc from "./flags/cs.png";
import enFlagSrc from "./flags/en.png";

let countryCode;
export const supportedCountries = {
  CZ: {
    translation: csLocales,
    flagSrc: csFlagSrc,
    countryName: "Česká republika",
    countryCode: "CZ",
    languageCode: "cs"
  },
  GB: {
    translation: enLocales,
    flagSrc: enFlagSrc,
    countryName: "United Kingdom",
    countryCode: "GB",
    languageCode: "en"
  }
};

function languageToCountryCode(lng) {
  const byLanguage = { cs: "CZ", sk: "CZ", en: "GB" };
  return byLanguage[lng] || byLanguage.en;
}

function getCountry() {
  return supportedCountries[countryCode];
}

export function getCountryCode() {
  return countryCode;
}

export function changeCountry(code) {
  countryCode = code;
  i18n.changeLanguage(supportedCountries[countryCode].languageCode);
}

export async function setupI18n({ onCountryChange }) {
  if (countryCode) return;

  const usersLanguage = window.navigator?.language?.split("-")[0];
  countryCode = languageToCountryCode(usersLanguage);

  // i18next setup
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: supportedCountries.GB.translation
        },
        cs: {
          translation: supportedCountries.CZ.translation
        }
      },
      lng: getCountry().languageCode,
      // lng: "cs",
      fallbackLng: false,
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false
      }
    });

  i18n.on("languageChanged", onCountryChange);
}
