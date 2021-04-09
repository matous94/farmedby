import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "src/components/Link";

export default function Logo() {
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  let logoVariant = "h4";
  if (isDownMd) logoVariant = "h5";

  return (
    <Link to="/" variant={logoVariant} color="secondary" underline="none">
      FarmedBy
    </Link>
  );
}
