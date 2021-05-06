import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

export default function QuantityTableCell({ minimum }) {
  return (
    <TableCell sx={{ textAlign: "center" }}>
      <TextField
        name="quantity"
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
QuantityTableCell.propTypes = {
  minimum: PropTypes.number.isRequired
};
