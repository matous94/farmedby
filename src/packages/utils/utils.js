import { getCountry, getCountryCode } from "src/i18n";

export function createAddress({
  addressLevel1,
  city,
  countryCode = getCountryCode(),
  postcode,
  street
}) {
  let country = "";
  let district = "";

  const { countryName, requiresAddressLevel1 } = getCountry(countryCode);
  country = `, ${countryName}`;

  if (addressLevel1 && requiresAddressLevel1) {
    district = `, ${addressLevel1}`;
  }

  return {
    full: `${street}, ${postcode} ${city}${district}${country}`,
    countryRelative: `${street}, ${postcode} ${city}${district}`,
    countryRelativeReverse: `${city} ${postcode}, ${street}${district}`,
    districtRelativeReverse: `${city} ${postcode}, ${street}`,
    streetAddress: street,
    addressLevel2: `${postcode} ${city}`,
    countryName
  };
}
