import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MUiDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Dialog({
  primaryButton,
  secondaryButton,
  onClose,
  open,
  title,
  text
}) {
  return (
    <MUiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {text && (
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {secondaryButton && (
          <Button
            onClick={secondaryButton.onClick}
            disabled={secondaryButton.disabled ?? false}
            color="secondary"
          >
            {secondaryButton.children}
          </Button>
        )}
        <Button
          onClick={primaryButton.onClick}
          disabled={primaryButton.disabled ?? false}
          color="primary"
          autoFocus
        >
          {primaryButton.children}
        </Button>
      </DialogActions>
    </MUiDialog>
  );
}
Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  primaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }).isRequired,
  secondaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  title: PropTypes.string,
  text: PropTypes.string
};
Dialog.defaultProps = {
  secondaryButton: undefined,
  title: undefined,
  text: undefined
};
