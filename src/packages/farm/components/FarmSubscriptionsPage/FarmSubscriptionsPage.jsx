import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useStoreState } from "easy-peasy";

import { useSwitch } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import { getCountry } from "src/i18n";
import NumberedList from "src/components/NumberedList";
import { selectors } from "src/store";

import SubscriptionEditor from "./SubscriptionEditor";
import SubscriptionsTable from "./SubscriptionsTable";
import DeleteSubscriptionDialog from "./DeleteSubscriptionDialog";
import PickupPointSelector from "./PickupPointSelector";
import NoteField from "./NoteField";
import CustomerData from "./CustomerData";

// eslint-disable-next-line react/prop-types
function Heading({ sx, ...rest }) {
  return (
    <Typography
      sx={{
        mt: ["24px", "32px", "44px"],
        mb: ["12px", "16px"],
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
  const orderDraft = useStoreState(selectors.orderDraft.getData);

  const farmCountry = getCountry(farm.countryCode);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit called:", orderDraft);
  }

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
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isAdminMode ? "1100px" : "900px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          mx: "auto"
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
          sx={{ maxWidth: "580px", fontWeight: 400 }}
          length={5}
          translationKey="subscriptionsPage.howItWorks"
        />
        <Heading>{t("subscriptionsPage.selectSubscriptionHeading")}</Heading>
        <SubscriptionsTable
          farm={farm}
          openEditor={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
        <Heading>{t("subscriptionsPage.selectPickupPointHeading")}</Heading>
        <PickupPointSelector farm={farm} />
        <Heading>{t("subscriptionsPage.noteHeading")}</Heading>
        <NoteField />
        <Heading>{t("subscriptionsPage.customerData.heading")}</Heading>
        <CustomerData />
        <Button
          disabled={Object.keys(orderDraft.subscriptionsById).length === 0}
          type="submit"
          color="secondary"
          variant="contained"
          sx={{
            minWidth: "200px",
            my: ["36px", null, "64px"],
            mx: "auto",
            fontSize: ["1.4rem", "1.5rem"],
            padding: ["12px 20px", "16px 32px"]
          }}
        >
          {t("subscriptionsPage.submit.button")}
        </Button>
      </Box>
    </>
  );
}

FarmSubscriptionsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
