import { sendParseRequest } from "src/packages/api-client/requester";
import logger from "src/packages/logger";
import { localStorageKeys } from "src/packages/local-storage";

export async function signUp({ email, password, firstName, lastName }) {
  const response = await sendParseRequest("users", {
    body: {
      email,
      username: email,
      password,
      firstName,
      lastName
    }
  });
  localStorage.setItem(localStorageKeys.sessionToken, response.sessionToken);
  return response;
}

export async function signIn({ email, password }) {
  const response = await sendParseRequest("login", {
    query: {
      username: email,
      password
    }
  });
  localStorage.setItem(localStorageKeys.sessionToken, response.sessionToken);
  return response;
}

export async function getBySessionToken(sessionToken) {
  return sendParseRequest("users/me", {
    headers: {
      "X-Parse-Session-Token": sessionToken
    }
  });
}

export function signOut() {
  try {
    sendParseRequest("/logout", { method: "POST" });
  } catch (error) {
    logger.user("SignOut failure silently ignored.", error);
  }
  localStorage.removeItem(localStorageKeys.sessionToken);
  logger.user("Removed session token from local storage.");
}
