import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { useStoreState } from "easy-peasy";

export default function PublicPage({ Page, ...rest }) {
  const user = useStoreState((state) => state.user);
  const farm = useStoreState((state) => state.farm);

  if (user && farm) {
    return <Redirect to={`/farm/${farm.objectId}`} />;
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
