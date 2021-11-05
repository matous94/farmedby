import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

import { SubscriptionOptionPropTypes } from "src/types";

export default function PricingTableCell({
  options,
  currency,
  maximumNumberOfDeliveries,
  isAdminMode
}) {
  const { t } = useTranslation();
  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
        {options
          .filter(
            (option) =>
              option?.pricePerDelivery &&
              option.numberOfDeliveries &&
              (isAdminMode ||
                option.numberOfDeliveries <= maximumNumberOfDeliveries)
          )
          .map(
            ({ pricePerDelivery, numberOfDeliveries }, index, { length }) => {
              return (
                <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
                  <Box sx={{ textAlign: "right", minWidth: "24px" }}>
                    {numberOfDeliveries}
                  </Box>
                  <Box>&nbsp;{t("pc")}</Box>
                  <Box sx={{ mx: "3px" }}>{">"}</Box>
                  <Box
                    sx={{
                      fontWeight: "bold"
                    }}
                  >
                    {pricePerDelivery}
                    &nbsp;
                    {currency}
                    {"/"}
                    {t("pc")}
                  </Box>
                  {index < length - 1 && <br />}
                </Box>
              );
            }
          )}
      </Box>
    </TableCell>
  );
}
PricingTableCell.propTypes = {
  currency: PropTypes.string.isRequired,
  isAdminMode: PropTypes.bool.isRequired,
  maximumNumberOfDeliveries: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(SubscriptionOptionPropTypes).isRequired
};
