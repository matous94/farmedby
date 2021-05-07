import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NumberedList from "src/components/NumberedList/NumberedList";

import Button from "../Button";

const howItWorksKeys = [
  "landingPage.howItWorks1",
  "landingPage.howItWorks2",
  "landingPage.howItWorks3",
  "landingPage.howItWorks4"
];

function ProductHeroContent() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: "auto",
        my: "5vh",
        maxWidth: "580px",
        px: ["12px", "20px"],
        py: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)"
      }}
    >
      <Typography textAlign="center" color="white" variant="h2" component="h1">
        {t("landingPage.heading")}
      </Typography>
      <Box
        sx={{
          height: "4px",
          width: "72px",
          margin: "8px auto",
          background: theme.palette.primary.main
        }}
      />
      <NumberedList
        sx={{ mt: ["12px", null, "20px"] }}
        length={4}
        translationKey="landingPage.howItWorks"
        color="white"
      />
      <Button
        color="secondary"
        variant="contained"
        sx={{
          minWidth: "200px",
          my: ["36px", null, "64px"],
          fontSize: ["1.4rem", "1.5rem"]
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
