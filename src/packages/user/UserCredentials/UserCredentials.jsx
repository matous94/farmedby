import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import LabelValueData from "src/components/LabelValueData";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import { selectors } from "src/store";

export default function UserCredentials() {
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

  return (
    <>
      <GenericFailureDialog
        isOpen={submitter.hasError}
        isLoading={submitter.isLoading}
        onClose={() => submitter.reset()}
      />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          sx={{
            width: "100%",
            marginTop: (theme) => theme.spacing(3),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          onSubmit={submitter.execute}
        >
          <LabelValueData
            label={t("credentialsChange.currentEmail.label")}
            value={user.email}
            sx={{ mb: "32px" }}
          />
          <TextField
            sx={{ mb: "16px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label={t("credentialsChange.newEmail.label")}
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label={t("credentialsChange.newPassword.label")}
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
      </Container>
    </>
  );
}
