import logger from "src/packages/logger";

function parseQuery(query) {
  if (!query) return "";
  return Object.entries(query)
    .map(
      ([key, value]) =>
        `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`
    )
    .join("&");
}

export function sendParseRequest(
  endpoint,
  { body, query = "", ...customConfig } = {}
) {
  const queryString = parseQuery(query);
  logger.apiClient(
    `sendParseRequest called => 
    endpoint=${endpoint}
    queryString=${queryString}
    body=${body}`
  );

  const token = localStorage.getItem(
    process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY
  );

  const headers = {
    "content-type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_APP_ID
  };
  if (token) {
    headers["X-Parse-Session-Token"] = token;
  }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${endpoint}?${queryString}`,
    config
  ).then(async (response) => {
    const data = await response.json();

    // invalid session token
    if (!response.ok && data.code === 209) {
      localStorage.removeItem(process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY);
      window.location = "/sign-in";
    }

    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
}
