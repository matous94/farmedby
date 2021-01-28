import { createStore } from "easy-peasy";
import storeModel from "./store-model";

let store;

const createEasyPeasyStore = (initialState) => {
  store = createStore({ ...storeModel, ...initialState });
  return store;
};

export default createEasyPeasyStore;
export function getStore() {
  return store;
}
