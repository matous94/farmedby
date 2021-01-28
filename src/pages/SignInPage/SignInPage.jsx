import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "src/components/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ApiClient from "src/packages/api-client";
import AppBar from "src/components/AppBar";
import Dialog from "src/components/Dialog";

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

export default function SignInPage() {
  const classes = useStyles();
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
      console.log("submitHandler -> error", error);
      setIsLoading(false);
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Neplatný email.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("Účet pro zadanou emailovou adresu neexistuje.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Špatné heslo.");
      } else {
        setErrorMessage("Něco se porouchalo. Zkuste opakovat akci později.");
      }
      return;
    }

    try {
      const farm = await ApiClient.Farm.getFarmForUserId(user.objectId);

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
      history.push("/error");
    }
  }

  return (
    <>
      <Dialog
        open={Boolean(errorMessage)}
        onClose={closeDialog}
        text={errorMessage}
        primaryButton={{ children: "Pokračovat", onClick: closeDialog }}
      />
      <AppBar />
      <Toolbar />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Přihlášení
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Přihlásit se
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  Nemáte účet? Registrujte se
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
