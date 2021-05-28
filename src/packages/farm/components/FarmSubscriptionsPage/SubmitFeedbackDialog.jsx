/* eslint-disable no-param-reassign */
import React from "react";
import { useTranslation } from "react-i18next";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

import { useAsyncPropTypes } from "src/packages/hooks/useAsync";
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import NumberedList from "src/components/NumberedList/NumberedList";

export default function SubmitFeedbackDialog({ submitter }) {
  const { t } = useTranslation();
  const history = useHistory();
  const resetOrderDraft = useStoreActions(
    (actions) => actions.orderDraft.reset
  );
  const translationKey = "subscriptionsPage.howItWorks";

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

  const text = submitter.result && (
    <NumberedList
      translations={[
        <>
          {t(`${translationKey}2`)} <b>({submitter.result.farm.email})</b>
        </>,
        t(`${translationKey}3`),
        t(`${translationKey}4`),
        <>
          {t(`${translationKey}5`)}
          <br />
          <b>{t("pickupDayLabel")}:</b>
          {` ${submitter.result.pickupPoint.pickupDay}`}
          <br />
          <b>{t("pickupPoint.deliveryPeriod.label")}:</b>
          &nbsp;
          {t(
            `pickupPoint.deliveryPeriod.${submitter.result.pickupPoint.deliveryPeriod}`
          )}
        </>
      ]}
      variant="body1"
      component="div"
    />
  );
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
