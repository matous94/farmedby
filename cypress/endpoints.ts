const serverUrl = Cypress.env("serverUrl");

if (!serverUrl)
  throw new Error("Missing serverUrl. Set it in cypress.env.json");

function createAbsolute(relative: string): string {
  return `${serverUrl}/${relative}`;
}

type Route = {
  absolute: string;
  relative: string;
};

function createEndpoint(relative: string): Route {
  return {
    absolute: createAbsolute(relative),
    relative
  };
}

export const Endpoints = {
  getMyFarm() {
    return createEndpoint("parse/functions/getMyFarm");
  },
  requestPasswordReset() {
    return createEndpoint("parse/requestPasswordReset");
  },
  signIn() {
    return createEndpoint("parse/functions/signIn");
  },
  signUp() {
    return createEndpoint("parse/functions/signUp");
  },
  createFarm() {
    return createEndpoint("parse/functions/createFarm");
  },
  destroyUserAndFarm() {
    return createEndpoint("parse/functions/destroyUserAndFarm");
  }
} as const;
