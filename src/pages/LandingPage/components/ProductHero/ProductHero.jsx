import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Link from "src/components/Link";
import { getIllustrativeFarmId } from "src/packages/utils";

import Button from "../Button";
import ProductHeroLayout from "./ProductHeroLayout";

function HeadingWord({ children }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        "&::first-letter": (theme) => ({
          color: theme.palette.primary.main,
          fontWeight: "bold"
        })
      }}
    >
      {children}
    </Box>
  );
}
HeadingWord.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
};

function ProductHero() {
  const { t } = useTranslation();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
      >
        {t("landingPage.heading")
          .split(" ")
          .map((word, index, { length }) => (
            <HeadingWord key={word}>
              {word}
              {index < length - 1 && <>&nbsp;</>}
            </HeadingWord>
          ))}
      </Typography>
      <Box height="4px" width="64px" margin="8px auto 0" bg="secondary" />
      <Typography
        color="inherit"
        align="center"
        variant={`h${headingVariant + 1}`}
        component="h2"
        sx={{ mt: ["24px", null, "36px"] }}
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
        sx={{ minWidth: "200px", mt: ["40px", null, "80px"] }}
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
        component={Link}
        sx={{ minWidth: "200px" }}
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
