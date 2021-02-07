import * as React from "react";
import Link from "src/components/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        FarmedBy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
