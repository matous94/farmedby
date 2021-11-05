import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Textarea from "src/components/Textarea";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import Dialog from "src/components/Dialog";
import { FarmPropTypes } from "src/types";
import Select from "src/components/Select";
import { getCountry } from "src/i18n";
import useProductTypesOptions from "src/packages/farm/hooks/useProductTypesOptions";

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
  const productTypesOptions = useProductTypesOptions();

  const [formData, setFormData] = useState({
    about: farm.about ?? "",
    addressLevel1: farm.addressLevel1 ?? "",
    city: farm.city ?? "",
    email: farm.email ?? "",
    isFarmPickupPoint: farm.isFarmPickupPoint ?? true,
    name: farm.name ?? "",
    phoneNumber: farm.phoneNumber ?? "",
    pickupDay: farm.pickupDay,
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
                value={formData.productTypes}
                label={t("producing")}
                options={productTypesOptions}
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
            {getCountry(farm.countryCode).requiresAddressLevel1 && (
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={formData.addressLevel1}
                  type="text"
                  name="addressLevel1"
                  label={t("addressLevel1Label")}
                  autoComplete="address-level1"
                  required
                />
              </Grid>
            )}
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
              <>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isFarmPickupPoint}
                        onChange={onChange}
                        name="isFarmPickupPoint"
                      />
                    }
                    label={t("farmForm.isFarmPickupPoint")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    disabled={!formData.isFarmPickupPoint}
                    onChange={onChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder={t("pickupDayPlaceholder")}
                    value={formData.pickupDay}
                    name="pickupDay"
                    label={t("pickupDayLabel")}
                    type="text"
                  />
                </Grid>
              </>
            )}
          </Grid>
          {mode === "edit" && (
            <Box sx={{ mt: "16px" }}>
              <Typography variant="h5">{t("aboutFarm")}</Typography>
              <Textarea
                name="about"
                minRows={10}
                style={{ width: "100%" }}
                value={formData.about}
                onChange={onChange}
              />
            </Box>
          )}
          {mode === "edit" && (
            <Grid sx={{ mt: "16px", textAlign: "center" }} item xs={12}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: mode === "edit" ? "8px" : "24px", mb: "32px" }}
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
