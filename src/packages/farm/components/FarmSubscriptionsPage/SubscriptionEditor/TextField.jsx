import * as React from "react";
import PropTypes from "prop-types";
import MuiTextField from "@mui/material/TextField";

export default function TextField({ register, ...rest }) {
  /* eslint-disable*/
  return (
    <MuiTextField
      margin="dense"
      size="small"
      fullWidth
      inputRef={register}
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
    /* eslint-enable */
  );
}
TextField.propTypes = {
  register: PropTypes.func
};
TextField.defaultProps = {
  register: undefined
};
