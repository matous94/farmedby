import { createStore } from "easy-peasy";
import storeModel from "./store-model";

const createEasyPeasyStore = (initialState) =>
  createStore({ ...storeModel, ...initialState });

export default createEasyPeasyStore;
