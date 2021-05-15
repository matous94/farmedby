import * as React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { selectors } from "src/store";

import FarmPages from "./FarmPages";
import pages from "./pages";

function FarmPageRouter() {
  const { params } = useRouteMatch();
  const { farmId, pageName } = params;
  const isFarmOwner = useStoreState(selectors.createIsFarmOwner(farmId));
  const isLandingPage = pageName == null && farmId;
  if (isLandingPage) return <FarmPages />;

  if (pages[pageName] == null) return <Redirect to={`/farm/${farmId}`} />;

  const isAuthorized = pages[pageName].private === false || isFarmOwner;
  const isEnabledPage = pages[pageName].disabled === false;
  if (isAuthorized && isEnabledPage) {
    return <FarmPages />;
  }

  return <Redirect to={`/farm/${farmId}`} />;
}

export default function FarmRouter() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url}>
        <Redirect to="/farms" />
      </Route>
      <Route exact path={`${url}/:farmId/:pageName/:pageId`}>
        <FarmPageRouter />
      </Route>
      <Route exact path={`${url}/:farmId/:pageName`}>
        <FarmPageRouter />
      </Route>
      <Route exact path={`${url}/:farmId`}>
        <FarmPageRouter />
      </Route>
      <Route path={`${url}/:farmId`}>
        {({ match }) => {
          return <Redirect to={`${match.url}`} />;
        }}
      </Route>
    </Switch>
  );
}
