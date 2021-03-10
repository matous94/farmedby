import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { getCountry } from "src/i18n";
import { FarmPropTypes } from "src/packages/farm/farm-types";

function FarmData({ label, value, url }) {
  const { t } = useTranslation();
  if (!value && !url) return null;
  return (
    <div>
      <Typography style={{ marginRight: "6px" }} variant="overline">
        {label}:
      </Typography>
      {value ? (
        <Typography component="span" variant="subtitle2">
          {value}
        </Typography>
      ) : (
        <Link href={url}>{t("landingPage.farmWebPage")}</Link>
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

export default function FarmLandingPage({ farm }) {
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

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Typography variant="h5">{t("contacts")}</Typography>
      <FarmData label={t("email")} value={email} />
      <FarmData label={t("phoneNumber")} value={phoneNumber} />
      <FarmData label={t("webAddress")} url={webUrl} />
      <Box mb="16px">
        <FarmData
          label={t("address")}
          value={`${street}, ${city} ${postcode}, ${country}`}
        />
      </Box>
      <Typography variant="h5">{t("farmLandingPage.aboutFarm")}</Typography>
      <Box mb="16px">
        <FarmData label={t("producing")} value={producing} />
      </Box>
      <Typography variant="body1">{about}</Typography>
    </Box>
  );
}
FarmLandingPage.propTypes = {
  farm: FarmPropTypes.isRequired
  // isEditMode: PropTypes.bool.isRequired,
  // isFarmOwner: PropTypes.bool.isRequired
};
