import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";

import Link from "src/components/Link";

import heroImageUrl from "./hero.jpg";
import Button from "../Button";
import Typography from "../Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${heroImageUrl})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200,
    marginTop: "100px",
    marginBottom: "80px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      marginBottom: "40px"
    }
  },
  csaLetters: {
    display: "inline-block",
    "&::first-letter": {
      color: theme.palette.primary.main,
      fontWeight: "bold"
    }
  },
  subHeading: {
    marginTop: "24px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "36px"
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function ProductHero(props) {
  const { classes } = props;
  const { t } = useTranslation();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let headingVariant = 2;
  if (isBelowSm) headingVariant = 3;
  if (isBelowXs) headingVariant = 4;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography
        color="inherit"
        align="center"
        variant={`h${headingVariant}`}
        component="h1"
        marked="center"
      >
        {t("landingPage.heading")
          .split(" ")
          .map((word, index, { length }) => (
            <span className={classes.csaLetters} key={word}>
              {word}
              {index < length - 1 && <>&nbsp;</>}
            </span>
          ))}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant={`h${headingVariant + 1}`}
        component="h2"
        className={classes.subHeading}
      >
        {t("landingPage.subHeading")}
      </Typography>
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
        to="/farms"
      >
        {t("farmsPage.heading")}
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    background: PropTypes.string,
    subHeading: PropTypes.string,
    csaLetters: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(ProductHero);
