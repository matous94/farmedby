import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/cs";
import "dayjs/locale/en";

import { localStorageKeys } from "src/packages/local-storage";
import { countries, Country, CountryCode, isCountryCode } from "./countries";

let currentCountryCode: CountryCode = "GB";
let isInitialized = false;

function languageToCountryCode(lng: string): CountryCode {
  const byLanguage: { [languageCode: string]: CountryCode } = {
    cs: countries.CZ.countryCode,
    sk: countries.SK.countryCode,
    en: countries.GB.countryCode
  };
  return byLanguage[lng] || byLanguage.en;
}

export function getCountry(code: CountryCode = currentCountryCode): Country {
  return countries[code] || countries[currentCountryCode];
}

export function getLanguageCode(
  code: CountryCode = currentCountryCode
): string {
  return getCountry(code).languageCode;
}

export function getCountryCode(): CountryCode {
  return currentCountryCode;
}

export function getDateMask(code: CountryCode = currentCountryCode): string {
  return getCountry(code).dateMask;
}

export function getCurrency(code: CountryCode = currentCountryCode): string {
  return getCountry(code).currency;
}

export function changeCountry(code: CountryCode): void {
  currentCountryCode = code;
  localStorage.setItem(localStorageKeys.countryCode, code);
  window.location.reload();
}

interface SetupI18nOptions {
  onCountryChange: (languageCode: string) => void;
}
export async function setupI18n({
  onCountryChange
}: SetupI18nOptions): Promise<void> {
  if (isInitialized) return;
  isInitialized = true;

  const usersLanguage = window.navigator?.language?.split("-")[0];

  const storedCountryCode = localStorage.getItem(localStorageKeys.countryCode);

  currentCountryCode = isCountryCode(storedCountryCode)
    ? storedCountryCode
    : languageToCountryCode(usersLanguage);

  const resources = Object.values(countries).reduce(
    (accu: Resource, country) => {
      // eslint-disable-next-line no-param-reassign
      accu[country.languageCode] = { translation: country.translation };
      return accu;
    },
    {}
  );

  const { languageCode } = getCountry();

  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: languageCode,
      fallbackLng: false,
      keySeparator: false,
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false
      }
    });

  dayjs.locale(languageCode);

  i18n.on("languageChanged", onCountryChange);
}
