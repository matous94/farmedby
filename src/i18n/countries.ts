import csLocales from "./locales/cs.json";
import enLocales from "./locales/en.json";

// https://github.com/HatScripts/circle-flags/
import czFlagSrc from "./flags/cz.svg";
import skFlagSrc from "./flags/sk.svg";
import gbFlagSrc from "./flags/gb.svg";

export interface Country {
  translation: { [key: string]: string };
  flagSrc: string;
  countryName: string;
  countryCode: string;
  languageCode: string;
  currency: string;
  illustrativeFarmId: string;
  requiresAddressLevel1: boolean;
  currencyMultiplier: number;
  dateMask: string;
}
export type Countries = {
  [countryCode: string]: Country;
};

export const countries: Countries = {
  CZ: {
    translation: csLocales,
    flagSrc: czFlagSrc,
    countryName: "Česká republika",
    countryCode: "CZ",
    languageCode: "cs",
    currency: "Kč",
    illustrativeFarmId: "qHgur81fHZ",
    requiresAddressLevel1: false,
    currencyMultiplier: 1,
    dateMask: "__.__.____"
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
    currencyMultiplier: 0.034,
    dateMask: "__/__/____"
  },
  SK: {
    translation: csLocales,
    flagSrc: skFlagSrc,
    countryName: "Slovenská republika",
    countryCode: "SK",
    languageCode: "cs",
    currency: "€",
    illustrativeFarmId: "Z0AeJAol2Q",
    requiresAddressLevel1: false,
    currencyMultiplier: 0.039,
    dateMask: "__.__.____"
  }
};
