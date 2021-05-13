import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/core/Alert";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useSwitch } from "src/packages/hooks";
import { selectors } from "src/store";
import AppBar, { useAppBarHeight } from "src/components/AppBar";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import pages, { landingPage } from "../pages";
import ResponsiveDrawer from "./ResponsiveDrawer";
import useGetFarm from "./useGetFarm";

const drawerWidth = "240px";

export default function FarmPages() {
  const { pageName, farmId } = useParams();
  const { t } = useTranslation();
  const appBarMinHeight = useAppBarHeight();

  const drawer = useSwitch(false);
  const { status, farm, isFarmOwner } = useGetFarm();
  const toggleAdminMode = useStoreActions((actions) => actions.toggleAdminMode);
  const isAdminMode = useStoreState(selectors.isAdminMode(farmId));
  const isUpMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { PageContent, translationKey } = pageName
    ? pages[pageName]
    : landingPage;
  const pageHeading = pageName ? t(translationKey) : farm?.name;
  return (
    <>
      <GenericFailureDialog
        isOpen={status === "error"}
        onClose={() => {
          window.location = "/";
        }}
      />
      <AppBar onMenuClick={drawer.switchOn} />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: [null, null, drawerWidth],
            flexShrink: 0
          }}
          aria-label="mailbox folders"
        >
          <ResponsiveDrawer
            isOpen={drawer.isOn}
            onClose={drawer.switchOff}
            width={drawerWidth}
            farmName={farm?.name}
            isAdminMode={isAdminMode}
          />
        </Box>
        <Box
          component="main"
          position="relative"
          sx={{
            width: isUpMd ? `calc(100vw - ${drawerWidth})` : "100vw",
            minHeight: `calc(100vh - ${appBarMinHeight}px)`,
            overflowX: "auto"
          }}
        >
          {status === "loading" && (
            <Box
              sx={{
                position: "absolute",
                top: "100px",
                left: "calc(50% - 20px)"
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {status === "resolved" && (
            <>
              {!farm.published && isFarmOwner && (
                <Alert variant="filled" severity="info">
                  {t("farmPages.farmIsNotPublishedAlert")}
                </Alert>
              )}
              {farm.isExampleFarm && (
                <Alert variant="filled" severity="warning">
                  {t("exampleFarmAlert")}
                </Alert>
              )}
              <Box
                sx={{
                  pt: "16px",
                  pb: "64px",
                  px: ["16px", "24px", "32px", "46px"]
                }}
              >
                <Box sx={{ mb: "16px" }}>
                  <Typography align="center" color="secondary" variant="h3">
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
                <Box sx={{ position: "fixed", bottom: "16px", right: "24px" }}>
                  <Fab
                    onClick={toggleAdminMode}
                    sx={{ minWidth: "80px" }}
                    size="medium"
                    variant="extended"
                    color="secondary"
                  >
                    {isAdminMode
                      ? t("farmPages.switchToViewMode")
                      : t("farmPages.switchToAdminMode")}
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
