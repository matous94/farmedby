import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreState, useStoreActions } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import logger from "src/packages/logger";
import { selectors } from "src/store";
import AppBar from "src/components/AppBar";
import ApiClient from "src/packages/api-client";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import pages from "./pages";
import ResponsiveDrawer from "./ResponsiveDrawer";

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

function useGetFarm() {
  const { farmId } = useParams();
  const myFarm = useStoreState(selectors.getMyFarm);
  const isFarmOwner = useStoreState((state) =>
    selectors.isFarmOwner(state, farmId)
  );
  const refreshMyFarm = useStoreActions((actions) => actions.refreshMyFarm);

  // loading, resolved, error
  const [status, setStatus] = React.useState("loading");
  const [visitedFarm, setVisitedFarm] = React.useState(null);

  React.useEffect(() => {
    ApiClient.Farm.getFarmById(farmId)
      .then((fetchedFarm) => {
        if (isFarmOwner) {
          refreshMyFarm(fetchedFarm);
        } else {
          setVisitedFarm(fetchedFarm);
        }
        setStatus("resolved");
      })
      .catch((error) => {
        logger.farm("useGetFarm => getFarmById failed", error);
        setStatus("error");
      });
  }, [farmId, refreshMyFarm, isFarmOwner]);

  return React.useMemo(
    () => ({
      status,
      farm: isFarmOwner ? myFarm : visitedFarm,
      isFarmOwner
    }),
    [status, isFarmOwner, myFarm, visitedFarm]
  );
}

export default function FarmPage() {
  const { pageName } = useParams();
  const classes = useStyles();
  const { t } = useTranslation();

  const drawer = useDrawer();
  const { status, farm, isFarmOwner } = useGetFarm();

  const { PageContent } = pages[pageName];
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
              <Box
                display="flex"
                flexDirection="column"
                width={["100%", "100%", "700px", "1000px"]}
              >
                <PageContent farm={farm} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
