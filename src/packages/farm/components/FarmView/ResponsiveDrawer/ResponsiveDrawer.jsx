import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: (props) => props.width
  }
}));

function ResponsiveDrawer({ width, isOpened, onClose, selectedTab, tabs }) {
  const router = useRouter();
  const classes = useStyles({ width });

  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {Object.values(tabs).map(({ id, label, Icon, url, as }) => (
          <ListItem
            onClick={() => {
              router.push(url, as);
              if (isOpened) onClose();
            }}
            button
            selected={id === selectedTab}
            key={id}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
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
          open={isOpened}
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
  width: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  tabs: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      url: PropTypes.string,
      as: PropTypes.string
    })
  ).isRequired
};

export default ResponsiveDrawer;
