import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";

import { FarmPropTypes } from "src/types";
import { getCurrency } from "src/i18n";

import AddPointRow from "./AddPointRow";
import HeadingsRow from "./HeadingsRow";
import SubscriptionRow from "./SubscriptionRow";

export default function SubscriptionsTable({
  farm,
  onEdit,
  onDelete,
  onAdd,
  isAdminMode
}) {
  const { subscriptions } = farm;
  const currency = getCurrency(farm.countryCode);

  return (
    <TableContainer
      sx={{
        maxWidth: "800px"
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <HeadingsRow isAdminMode={isAdminMode} />
        </TableHead>
        <TableBody>
          {isAdminMode && <AddPointRow onAdd={onAdd} />}

          {[...subscriptions]
            .sort((a, b) => {
              if (a.name === b.name) return 0;
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((subscription) => (
              <SubscriptionRow
                isAdminMode={isAdminMode}
                key={subscription.objectId}
                subscription={subscription}
                onEdit={() => onEdit(subscription)}
                onDelete={() => onDelete(subscription.objectId)}
                currency={currency}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SubscriptionsTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
