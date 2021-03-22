import { isIllustrativeFarm } from "src/packages/utils";

export function getMyFarm(state) {
  return state.myFarm;
}

export function getUser(state) {
  return state.user;
}

export function isFarmOwner(state, farmId) {
  const user = getUser(state);
  const myFarm = getMyFarm(state);

  if (myFarm == null || user == null) return false;

  if (farmId) {
    return myFarm.objectId === farmId;
  }

  return user.objectId === myFarm.owner.objectId;
}

export function isAdminMode(farmId) {
  return (state) => {
    const isOwner = isFarmOwner(state, farmId);
    if (isOwner || isIllustrativeFarm(farmId)) return state.farmPages.adminMode;
    return false;
  };
}

export function getFarms(state) {
  return state.farms;
}
