import React from "react";
import { useTranslation } from "react-i18next";

import Dialog from "src/components/Dialog";

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  isLoading?: boolean;
}

export default function GenericFailureDialog({
  onClose,
  isOpen,
  isLoading = false
}: Props): JSX.Element {
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
