import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { SubscriptionPropTypes } from "src/types";

const TextField = ({ register, ...rest }) => {
  /* eslint-disable*/
  return (
    <MuiTextField
      margin="dense"
      size="small"
      fullWidth
      inputRef={register}
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
    /* eslint-enable */
  );
};
TextField.propTypes = {
  register: PropTypes.func.isRequired
};

function Pricing({ register, currency }) {
  const { t } = useTranslation();
  const optionsList = [];
  const numberOfOptions = 5;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < numberOfOptions; index++) {
    optionsList.push(
      <Box key={index} sx={{ mt: "4px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            name={`options[${index}].numberOfDeliveries`}
            label={t("subscriptionEditor.numberOfDeliveries")}
            type="number"
            inputProps={{
              min: "1"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
          <TextField
            name={`options[${index}].pricePerDelivery`}
            label={t("subscriptionEditor.pricePerDelivery", { currency })}
            type="number"
            inputProps={{
              min: "0.01",
              step: "0.01"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="subtitle1">{t("pricing")}</Typography>
      {optionsList}
    </>
  );
}
Pricing.propTypes = {
  register: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

export default function SubscriptionEditor({
  onClose,
  onSubmit,
  subscription,
  currency
}) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: subscription });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={isDownSm}
      fullWidth
      maxWidth="xs"
      open={true}
      onClose={onClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <DialogTitle sx={{ pb: 0 }}>
          {t("subscriptionEditor.heading")}
        </DialogTitle>
        <DialogContent>
          <TextField
            register={register}
            name="name"
            label={t("subscriptionsPage.subscriptionName")}
            placeholder={t("subscriptionEditor.namePlaceholder")}
            type="text"
            required
          />
          <TextField
            sx={{ marginBottom: "16px", marginTop: "8px" }}
            register={register}
            name="content"
            label={t("subscriptionsPage.subscriptionContentHeading")}
            placeholder={t("subscriptionsPage.subscriptionContentPlaceholder")}
            multiline
            type="text"
            required
          />
          <Pricing
            options={subscription.options}
            register={register}
            currency={currency}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("save")}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
SubscriptionEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  subscription: SubscriptionPropTypes,
  currency: PropTypes.string.isRequired
};
SubscriptionEditor.defaultProps = {
  subscription: {
    name: "",
    content: "",
    options: []
  }
};
