import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function CsaHeading({ headingVariant }) {
  const { t } = useTranslation();
  return (
    <Typography
      color="inherit"
      align="center"
      variant={`h${headingVariant}`}
      component="h1"
    >
      {t("csa.heading")
        .split(" ")
        .map((word, index, { length }) => (
          <Box
            key={word}
            sx={{
              display: "inline-block",
              "&::first-letter": (theme) => ({
                color: theme.palette.primary.main,
                fontWeight: "bold"
              })
            }}
          >
            {word}
            {index < length - 1 && <>&nbsp;</>}
          </Box>
        ))}
    </Typography>
  );
}

CsaHeading.propTypes = {
  headingVariant: PropTypes.string.isRequired
};
