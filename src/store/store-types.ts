import { Action } from "easy-peasy";

export interface StoreModel {
  app: AppModel;
}

interface AppModel {
  appBarHeight: number;
  setAppBarHeight: Action<AppModel, AppModel["appBarHeight"]>;
}
