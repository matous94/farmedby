import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import Dialog from "src/components/Dialog";
import { ProductTypes, FarmPropTypes } from "src/types";
import Select from "src/components/Select/Select";

function TextField(props) {
  return (
    /* eslint-disable*/
    <MuiTextField fullWidth id={props.name} {...props} />
    /* eslint-enable */
  );
}

export default function FarmEditor({
  onSubmit,
  isLoading,
  farm,
  hasError,
  mode,
  submitButtonText,
  onErrorDissmiss
}) {
  const { t } = useTranslation();

  const productOptions = React.useMemo(
    () =>
      Object.values(ProductTypes).reduce((options, productId) => {
        // eslint-disable-next-line no-param-reassign
        options[productId] = {
          id: productId,
          label: t(`productTypes.${productId}`)
        };
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        component="main"
        maxWidth="xs"
      >
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
                value={formData.email}
                name="email"
                label={t("email")}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={formData.name}
                name="name"
                label={t("farmName")}
                type="text"
                required
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
                required
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
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={onChange}
                value={formData.postcode}
                label={t("postcode")}
                name="postcode"
                type="text"
                required
              />
            </Grid>
            {mode === "edit" && (
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  label={t("phoneNumber")}
                  type="tel"
                />
              </Grid>
            )}
            {mode === "edit" && (
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.webUrl}
                  name="webUrl"
                  label={t("webAddress")}
                  type="url"
                />
              </Grid>
            )}
            {mode === "edit" && (
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
            )}
            {mode === "edit" && (
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
            )}
          </Grid>
          {mode === "edit" && (
            <Box sx={{ mt: "16px" }}>
              <Typography variant="h5">{t("aboutFarm")}</Typography>
              <TextareaAutosize
                name="about"
                minRows={10}
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
            sx={{ margin: "24px 0 32px 0" }}
          >
            {submitButtonText}
          </Button>
        </Box>
      </Container>
    </>
  );
}
FarmEditor.propTypes = {
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  farm: FarmPropTypes,
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onErrorDissmiss: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};
FarmEditor.defaultProps = {
  hasError: false,
  farm: undefined,
  onErrorDissmiss: () => {}
};
