import React from "react";
import PropTypes from "prop-types";
import { useStoreActions } from "easy-peasy";

import GenericFailureDialog from "src/components/GenericFailureDialog";
import DeleteDialog from "src/components/DeleteDialog";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";

export default function DeleteSubscriptionDialog({
  onDismiss,
  subscriptionId,
  isOpen
}) {
  const subscriptionDeleted = useStoreActions(
    (actions) => actions.subscriptionDeleted
  );

  async function onDelete() {
    await ApiClient.Farm.deleteSubscription(subscriptionId);
    subscriptionDeleted(subscriptionId);
    onDismiss();
  }
  const deletter = useAsync(onDelete, { functionName: "onDelete" });

  return (
    <>
      <DeleteDialog
        isOpen={isOpen}
        isLoading={deletter.isLoading}
        onDelete={() => deletter.execute()}
        onDismiss={onDismiss}
      />
      <GenericFailureDialog
        isOpen={deletter.hasError}
        onClose={deletter.reset}
      />
    </>
  );
}

DeleteSubscriptionDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  subscriptionId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired
};
DeleteSubscriptionDialog.defaultProps = {
  subscriptionId: undefined
};
