import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
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
import { ProductTypes, FarmPropTypes } from "src/types";
import Select from "src/components/Select/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: "24px 0 32px 0"
  }
}));

function TextField(props) {
  return (
    /* eslint-disable*/
    <MuiTextField
      fullWidth
      variant="outlined"
      required={true}
      id={props.name}
      {...props}
    />
    /* eslint-enable */
  );
}

export default function FarmEditor({
  onSubmit,
  isLoading,
  farm,
  hasError,
  submitButtonText,
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
      <GenericFailureDialog isOpen={hasError} onClose={onErrorDissmiss} />
      <Dialog isLoading={isLoading} />
      <Container className={classes.container} component="main" maxWidth="xs">
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.email}
                name="email"
                label={t("email")}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.name}
                name="name"
                label={t("farmName")}
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                onChange={onChange}
                selected={formData.productTypes}
                label={t("producing")}
                options={productOptions}
                multiple
                required
                name="productTypes"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.street}
                type="text"
                name="street"
                label={t("addressLine1")}
                autoComplete="street-address"
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                onChange={onChange}
                value={formData.city}
                name="city"
                label={t("city")}
                type="text"
                autoComplete="address-level2"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={onChange}
                value={formData.postcode}
                label={t("postcode")}
                name="postcode"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                required={false}
                value={formData.phoneNumber}
                name="phoneNumber"
                label={t("phoneNumber")}
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                required={false}
                value={formData.webUrl}
                name="webUrl"
                label={t("webAddress")}
                type="url"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {submitButtonText}
          </Button>
        </form>
      </Container>
    </>
  );
}
FarmEditor.propTypes = {
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  farm: FarmPropTypes,
  submitButtonText: PropTypes.string.isRequired,
  onErrorDissmiss: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};
FarmEditor.defaultProps = {
  hasError: false,
  farm: undefined,
  onErrorDissmiss: () => {}
};
