import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import pages from "../pages";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: (props) => props.width
  }
}));

function ResponsiveDrawer({ open, onClose, width }) {
  const classes = useStyles({ width });
  const history = useHistory();
  const { farmId, pageName } = useParams();

  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {Object.values(pages).map(({ name, label, Icon }) => (
          <ListItem
            onClick={() => {
              history.push(`/farm/${farmId}/${name}`);
              if (open) onClose();
            }}
            button
            selected={pageName === name}
            key={name}
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
          open={open}
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
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default ResponsiveDrawer;
