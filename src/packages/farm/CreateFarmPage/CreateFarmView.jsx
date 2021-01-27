import React, { useState } from "react";
import PropTypes from "prop-types";
import FarmIcon from "src/icons/FarmIcon";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function CreateFarmPage({ onSubmit, isLoading }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    country: "Czech Republic"
  });

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const onChange = (e) => {
    const change = { [e.target.name]: e.target.value };
    setFormData((currentData) => ({ ...currentData, ...change }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FarmIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Moje Farma
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.name}
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Jméno Farmy"
                type="text"
                id="name"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                onChange={onChange}
                value={formData.street}
                variant="outlined"
                required
                fullWidth
                type="text"
                name="street"
                label="Ulice"
                id="street"
                autoComplete="address-line1"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={onChange}
                value={formData.houseNumber}
                name="houseNumber"
                variant="outlined"
                required
                fullWidth
                id="houseNumber"
                label="Č.P."
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.city}
                variant="outlined"
                required
                fullWidth
                name="city"
                label="Město"
                type="text"
                id="city"
                autoComplete="address-level2"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.postalCode}
                variant="outlined"
                required
                fullWidth
                id="postalCode"
                label="PSČ"
                name="postalCode"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.country}
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Země"
                name="country"
                type="text"
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
            Založit farmu
          </Button>
        </form>
      </div>
    </Container>
  );
}
CreateFarmPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
