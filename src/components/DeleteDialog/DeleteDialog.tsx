import React from "react";
import { useTranslation } from "react-i18next";

import Dialog from "src/components/Dialog";

interface Props {
  isOpen: boolean;
  isLoading?: boolean;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  onDismiss: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteDialog({
  isOpen,
  isLoading = false,
  onDelete,
  onDismiss
}: Props): JSX.Element {
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
