/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action } from "easy-peasy";
import { localStorageKeys } from "src/packages/local-storage";

const adminMode = localStorage.getItem(localStorageKeys.adminMode);

const storeModel = {
  user: null,
  myFarm: null,
  farms: null,
  farmPages: {
    adminMode: adminMode == null ? false : JSON.parse(adminMode)
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
  boxSaved: action((state, newBox) => {
    const boxIndex = state.myFarm.boxes.findIndex(
      (box) => box.objectId === newBox.objectId
    );
    if (boxIndex === -1) state.myFarm.boxes.push(newBox);
    else state.myFarm.boxes[boxIndex] = newBox;
  }),
  boxDeleted: action((state, boxId) => {
    const index = state.myFarm.boxes.findIndex((box) => box.objectId === boxId);
    if (index !== -1) state.myFarm.boxes.splice(index, 1);
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
  }),
  toggleAdminMode: action((state) => {
    const newValue = !state.farmPages.adminMode;
    state.farmPages.adminMode = newValue;
    localStorage.setItem(localStorageKeys.adminMode, newValue);
  })
};

export default storeModel;
