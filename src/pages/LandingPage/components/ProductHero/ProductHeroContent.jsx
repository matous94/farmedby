import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Button from "../Button";

const howItWorksKeys = [
  "landingPage.howItWorks1",
  "landingPage.howItWorks2",
  "landingPage.howItWorks3",
  "landingPage.howItWorks4"
];

function ProductHeroContent() {
  const { t } = useTranslation();
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let headingVariant = 2;
  if (isBelowXs) headingVariant = 4;

  return (
    <Box
      sx={{
        mx: "auto",
        my: "5vh",
        maxWidth: "580px",
        px: ["8px", "20px"],
        py: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)"
      }}
    >
      <Typography
        textAlign="center"
        color="white"
        variant={`h${headingVariant}`}
        component="h2"
      >
        {t("landingPage.heading")}
      </Typography>
      <Box
        sx={{
          height: "4px",
          width: "72px",
          margin: "8px auto",
          background: (theme) => theme.palette.primary.main
        }}
      />
      <Typography
        sx={{
          mt: "12px",
          fontWeight: "bold"
        }}
        color="white"
        variant="subtitle1"
        component="h2"
      >
        {howItWorksKeys.map((key, index) => (
          <Box key={key} display="flex">
            <Box sx={{ minWidth: "18px" }}>{index + 1}.</Box>
            <Box>{t(key)}</Box>
          </Box>
        ))}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        sx={{
          minWidth: "200px",
          my: ["36px", null, "64px"],
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
