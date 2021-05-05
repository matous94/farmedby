import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";

import { SubscriptionOptionPropTypes } from "src/types";

export default function PricingTableCell({ options, currency }) {
  const { t } = useTranslation();
  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
        {options
          .filter(
            (option) => option?.pricePerDelivery && option.numberOfDeliveries
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
  options: PropTypes.arrayOf(SubscriptionOptionPropTypes).isRequired
};
