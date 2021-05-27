import * as React from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";

import { SubscriptionPropTypes } from "src/types";
import { selectors } from "src/store";
import useGetMaximumDeliveries from "src/packages/farm/hooks/useGetMaximumDeliveries";

import PricingTableCell from "./PricingTableCell";
import NumberOfDeliveriesTableCell from "./NumberOfDeliveriesTableCell";
import PriceTableCell from "./PriceTableCell";

export default function SubscriptionRow({
  subscription,
  isExpired,
  onEdit,
  onDelete,
  isAdminMode,
  currency
}) {
  const { name, description, options } = subscription;
  const updateNumberOfDeliveries = useStoreActions(
    (actions) => actions.orderDraft.updateNumberOfDeliveries
  );
  const subscriptionDraft = useStoreState(
    selectors.orderDraft.createGetSubscription(subscription.objectId)
  );

  const maximumNumberOfDeliveries = useGetMaximumDeliveries({
    deliveryPeriod: isAdminMode
      ? undefined
      : subscriptionDraft?.selectedPoint?.deliveryPeriod,
    endOfSeason: subscription.endOfSeason,
    maximumNumberOfDeliveries: subscription.maximumNumberOfDeliveries
  });
  if (isExpired && isAdminMode === false) return null;

  return (
    <TableRow
      sx={{
        background: (theme) =>
          isExpired ? theme.palette.warning.light : "inherit"
      }}
    >
      {isAdminMode && (
        <TableCell>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button onClick={onEdit}>
              <EditIcon />
            </Button>
            <Button onClick={onDelete} disabled={onDelete == null}>
              <DeleteForeverIcon />
            </Button>
          </ButtonGroup>
        </TableCell>
      )}
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <PricingTableCell
        options={options}
        currency={currency}
        maximumNumberOfDeliveries={maximumNumberOfDeliveries}
        isAdminMode={isAdminMode}
      />
      <NumberOfDeliveriesTableCell
        subscription={subscription}
        onChange={(numberOfDeliveries) =>
          updateNumberOfDeliveries({ subscription, numberOfDeliveries })
        }
        value={subscriptionDraft?.numberOfDeliveries}
        maximum={maximumNumberOfDeliveries}
      />
      <PriceTableCell
        currency={currency}
        pricePerDelivery={subscriptionDraft?.pricePerDelivery}
        numberOfDeliveries={subscriptionDraft?.numberOfDeliveries}
      />
    </TableRow>
  );
}
SubscriptionRow.propTypes = {
  subscription: SubscriptionPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired,
  isExpired: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired
};
SubscriptionRow.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};
