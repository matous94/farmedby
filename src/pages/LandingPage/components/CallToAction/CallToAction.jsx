import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MuiTypography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";

import Typography from "../Typography";
import TextField from "../TextField";
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
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
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
    maxWidth: 600
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
              <Typography variant="h4" gutterBottom>
                {t("landingPage.workInProgress")}
              </Typography>
              <Typography variant="h5">
                {t("landingPage.workInProgress2")}
              </Typography>
              <TextField
                name="email"
                inputRef={register}
                required
                type="email"
                noBorder
                className={classes.textField}
                placeholder={t("email")}
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
            <MuiTypography align="center" variant="caption">
              {t("landingPage.contactDeveloper")} <b>matousvencl@gmail.com</b>
            </MuiTypography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <img
              src={imageUrl}
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
