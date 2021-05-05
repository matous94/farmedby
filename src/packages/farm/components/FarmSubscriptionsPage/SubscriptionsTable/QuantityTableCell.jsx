import React from "react";
import { useTranslation } from "react-i18next";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

export default function QuantityTableCell() {
  const { t } = useTranslation();
  return (
    <TableCell sx={{ textAlign: "center" }}>
      <TextField
        name="quantity"
        // label={t("subscriptionEditor.numberOfDeliveries")}
        margin="dense"
        size="small"
        // InputLabelProps={{ shrink: true }}
        type="number"
        inputProps={{
          min: "1",
          defaultValue: 0
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          sx: {
            width: "64px",
            "& input": {
              textAlign: "center"
            }
          }
        }}
      />
    </TableCell>
  );
}
