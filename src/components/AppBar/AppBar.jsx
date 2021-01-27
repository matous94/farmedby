import React from "react";
import PropTypes from "prop-types";
import { useStoreState, useStoreActions } from "easy-peasy";
import clsx from "clsx";
import MuiAppBar from "@material-ui/core/AppBar";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Link from "src/components/Link";
import ApiClient from "src/packages/api-client";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    justifyContent: "space-between"
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  logo: {
    cursor: "pointer"
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "end"
    }
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
    textTransform: "none",
    padding: 0
  }
}));

export default function AppBar({ onMenuClick, onlyLogo = false }) {
  const user = useStoreState((state) => state.user);
  const usersFarm = useStoreState((state) => state.usersFarm);
  const signOut = useStoreActions((actions) => actions.signOut);

  const classes = useStyles();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  let logoVariant = "h4";
  if (isBelowSm) logoVariant = "h5";
  if (isBelowXs) logoVariant = "h6";

  function signOutHandler() {
    ApiClient.User.signOut();
    signOut();
  }

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          {onMenuClick && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" variant={logoVariant} color="secondary" underline="none">
            FarmedBy
          </Link>
        </Box>

        {!onlyLogo && (
          <div className={classes.right}>
            <>
              {user && usersFarm && (
                <Link
                  underline="none"
                  variant="h6"
                  className={classes.rightLink}
                  to={`/farm/${usersFarm.objectId}`}
                >
                  Moje Farma
                </Link>
              )}
              {!usersFarm && (
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  to="/sign-up"
                >
                  Založit farmu
                </Link>
              )}
              {user ? (
                <MuiLink
                  underline="none"
                  variant="h6"
                  component="button"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  onClick={signOutHandler}
                >
                  Odhlásit se
                </MuiLink>
              ) : (
                <Link
                  underline="none"
                  variant="h6"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  to="/sign-in"
                >
                  Přihlásit se
                </Link>
              )}
            </>
          </div>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  onMenuClick: PropTypes.func
};
AppBar.defaultProps = {
  onMenuClick: undefined
};
