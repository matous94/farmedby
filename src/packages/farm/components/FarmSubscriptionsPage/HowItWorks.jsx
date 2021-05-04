import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const howItWorksKeys = [
  "subscriptionsPage.howItWorks1",
  "subscriptionsPage.howItWorks2",
  "subscriptionsPage.howItWorks3",
  "subscriptionsPage.howItWorks4",
  "subscriptionsPage.howItWorks5"
];

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <Typography
      sx={{
        //   mt: "12px",
        fontWeight: "bold"
      }}
      variant="subtitle1"
      component="div"
    >
      {howItWorksKeys.map((key, index) => (
        <Box key={key} display="flex">
          <Box
            sx={{
              minWidth: "18px",
              fontWeight: "regular"
            }}
          >
            {index + 1}.
          </Box>
          <Box>{t(key)}</Box>
        </Box>
      ))}
    </Typography>
  );
}
