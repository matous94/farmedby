import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import GenericFailureDialog from "src/components/GenericFailureDialog/GenericFailureDialog";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";

export default function ResetPasswordDialog({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");

  const resetter = useAsync(async function handleSubmit(e) {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 300));
    await ApiClient.User.requestPasswordReset(email);
    resetter.reset();
    onClose();
  });

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen && !resetter.hasError && !resetter.isLoading}
        onClose={onClose}
      >
        <Box
          component="form"
          onSubmit={resetter.execute}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <DialogTitle sx={{ paddingBottom: 0 }}>
            {t("resetPasswordDialog.heading")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("resetPasswordDialog.text")}
            </DialogContentText>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              size="small"
              fullWidth
              name="email"
              label={t("email")}
              type="email"
              required={true}
              data-testid="reset-password-email"
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose} color="primary">
              {t("cancel")}
            </Button>
            <Button type="submit" color="primary">
              {t("send")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <GenericFailureDialog
        isOpen={resetter.hasError}
        isLoading={resetter.isLoading}
        onClose={() => resetter.reset()}
      />
    </>
  );
}
ResetPasswordDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
