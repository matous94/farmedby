import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/cs";
import "dayjs/locale/en";

import { localStorageKeys } from "src/packages/local-storage";
import { countries, Country } from "./countries";

let countryCode: string | null;

function languageToCountryCode(lng: string) {
  const byLanguage: { [languageCode: string]: string } = {
    cs: "CZ",
    sk: "SK",
    en: "GB"
  };
  return byLanguage[lng] || byLanguage.en;
}

export function getCountry(code: string = countryCode!): Country {
  return countries[code] || countries[countryCode!];
}

export function getLanguageCode(code: string = countryCode!): string {
  return getCountry(code).languageCode;
}

export function getCountryCode(): string {
  return countryCode!;
}

export function getDateMask(code: string = countryCode!): string {
  return getCountry(code).dateMask;
}

export function getCurrency(code: string = countryCode!): string {
  return getCountry(code).currency;
}

export function changeCountry(code: string): void {
  countryCode = code;
  localStorage.setItem(localStorageKeys.countryCode, code);
  window.location.reload();
}

interface SetupI18nOptions {
  onCountryChange: (languageCode: string) => void;
}
export async function setupI18n({
  onCountryChange
}: SetupI18nOptions): Promise<void> {
  if (countryCode) return;

  const usersLanguage = window.navigator?.language?.split("-")[0];
  countryCode =
    localStorage.getItem(localStorageKeys.countryCode) ||
    languageToCountryCode(usersLanguage);

  const resources = Object.values(countries).reduce(
    (
      accu: {
        [languageCode: Country["languageCode"]]: {
          translation: Country["translation"];
        };
      },
      country
    ) => {
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
