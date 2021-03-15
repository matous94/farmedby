import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "src/components/Logo";

import pages, { landingPage } from "../../pages";

const useStyles = makeStyles({
  drawerPaper: {
    width: (props) => props.width
  }
});

function ResponsiveDrawer({ isOpen, onClose, width, farmName, isAdminMode }) {
  const classes = useStyles({ width });
  const history = useHistory();
  const { t } = useTranslation();
  const { farmId, pageName } = useParams();

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  if (isUpSm && isOpen) onClose();

  const LandingPageIcon = landingPage.Icon;
  const drawerContent = (
    <div>
      <Toolbar>
        <Hidden smUp>
          <Logo />
        </Hidden>
      </Toolbar>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <Box px="8px" py="12px">
        <Typography variant="h5" align="center">
          {farmName}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem
          key={landingPage.name}
          onClick={() => {
            history.push(`/farm/${farmId}`);
            if (isOpen) onClose();
          }}
          button
          selected={pageName == null}
        >
          <ListItemIcon>
            <LandingPageIcon />
          </ListItemIcon>
          <ListItemText primary={`${t(landingPage.translationKey)}`} />
        </ListItem>
        {Object.values(pages)
          .filter((page) => !page.private || isAdminMode)
          .map(({ name, translationKey, Icon, disabled }) => (
            <ListItem
              onClick={() => {
                history.push(`/farm/${farmId}/${name}`);
                if (isOpen) onClose();
              }}
              button
              disabled={disabled}
              selected={pageName === name}
              key={name}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={t(translationKey)} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  farmName: PropTypes.string,
  isAdminMode: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};
ResponsiveDrawer.defaultProps = {
  farmName: undefined
};

export default ResponsiveDrawer;
