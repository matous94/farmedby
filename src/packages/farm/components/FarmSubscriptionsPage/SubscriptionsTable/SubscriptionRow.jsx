import * as React from "react";
import PropTypes from "prop-types";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";

import { SubscriptionPropTypes } from "src/types";

import PricingTableCell from "./PricingTableCell";
import QuantityTableCell from "./QuantityTableCell";

export default function SubscriptionRow({
  subscription,
  onEdit,
  onDelete,
  isAdminMode,
  currency
}) {
  const { name, content, options } = subscription;
  return (
    <TableRow>
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
      <TableCell>{content}</TableCell>
      <PricingTableCell options={options} currency={currency} />
      <QuantityTableCell />
    </TableRow>
  );
}
SubscriptionRow.propTypes = {
  subscription: SubscriptionPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired
};
SubscriptionRow.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};
