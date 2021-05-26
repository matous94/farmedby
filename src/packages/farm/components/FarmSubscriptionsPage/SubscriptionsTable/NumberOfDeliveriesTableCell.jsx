import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import { useStoreState } from "easy-peasy";

import { selectors } from "src/store";
import { getNumberOfWeeks } from "src/packages/pickup-point/delivery-period";
import { SubscriptionPropTypes } from "src/types";

export default function NumberOfDeliveriesTableCell({
  subscription,
  onChange,
  value
}) {
  const selectedPoint = useStoreState(selectors.orderDraft.getPickupPoint);
  const { options, maximumNumberOfDeliveries = 50 } = subscription;

  const minimum = React.useMemo(() => {
    const initialMinimum = options[0].numberOfDeliveries;
    const result = options.reduce(
      (min, option) => Math.min(min, option.numberOfDeliveries),
      initialMinimum
    );
    return result;
  }, [options]);
  const deliveryPeriodInWeeks = selectedPoint
    ? getNumberOfWeeks(selectedPoint.deliveryPeriod)
    : 1;
  const maximum = Math.floor(maximumNumberOfDeliveries / deliveryPeriodInWeeks);

  React.useEffect(() => {
    if (value !== "" && minimum > maximum) {
      onChange("");
    }
  }, [minimum, maximum, onChange, value, selectedPoint]);

  let helperText = `${minimum} - ${maximum}`;
  if (minimum > maximum) helperText = "";
  if (minimum === maximum) {
    helperText = `Min/Max = ${minimum}`;
  }

  return (
    <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
      <TextField
        disabled={minimum > maximum}
        helperText={helperText}
        onChange={(e) => {
          const numberOfDeliveries = e.target.value;
          e.target.reportValidity();
          if (
            numberOfDeliveries == null ||
            numberOfDeliveries === "" ||
            numberOfDeliveries.startsWith("-") ||
            numberOfDeliveries === "0"
          ) {
            onChange("");
            return;
          }
          onChange(numberOfDeliveries);
        }}
        value={value}
        name="numberOfDeliveries"
        margin="dense"
        size="small"
        type="number"
        sx={{ alignItems: "center" }}
        inputProps={{
          min: minimum,
          max: maximum
        }}
        placeholder="0"
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          sx: {
            width: "64px",
            "& input": {
              py: "6px",
              pl: "10px",
              pr: "3px"
            }
          }
        }}
      />
    </TableCell>
  );
}
NumberOfDeliveriesTableCell.propTypes = {
  subscription: SubscriptionPropTypes.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
NumberOfDeliveriesTableCell.defaultProps = {
  value: ""
};
