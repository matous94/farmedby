import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { useStoreState } from "easy-peasy";

export default function PublicPage({ Page, ...rest }) {
  const user = useStoreState((state) => state.user);
  const usersFarm = useStoreState((state) => state.usersFarm);

  if (user && usersFarm) {
    return <Redirect to={`/farm/${usersFarm.objectId}`} />;
  }

  if (user) {
    return <Redirect to="/create-farm" />;
  }

  return <Page {...rest} />;
}

PublicPage.propTypes = {
  Page: PropTypes.func.isRequired
};
