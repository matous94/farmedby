import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";

export default function PriceTableCell({ currency, display }) {
  const pricePerDelivery = 12.5;
  const quantity = 6;
  return display ? (
    <TableCell sx={{ textAlign: "center" }}>
      {pricePerDelivery * quantity} {currency}
    </TableCell>
  ) : (
    <TableCell sx={{ textAlign: "center" }}>&mdash;</TableCell>
  );
}
PriceTableCell.propTypes = {
  currency: PropTypes.string.isRequired
};
