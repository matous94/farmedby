import {
  sendParseRequest,
  callCloudFunction
} from "src/packages/api-client/requester";
import logger from "src/packages/logger";
import { localStorageKeys } from "src/packages/local-storage";

export async function signUp({ email, password, firstName, lastName }) {
  const user = await callCloudFunction("signUp", {
    email,
    password,
    firstName,
    lastName
  });
  localStorage.setItem(localStorageKeys.sessionToken, user.sessionToken);
  return user;
}

export async function signIn({ email, password }) {
  const user = await callCloudFunction("signIn", {
    email,
    password
  });
  localStorage.setItem(localStorageKeys.sessionToken, user.sessionToken);
  return user;
}

export async function getBySessionToken(sessionToken) {
  return callCloudFunction("getBySessionToken", {
    sessionToken
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

export function requestPasswordReset(email) {
  return sendParseRequest("/requestPasswordReset", {
    body: {
      email
    }
  });
}
