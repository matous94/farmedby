import React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

export default function PriceTableCell({
  currency,
  pricePerDelivery,
  numberOfDeliveries
}) {
  let price = "—";
  let calculation;
  if (pricePerDelivery && numberOfDeliveries) {
    price = `${pricePerDelivery * numberOfDeliveries} ${currency}`;
    calculation = `(${numberOfDeliveries} x ${pricePerDelivery})`;
  }

  return (
    <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
      <Box sx={{ fontWeight: 500 }}>{price}</Box>
      {calculation && <Box sx={{ fontSize: "0.7rem" }}>{calculation}</Box>}
    </TableCell>
  );
}
PriceTableCell.propTypes = {
  currency: PropTypes.string.isRequired,
  pricePerDelivery: PropTypes.number,
  numberOfDeliveries: PropTypes.number
};
PriceTableCell.defaultProps = {
  pricePerDelivery: undefined,
  numberOfDeliveries: undefined
};
