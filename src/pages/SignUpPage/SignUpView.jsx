import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Link from "src/components/Link";
import logger from "src/packages/logger";

export default function SignUpView({ onSubmit, isLoading }) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
    // didSubscribeToNewsletter: false
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={onChange}
                    name="didSubscribeToNewsletter"
                    checked={formData.didSubscribeToNewsletter}
                    value="subscribeToNewsletter"
                    color="primary"
                  />
                }
                label={t("signUpPage.newsletterCheckbox")}
              />
            </Grid> */}
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
            {t("signUp")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                {t("signUpPage.existingAccount")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
SignUpView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
