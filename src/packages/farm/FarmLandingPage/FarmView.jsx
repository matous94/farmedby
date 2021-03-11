import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { getCountry } from "src/i18n";
import { FarmPropTypes } from "src/packages/farm/farm-types";

function FarmData({ label, value, url }) {
  if (!value && !url) return null;
  return (
    <div>
      <Typography
        style={{ marginRight: "6px", wordBreak: "break-all" }}
        variant="overline"
      >
        {label}:
      </Typography>
      {value ? (
        <Typography component="span" variant="subtitle2">
          {value}
        </Typography>
      ) : (
        <Link href={url}>{url}</Link>
      )}
    </div>
  );
}
FarmData.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  url: PropTypes.string
};
FarmData.defaultProps = {
  value: null,
  url: null
};

export default function FarmView({ farm }) {
  window.about = farm.about;
  const {
    about,
    city,
    countryCode,
    email,
    phoneNumber,
    street,
    postcode,
    productTypes,
    webUrl
  } = farm;
  const { t } = useTranslation();
  const country = getCountry(countryCode).countryName;
  const producing = productTypes.map((type) => t(type)).join(", ");

  const aboutAsParagraphs = about.split("\n");
  return (
    <Box maxWidth="800px" mx="auto" display="flex" flexDirection="column">
      <FarmData label={t("producing")} value={producing} />
      <FarmData label={t("email")} value={email} />
      <FarmData label={t("phoneNumber")} value={phoneNumber} />
      <FarmData label={t("webAddress")} url={webUrl} />
      <Box mb="16px">
        <FarmData
          label={t("address")}
          value={`${street}, ${city} ${postcode}, ${country}`}
        />
      </Box>
      <Typography style={{ marginBottom: "8px" }} variant="h5">
        {t("aboutFarm")}
      </Typography>
      {aboutAsParagraphs.map((paragraph) => (
        <Typography
          style={{ paddingTop: paragraph === "" ? "24px" : 0 }}
          variant="body1"
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
}
FarmView.propTypes = {
  farm: FarmPropTypes.isRequired
};
