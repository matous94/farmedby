// eslint-disable-next-line import/extensions
import { callCloudFunction } from "src/packages/api-client/requester.js";

export function createOrder({
  customer,
  farm,
  note,
  pickupPoint,
  subscriptions
}) {
  return callCloudFunction(`createOrder`, {
    customer,
    farm,
    note,
    pickupPoint,
    subscriptions
  });
}

export function getOrder(orderId) {
  return callCloudFunction("getOrder", { orderId });
}

export function updateOrder({ objectId, journal, completed }) {
  return callCloudFunction("updateOrder", { objectId, journal, completed });
}
