/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action } from "easy-peasy";

const storeModel = {
  user: null,
  myFarm: null,
  farmCreated: action((state, farm) => {
    state.myFarm = farm;
  }),
  refreshMyFarm: action((state, farm) => {
    state.myFarm = farm;
  }),
  signIn: action((state, payload) => {
    state.user = payload.user;
    state.myFarm = payload.farm;
  }),
  signOut: action((state) => {
    state.user = null;
    state.myFarm = null;
  }),
  signUp: action((state, user) => {
    state.user = user;
  })
};

export default storeModel;
