const { baseUrl } = Cypress.config();

if (!baseUrl)
  throw new Error(
    "Missing baseUrl. Configure it in cypress.json or as env variable CYPRESS_BASE_URL"
  );

function createAbsolute(relative: string): string {
  return `${baseUrl}/${relative}`;
}

type Route = {
  absolute: string;
  relative: string;
};

function createRoute(relative: string): Route {
  return {
    absolute: createAbsolute(relative),
    relative
  };
}

export const Routes = {
  createFarm() {
    return createRoute("create-farm");
  },
  farmLandingPage(farmId: string) {
    return createRoute(`farm/${farmId}`);
  },
  userAccountPage(farmId: string) {
    return createRoute(`farm/${farmId}/user`);
  },
  signIn() {
    return createRoute("sign-in");
  },
  signUp() {
    return createRoute("sign-up");
  },
  homePage() {
    return createRoute("");
  }
} as const;
