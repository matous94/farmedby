import * as React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { OrderedSubscriptionPropTypes } from "src/types";

export default function PriceSumRow({ currency, subscriptions }) {
  const sum = subscriptions.reduce((accu, subscription) => {
    return (
      accu + subscription.numberOfDeliveries * subscription.pricePerDelivery
    );
  }, 0);

  return (
    <TableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell
        sx={{
          py: "12px",
          fontWeight: "bold",
          textAlign: "right",
          whiteSpace: "nowrap"
        }}
      >
        {sum} {currency}
      </TableCell>
    </TableRow>
  );
}
PriceSumRow.propTypes = {
  currency: PropTypes.string.isRequired,
  subscriptions: PropTypes.arrayOf(OrderedSubscriptionPropTypes).isRequired
};
