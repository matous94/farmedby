import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { FarmPropTypes } from "src/packages/farm/farm-types";
import AppBar from "src/components/AppBar";
import ResponsiveDrawer from "./ResponsiveDrawer";

const drawerWidth = "240px";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  spinner: {
    position: "absolute",
    top: "100px",
    left: "calc(50% - 20px)"
  },
  farmName: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

export default function FarmView({ farm, tabs, selectedTab, isLoading }) {
  const classes = useStyles();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpened(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpened(false);
  };

  const { Content } = tabs[selectedTab];

  return (
    <>
      <AppBar farmName={farm?.name} onMenuClick={openDrawer} />
      <Box display="flex">
        <nav className={classes.drawer} aria-label="mailbox folders">
          <ResponsiveDrawer
            width={drawerWidth}
            isOpened={isDrawerOpened}
            onClose={closeDrawer}
            selectedTab={selectedTab}
            tabs={tabs}
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
          {isLoading ? (
            <CircularProgress className={classes.spinner} />
          ) : (
            <>
              <Typography
                align="center"
                color="secondary"
                className={classes.farmName}
                variant="h4"
              >
                {farm.name}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                width={["100%", "100%", "700px", "1000px"]}
              >
                <Content />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

FarmView.propTypes = {
  farm: FarmPropTypes,
  tabs: PropTypes.shape({}).isRequired,
  selectedTab: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};
FarmView.defaultProps = {
  farm: null
};
