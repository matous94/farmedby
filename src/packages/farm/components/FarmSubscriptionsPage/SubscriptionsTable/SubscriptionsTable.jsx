import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";

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

          {[...subscriptions]
            .filter(
              (subscription) =>
                isAdminMode || !isSubscriptionExpired(subscription.endOfSeason)
            )
            .sort((a, b) => {
              if (a.name === b.name) return 0;
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((subscription) => (
              <SubscriptionRow
                isAdminMode={isAdminMode}
                isExpired={isSubscriptionExpired(subscription.endOfSeason)}
                key={subscription.objectId}
                subscription={subscription}
                onEdit={() => openEditor(subscription)}
                onDelete={() => onDelete(subscription.objectId)}
                currency={currency}
              />
            ))}
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
