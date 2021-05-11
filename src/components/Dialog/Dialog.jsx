import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MUiDialog from "@material-ui/core/Dialog";

export default function Dialog({
  onClose,
  isOpen,
  primaryButton,
  isLoading,
  loadingText,
  secondaryButton,
  status, // isOpen, isLoading, close
  title,
  text
}) {
  if (isOpen == null && status == null && isLoading == null) {
    throw new Error("One of [isOpen, status, isLoading] props is required.");
  }
  if (typeof isOpen === "boolean" && status == null) {
    // eslint-disable-next-line no-param-reassign
    status = isOpen ? "isOpen" : "close";
  }
  if (isLoading) {
    // eslint-disable-next-line no-param-reassign
    status = "isLoading";
  }

  return (
    <MUiDialog
      open={status === "isOpen" || status === "isLoading"}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: status === "isLoading" ? 140 : 0
        }
      }}
    >
      {status === "isLoading" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1"
          }}
        >
          <CircularProgress />
          {loadingText && (
            <DialogContentText
              sx={{
                margin: "8px 0 0 0"
              }}
              align="center"
              id="alert-dialog-description"
            >
              {loadingText}
            </DialogContentText>
          )}
        </Box>
      )}
      {status === "isOpen" && (
        <>
          {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
          {text && (
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {text}
              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            {secondaryButton && (
              <Button
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled ?? false}
                color="primary"
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
        </>
      )}
    </MUiDialog>
  );
}
Dialog.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  primaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  secondaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  status: PropTypes.oneOf(["isOpen", "close", "isLoading"]),
  title: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
Dialog.defaultProps = {
  onClose: undefined,
  isOpen: undefined,
  primaryButton: undefined,
  isLoading: undefined,
  loadingText: undefined,
  secondaryButton: undefined,
  status: undefined,
  title: undefined,
  text: undefined
};
