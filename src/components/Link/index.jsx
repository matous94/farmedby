import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MUILink from "@material-ui/core/Link";

export default React.forwardRef(function Link(props, ref) {
  return <MUILink ref={ref} component={RouterLink} {...props} />;
});
