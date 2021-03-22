import { getCountry, supportedCountries } from "src/i18n";

export function createAddress({ city, countryCode, postcode, street }) {
  let country = "";
  let countryName;
  if (countryCode) {
    countryName = getCountry(countryCode).countryName;
    country = `, ${countryName}`;
  }

  return {
    full: `${street}, ${postcode} ${city}${country}`,
    line1: street,
    line2: `${city} ${postcode}`,
    countryName
  };
}

export function getIllustrativeFarmId() {
  return getCountry().illustrativeFarmId;
}

export function isIllustrativeFarm(farmId) {
  return Object.values(supportedCountries).some(
    (country) => country.illustrativeFarmId === farmId
  );
}
