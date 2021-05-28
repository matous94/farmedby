import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import DatePicker from "@material-ui/lab/DatePicker";

import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import { SubscriptionPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import { getDateMask } from "src/i18n";
import { isSubscriptionExpired } from "src/packages/farm/utils";

import TextField from "./TextField";
import Pricing from "./Pricing";

export default function SubscriptionEditorDialog({
  isOpen,
  onClose,
  farmId,
  subscription,
  currency,
  currencyMultiplier
}) {
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <MuiDialog
      fullScreen={isDownSm}
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <SubscriptionEditor
        subscription={subscription}
        onClose={onClose}
        farmId={farmId}
        currency={currency}
        currencyMultiplier={currencyMultiplier}
      />
    </MuiDialog>
  );
}
SubscriptionEditorDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  farmId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  subscription: SubscriptionPropTypes,
  currency: PropTypes.string.isRequired,
  currencyMultiplier: PropTypes.number.isRequired
};
SubscriptionEditorDialog.defaultProps = {
  subscription: {
    maximumNumberOfDeliveries: undefined,
    name: "",
    description: "",
    options: []
  }
};

function SubscriptionEditor({
  farmId,
  onClose,
  subscription,
  currency,
  currencyMultiplier
}) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: subscription
  });
  const [endOfSeason, setEndOfSeason] = React.useState(
    subscription.endOfSeason || null
  );
  const subscriptionSaved = useStoreActions(
    (actions) => actions.subscriptionSaved
  );

  async function onSubmit(subscriptionToSubmit) {
    const { maximumNumberOfDeliveries } = subscriptionToSubmit;
    const parsedMaximum = maximumNumberOfDeliveries
      ? parseInt(subscriptionToSubmit.maximumNumberOfDeliveries, 10)
      : null;
    const savedSubscription = await ApiClient.Farm.saveSubscription({
      ...subscriptionToSubmit,
      farmId,
      endOfSeason: endOfSeason ? dayjs(endOfSeason).format("YYYY-MM-DD") : null,
      maximumNumberOfDeliveries: parsedMaximum,
      options: subscriptionToSubmit.options
        .filter(
          (option) => option.numberOfDeliveries && option.pricePerDelivery
        )
        .map((option) => ({
          ...option,
          numberOfDeliveries: parseInt(option.numberOfDeliveries, 10),
          pricePerDelivery: parseFloat(option.pricePerDelivery)
        })),
      objectId: subscription?.objectId
    });
    subscriptionSaved(savedSubscription);
    onClose();
  }

  const submitter = useAsync(onSubmit);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(submitter.execute)}
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
            sx={{ my: "16px" }}
            register={register}
            name="description"
            label={t("subscriptionsPage.subscriptionDescriptionHeading")}
            placeholder={t("subscriptionEditor.descriptionPlaceholder")}
            multiline
            type="text"
            required
          />

          <Pricing
            displayPlaceholders={Boolean(subscription?.options?.length === 0)}
            register={register}
            currency={currency}
            currencyMultiplier={currencyMultiplier}
          />
          <TextField
            sx={{ mt: "24px", mb: "16px" }}
            register={register}
            name="maximumNumberOfDeliveries"
            placeholder="50"
            inputProps={{
              min: "1"
            }}
            label={t("subscription.maximumNumberOfDeliveries.label")}
            type="number"
          />
          <DatePicker
            label={t("subscription.endOfSeason.label")}
            mask={getDateMask()}
            value={endOfSeason}
            onChange={(newValue) => {
              setEndOfSeason(newValue);
            }}
            renderInput={(params) => {
              // eslint-disable-next-line no-param-reassign
              params.inputProps.placeholder = t("datePlaceholder");
              return (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  error={isSubscriptionExpired(endOfSeason)}
                  FormHelperTextProps={{
                    sx: {
                      mx: "6px"
                    }
                  }}
                  helperText={t("subscription.endOfSeason.helperText")}
                />
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("save")}</Button>
        </DialogActions>
      </Box>
      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError}
        onClose={submitter.reset}
      />
    </>
  );
}
SubscriptionEditor.propTypes = {
  farmId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  subscription: SubscriptionPropTypes.isRequired,
  currency: PropTypes.string.isRequired,
  currencyMultiplier: PropTypes.number.isRequired
};
