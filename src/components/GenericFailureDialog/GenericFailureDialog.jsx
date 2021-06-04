import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Dialog from "src/components/Dialog";

export default function GenericFailureDialog({ onClose, isOpen, isLoading }) {
  const { t } = useTranslation();
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      title={t("somethingWentWrong")}
      text={t("tryItLater")}
      primaryButton={{
        onClick: onClose,
        children: t("continue")
      }}
    />
  );
}
GenericFailureDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};
GenericFailureDialog.defaultProps = {
  isLoading: false
};
