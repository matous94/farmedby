const prefix = "farmedBy_";

function createKey(key) {
  return `${prefix}${key}`;
}

export const localStorageKeys = {
  adminMode: createKey("adminMode"),
  countryCode: createKey("countryCode"),
  deliversToFilter: createKey("deliversToFilter"),
  sessionToken: createKey("sessionToken"),
  sortByOrders: createKey("sortByOrders")
};
