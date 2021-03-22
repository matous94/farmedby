import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";

import Link from "src/components/Link";
import { getIllustrativeFarmId } from "src/packages/utils";

import Button from "../Button";
import Typography from "../Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: "200px",
    marginTop: "80px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "40px"
    }
  },
  button2: {
    minWidth: "200px"
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
}));

function ProductHero() {
  const classes = useStyles();
  const { t } = useTranslation();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let headingVariant = 2;
  if (isBelowSm) headingVariant = 3;
  if (isBelowXs) headingVariant = 4;

  return (
    <ProductHeroLayout>
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
      <Box my={["16px", "24px"]}>
        <Typography color="inherit" align="center" variant="h5" component="h3">
          {t("landingPage.or")}
        </Typography>
      </Box>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button2}
        component={Link}
        to={`/farm/${getIllustrativeFarmId()}`}
      >
        <Box display="flex" flexDirection="column">
          {t("landingPage.showExampleFarm")}
          <br />
          <Typography color="inherit" align="center" variant="caption">
            {t("landingPage.farmerMode")}
          </Typography>
        </Box>
      </Button>
    </ProductHeroLayout>
  );
}

export default ProductHero;
