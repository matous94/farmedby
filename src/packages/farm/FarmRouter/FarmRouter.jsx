import { CallMerge } from "@material-ui/icons";
import * as React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import FarmLayout from "./FarmLayout";
import pages from "./pages";

function FarmPageRouter() {
  const { params } = useRouteMatch();

  if (pages[params.pageName]) {
    return <FarmLayout />;
  }

  return <Redirect to={`/farm/${params.farmId}/${pages.about.name}`} />;
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
      <Route path={`${url}/:farmId`}>
        {({ match }) => {
          return <Redirect to={`${match.url}/${pages.about.name}`} />;
        }}
      </Route>
    </Switch>
  );
}
