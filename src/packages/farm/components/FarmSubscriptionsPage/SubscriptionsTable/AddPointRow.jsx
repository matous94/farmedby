import * as React from "react";
import PropTypes from "prop-types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";

export default function AddPointRow({ onAdd }) {
  return (
    <TableRow>
      <TableCell>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={onAdd}>
            <AddCircleIcon />
          </Button>
          <Button disabled>
            <DeleteForeverIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
}
AddPointRow.propTypes = {
  onAdd: PropTypes.func.isRequired
};
