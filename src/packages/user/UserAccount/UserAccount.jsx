import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import LabelValueData from "src/components/LabelValueData";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import { selectors } from "src/store";
import DeleteDialog from "src/components/DeleteDialog";

export default function UserAccount() {
  const { t } = useTranslation();
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const user = useStoreState(selectors.getUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitter = useAsync(async function handleSubmit(e) {
    e.preventDefault();
    await ApiClient.User.updateCredentials({
      email: email || undefined,
      password: password || undefined
    });
    if (email && email !== user.email) {
      updateUser({ email, username: email });
    }
    submitter.reset();
  });

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
  const accountDestroyer = useAsync(ApiClient.User.destroyUserAndFarm);

  return (
    <>
      <GenericFailureDialog
        isOpen={submitter.hasError || accountDestroyer.hasError}
        isLoading={submitter.isLoading}
        onClose={
          submitter.hasError
            ? () => submitter.reset()
            : () => accountDestroyer.reset()
        }
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog && !accountDestroyer.hasError}
        isLoading={accountDestroyer.isLoading}
        onDelete={async () => {
          const { error } = await accountDestroyer.execute();
          setIsOpenDeleteDialog(false);
          if (!error) {
            window.location = "/";
          }
        }}
        onDismiss={() => setIsOpenDeleteDialog(false)}
        text={t("userAccount.deleteAccount.text")}
      />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          sx={{
            width: "100%",
            marginTop: (theme) => theme.spacing(3)
          }}
          onSubmit={submitter.execute}
        >
          <Typography sx={{ mb: "16px" }} variant="h4">
            {t("userAccount.credentials.heading")}
          </Typography>
          <LabelValueData
            label={t("userAccount.currentEmail.label")}
            value={user.email}
            sx={{ mb: "32px" }}
          />
          <TextField
            sx={{ mb: "16px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label={t("userAccount.newEmail.label")}
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label={t("userAccount.newPassword.label")}
            type="text"
            inputProps={{
              minLength: "7"
            }}
            id="password"
            autoComplete="current-password"
          />
          <Button
            disabled={email === "" && password === ""}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              margin: (theme) => theme.spacing(3, 0, 2)
            }}
          >
            {t("save")}
          </Button>
        </Box>
        <Box>
          <Typography sx={{ mt: "32px" }} variant="h4">
            {t("userAccount.deleteAccount.heading")}
          </Typography>
          <Button
            data-testid="destroy-account-button"
            onClick={() => setIsOpenDeleteDialog(true)}
            fullWidth
            variant="outlined"
            color="error"
            sx={{
              margin: (theme) => theme.spacing(3, 0, 2)
            }}
          >
            {t("userAccount.deleteAccount.button")}
          </Button>
        </Box>
      </Container>
    </>
  );
}
