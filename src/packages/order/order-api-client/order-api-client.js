import { callCloudFunction } from "src/packages/api-client/requester";

export async function createOrder({
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
