import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import { SubscriptionPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import DeleteDialog from "src/components/DeleteDialog";

import TextField from "./TextField";
import Pricing from "./Pricing";

export default function SubscriptionEditor({
  farmId,
  isOpenDeleteDialog,
  onClose,
  subscription,
  currency,
  currencyMultiplier,
  onDismissDeleteDialog
}) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: subscription });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const subscriptionSaved = useStoreActions(
    (actions) => actions.subscriptionSaved
  );
  const subscriptionDeleted = useStoreActions(
    (actions) => actions.subscriptionDeleted
  );

  async function onSubmit(subscriptionToSubmit) {
    const savedSubscription = await ApiClient.Farm.saveSubscription({
      ...subscriptionToSubmit,
      farmId,
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

  async function onDelete() {
    onDismissDeleteDialog();
    await ApiClient.Farm.deleteSubscription(subscription.objectId);
    subscriptionDeleted(subscription.objectId);
  }

  const submitter = useAsync(onSubmit, { functionName: "onSubmit" });
  const deletter = useAsync(onDelete, { functionName: "onDelete" });

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={true}
        onClose={onClose}
      >
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
              sx={{ marginBottom: "16px", marginTop: "10px" }}
              register={register}
              name="content"
              label={t("subscriptionsPage.subscriptionContentHeading")}
              placeholder={t("subscriptionEditor.contentPlaceholder")}
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
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit">{t("save")}</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError || deletter.hasError}
        onClose={submitter.hasError ? submitter.reset : deletter.reset}
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        isLoading={deletter.isLoading}
        onDelete={() => deletter.execute()}
        onDismiss={onDismissDeleteDialog}
      />
    </>
  );
}
SubscriptionEditor.propTypes = {
  farmId: PropTypes.string.isRequired,
  isOpenDeleteDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDismissDeleteDialog: PropTypes.func.isRequired,
  subscription: SubscriptionPropTypes,
  currency: PropTypes.string.isRequired,
  currencyMultiplier: PropTypes.number.isRequired
};
SubscriptionEditor.defaultProps = {
  subscription: {
    name: "",
    content: "",
    options: []
  }
};
