/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MUILink from "@mui/material/Link";

function Link(props, ref) {
  if (props.to) {
    return <MUILink ref={ref} component={RouterLink} {...props} />;
  }

  return <MUILink ref={ref} {...props} />;
}

export default React.forwardRef(Link);
