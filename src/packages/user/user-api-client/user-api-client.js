import { sendParseRequest } from "src/packages/api-client/requester";
import logger from "src/packages/logger";

export async function signUp({ email, password }) {
  const response = await sendParseRequest("users", {
    body: {
      email,
      username: email,
      password
    }
  });
  localStorage.setItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY,
    response.sessionToken
  );
  return response;
}

export async function signIn({ email, password }) {
  const response = await sendParseRequest("login", {
    query: {
      username: email,
      password
    }
  });
  localStorage.setItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY,
    response.sessionToken
  );
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
  localStorage.removeItem(process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY);
  logger.user("Removed session token from local storage.");
}
