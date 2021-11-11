import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { NavigationLink, Link } from "src/components/Link";
import logger from "src/packages/logger";

export default function SignUpView({ onSubmit, isLoading }) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });
  const onChange = (e) => {
    const change = {
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    setFormData((current) => ({
      ...current,
      ...change
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    logger.user("sign up data:", formData);
    onSubmit(formData);
  };

  return (
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
          {t("signUpPage.heading")}
        </Typography>
        <NavigationLink
          to="/sign-in"
          variant="body1"
          sx={{
            fontWeight: "500",
            mt: "12px",
            mb: "8px",
            width: "100%",
            textAlign: "center"
          }}
        >
          {t("signUpPage.existingAccount")}
        </NavigationLink>
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
                onChange={onChange}
                value={formData.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t("firstName")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.lastName}
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label={t("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.email}
                inputRef={inputRef}
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
                onChange={onChange}
                value={formData.password}
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                inputProps={{
                  minLength: "7"
                }}
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
              mt: "24px"
            }}
          >
            {t("signUp")}
          </Button>
          <Typography sx={{ mt: "8px", mb: "64px" }} variant="body2">
            <Trans
              i18nKey="signUpPage.userConsent.text"
              components={{
                TermsOfUseLink: <Link href="/terms-of-use" target="_blank" />,
                PrivacyPolicyLink: (
                  <Link href="/privacy-policy" target="_blank" />
                )
              }}
            />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
SignUpView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
