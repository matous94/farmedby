import * as React from "react";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { selectors } from "src/store";
import AppBar from "src/components/AppBar";

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

export default function FarmLayout() {
  const { url, path, params } = useRouteMatch();
  const { farmId } = params;
  console.log(url);
  console.log(path);
  console.log("params", params);
  const classes = useStyles();
  const user = useStoreState(selectors.getUser);
  const farm = useStoreState(selectors.getFarm);
  const isOwner = user && farm && user.objectId === farm.owner.objectId;

  const [status, setStatus] = React.useState(
    farm?.objectId === farmId ? "cachedData" : "loading"
  );
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const openDrawer = () => {
    setIsOpenDrawer(true);
  };
  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  const { PageContent } = pages[params.pageName];

  return (
    <>
      <AppBar onMenuClick={openDrawer} />
      <Box display="flex">
        <nav className={classes.drawer} aria-label="mailbox folders">
          <ResponsiveDrawer
            open={isOpenDrawer}
            onClose={closeDrawer}
            width={drawerWidth}
          />
        </nav>
        <Box
          component="main"
          position="relative"
          flexGrow="1"
          p="24px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Toolbar />
          {status === "loading" && (
            <Box position="absolute" top="100px" left="calc(50% - 20px)">
              <CircularProgress />
            </Box>
          )}
          {(status === "cachedData" || status === "resolved") && (
            <>
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