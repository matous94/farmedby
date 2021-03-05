import { createStore as createEasyPeasyStore } from "easy-peasy";
import storeModel from "./store-model";

export * as selectors from "./selectors";

let store;

export function createStore(initialState) {
  store = createEasyPeasyStore({ ...storeModel, ...initialState });
  return store;
}

export function getStore() {
  return store;
}
