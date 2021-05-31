import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useAppBarHeight } from "src/components/AppBar";
import Link from "src/components/Link";
import ApiClient from "src/packages/api-client";
import Logo from "src/components/Logo";

import pages, { landingPage } from "../../pages";

export default function ResponsiveDrawer({
  isOpen,
  onClose,
  width,
  farmName,
  isAdminMode
}) {
  const { t } = useTranslation();
  const { farmId, pageName } = useParams();
  const appBarHeight = useAppBarHeight();

  const isUpMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isDownMd = !isUpMd;

  React.useEffect(() => {
    if (isUpMd && isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpMd, isOpen]);

  function signOutHandler() {
    ApiClient.User.signOut();
    window.location.reload();
  }

  const LandingPageIcon = landingPage.Icon;
  const drawerContent = (
    <div>
      <Box
        sx={{
          minHeight: `${appBarHeight}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: "16px"
        }}
      >
        {isDownMd && <Logo />}
      </Box>
      {isDownMd && <Divider />}
      <Box sx={{ px: "8px", py: "12px" }}>
        <Typography variant="h5" align="center">
          {farmName}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem
          component={Link}
          to={`/farm/${farmId}`}
          key={landingPage.name}
          onClick={() => {
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
          .filter((page) => page.selectable && (!page.private || isAdminMode))
          .map(({ name, translationKey, Icon, disabled }) => (
            <ListItem
              component={Link}
              to={`/farm/${farmId}/${name}`}
              onClick={() => {
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
        {isAdminMode && (
          <ListItem onClick={signOutHandler} button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t("signOut")} />
          </ListItem>
        )}
      </List>
    </div>
  );

  return isDownMd ? (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
      PaperProps={{
        width
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      PaperProps={{
        sx: { zIndex: (theme) => theme.zIndex.appBar - 1, width }
      }}
      variant="permanent"
      open
    >
      {drawerContent}
    </Drawer>
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
