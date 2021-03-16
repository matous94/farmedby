import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useSwitch } from "src/packages/hooks";
import { selectors } from "src/store";
import AppBar from "src/components/AppBar";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import pages, { landingPage } from "../pages";
import ResponsiveDrawer from "./ResponsiveDrawer";
import useGetFarm from "./useGetFarm";

const drawerWidth = "240px";
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}));

export default function FarmPages() {
  const { pageName, farmId } = useParams();
  const classes = useStyles();
  const { t } = useTranslation();

  const drawer = useSwitch(false);
  const { status, farm, isFarmOwner } = useGetFarm();
  const toggleAdminMode = useStoreActions((actions) => actions.toggleAdminMode);
  const isAdminMode = useStoreState(selectors.isAdminMode(farmId));
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { PageContent, translationKey } = pageName
    ? pages[pageName]
    : landingPage;
  const pageHeading = pageName ? t(translationKey) : farm?.name;
  return (
    <>
      <GenericFailureDialog
        open={status === "error"}
        onClose={() => {
          window.location = "/";
        }}
      />
      <AppBar onMenuClick={drawer.switchOn} />
      <Box display="flex">
        <nav className={classes.drawer} aria-label="mailbox folders">
          <ResponsiveDrawer
            isOpen={drawer.isOn}
            onClose={drawer.switchOff}
            width={drawerWidth}
            farmName={farm?.name}
            isAdminMode={isAdminMode}
          />
        </nav>
        <Box
          component="main"
          position="relative"
          width={isUpSm ? `calc(100vw - ${drawerWidth})` : "100vw"}
          minHeight="100vh"
        >
          <Toolbar />
          {status === "loading" && (
            <Box position="absolute" top="100px" left="calc(50% - 20px)">
              <CircularProgress />
            </Box>
          )}
          {status === "resolved" && (
            <>
              {!farm.published && isFarmOwner && (
                <Alert variant="filled" severity="info">
                  {t("farmPage.farmIsNotPublishedAlert")}
                </Alert>
              )}
              <Box pt="16px" pb="32px" px={["16px", "24px", "32px", "64px"]}>
                <Box mb="16px">
                  <Typography align="center" color="secondary" variant="h4">
                    {pageHeading}
                  </Typography>
                </Box>
                <PageContent
                  farm={farm}
                  isAdminMode={isAdminMode}
                  isFarmOwner={isFarmOwner}
                  toggleAdminMode={toggleAdminMode}
                />
              </Box>
              {isFarmOwner && (
                <Box position="fixed" bottom="16px" right="24px">
                  <Fab
                    onClick={toggleAdminMode}
                    style={{ minWidth: "80px" }}
                    size="medium"
                    variant="extended"
                    color="secondary"
                  >
                    {isAdminMode
                      ? t("farmPage.switchToViewMode")
                      : t("farmPage.switchToAdminMode")}
                  </Fab>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
