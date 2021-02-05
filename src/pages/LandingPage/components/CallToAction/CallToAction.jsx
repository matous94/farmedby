import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";

import Typography from "../Typography";
import TextField from "../TextField";
import Button from "../Button";
import imageUrl from "./call-to-action.jpg";

const styles = (theme) => ({
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
    backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(8, 3)
  },
  cardContent: {
    maxWidth: 500
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
});

function ProductCTA(props) {
  const { classes } = props;
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    try {
      reset();
      await ApiClient.Newsletter.subscribe(data.email);
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
              className={classes.cardContent}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                Na stránce se pracuje
              </Typography>
              <Typography variant="h5">
                budeme vás informovat co je nového.
              </Typography>
              <TextField
                name="email"
                inputRef={register}
                required
                type="email"
                noBorder
                className={classes.textField}
                placeholder="Váš Email"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Přidej se
              </Button>
            </form>
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

ProductCTA.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    cardWrapper: PropTypes.string,
    card: PropTypes.string,
    cardContent: PropTypes.string,
    textField: PropTypes.string,
    button: PropTypes.string,
    imagesWrapper: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(ProductCTA);
