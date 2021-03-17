import { callCloudFunction } from "src/packages/api-client/requester";
import { getCountryCode } from "src/i18n";

export async function getFarmById(objectId) {
  return callCloudFunction(`getFarmById`, { objectId });
}

export async function getMyFarm() {
  return callCloudFunction("getMyFarm");
}

export async function createFarm(farmData) {
  return callCloudFunction("createFarm", { farmData });
}

export async function updateFarm(farmData) {
  return callCloudFunction("updateFarm", { farmData });
}

export async function savePickupPoint(pickupPointData) {
  return callCloudFunction("savePickupPoint", { pickupPointData });
}

export async function deletePickupPoint(objectId) {
  return callCloudFunction("deletePickupPoint", { objectId });
}

export async function getFarms() {
  return callCloudFunction("getFarms", { countryCode: getCountryCode() });
}
