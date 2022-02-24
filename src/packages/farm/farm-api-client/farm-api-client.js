import { callCloudFunction } from "src/packages/api-client/requester";

export async function getFarmById(objectId) {
  return callCloudFunction(`getFarmById`, { objectId });
}

export async function getMyFarm() {
  return callCloudFunction("getMyFarm");
}

export async function createFarm(farmData) {
  return callCloudFunction("createFarm", farmData);
}

export async function updateFarm(farmData) {
  return callCloudFunction("updateFarm", farmData);
}

export async function getFarms(countryCode) {
  return callCloudFunction("getFarms", { countryCode });
}

export async function savePickupPoint(pickupPointData) {
  return callCloudFunction("savePickupPoint", pickupPointData);
}

export async function deletePickupPoint(objectId) {
  return callCloudFunction("deletePickupPoint", { objectId });
}

export async function saveSubscription(subscriptionData) {
  return callCloudFunction("saveSubscription", subscriptionData);
}

export async function deleteSubscription(objectId) {
  return callCloudFunction("deleteSubscription", { objectId });
}
