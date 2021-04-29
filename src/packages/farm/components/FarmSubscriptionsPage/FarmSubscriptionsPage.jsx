import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";

import { useSwitch, useAsync } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import DeleteDialog from "src/components/DeleteDialog";
import { getCountry } from "src/i18n";

import SubscriptionEditor from "./SubscriptionEditor";
import SubscriptionsTable from "./SubscriptionsTable";

export default function FarmSubscriptionsPage({ farm, isAdminMode }) {
  const { t } = useTranslation();
  const editorSwitch = useSwitch(false);
  const deleteDialogSwitch = useSwitch(false);

  const subscriptionSaved = useStoreActions(
    (actions) => actions.subscriptionSaved
  );
  const subscriptionDeleted = useStoreActions(
    (actions) => actions.subscriptionDeleted
  );

  const onSubmit = React.useCallback(
    async (subscription) => {
      const objectId = editorSwitch.state?.objectId;
      const savedSubscription = await ApiClient.Farm.saveSubscription({
        ...subscription,
        farmId: farm.objectId,
        options: subscription.options
          .filter(
            (option) => option.numberOfDeliveries && option.pricePerDelivery
          )
          .map((option) => ({
            ...option,
            numberOfDeliveries: parseInt(option.numberOfDeliveries, 10),
            pricePerDelivery: parseFloat(option.pricePerDelivery)
          })),
        objectId
      });
      subscriptionSaved(savedSubscription);
      editorSwitch.reset();
    },
    [subscriptionSaved, editorSwitch, farm.objectId]
  );

  const onDelete = React.useCallback(
    async (pointId) => {
      deleteDialogSwitch.reset();
      await ApiClient.Farm.deleteSubscription(pointId);
      subscriptionDeleted(pointId);
    },
    [subscriptionDeleted, deleteDialogSwitch]
  );

  const submitter = useAsync(onSubmit, { functionName: "onSubmit" });
  const deletter = useAsync(onDelete, { functionName: "onDelete" });
  const farmCountry = getCountry(farm.countryCode);

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {editorSwitch.isOn && (
          <SubscriptionEditor
            subscription={editorSwitch.state}
            onClose={() => editorSwitch.reset()}
            onSubmit={submitter.execute}
            currency={farmCountry.currency}
            currencyMultiplier={farmCountry.currencyMultiplier}
          />
        )}
        <Box sx={{ mb: "16px", maxWidth: "800px" }}>
          <Typography paragraph>{t("subscriptionsPage.about")}</Typography>
          <Typography>{t("subscriptionsPage.about2")}</Typography>
        </Box>
        <SubscriptionsTable
          farm={farm}
          onAdd={() => editorSwitch.switchOn()}
          onEdit={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
      </Box>

      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError || deletter.hasError}
        onClose={submitter.hasError ? submitter.reset : deletter.reset}
      />
      <DeleteDialog
        isOpen={deleteDialogSwitch.isOn}
        isLoading={deletter.isLoading}
        onDelete={() => deletter.execute(deleteDialogSwitch.state)}
        onDismiss={() => deleteDialogSwitch.reset()}
      />
    </>
  );
}

FarmSubscriptionsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
