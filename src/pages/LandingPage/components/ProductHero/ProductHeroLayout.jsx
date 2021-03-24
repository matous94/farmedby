import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import heroImageUrl from "./hero.jpg";

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    minHeight: "75vh",
    maxHeight: "600px",
    [theme.breakpoints.up("sm")]: {
      minHeight: "500px",
      maxHeight: "1300px"
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    [theme.breakpoints.up("sm")]: {
      padding: "32px 16px"
    }
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
    backgroundImage: `url(${heroImageUrl})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4)
  }
});

function ProductHeroLayout(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={classes.background} />
      </Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    backdrop: PropTypes.string,
    background: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(ProductHeroLayout);
