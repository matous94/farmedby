import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import { capitalize } from "@material-ui/core/utils";

const styles = (theme) => ({
  root: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    "&$disabled": {
      backgroundColor: theme.palette.divider
    }
  },
  inputBorder: {
    border: "1px solid #e9ddd0",
    "&:focus": {
      borderColor: theme.palette.secondary.main
    }
  },
  disabled: {},
  inputSizeSmall: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`
  },
  inputSizeMedium: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`
  },
  inputSizeLarge: {
    fontSize: 18,
    padding: 22,
    width: `calc(100% - ${22 * 2}px)`
  },
  inputSizeXlarge: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`
  },
  formLabel: {
    fontSize: 18
  },
  select: {
    height: "auto",
    borderRadius: 0
  },
  selectIcon: {
    top: "50%",
    marginTop: -12
  }
});

function TextField(props) {
  const {
    classes,
    InputProps = {},
    InputLabelProps,
    noBorder,
    size,
    SelectProps,
    ...other
  } = props;

  const {
    classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
    ...InputPropsOther
  } = InputProps;

  return (
    <MuiTextField
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            classes[`inputSize${capitalize(size)}`],
            {
              [classes.inputBorder]: !noBorder
            },
            InputPropsClassesInput
          ),
          disabled: classes.disabled,
          ...InputPropsClassesOther
        },
        ...InputPropsOther
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
        className: classes.formLabel
      }}
      SelectProps={{
        ...SelectProps,
        classes: {
          select: classes.select,
          icon: classes.selectIcon
        }
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

TextField.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    input: PropTypes.string,
    inputBorder: PropTypes.string,
    disabled: PropTypes.string,
    formLabel: PropTypes.string,
    select: PropTypes.string,
    selectIcon: PropTypes.string
  }).isRequired,
  InputLabelProps: PropTypes.shape({}),
  InputProps: PropTypes.shape({}),
  SelectProps: PropTypes.shape({}),
  noBorder: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "xlarge"])
};
TextField.defaultProps = {
  InputLabelProps: undefined,
  InputProps: undefined,
  SelectProps: undefined,
  noBorder: false,
  size: "medium"
};

export default withStyles(styles)(TextField);
