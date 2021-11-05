import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText, {
  DialogContentTextProps as ContentTextProps
} from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MUiDialog, { DialogProps } from "@mui/material/Dialog";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: JSX.Element;
}

interface Props {
  onClose?: DialogProps["onClose"];
  isOpen?: boolean | null;
  isLoading?: boolean | null;
  status?: "isOpen" | "close" | "isLoading" | null;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  title?: string;
  text?: string | JSX.Element;
  loadingText?: string;
  DialogContentTextProps?: ContentTextProps;
}

export default function Dialog({
  onClose,
  isOpen = null,
  isLoading = null,
  status = null,
  primaryButton,
  secondaryButton,
  title,
  text,
  loadingText,
  DialogContentTextProps
}: Props): JSX.Element {
  if (isOpen === null && status === null && isLoading === null) {
    throw new Error("One of [isOpen, status, isLoading] props is required.");
  }
  if (typeof isOpen === "boolean" && status === null) {
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
            flexGrow: 1
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
              <DialogContentText
                id="alert-dialog-description"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...DialogContentTextProps}
              >
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
            {primaryButton && (
              <Button
                onClick={primaryButton.onClick}
                disabled={primaryButton.disabled ?? false}
                color="primary"
                autoFocus
              >
                {primaryButton.children}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </MUiDialog>
  );
}
