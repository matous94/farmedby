/* eslint-disable no-param-reassign,no-underscore-dangle */
import { action, actionOn } from "easy-peasy";
import { localStorageKeys } from "src/packages/local-storage";
import { getPricePerDelivery } from "src/packages/farm/utils";
import { SortByOrdersEnum } from "src/types";

const adminMode = localStorage.getItem(localStorageKeys.adminMode);

const initialOrderDraftData = {
  customer: {
    name: "",
    email: "",
    phoneNumber: ""
  },
  note: "",
  pickupPoint: null,
  subscriptionsById: {}
};

const storeModel = {
  app: {
    appBarHeight: 0,
    setAppBarHeight: action((appState, height) => {
      appState.appBarHeight = height;
    })
  },
  user: null,
  myFarm: null,
  farms: null,
  visitedFarm: null,
  onOrderCreated: actionOn(
    (actions) => actions.order.orderCreated,
    (state, target) => {
      const order = target.payload;
      if (state.myFarm && state.myFarm.objectId === order.farmId) {
        state.myFarm.orders.push({
          objectId: order.objectId,
          createdAt: order.createdAt,
          pickupPointName: order.pickupPoint.name
        });
      }
    }
  ),
  onOrderUpdated: actionOn(
    (actions) => actions.order.orderUpdated,
    (state, target) => {
      const update = target.payload;
      const orderIndex = state.myFarm.orders.findIndex(
        (order) => order.objectId === update.objectId
      );
      if (orderIndex === -1) return;
      if (typeof update.completed === "boolean") {
        state.myFarm.orders[orderIndex].completed = update.completed;
      }
    }
  ),
  orderDraft: {
    data: initialOrderDraftData,
    updateNumberOfDeliveries: action((orderDraft, payload) => {
      const { subscription, numberOfDeliveries } = payload;
      if (!numberOfDeliveries) {
        delete orderDraft.data.subscriptionsById[subscription.objectId];
        return;
      }
      const pricePerDelivery = getPricePerDelivery({
        subscription,
        numberOfDeliveries
      });
      orderDraft.data.subscriptionsById[subscription.objectId] = {
        content: subscription.content,
        name: subscription.name,
        numberOfDeliveries: parseInt(numberOfDeliveries, 10),
        pricePerDelivery
      };
    }),
    setPickupPoint: action((orderDraft, pickupPoint) => {
      orderDraft.data.pickupPoint = pickupPoint;
    }),
    setNote: action((orderDraft, note) => {
      orderDraft.data.note = note;
    }),
    updateCustomer: action((orderDraft, customer) => {
      orderDraft.data.customer = { ...orderDraft.data.customer, ...customer };
    }),
    reset: action((orderDraft) => {
      orderDraft.data = initialOrderDraftData;
    })
  },
  order: {
    ordersById: {},
    orderResolved: action((orderState, order) => {
      orderState.ordersById[order.objectId] = order;
    }),
    orderCreated: action((orderState, order) => {
      orderState.ordersById[order.objectId] = order;
    }),
    orderUpdated: action((orderState, update) => {
      const order = orderState.ordersById[update.objectId];
      orderState.ordersById[update.objectId] = { ...order, ...update };
    }),
    sortByOrders:
      localStorage.getItem(localStorageKeys.sortByOrders) ||
      SortByOrdersEnum.createdAt,
    setSortByOrders: action((orderState, sortBy) => {
      orderState.sortByOrders = sortBy;
      localStorage.setItem(localStorageKeys.sortByOrders, sortBy);
    })
  },
  farmPages: {
    adminMode: adminMode == null ? true : JSON.parse(adminMode)
  },
  farmCreated: action((state, farm) => {
    state.myFarm = farm;
  }),
  refreshMyFarm: action((state, farm) => {
    state.myFarm = farm;
    state.orderDraft.data = initialOrderDraftData;
  }),
  updateMyFarm: action((state, farm) => {
    state.myFarm = { ...state.myFarm, ...farm };
    state.orderDraft.data = initialOrderDraftData;
  }),
  farmsResolved: action((state, farms) => {
    state.farms = farms;
  }),
  visitedFarmResolved: action((state, farm) => {
    state.visitedFarm = farm;
    state.orderDraft.data = initialOrderDraftData;
  }),
  resetVisitedFarm: action((state) => {
    state.visitedFarm = null;
  }),
  pickupPointSaved: action((state, newPoint) => {
    const pointIndex = state.myFarm.pickupPoints.findIndex(
      (point) => point.objectId === newPoint.objectId
    );
    if (pointIndex === -1) state.myFarm.pickupPoints.push(newPoint);
    else state.myFarm.pickupPoints[pointIndex] = newPoint;
    state.orderDraft.data = initialOrderDraftData;
  }),
  pickupPointDeleted: action((state, pointId) => {
    const index = state.myFarm.pickupPoints.findIndex(
      (point) => point.objectId === pointId
    );
    if (index !== -1) state.myFarm.pickupPoints.splice(index, 1);
    state.orderDraft.data = initialOrderDraftData;
  }),
  subscriptionSaved: action((state, newSubscription) => {
    const subscriptionIndex = state.myFarm.subscriptions.findIndex(
      (subscription) => subscription.objectId === newSubscription.objectId
    );
    if (subscriptionIndex === -1)
      state.myFarm.subscriptions.push(newSubscription);
    else state.myFarm.subscriptions[subscriptionIndex] = newSubscription;
    state.orderDraft.data = initialOrderDraftData;
  }),
  subscriptionDeleted: action((state, subscriptionId) => {
    const index = state.myFarm.subscriptions.findIndex(
      (subscription) => subscription.objectId === subscriptionId
    );
    if (index !== -1) state.myFarm.subscriptions.splice(index, 1);
    state.orderDraft.data = initialOrderDraftData;
  }),
  signIn: action((state, payload) => {
    state.user = payload.user;
    state.myFarm = payload.farm;
    state.visitedFarm = null;
    state.orderDraft.data = initialOrderDraftData;
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
