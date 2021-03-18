const prefix = "farmedBy_";

function createKey(key) {
  return `${prefix}${key}`;
}

export const localStorageKeys = {
  sessionToken: createKey("sessionToken"),
  adminMode: createKey("adminMode"),
  countryCode: createKey("countryCode")
};
