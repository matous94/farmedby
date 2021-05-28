/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MUILink from "@material-ui/core/Link";

function Link(props, ref) {
  if (props.href && !props.to) {
    return <MUILink ref={ref} {...props} />;
  }

  return <MUILink ref={ref} component={RouterLink} {...props} />;
}

export default React.forwardRef(Link);
