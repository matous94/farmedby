import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import Dialog from "src/components/Dialog";
import { ProductTypes, FarmPropTypes } from "src/packages/farm/farm-types";
import FarmIcon from "src/icons/FarmIcon";
import Select from "src/components/Select/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

export default function FarmEditor({
  onSubmit,
  isLoading,
  farm,
  mode,
  hasError,
  onErrorDissmiss
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const productOptions = React.useMemo(
    () =>
      Object.values(ProductTypes).reduce((options, productId) => {
        // eslint-disable-next-line no-param-reassign
        options[productId] = { id: productId, label: t(productId) };
        return options;
      }, {}),
    [t]
  );

  const [formData, setFormData] = useState({
    about: farm.about ?? "",
    city: farm.city ?? "",
    email: farm.email ?? "",
    isPickupPoint: farm.isPickupPoint ?? true,
    name: farm.name ?? "",
    phoneNumber: farm.phoneNumber ?? "",
    postcode: farm.postcode ?? "",
    published: farm.published ?? true,
    street: farm.street ?? "",
    productTypes: farm.productTypes ?? [],
    webUrl: farm.webUrl ?? ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const onChange = (e) => {
    const change = {
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    setFormData((currentData) => ({ ...currentData, ...change }));
  };

  return (
    <>
      <GenericFailureDialog open={hasError} onClose={onErrorDissmiss} />
      <Dialog loading={isLoading} />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {mode === "create" && (
            <>
              <Avatar className={classes.avatar}>
                <FarmIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("myFarm")}
              </Typography>
            </>
          )}
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.email}
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label={t("email")}
                  type="email"
                  id="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.name}
                  variant="outlined"
                  required
                  fullWidth
                  name="name"
                  label={t("farmName")}
                  type="text"
                  id="name"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  onChange={onChange}
                  selected={formData.productTypes}
                  label={t("producing")}
                  options={productOptions}
                  multiple
                  name="productTypes"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.street}
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  name="street"
                  label={t("street")}
                  id="street"
                  autoComplete="street-address"
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  onChange={onChange}
                  value={formData.city}
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label={t("city")}
                  type="text"
                  id="city"
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={onChange}
                  value={formData.postcode}
                  variant="outlined"
                  required
                  fullWidth
                  id="postcode"
                  label={t("postcode")}
                  name="postcode"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.phoneNumber}
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  label={t("phoneNumber")}
                  type="tel"
                  id="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.webUrl}
                  variant="outlined"
                  fullWidth
                  name="webUrl"
                  label={t("webAddress")}
                  type="url"
                  id="webUrl"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.published}
                      onChange={onChange}
                      name="published"
                    />
                  }
                  label={t("farmForm.makeFarmPublic")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isPickupPoint}
                      onChange={onChange}
                      name="isPickupPoint"
                    />
                  }
                  label={t("farmForm.isPickupPoint")}
                />
              </Grid>
            </Grid>
            {mode === "edit" && (
              <Box mt="16px">
                <Typography variant="h5">{t("aboutFarm")}</Typography>
                <TextareaAutosize
                  name="about"
                  rowsMin={10}
                  style={{ width: "100%" }}
                  value={formData.about}
                  onChange={onChange}
                />
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {mode === "create" ? t("createFarm") : t("save")}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
FarmEditor.propTypes = {
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  farm: FarmPropTypes,
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  onErrorDissmiss: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};
FarmEditor.defaultProps = {
  hasError: false,
  farm: undefined,
  onErrorDissmiss: () => {}
};