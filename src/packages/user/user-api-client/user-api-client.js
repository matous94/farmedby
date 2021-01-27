import sendRequest from "src/packages/api-client/sendRequest";

export async function signUp({ email, password }) {
  const response = await sendRequest("users", {
    body: {
      email,
      username: email,
      password,
    },
  });
  localStorage.setItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY,
    response.sessionToken
  );
  return response;
}

export async function signIn({ email, password }) {
  const response = await sendRequest("login", {
    query: {
      username: email,
      password,
    },
  });
  localStorage.setItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY,
    response.sessionToken
  );
  return response;
}

export async function getBySessionToken(sessionToken) {
  return sendRequest("users/me", {
    headers: {
      "X-Parse-Session-Token": sessionToken,
    },
  });
}

export function signOut() {
  try {
    sendRequest("/logout", { method: "POST" });
  } catch (error) {
    console.log("logout failed", error);
  }
  localStorage.removeItem(process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY);
  console.log("Cookie after signOut");
}
