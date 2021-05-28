export function getMyFarm(state) {
  return state.myFarm;
}

export function getUser(state) {
  return state.user;
}

export function createIsFarmOwner(farmId) {
  return (state) => {
    const user = getUser(state);
    const myFarm = getMyFarm(state);

    if (myFarm == null || user == null) return false;

    if (farmId) {
      return myFarm.objectId === farmId;
    }

    return user.objectId === myFarm.owner.objectId;
  };
}

export function createIsAdminMode(farmId) {
  return (state) => {
    const isOwner = createIsFarmOwner(farmId)(state);
    if (isOwner) return state.farmPages.adminMode;
    return false;
  };
}

export function getAdminMode(state) {
  return state.farmPages.adminMode;
}

export function getFarms(state) {
  return state.farms;
}

export function getVisitedFarm(state) {
  return state.visitedFarm;
}

// export function getFarm(state) {
//   return getVisitedFarm(state) || getMyFarm(state);
// }

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
  },
  getCustomer(state) {
    return state.orderDraft.data.customer;
  },
  getData(state) {
    return state.orderDraft.data;
  }
};

export const order = {
  createGetOrder(orderId) {
    return (state) => state.order.ordersById[orderId];
  },
  getSortByOrders(state) {
    return state.order.sortByOrders;
  }
};

export const app = {
  getAppBarHeight(state) {
    return state.app.appBarHeight;
  }
};
