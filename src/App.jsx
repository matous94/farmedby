import * as React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

import ApiClient from "src/packages/api-client";
import LoadingScreen from "src/components/LoadingScreen";
import PublicPage from "src/components/PublicPage/PublicPage";

import ErrorPage from "src/pages/ErrorPage";
import LandingPage from "src/pages/LandingPage";
import SignInPage from "src/pages/SignInPage";

function getSessionToken() {
  return localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY);
}

function App() {
  const signIn = useStoreActions((actions) => actions.signIn);
  const [isLoading, setIsLoading] = React.useState(Boolean(getSessionToken()));

  React.useEffect(() => {
    if (!isLoading) return;
    async function authenticateUser() {
      try {
        const user = await ApiClient.User.getBySessionToken(getSessionToken());
        const farm = await ApiClient.Farm.getFarmForUserId(user.objectId);
        signIn({ user, farm });
        setIsLoading(false);
      } catch (error) {
        console.log("authentication failed");
        localStorage.removeItem(
          process.env.REACT_APP_SESSION_TOKEN_STORAGE_KEY
        );
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
        <PublicPage Page={SignInPage}></PublicPage>
      </Route>

      <Route path="/farm/:id">
        <h1>This is farm page</h1>
        <Link to="/">Go to landing page</Link>
      </Route>

      <Route exact path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
