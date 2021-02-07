import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "src/components/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import logger from "src/packages/logger";

import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUpView({ onSubmit, isLoading }) {
  const classes = useStyles();
  const inputRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    didSubscribeToNewsletter: false
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrace
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.firstName}
                autoComplete="given-name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Jméno"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.lastName}
                autoComplete="family-name"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Přijmení"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.email}
                inputRef={inputRef}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Heslo"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
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
                label="Chci dostávat novinky od FarmedBy na email."
              />
            </Grid>
          </Grid>
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrovat
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                Už máte účet? Přihlašte se
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box my={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
SignUpView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
