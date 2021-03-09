import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import { selectors } from "src/store";

export default function PublicPage({ Page, ...rest }) {
  const user = useStoreState((state) => state.user);
  const myFarm = useStoreState(selectors.getMyFarm);

  if (user && myFarm) {
    return <Redirect to={`/farm/${myFarm.objectId}`} />;
  }

  if (user) {
    return <Redirect to="/create-farm" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Page {...rest} />;
}

PublicPage.propTypes = {
  Page: PropTypes.func.isRequired
};
