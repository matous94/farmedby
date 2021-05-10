import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

import ApiClient from "src/packages/api-client";
import logger from "src/packages/logger";
import LoadingScreen from "src/components/LoadingScreen";
import PublicPage from "src/components/PublicPage";
import PrivatePage from "src/components/PrivatePage";
import CreateFarmPage from "src/packages/farm/components/CreateFarmPage";
import { localStorageKeys } from "src/packages/local-storage";

import ErrorPage from "src/pages/ErrorPage";
import LandingPage from "src/pages/LandingPage";
import SignInPage from "src/pages/SignInPage";
import SignUpPage from "src/pages/SignUpPage";
import FarmRouter from "src/packages/farm/components/FarmRouter";
import FarmsPage from "src/packages/farm/components/FarmsPage";
import OrderPage from "src/packages/order/OrderPage";

function getSessionToken() {
  return localStorage.getItem(localStorageKeys.sessionToken);
}

function App() {
  const signIn = useStoreActions((actions) => actions.signIn);
  const [isLoading, setIsLoading] = React.useState(Boolean(getSessionToken()));

  React.useEffect(() => {
    if (!isLoading) return;
    async function authenticateUser() {
      try {
        const user = await ApiClient.User.getBySessionToken(getSessionToken());
        const farm = await ApiClient.Farm.getMyFarm();
        signIn({ user, farm });
        setIsLoading(false);
      } catch (error) {
        logger.user("Authentication failed");
        localStorage.removeItem(localStorageKeys.sessionToken);
        setIsLoading(false);
      }
    }

    authenticateUser();
  }, [signIn, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/error">
        <ErrorPage />
      </Route>

      <Route path="/sign-in">
        <PublicPage key="sign-in" Page={SignInPage} />
      </Route>

      <Route path="/sign-up">
        <PublicPage key="sign-up" Page={SignUpPage} />
      </Route>

      <Route path="/create-farm">
        <PrivatePage key="create-farm" Page={CreateFarmPage} />
      </Route>

      <Route path="/farm">
        <FarmRouter />
      </Route>

      <Route path="/farms">
        <FarmsPage />
      </Route>

      <Route path="/order/:orderId">
        <OrderPage />
      </Route>

      <Route exact path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
