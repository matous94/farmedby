import { callCloudFunction } from "src/packages/api-client/requester";

export async function getFarmById(farmId) {
  return callCloudFunction(`getFarmById`, { farmId });
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
