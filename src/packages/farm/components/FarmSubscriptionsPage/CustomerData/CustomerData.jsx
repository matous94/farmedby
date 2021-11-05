import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MuiTextField from "@mui/material/TextField";
import { useStoreActions, useStoreState } from "easy-peasy";
import { selectors } from "src/store";
import Grid from "@mui/material/Grid";

function TextField({ value, onChange, label, name, ...rest }) {
  return (
    <MuiTextField
      autoComplete="name"
      sx={{ maxWidth: "290px" }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name={name}
      id={name}
      label={label}
      fullWidth
      required
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}
TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function CustomerData() {
  const { t } = useTranslation();
  const customer = useStoreState(selectors.orderDraft.getCustomer);
  const updateCustomer = useStoreActions(
    (actions) => actions.orderDraft.updateCustomer
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          value={customer.name}
          onChange={(name) => updateCustomer({ name })}
          name="name"
          label={t("fullname")}
          type="text"
          autoComplete="name"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          value={customer.email}
          onChange={(email) => updateCustomer({ email })}
          label={t("email")}
          name="email"
          type="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          value={customer.phoneNumber}
          onChange={(phoneNumber) => updateCustomer({ phoneNumber })}
          label={t("phoneNumber")}
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
        />
      </Grid>
    </Grid>
  );
}

export default React.memo(CustomerData);
