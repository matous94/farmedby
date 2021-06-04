import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import Box from "@material-ui/core/Box";

import ApiClient from "src/packages/api-client";
import logger from "src/packages/logger";
import LoadingScreen from "src/components/LoadingScreen";
import PublicPage from "src/components/PublicPage";
import PrivatePage from "src/components/PrivatePage";
import CreateFarmPage from "src/packages/farm/components/CreateFarmPage";
import { localStorageKeys } from "src/packages/local-storage";
import useScrollToTop from "src/packages/hooks/useScrollToTop";
import Footer from "src/components/Footer";

import ErrorPage from "src/pages/ErrorPage";
import LandingPage from "src/pages/LandingPage";
import SignInPage from "src/pages/SignInPage";
import SignUpPage from "src/pages/SignUpPage";
import PrivacyPolicyPage from "src/pages/PrivacyPolicyPage";
import TermsOfUsePage from "src/pages/TermsOfUsePage";
import FarmRouter from "src/packages/farm/components/FarmRouter";
import FarmsPage from "src/packages/farm/components/FarmsPage";
import OrderPage from "src/packages/order/components/OrderPage";

function getSessionToken() {
  return localStorage.getItem(localStorageKeys.sessionToken);
}

function App() {
  const signIn = useStoreActions((actions) => actions.signIn);
  const [isLoading, setIsLoading] = React.useState(Boolean(getSessionToken()));

  useScrollToTop();

  React.useEffect(() => {
    if (!isLoading) return;
    async function authenticateUser() {
      try {
        const user = await ApiClient.User.getBySessionToken(getSessionToken());
        const farm = await ApiClient.Farm.getMyFarm();
        if (farm == null || user == null) {
          localStorage.removeItem(localStorageKeys.sessionToken);
        } else {
          signIn({ user, farm });
        }
        setIsLoading(false);
      } catch (error) {
        logger.user("Authentication failed");
        localStorage.removeItem(localStorageKeys.sessionToken);
        setIsLoading(false);
      }
    }

    authenticateUser();
  }, [signIn, isLoading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden"
      }}
    >
      {isLoading && <LoadingScreen />}
      {!isLoading && (
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

          <Route path="/order/:pageId">
            <OrderPage />
          </Route>

          <Route path="/privacy-policy">
            <PrivacyPolicyPage />
          </Route>

          <Route path="/terms-of-use">
            <TermsOfUsePage />
          </Route>

          {/* <Route path="/claims">
            <PrivacyPolicyPage />
          </Route> */}

          {/* <Route path="/seller-terms-of-use">
            <PrivacyPolicyPage />
          </Route> */}

          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
      <Footer />
    </Box>
  );
}

export default App;
