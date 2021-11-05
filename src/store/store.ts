/* eslint-disable no-param-reassign */
import { createStore, action } from "easy-peasy";
import { storeModel } from "./store-model";
import { StoreModel } from "./store-types";

const app: StoreModel["app"] = {
  appBarHeight: 0,
  setAppBarHeight: action((appState, height) => {
    appState.appBarHeight = height;
  })
};

export const store = createStore<StoreModel>({
  app,
  ...storeModel
});
