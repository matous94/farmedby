import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "src/components/Link";

export default function Logo() {
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  let logoVariant = "h4";
  if (isBelowSm) logoVariant = "h5";

  return (
    <Link to="/" variant={logoVariant} color="secondary" underline="none">
      FarmedBy
    </Link>
  );
}
