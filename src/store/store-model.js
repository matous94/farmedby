/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action } from "easy-peasy";

const storeModel = {
  user: null,
  usersFarm: null,
  signIn: action((state, payload) => {
    state.user = payload.user;
    state.usersFarm = payload.farm;
  }),
  signOut: action((state) => {
    state.user = null;
    state.usersFarm = null;
  }),
  signUp: action((state, user) => {
    state.user = user;
  }),
  farmCreated: action((state, usersFarm) => {
    state.usersFarm = usersFarm;
  })
};

export default storeModel;
