import { getCountry, getCountryCode, changeCountry } from "src/i18n/i18n";
import { localStorageKeys } from "src/packages/local-storage";

describe("getCountry returns country entity", () => {
  test("returns country for valid countryCode", () => {
    const country = getCountry("CZ");
    expect(country.countryCode).toBe("CZ");
  });

  test("returns current country for missing countryCode", () => {
    const country = getCountry();
    expect(country.countryCode).toBe(getCountryCode());
  });
});

test("changeCountry changes current country", () => {
  const reloadMock = jest.fn();
  const locationOriginal = window.location;

  const location = {} as Location;
  location.reload = reloadMock;
  Reflect.deleteProperty(global.window, "location");
  window.location = location;

  changeCountry("SK");
  expect(getCountryCode()).toBe("SK");
  expect(localStorage.getItem(localStorageKeys.countryCode)).toBe("SK");

  changeCountry("CZ");
  expect(getCountryCode()).toBe("CZ");
  expect(localStorage.getItem(localStorageKeys.countryCode)).toBe("CZ");

  expect(reloadMock).toBeCalledTimes(2);

  window.location = locationOriginal;
});
