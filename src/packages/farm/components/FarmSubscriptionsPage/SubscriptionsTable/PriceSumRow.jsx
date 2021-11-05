import * as React from "react";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { selectors } from "src/store";

export default function PriceSumRow({ currency, isAdminMode }) {
  const subscriptionsById = useStoreState(
    selectors.orderDraft.getSubscriptionsById
  );
  const sum = Object.values(subscriptionsById).reduce((accu, subscription) => {
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
      {isAdminMode && <TableCell />}
      <TableCell
        sx={{
          py: "12px",
          fontWeight: "bold",
          textAlign: "center",
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
  isAdminMode: PropTypes.bool.isRequired
};
