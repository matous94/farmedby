import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
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

import TextField from "./TextField";
import Pricing from "./Pricing";

export default function SubscriptionEditor({
  isOpen,
  farmId,
  onClose,
  subscription,
  currency,
  currencyMultiplier
}) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: subscription
  });
  const [endOfSeason, setEndOfSeason] = React.useState(null);

  React.useEffect(() => {
    if (isOpen) reset(subscription);
  }, [isOpen, reset, subscription]);

  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const subscriptionSaved = useStoreActions(
    (actions) => actions.subscriptionSaved
  );

  async function onSubmit(subscriptionToSubmit) {
    const { maximumNumberOfDeliveries } = subscriptionToSubmit;
    const parsedMaximum = maximumNumberOfDeliveries
      ? parseInt(subscriptionToSubmit.maximumNumberOfDeliveries, 10)
      : undefined;
    const savedSubscription = await ApiClient.Farm.saveSubscription({
      ...subscriptionToSubmit,
      farmId,
      endOfSeason: endOfSeason ? endOfSeason.format("MM-DD-YYYY") : undefined,
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
  // const { options } = watch();

  // const minimumNumberOfDeliveries =
  //   isOpen === false
  //     ? 1
  //     : options.reduce((min, option) => {
  //         if (option.numberOfDeliveries) {
  //           const asNumber = parseInt(option.numberOfDeliveries, 10);
  //           return typeof min === "number" ? Math.min(min, asNumber) : asNumber;
  //         }
  //         return min;
  //       }, undefined);

  return (
    <>
      <MuiDialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={onClose}
      >
        {isOpen && (
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
                sx={{ marginTop: "16px" }}
                register={register}
                name="content"
                label={t("subscriptionsPage.subscriptionContentHeading")}
                placeholder={t("subscriptionEditor.contentPlaceholder")}
                multiline
                type="text"
                required
              />
              <TextField
                sx={{ my: "16px" }}
                register={register}
                name="maximumNumberOfDeliveries"
                placeholder="50"
                label={t("subscription.maximumNumberOfDeliveries.label")}
                type="number"
                helperText={t(
                  "subscription.maximumNumberOfDeliveries.helperText"
                )}
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
                      FormHelperTextProps={{
                        sx: {
                          mx: "6px"
                        }
                      }}
                      sx={{
                        mb: "16px"
                      }}
                      helperText={t("subscription.endOfSeason.helperText")}
                    />
                  );
                }}
              />
              {/* <TextField
                sx={{ my: "16px" }}
                name="minimumNumberOfDeliveries"
                label={t("subscription.minimumNumberOfDeliveries.label")}
                type="number"
                value={minimumNumberOfDeliveries || 1}
                helperText={t(
                  "subscription.minimumNumberOfDeliveries.helperText"
                )}
                disabled
              /> */}
              <Pricing
                displayPlaceholders={Boolean(
                  subscription?.options?.length === 0
                )}
                register={register}
                currency={currency}
                currencyMultiplier={currencyMultiplier}
              />
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("save")}</Button>
            </DialogActions>
          </Box>
        )}
      </MuiDialog>
      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError}
        onClose={submitter.reset}
      />
    </>
  );
}
SubscriptionEditor.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  farmId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  subscription: SubscriptionPropTypes,
  currency: PropTypes.string.isRequired,
  currencyMultiplier: PropTypes.number.isRequired
};
SubscriptionEditor.defaultProps = {
  subscription: {
    maximumNumberOfDeliveries: undefined,
    name: "",
    content: "",
    options: []
  }
};
