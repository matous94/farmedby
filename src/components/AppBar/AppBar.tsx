import React from "react";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";
import { useTranslation } from "react-i18next";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";

import { selectors, useStoreActions } from "src/store";
import Logo from "src/components/Logo";
import Link from "src/components/Link";

import CountrySelector from "./CountrySelector";

export function useAppBarHeight(): number {
  return useStoreState(selectors.app.getAppBarHeight);
}

interface AppBarProps {
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
  onlyLogo?: boolean;
  noOffset?: boolean;
}

export default function AppBar({
  onMenuClick,
  onlyLogo,
  noOffset
}: AppBarProps): JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const setAppBarHeight = useStoreActions(
    (actions) => actions.app.setAppBarHeight
  );
  const appBarHeight = useAppBarHeight();
  const appBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const appBar = appBarRef.current;
    let delayTimeoutId: number;

    function onResize() {
      clearTimeout(delayTimeoutId);
      delayTimeoutId = window.setTimeout(() => {
        if (appBar) {
          setAppBarHeight(appBar.clientHeight);
        }
      }, 120);
    }

    if (appBar) {
      setAppBarHeight(appBar.clientHeight);
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(delayTimeoutId);
      setAppBarHeight(0);
    };
  }, [setAppBarHeight]);

  const myFarm = useStoreState(selectors.getMyFarm);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

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
        {window.location.hostname === "farmedby.matousvencl.com" && (
          <Alert variant="filled" severity="info">
            {t("developmentSiteAlert")}
          </Alert>
        )}
      </MuiAppBar>
      {noOffset ? null : <Box sx={{ pt: `${appBarHeight}px` }} />}
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
