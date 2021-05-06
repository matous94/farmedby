/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action } from "easy-peasy";
import { localStorageKeys } from "src/packages/local-storage";

const adminMode = localStorage.getItem(localStorageKeys.adminMode);

const storeModel = {
  user: null,
  myFarm: null,
  farms: null,
  visitedFarm: null,
  order: null,
  farmPages: {
    adminMode: adminMode == null ? true : JSON.parse(adminMode)
  },
  farmCreated: action((state, farm) => {
    state.myFarm = farm;
  }),
  refreshMyFarm: action((state, farm) => {
    state.myFarm = farm;
  }),
  updateMyFarm: action((state, farm) => {
    state.myFarm = { ...state.myFarm, ...farm };
  }),
  farmsResolved: action((state, farms) => {
    state.farms = farms;
  }),
  visitedFarmResolved: action((state, farm) => {
    state.visitedFarm = farm;
    state.order = null;
  }),
  pickupPointSaved: action((state, newPoint) => {
    const pointIndex = state.myFarm.pickupPoints.findIndex(
      (point) => point.objectId === newPoint.objectId
    );
    if (pointIndex === -1) state.myFarm.pickupPoints.push(newPoint);
    else state.myFarm.pickupPoints[pointIndex] = newPoint;
  }),
  pickupPointDeleted: action((state, pointId) => {
    const index = state.myFarm.pickupPoints.findIndex(
      (point) => point.objectId === pointId
    );
    if (index !== -1) state.myFarm.pickupPoints.splice(index, 1);
  }),
  subscriptionSaved: action((state, newSubscription) => {
    const subscriptionIndex = state.myFarm.subscriptions.findIndex(
      (subscription) => subscription.objectId === newSubscription.objectId
    );
    if (subscriptionIndex === -1)
      state.myFarm.subscriptions.push(newSubscription);
    else state.myFarm.subscriptions[subscriptionIndex] = newSubscription;
  }),
  subscriptionDeleted: action((state, subscriptionId) => {
    const index = state.myFarm.subscriptions.findIndex(
      (subscription) => subscription.objectId === subscriptionId
    );
    if (index !== -1) state.myFarm.subscriptions.splice(index, 1);
  }),
  signIn: action((state, payload) => {
    state.user = payload.user;
    state.myFarm = payload.farm;
    state.visitedFarm = null;
  }),
  signOut: action((state) => {
    state.user = null;
    state.myFarm = null;
  }),
  signUp: action((state, user) => {
    state.user = user;
  }),
  toggleAdminMode: action((state) => {
    const newValue = !state.farmPages.adminMode;
    state.farmPages.adminMode = newValue;
    localStorage.setItem(localStorageKeys.adminMode, newValue);
  })
};

export default storeModel;
