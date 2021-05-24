import React from "react";
import { useTranslation, Trans } from "react-i18next";
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
import Link from "src/components/Link";

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
        street: farm.street,
        webUrl: farm.webUrl
      },
      note: orderDraft.note,
      pickupPoint: orderDraft.pickupPoint,
      subscriptions: Object.values(orderDraft.subscriptionsById)
    });
  }

  // eslint-disable-next-line no-param-reassign
  // farm.pickupPoints = [];
  // eslint-disable-next-line no-param-reassign
  // farm.isFarmPickupPoint = false;
  // eslint-disable-next-line no-param-reassign
  // farm.subscriptions = [];

  const hasPickupPoints =
    farm.isFarmPickupPoint || farm.pickupPoints.length > 0;
  const hasSubscriptions = farm.subscriptions.length > 0;

  const displayPriceCalculator =
    hasPickupPoints === false && hasSubscriptions && isAdminMode === false;
  const displayEmptyView = hasSubscriptions === false && isAdminMode === false;
  const displayOrderForm =
    hasSubscriptions && hasPickupPoints && isAdminMode === false;

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
      {displayEmptyView && (
        <Typography
          variant="subtitle1"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textAlign: "center"
          }}
        >
          {t("subscription.empty.text")}
        </Typography>
      )}
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
        {displayOrderForm && (
          <>
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
            <Heading>
              {t("subscriptionsPage.selectSubscriptionHeading")}
            </Heading>
          </>
        )}
        {displayPriceCalculator && (
          <>
            <Heading
              sx={{
                mt: ["0px", null, null, "12px"],
                mb: ["4px", "6px"]
              }}
            >
              {t("subscription.calculator.heading")}
            </Heading>
            <Typography sx={{ mb: "12px" }}>
              {t("subscription.calculator.text")}
            </Typography>
          </>
        )}
        {displayEmptyView ? null : (
          <SubscriptionsTable
            farm={farm}
            openEditor={editorSwitch.switchOn}
            onDelete={deleteDialogSwitch.switchOn}
            isAdminMode={isAdminMode}
          />
        )}
        {displayOrderForm && (
          <>
            <Heading>{t("subscriptionsPage.noteHeading")}</Heading>
            <NoteField />
            <Heading>{t("subscriptionsPage.customerData.heading")}</Heading>
            <CustomerData />
            <Box
              sx={{
                my: ["36px", null, "64px"],
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  disabled={
                    Object.keys(orderDraft.subscriptionsById).length === 0
                  }
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    fontSize: ["1.4rem", "1.5rem"],
                    padding: ["12px 20px", "16px 32px"]
                  }}
                >
                  {t("subscriptionsPage.submit.button")}
                </Button>
                <Typography
                  variant="body2"
                  sx={{ maxWidth: "360px", mt: "8px" }}
                >
                  <Trans
                    i18nKey="order.userConsent.text"
                    components={{
                      TermsOfUseLink: <Link to="/terms-of-use" />,
                      PrivacyPolicyLink: <Link to="/privacy-policy" />
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

FarmSubscriptionsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
