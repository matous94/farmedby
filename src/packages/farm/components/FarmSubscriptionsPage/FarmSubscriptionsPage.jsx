import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { useSwitch } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import { getCountry } from "src/i18n";
import NumberedList from "src/components/NumberedList";

import SubscriptionEditor from "./SubscriptionEditor";
import SubscriptionsTable from "./SubscriptionsTable";
import DeleteSubscriptionDialog from "./DeleteSubscriptionDialog";
import PickupPointSelector from "./PickupPointSelector";

// eslint-disable-next-line react/prop-types
function Heading({ sx, ...rest }) {
  return (
    <Typography
      sx={{
        mt: ["24px", "32px", "44px"],
        mb: ["12px", "16px"],
        width: "100%",
        ...sx
      }}
      component="h2"
      variant="h4"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default function FarmSubscriptionsPage({ farm, isAdminMode }) {
  const { t } = useTranslation();
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
        sx={{
          maxWidth: isAdminMode ? "1100px" : "900px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          pb: "64px"
        }}
      >
        <Heading
          sx={{
            mt: ["0px", "12px"],
            mb: ["4px", "6px"]
          }}
        >
          {t("howItWorks?")}
        </Heading>
        <NumberedList
          sx={{ maxWidth: "580px", mr: "auto", fontWeight: 400 }}
          length={5}
          translationKey="subscriptionsPage.howItWorks"
        />
        <Heading>{t("subscriptionsPage.selectSubscriptionHeading")}</Heading>
        <SubscriptionsTable
          farm={farm}
          onAdd={() => editorSwitch.switchOn()}
          onEdit={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
        <Heading>{t("subscriptionsPage.selectPickupPointHeading")}</Heading>
        <PickupPointSelector points={farm.pickupPoints} />
        {/* 
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
