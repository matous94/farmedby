/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action } from "easy-peasy";

const storeModel = {
  user: null,
  farm: null,
  signIn: action((state, payload) => {
    state.user = payload.user;
    state.farm = payload.farm;
  }),
  signOut: action((state) => {
    state.user = null;
    state.farm = null;
  }),
  signUp: action((state, user) => {
    state.user = user;
  }),
  farmCreated: action((state, farm) => {
    state.farm = farm;
  })
};

export default storeModel;
