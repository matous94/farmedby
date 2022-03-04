import logger from "src/packages/logger";
import { localStorageKeys } from "src/packages/local-storage";

const isCypress = Boolean(window.Cypress);

const SERVER_URL = isCypress
  ? window.Cypress?.env("serverUrl")
  : process.env.REACT_APP_SERVER_URL;
const APP_ID = isCypress
  ? window.Cypress?.env("appId")
  : process.env.REACT_APP_APP_ID;

function parseQuery(query) {
  if (!query) return "";
  const queryString = Object.entries(query)
    .map(
      ([key, value]) =>
        `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`
    )
    .join("&");
  return `?${queryString}`;
}

export function sendParseRequest(
  endpoint,
  { body, query = "", ...customConfig } = {}
) {
  const queryString = parseQuery(query);
  logger.apiClient(
    `sendParseRequest called ->`,
    `endpoint=${endpoint}`,
    `queryString=${queryString}`,
    `body=`,
    body
  );

  const token = localStorage.getItem(localStorageKeys.sessionToken);

  const headers = {
    "content-type": "application/json",
    "X-Parse-Application-Id": APP_ID
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
  return fetch(`${SERVER_URL}/parse/${endpoint}${queryString}`, config).then(
    async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      }

      // invalid session token
      if (!response.ok && data.code === 209) {
        localStorage.removeItem(localStorageKeys.sessionToken);
        if (isCypress) {
          window.cy?.visit("/sign-in");
        } else {
          window.location = "/sign-in";
        }
      }

      return Promise.reject(data);
    }
  );
}

export async function callCloudFunction(functionName, params) {
  const { result } = await sendParseRequest(`functions/${functionName}`, {
    body: params,
    method: "POST"
  });
  return result;
}
