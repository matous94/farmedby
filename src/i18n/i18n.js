import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { localStorageKeys } from "src/packages/local-storage";

import csLocales from "./locales/cs.json";
import enLocales from "./locales/en.json";
// https://github.com/HatScripts/circle-flags/
import czFlagSrc from "./flags/cz.svg";
import skFlagSrc from "./flags/sk.svg";
import gbFlagSrc from "./flags/gb.svg";

let countryCode;
export const supportedCountries = {
  CZ: {
    translation: csLocales,
    flagSrc: czFlagSrc,
    countryName: "Česká republika",
    countryCode: "CZ",
    languageCode: "cs",
    currency: "Kč",
    illustrativeFarmId: "qHgur81fHZ",
    requiresAddressLevel1: false,
    currencyMultiplier: 1
  },
  GB: {
    translation: enLocales,
    flagSrc: gbFlagSrc,
    countryName: "United Kingdom",
    countryCode: "GB",
    languageCode: "en",
    currency: "£",
    illustrativeFarmId: "Qq3qOsnAqp",
    requiresAddressLevel1: true,
    currencyMultiplier: 0.034
  },
  SK: {
    translation: csLocales,
    flagSrc: skFlagSrc,
    countryName: "Slovenská republika",
    countryCode: "SK",
    languageCode: "sk",
    currency: "€",
    illustrativeFarmId: "Z0AeJAol2Q",
    requiresAddressLevel1: false,
    currencyMultiplier: 0.039
  }
};

function languageToCountryCode(lng) {
  const byLanguage = { cs: "CZ", sk: "SK", en: "GB" };
  return byLanguage[lng] || byLanguage.en;
}

export function getCountry(code = countryCode) {
  return supportedCountries[code] || supportedCountries[countryCode];
}

export function getLanguageCode(code = countryCode) {
  return getCountry(code).languageCode;
}

export function getCountryCode() {
  return countryCode;
}

export function getCurrency(code = countryCode) {
  return getCountry(code).currency;
}

export function changeCountry(code) {
  countryCode = code;
  localStorage.setItem(localStorageKeys.countryCode, code);
  window.location.reload();
}

export async function setupI18n({ onCountryChange }) {
  if (countryCode) return;

  const usersLanguage = window.navigator?.language?.split("-")[0];
  countryCode =
    localStorage.getItem(localStorageKeys.countryCode) ||
    languageToCountryCode(usersLanguage);

  const resources = Object.values(supportedCountries).reduce(
    (accu, country) => {
      // eslint-disable-next-line no-param-reassign
      accu[country.languageCode] = { translation: country.translation };
      return accu;
    },
    {}
  );
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: getCountry().languageCode,
      // lng: "cs",
      fallbackLng: false,
      keySeparator: false,
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false
      }
    });

  i18n.on("languageChanged", onCountryChange);
}
