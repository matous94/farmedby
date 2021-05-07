import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import { useSwitch } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import { getCountry } from "src/i18n";

import SubscriptionEditor from "./SubscriptionEditor";
import SubscriptionsTable from "./SubscriptionsTable";
import HowItWorks from "./HowItWorks";
import DeleteSubscriptionDialog from "./DeleteSubscriptionDialog";

export default function FarmSubscriptionsPage({ farm, isAdminMode }) {
  const editorSwitch = useSwitch(false);
  const deleteDialogSwitch = useSwitch(false);

  const farmCountry = getCountry(farm.countryCode);

  return (
    <>
      <SubscriptionEditor
        isOpen={editorSwitch.isOn}
        subscription={editorSwitch.state}
        onClose={() => editorSwitch.reset()}
        farmId={farm.objectId}
        currency={farmCountry.currency}
        currencyMultiplier={farmCountry.currencyMultiplier}
      />
      <DeleteSubscriptionDialog
        isOpen={deleteDialogSwitch.isOn}
        onDismiss={deleteDialogSwitch.reset}
        subscriptionId={deleteDialogSwitch.state}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ mb: "32px", maxWidth: "580px", mx: "auto" }}>
          <HowItWorks />
        </Box>
        <SubscriptionsTable
          farm={farm}
          onAdd={() => editorSwitch.switchOn()}
          onEdit={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
        {/* <PickupPointSelector />
        <NoteInput />
        <CustomerData />
        <SubmitButton /> */}
      </Box>
    </>
  );
}

FarmSubscriptionsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
