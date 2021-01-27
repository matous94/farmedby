import sendRequest from "src/packages/api-client/sendRequest";

export async function getFarmById(id) {
  return sendRequest(`classes/Farm/${id}`);
}

export async function getFarmForUserId(userId) {
  const { results } = await sendRequest(`classes/Farm`, {
    query: {
      where: {
        owner: { objectId: userId, __type: "Pointer", className: "_User" }
      }
    }
  });
  return results[0];
}
