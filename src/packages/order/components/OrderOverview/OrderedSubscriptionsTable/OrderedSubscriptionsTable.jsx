import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

import { OrderedSubscriptionPropTypes } from "src/types";
import { getCurrency } from "src/i18n";

import HeadingsRow from "./HeadingsRow";
import SubscriptionRow from "./SubscriptionRow";
import PriceSumRow from "./PriceSumRow";

function OrderedSubscriptionsTable({ countryCode, subscriptions }) {
  const currency = getCurrency(countryCode);

  const sortedSubscriptions = React.useMemo(() => {
    return [...subscriptions].sort((a, b) => {
      if (a.name === b.name) return 0;
      if (a.name < b.name) return -1;
      return 1;
    });
  }, [subscriptions]);

  return (
    <TableContainer
      sx={{
        width: "100%"
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <HeadingsRow />
        </TableHead>
        <TableBody>
          {sortedSubscriptions.map((subscription, index) => (
            <SubscriptionRow
              key={index}
              subscription={subscription}
              currency={currency}
            />
          ))}
          <PriceSumRow currency={currency} subscriptions={subscriptions} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

OrderedSubscriptionsTable.propTypes = {
  subscriptions: PropTypes.arrayOf(OrderedSubscriptionPropTypes).isRequired,
  countryCode: PropTypes.string.isRequired
};

export default React.memo(OrderedSubscriptionsTable);
