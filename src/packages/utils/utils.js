import { getCountry } from "src/i18n";

export function createAddress({ city, countryCode, postcode, street }) {
  let country = "";
  let countryName;
  if (countryCode) {
    countryName = getCountry(countryCode).countryName;
    country = `, ${countryName}`;
  }

  return {
    full: `${street}, ${city} ${postcode}${country}`,
    line1: street,
    line2: `${city} ${postcode}`,
    countryName
  };
}
