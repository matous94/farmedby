import * as React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import FarmPages from "./FarmPages";
import pages from "./pages";

function FarmPageRouter() {
  const { params } = useRouteMatch();
  const { farmId, pageName } = params;

  if (pageName == null || (pages[pageName] && !pages[pageName].disabled)) {
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
      <Route exact path={`${url}/:farmId/:pageName`}>
        <FarmPageRouter />
      </Route>
      <Route exact path={`${url}/:farmId`}>
        <FarmPageRouter />;
      </Route>
      <Route path={`${url}/:farmId`}>
        {({ match }) => {
          return <Redirect to={`${match.url}`} />;
        }}
      </Route>
    </Switch>
  );
}
