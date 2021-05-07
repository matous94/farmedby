import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

export default function NumberOfDeliveriesTableCell({
  minimum,
  onChange,
  value
}) {
  return (
    <TableCell sx={{ textAlign: "center" }}>
      <TextField
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
        inputProps={{
          min: minimum
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
  minimum: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
NumberOfDeliveriesTableCell.defaultProps = {
  value: ""
};
