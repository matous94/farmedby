/* eslint-disable no-param-reassign */
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

import { useAsyncPropTypes } from "src/packages/hooks/useAsync";
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import NumberedList from "src/components/NumberedList/NumberedList";

const translationKey = "subscriptionsPage.howItWorks";

function NextSteps({ farm, pickupPoint }) {
  const { t } = useTranslation();

  return (
    <NumberedList
      translations={[
        <>
          {t(`${translationKey}2`)} <b>({farm.email})</b>
        </>,
        t(`${translationKey}3`),
        t(`${translationKey}4`),
        <>
          {t(`${translationKey}5`)}
          {pickupPoint.pickupDay && (
            <>
              <br />
              <b>{t("pickupDayLabel")}:</b>
              {` ${pickupPoint.pickupDay}`}
            </>
          )}
          {pickupPoint.deliveryPeriod && (
            <>
              <br />
              <b>{t("pickupPoint.deliveryPeriod.label")}:</b>
              &nbsp;
              {t(`pickupPoint.deliveryPeriod.${pickupPoint.deliveryPeriod}`)}
            </>
          )}
        </>
      ]}
      variant="body1"
      component="div"
    />
  );
}
NextSteps.propTypes = {
  farm: PropTypes.shape({
    email: PropTypes.string
  }).isRequired,
  pickupPoint: PropTypes.shape({
    pickupDay: PropTypes.string,
    deliveryPeriod: PropTypes.string
  }).isRequired
};

export default function SubmitFeedbackDialog({ submitter }) {
  const { t } = useTranslation();
  const history = useHistory();
  const resetOrderDraft = useStoreActions(
    (actions) => actions.orderDraft.reset
  );

  // const testResult = {
  //   farm: {
  //     email: "matous@farmedby.com"
  //   },
  //   pickupPoint: {
  //     pickupDay: "Středa od 10 do 17 hodin",
  //     deliveryPeriod: "week"
  //   }
  // };
  // submitter.result = testResult;
  // submitter.isResolved = true;

  const text = submitter.result ? (
    <NextSteps
      farm={submitter.result.farm}
      pickupPoint={submitter.result.pickupPoint}
    />
  ) : null;

  return (
    <>
      <GenericFailureDialog
        isOpen={submitter.hasError}
        onClose={submitter.reset}
      />
      <Dialog
        isLoading={submitter.isLoading}
        isOpen={submitter.isResolved}
        title={t("subscriptionsPage.submit.success.text")}
        text={text}
        DialogContentTextProps={{
          component: "div"
        }}
        primaryButton={{
          onClick: () => {
            resetOrderDraft();
            history.push(
              `/farm/${submitter.result.farmId}/order/${submitter.result.objectId}`
            );
          },
          children: t("ok")
        }}
      />
    </>
  );
}
SubmitFeedbackDialog.propTypes = {
  submitter: useAsyncPropTypes.isRequired
};
