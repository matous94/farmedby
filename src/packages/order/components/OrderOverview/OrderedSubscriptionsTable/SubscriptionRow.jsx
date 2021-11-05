import * as React from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { OrderedSubscriptionPropTypes } from "src/types";

export default function SubscriptionRow({ subscription, currency }) {
  const { name, description, numberOfDeliveries, pricePerDelivery } =
    subscription;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>{numberOfDeliveries}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {pricePerDelivery} {currency}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {numberOfDeliveries * pricePerDelivery} {currency}
      </TableCell>
    </TableRow>
  );
}
SubscriptionRow.propTypes = {
  subscription: OrderedSubscriptionPropTypes.isRequired,
  currency: PropTypes.string.isRequired
};
