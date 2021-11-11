/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";
import MUILink, { LinkProps as MUILinkProps } from "@mui/material/Link";

export const NavigationLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps & MUILinkProps<"a">, "component" | "href">
>((props, ref) => {
  return <MUILink component={RouterLink} ref={ref} {...props} />;
});

export const Link = MUILink;
