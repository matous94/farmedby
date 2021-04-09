import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";

import Button from "../Button";
import imageUrl from "./call-to-action.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: "64px",
    display: "flex"
  },
  cardWrapper: {
    zIndex: 1
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(6, 2)
  },
  form: {
    maxWidth: 500,
    marginBottom: "10px"
  },
  button: {
    width: "100%"
  },
  imagesWrapper: {
    position: "relative"
  },
  image: {
    position: "absolute",
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 600,
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  }
}));

function ProductCTA() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    try {
      reset();
      await ApiClient.Newsletter.subscribeToNewsletter(data.email);
    } catch (error) {
      logger.app("Newsletter.subscribe failed silently", error);
    }
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className={classes.form}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                {t("landingPage.workInProgress")}
              </Typography>
              <Typography variant="h5" component="h3">
                {t("landingPage.workInProgress2")}
              </Typography>
              <TextField
                name="email"
                inputRef={register}
                required
                type="email"
                fullWidth
                color="secondary"
                sx={{
                  mt: "24px",
                  mb: "16px"
                }}
                label={t("email")}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                {t("landingPage.subscribeToNewsletter")}
              </Button>
            </form>
            <Typography align="center" variant="caption">
              {t("landingPage.contactDeveloper")} <b>matousvencl@gmail.com</b>
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <img src={imageUrl} alt="call to action" className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
