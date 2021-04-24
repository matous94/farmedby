import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Button from "../Button";

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

function ProductHeroContent() {
  const { t } = useTranslation();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  let headingVariant = 2;
  if (isBelowSm) headingVariant = 3;
  if (isBelowXs) headingVariant = 4;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
      <Box
        sx={{
          height: "4px",
          width: "64px",
          margin: "8px auto 0",
          bg: "secondary"
        }}
      />
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
          sx={{ background: "white", padding: "4px 12px", margin: "16px 0" }}
          placeholder="PSČ"
          disabled
        /> */}
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{
          minWidth: "200px",
          mt: ["40px", null, "80px"],
          fontSize: "1.5rem"
        }}
        component={RouterLink}
        to="/farms"
      >
        {t("farmsPage.heading")}
      </Button>
    </Box>
  );
}

export default ProductHeroContent;
