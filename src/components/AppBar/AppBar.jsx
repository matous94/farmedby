import React from "react";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import MuiAppBar from "@material-ui/core/AppBar";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { selectors } from "src/store";
import Logo from "src/components/Logo";
import Link from "src/components/Link";

import CountrySelector from "./CountrySelector";

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
  marginLeft: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0)
    }
  },
  secondaryLink: {
    fontSize: "16px",
    color: theme.palette.secondary.main
  },
  primaryLink: {
    fontSize: "16px",
    color: theme.palette.common.white
  }
}));

export default function AppBar({ onMenuClick, onlyLogo }) {
  const { t } = useTranslation();

  const user = useStoreState(selectors.getUser);
  const myFarm = useStoreState(selectors.getMyFarm);

  const classes = useStyles();

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
          <Logo />
          <Box
            ml={["8px", "12px", "16px"]}
            width={["24px", "32px", "40px"]}
            height={["24px", "32px", "40px"]}
          >
            <CountrySelector />
          </Box>
        </Box>

        {!onlyLogo && (
          <div className={classes.right}>
            <>
              {myFarm ? (
                <Link
                  underline="none"
                  className={clsx(classes.secondaryLink)}
                  variant="h6"
                  to={`/farm/${myFarm.objectId}`}
                >
                  {t("myFarm")}
                </Link>
              ) : (
                <Link
                  variant="h6"
                  underline="none"
                  to="/sign-up"
                  className={clsx(classes.secondaryLink)}
                >
                  {t("createFarm")}
                </Link>
              )}
              <Link
                underline="none"
                variant="h6"
                className={clsx(classes.primaryLink, classes.marginLeft)}
                to="/farms"
              >
                {t("farmsPage.heading")}
              </Link>
            </>
          </div>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  onMenuClick: PropTypes.func,
  onlyLogo: PropTypes.bool
};
AppBar.defaultProps = {
  onMenuClick: undefined,
  onlyLogo: false
};
