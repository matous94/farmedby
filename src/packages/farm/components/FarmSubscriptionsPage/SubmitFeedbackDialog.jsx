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

  const text = (
    <>
      {t("subscriptionsPage.submit.success.nextSteps")}
      <br />
      <NumberedList
        length={5}
        stepOffset={1}
        translationKey="subscriptionsPage.howItWorks"
        variant="body1"
      />
    </>
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
        primaryButton={{
          onClick: () => {
            resetOrderDraft();
            history.push(`/order/${submitter.result.objectId}`);
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
