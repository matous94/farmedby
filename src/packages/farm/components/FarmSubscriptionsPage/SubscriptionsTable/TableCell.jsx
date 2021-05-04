import React from "react";
import PropTypes from "prop-types";
import MuiTableCell from "@material-ui/core/TableCell";

export default function TableCell({ sx, ...rest }) {
  return (
    <MuiTableCell
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={{ paddingLeft: "16px", paddingRight: "8px", ...sx }}
    />
  );
}

TableCell.propTypes = {
  sx: PropTypes.shape({})
};
TableCell.defaultProps = {
  sx: undefined
};
