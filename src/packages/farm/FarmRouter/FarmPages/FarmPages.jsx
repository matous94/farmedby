import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

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

function useDrawer() {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const openDrawer = React.useCallback(() => {
    setIsOpenDrawer(true);
  }, []);
  const closeDrawer = React.useCallback(() => {
    setIsOpenDrawer(false);
  }, []);

  return React.useMemo(
    () => ({
      open: openDrawer,
      close: closeDrawer,
      isOpen: isOpenDrawer
    }),
    [isOpenDrawer, closeDrawer, openDrawer]
  );
}

export default function FarmPages() {
  const { pageName, farmId } = useParams();
  const classes = useStyles();
  const { t } = useTranslation();

  const drawer = useDrawer();
  const { status, farm, isFarmOwner } = useGetFarm();
  const toggleEditMode = useStoreActions((actions) => actions.toggleEditMode);
  const isEditMode = useStoreState(selectors.isEditMode(farmId));

  const { PageContent } = pageName ? pages[pageName] : landingPage;
  return (
    <>
      <AppBar onMenuClick={drawer.open} />
      <Box display="flex">
        <nav className={classes.drawer} aria-label="mailbox folders">
          <ResponsiveDrawer
            open={drawer.isOpen}
            onClose={drawer.close}
            width={drawerWidth}
          />
        </nav>
        <Box
          component="main"
          position="relative"
          flexGrow="1"
          p="0 24px 24px 24px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Toolbar />
          <GenericFailureDialog
            open={status === "error"}
            onClose={() => {
              window.location = "/";
            }}
          />
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
              <Box my={2} width="100%">
                <Typography
                  align="center"
                  color="secondary"
                  className={classes.farmName}
                  variant="h4"
                >
                  {farm.name}
                </Typography>
              </Box>
              <Box width={["100%", "100%", "700px", "1000px"]}>
                <PageContent
                  farm={farm}
                  isEditMode={isEditMode}
                  isFarmOwner={isFarmOwner}
                />
              </Box>
              {isFarmOwner && (
                <Box position="fixed" bottom="24px" right="24px">
                  <Fab
                    onClick={toggleEditMode}
                    style={{ minWidth: "80px" }}
                    size="medium"
                    variant="extended"
                    color="secondary"
                  >
                    {isEditMode
                      ? t("farmPage.switchToViewMode")
                      : t("farmPage.switchToEditMode")}
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
