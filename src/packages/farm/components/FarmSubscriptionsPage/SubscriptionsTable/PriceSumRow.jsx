import * as React from "react";
// import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function PriceSumRow() {
  return (
    <TableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
        75 €
      </TableCell>
    </TableRow>
  );
}
// PriceSumRow.propTypes = {
// };
