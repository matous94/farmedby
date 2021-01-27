/* eslint-disable prefer-destructuring */
function parseQuery(query) {
  if (!query) return "";
  return Object.entries(query)
    .map(
      ([key, value]) =>
        `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`
    )
    .join("&");
}

export default function sendRequest(
  endpoint,
  { body, query = "", ...customConfig } = {}
) {
  const queryString = parseQuery(query);
  console.log("sendRequest queryString", queryString);

  let token = localStorage.getItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY
  );
  console.log("sendRequest session token", token);

  const headers = {
    "content-type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
  };
  if (token) {
    headers["X-Parse-Session-Token"] = token;
  }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${endpoint}?${queryString}`,
    config
  ).then(async (response) => {
    // if (response.status === 401) {
    // or other Parse unauthorized/unauthenticated responses
    // clear cookie
    // clear state
    // refresh page or state change causes GUI/redirect update
    // window.location.assign(window.location);
    // throw new Error("Unauthorized request. Response status is 401.");
    // }
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
}
