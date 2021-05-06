import * as React from "react";
import PropTypes from "prop-types";
import MuiTextField from "@material-ui/core/TextField";

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
  register: PropTypes.func.isRequired
};
