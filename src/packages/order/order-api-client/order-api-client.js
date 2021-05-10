import { callCloudFunction } from "src/packages/api-client/requester";

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
