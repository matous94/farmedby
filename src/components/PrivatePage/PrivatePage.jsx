import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

export default function PrivatePage({ Page, ...rest }) {
  const user = useStoreState((state) => state.user);

  if (!user) {
    return <Redirect to="/sign-in" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Page {...rest} />;
}

PrivatePage.propTypes = {
  Page: PropTypes.func.isRequired
};
