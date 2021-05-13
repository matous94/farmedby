import React from "react";
import PropTypes from "prop-types";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import MuiAppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { selectors } from "src/store";
import Logo from "src/components/Logo";
import Link from "src/components/Link";

import CountrySelector from "./CountrySelector";

export function useAppBarHeight() {
  return useStoreState(selectors.app.getAppBarHeight);
}

export default function AppBar({ onMenuClick, onlyLogo, noOffset }) {
  const { t } = useTranslation();
  const setAppBarHeight = useStoreActions(
    (actions) => actions.app.setAppBarHeight
  );
  const appBarRef = React.useRef();

  React.useEffect(() => {
    const appBar = appBarRef.current;
    let delayTimeoutId = null;

    function onResize() {
      clearTimeout(delayTimeoutId);
      delayTimeoutId = setTimeout(() => {
        setAppBarHeight(appBar.clientHeight);
      }, 200);
    }

    if (appBar) {
      window.appBar = appBar;
      setAppBarHeight(appBar.clientHeight);
      window.addEventListener("resize", onResize);
    }

    return () => {
      appBar.removeEventListener("resize", onResize);
      clearTimeout(delayTimeoutId);
      setAppBarHeight(0);
    };
  }, [setAppBarHeight]);

  const myFarm = useStoreState(selectors.getMyFarm);
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <MuiAppBar position="fixed" ref={appBarRef}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {onMenuClick && isDownMd && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onMenuClick}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Logo />
            <Box
              sx={{
                ml: ["8px", "12px", "16px"],
                width: ["24px", "32px", "40px"],
                height: ["24px", "32px", "40px"]
              }}
            >
              <CountrySelector />
            </Box>
          </Box>

          {!onlyLogo && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: ["end", "center"],
                flexDirection: ["column", "row"]
              }}
            >
              <>
                {myFarm ? (
                  <Link
                    underline="none"
                    variant="h6"
                    to={`/farm/${myFarm.objectId}`}
                    color="secondary.main"
                    fontSize="16px"
                  >
                    {t("myFarm")}
                  </Link>
                ) : (
                  <Link
                    variant="h6"
                    underline="none"
                    to="/sign-up"
                    color="secondary.main"
                    fontSize="16px"
                  >
                    {t("createFarm")}
                  </Link>
                )}
                <Link
                  underline="none"
                  variant="h6"
                  to="/farms"
                  color="common.white"
                  fontSize="16px"
                  ml={[0, 3]}
                >
                  {t("farmsPage.heading")}
                </Link>
              </>
            </Box>
          )}
        </Toolbar>
      </MuiAppBar>
      {noOffset ? null : <Toolbar />}
    </>
  );
}

AppBar.propTypes = {
  onMenuClick: PropTypes.func,
  onlyLogo: PropTypes.bool,
  noOffset: PropTypes.bool
};
AppBar.defaultProps = {
  onMenuClick: undefined,
  onlyLogo: false,
  noOffset: false
};
