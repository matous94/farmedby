import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

import { FarmPropTypes } from "src/types";
import { getCurrency } from "src/i18n";
import { isSubscriptionExpired } from "src/packages/farm/utils";

import AddPointRow from "./AddPointRow";
import HeadingsRow from "./HeadingsRow";
import SubscriptionRow from "./SubscriptionRow";
import PriceSumRow from "./PriceSumRow";

function SubscriptionsTable({ farm, onDelete, isAdminMode, openEditor }) {
  const { subscriptions } = farm;
  const currency = getCurrency(farm.countryCode);

  const sortedSubscriptions = React.useMemo(
    () =>
      [...subscriptions].sort((a, b) => {
        if (a.name === b.name) return 0;
        if (a.name < b.name) return -1;
        return 1;
      }),
    [subscriptions]
  );
  const subscriptionRows = React.useMemo(
    () =>
      sortedSubscriptions.map((subscription) => (
        <SubscriptionRow
          isAdminMode={isAdminMode}
          isExpired={isSubscriptionExpired(subscription.endOfSeason)}
          key={subscription.objectId}
          subscription={subscription}
          onEdit={() => openEditor(subscription)}
          onDelete={() => onDelete(subscription.objectId)}
          currency={currency}
        />
      )),
    [currency, isAdminMode, onDelete, openEditor, sortedSubscriptions]
  );

  return (
    <TableContainer
      sx={{
        width: "100%"
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <HeadingsRow isAdminMode={isAdminMode} />
        </TableHead>
        <TableBody>
          {isAdminMode && <AddPointRow onAdd={() => openEditor()} />}
          {subscriptionRows}
          <PriceSumRow currency={currency} isAdminMode={isAdminMode} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SubscriptionsTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  openEditor: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};

export default React.memo(SubscriptionsTable);
