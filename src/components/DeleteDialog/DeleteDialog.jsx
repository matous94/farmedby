import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import Dialog from "src/components/Dialog";

export default function DeleteDialog({
  isOpen,
  isLoading,
  onDelete,
  onDismiss
}) {
  const { t } = useTranslation();
  return (
    <Dialog
      isOpen={isOpen}
      isLoading={isLoading}
      text={t("deleteDialog.text")}
      primaryButton={{
        onClick: onDelete,
        children: t("yes")
      }}
      secondaryButton={{
        onClick: onDismiss,
        children: t("no")
      }}
    />
  );
}
DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired
};
DeleteDialog.defaultProps = {
  isLoading: false
};
