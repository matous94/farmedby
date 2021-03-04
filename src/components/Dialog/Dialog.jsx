import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MUiDialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
  paper: {
    minHeight: 140
  },
  loadingText: {
    margin: "8px 0 0 0"
  }
});

export default function Dialog({
  onClose,
  open,
  primaryButton,
  loading,
  loadingText,
  secondaryButton,
  status,
  title,
  text
}) {
  if (open == null && status == null && loading == null) {
    throw new Error("One of [open, status, loading] props is required.");
  }
  if (typeof loading === "boolean" && status == null) {
    // eslint-disable-next-line no-param-reassign
    status = loading ? "loading" : "close";
  }
  if (typeof open === "boolean" && status == null) {
    // eslint-disable-next-line no-param-reassign
    status = open ? "open" : "close";
  }
  const classes = useStyles();

  return (
    <MUiDialog
      open={status === "open" || status === "loading"}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      PaperProps={{ className: classes.paper }}
    >
      {status === "loading" && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow="1"
        >
          <CircularProgress />
          {loadingText && (
            <DialogContentText
              className={classes.loadingText}
              align="center"
              id="alert-dialog-description"
            >
              {loadingText}
            </DialogContentText>
          )}
        </Box>
      )}
      {status === "open" && (
        <>
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
        </>
      )}
    </MUiDialog>
  );
}
Dialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  primaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  secondaryButton: PropTypes.shape({
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  status: PropTypes.oneOf(["open", "close", "loading"]),
  title: PropTypes.string,
  text: PropTypes.string
};
Dialog.defaultProps = {
  onClose: undefined,
  open: undefined,
  primaryButton: undefined,
  loading: undefined,
  loadingText: undefined,
  secondaryButton: undefined,
  status: undefined,
  title: undefined,
  text: undefined
};
