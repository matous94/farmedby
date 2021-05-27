import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TextField from "./TextField";

export default function Pricing({
  register,
  currency,
  currencyMultiplier,
  displayPlaceholders
}) {
  const { t } = useTranslation();
  const optionsList = [];
  const numberOfOptions = 5;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < numberOfOptions; index++) {
    const pricePlaceholder = 500 - index * 20;
    const pricePlaceholderCountryRelative =
      pricePlaceholder * currencyMultiplier;
    const pricePlaceholderRounded =
      Math.trunc(pricePlaceholderCountryRelative * 10) / 10;

    optionsList.push(
      <Box key={index} sx={{ mt: "4px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            name={`options[${index}].numberOfDeliveries`}
            label={t("subscriptionEditor.numberOfDeliveries")}
            placeholder={
              displayPlaceholders
                ? String(
                    index === 0
                      ? t("subscription.minimumNumberOfDeliveries.label")
                      : index * 5
                  )
                : undefined
            }
            type="number"
            inputProps={{
              min: "1"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
          <TextField
            name={`options[${index}].pricePerDelivery`}
            label={t("subscriptionEditor.pricePerDelivery", { currency })}
            placeholder={
              displayPlaceholders ? String(pricePlaceholderRounded) : undefined
            }
            type="number"
            inputProps={{
              min: "0.01",
              step: "0.01"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="subtitle1">{t("pricing")}</Typography>
      {optionsList}
    </>
  );
}
Pricing.propTypes = {
  register: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencyMultiplier: PropTypes.number.isRequired,
  displayPlaceholders: PropTypes.bool.isRequired
};
