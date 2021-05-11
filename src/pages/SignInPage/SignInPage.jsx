import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Link from "src/components/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";

import ApiClient from "src/packages/api-client";
import logger from "src/packages/logger";
import AppBar from "src/components/AppBar";
import Dialog from "src/components/Dialog";

export default function SignInPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const signIn = useStoreActions((actions) => actions.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function closeDialog() {
    setErrorMessage("");
  }

  async function submitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    let user;
    try {
      user = await ApiClient.User.signIn({ email, password });
    } catch (error) {
      logger.user("signIn handler -> error", error);
      setIsLoading(false);
      if (error.code === 101) {
        setErrorMessage(t("signInPage.invalidCredentials"));
      } else {
        setErrorMessage(t("genericFailureMessage"));
      }
      return;
    }
    try {
      const farm = await ApiClient.Farm.getMyFarm();
      signIn({
        user,
        farm
      });

      if (farm) {
        history.push(`/farm/${farm.objectId}`);
      } else {
        history.push("/create-farm");
      }
    } catch (error) {
      logger.user("Failed to fetch user's farm. Gonna sign him out.");
      await ApiClient.User.signOut();
      setIsLoading(false);
      setErrorMessage(t("genericFailureMessage"));
    }
  }

  return (
    <>
      <Dialog
        isOpen={Boolean(errorMessage)}
        onClose={closeDialog}
        text={errorMessage}
        primaryButton={{ children: t("continue"), onClick: closeDialog }}
      />
      <Dialog isLoading={isLoading} />
      <AppBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(3),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar
            sx={{
              margin: (theme) => theme.spacing(1),
              backgroundColor: (theme) => theme.palette.secondary.main
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signInPage.heading")}
          </Typography>
          <Box
            component="form"
            sx={{
              width: "100%",
              marginTop: (theme) => theme.spacing(2)
            }}
            onSubmit={submitHandler}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                  fullWidth
                  id="email"
                  label={t("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                margin: (theme) => theme.spacing(3, 0, 2)
              }}
            >
              {t("signIn")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {t("signInPage.noAccount")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
