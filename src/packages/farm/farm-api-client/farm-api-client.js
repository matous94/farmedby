import { sendParseRequest } from "src/packages/api-client/requester";

export async function getFarmById(id) {
  return sendParseRequest(`classes/Farm/${id}`);
}

export async function getFarmForUserId(userId) {
  const { results } = await sendParseRequest(`classes/Farm`, {
    query: {
      where: {
        owner: { objectId: userId, __type: "Pointer", className: "_User" }
      }
    }
  });
  return results[0];
}
