import { sendParseRequest } from "src/packages/api-client/requester";

export async function getFarmById(farmId) {
  const { result } = await sendParseRequest(`functions/getFarmById`, {
    body: { farmId }
  });
  return result;
}

export async function getMyFarm() {
  const { result } = await sendParseRequest("functions/getMyFarm", {
    method: "POST"
  });
  return result;
}

export async function createFarm(farmData) {
  const { result } = await sendParseRequest("functions/createFarm", {
    body: { farmData }
  });
  return result;
}
