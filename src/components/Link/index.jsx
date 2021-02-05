import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MUILink from "@material-ui/core/Link";

function Link(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MUILink ref={ref} component={RouterLink} {...props} />;
}

export default React.forwardRef(Link);
