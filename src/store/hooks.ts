import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./store-types";

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>();
