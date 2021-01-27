import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import heroImageUrl from "./hero.jpg";
import Link from "src/components/Link";
import Button from "../Button";
import Typography from "../Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${heroImageUrl})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
    marginTop: "160px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
    },
  },
  h4: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let headingVariant = "h2";
  if (isBelowSm) headingVariant = "h3";
  if (isBelowXs) headingVariant = "h4";

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography
        color="inherit"
        align="center"
        variant={headingVariant}
        marked="center"
      >
        Ovoce a zelenina přímo od pěstitele
      </Typography>
      {/* <Typography
        color="inherit"
        align="center"
        variant="h4"
        className={classes.h4}
      >
        Najdi lokální produkty
      </Typography> */}
      {/* <Input
        style={{ background: "white", padding: "4px 12px", margin: "16px 0" }}
        placeholder="PSČ"
        disabled
      /> */}
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={Link}
        to="/farm/4nAUMbys6tN369Up8HFO"
      >
        Zobraz Ukázku Farmy
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    background: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(ProductHero);
