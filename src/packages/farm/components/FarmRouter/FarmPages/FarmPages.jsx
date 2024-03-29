import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

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
  const appBarHeight = useAppBarHeight();

  const drawer = useSwitch(false);
  const { status, farm, isFarmOwner } = useGetFarm();
  const toggleAdminMode = useStoreActions((actions) => actions.toggleAdminMode);
  const isAdminMode = useStoreState(selectors.createIsAdminMode(farmId));

  const currentPage = pageName ? pages[pageName] : landingPage;
  const { PageContent } = currentPage;
  let displayEnableOrderFormAlert = false;

  if (status === "resolved") {
    const hasSubscriptions = farm.subscriptions.length > 0;
    const hasPickupPoints =
      farm.isFarmPickupPoint || farm.pickupPoints.length > 0;
    const isSubscriptionsPage = currentPage.name === pages.subscriptions.name;
    if (hasSubscriptions && !hasPickupPoints && isSubscriptionsPage) {
      displayEnableOrderFormAlert = true;
    }
  }

  return (
    <>
      <GenericFailureDialog
        isOpen={status === "error"}
        onClose={() => {
          window.location = "/";
        }}
      />
      <AppBar onMenuClick={drawer.switchOn} />
      <Box sx={{ display: "flex", width: "100%" }}>
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
            flexGrow: 1,
            minHeight: `calc(100vh - ${appBarHeight}px)`,
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
              {displayEnableOrderFormAlert && (
                <Alert variant="filled" severity="info">
                  {t("subscription.enableOrderForm.alert")}
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
                  px: ["16px", "24px", "32px", "46px"],
                  "@media (min-width: 1650px)": {
                    paddingRight: "10vw"
                  }
                }}
              >
                {currentPage.renderHeading && (
                  <Typography
                    sx={{ mb: "16px" }}
                    align="center"
                    color="secondary"
                    variant="h3"
                  >
                    {t(currentPage.translationKey)}
                  </Typography>
                )}
                <PageContent
                  farm={farm}
                  isAdminMode={isAdminMode}
                  isFarmOwner={isFarmOwner}
                  toggleAdminMode={toggleAdminMode}
                />
              </Box>
              {isFarmOwner && !currentPage.private && (
                <Box
                  sx={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 1101
                  }}
                >
                  <Fab
                    onClick={() => toggleAdminMode()}
                    sx={{ minWidth: "80px" }}
                    size="medium"
                    variant="extended"
                    color="primary"
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
