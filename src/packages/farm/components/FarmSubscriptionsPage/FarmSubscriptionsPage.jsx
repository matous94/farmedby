import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useStoreState, useStoreActions } from "easy-peasy";

import { useSwitch, useAsync } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import { getCountry } from "src/i18n";
import NumberedList from "src/components/NumberedList";
import ApiClient from "src/packages/api-client";
import { selectors } from "src/store";

import SubscriptionEditor from "./SubscriptionEditor";
import SubscriptionsTable from "./SubscriptionsTable";
import DeleteSubscriptionDialog from "./DeleteSubscriptionDialog";
import PickupPointSelector from "./PickupPointSelector";
import NoteField from "./NoteField";
import CustomerData from "./CustomerData";
import SubmitFeedbackDialog from "./SubmitFeedbackDialog";

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
  const orderCreated = useStoreActions((actions) => actions.order.orderCreated);

  const farmCountry = getCountry(farm.countryCode);

  const orderSubmitter = useAsync(
    async (orderData) => {
      const order = await ApiClient.Order.createOrder(orderData);
      orderCreated(order);
      return order;
    },
    { functionName: "createOrderSubmit" }
  );
  function onSubmit(e) {
    e.preventDefault();

    orderSubmitter.execute({
      customer: orderDraft.customer,
      farm: {
        addressLevel1: farm.addressLevel1,
        city: farm.city,
        countryCode: farm.countryCode,
        email: farm.email,
        name: farm.name,
        objectId: farm.objectId,
        phoneNumber: farm.phoneNumber,
        postcode: farm.postcode,
        street: farm.street
      },
      note: orderDraft.note,
      pickupPoint: orderDraft.pickupPoint,
      subscriptions: Object.values(orderDraft.subscriptionsById)
    });
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
      <SubmitFeedbackDialog submitter={orderSubmitter} />
      <Box
        component="form"
        onSubmit={onSubmit}
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
        <Heading>{t("subscriptionsPage.selectPickupPointHeading")}</Heading>
        <PickupPointSelector farm={farm} />
        <Heading>{t("subscriptionsPage.selectSubscriptionHeading")}</Heading>
        <SubscriptionsTable
          farm={farm}
          openEditor={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
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
