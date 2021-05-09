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
    if (isOwner) return state.farmPages.adminMode;
    return false;
  };
}

export function getFarms(state) {
  return state.farms;
}

export function getVisitedFarm(state) {
  return state.visitedFarm;
}

export const orderDraft = {
  createGetSubscription(subscriptionId) {
    return (state) => state.orderDraft.data.subscriptionsById[subscriptionId];
  },
  getSubscriptionsById(state) {
    return state.orderDraft.data.subscriptionsById;
  },
  getPickupPoint(state) {
    return state.orderDraft.data.pickupPoint;
  },
  getNote(state) {
    return state.orderDraft.data.note;
  }
};

// export function getCurrentFarm(state) {
//   return getVisitedFarm(state) || getMyFarm(state);
// }
