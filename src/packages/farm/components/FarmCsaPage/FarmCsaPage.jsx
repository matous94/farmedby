import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";

import { useSwitch, useAsync } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import BoxEditor from "./BoxEditor";
import BoxesTable from "./BoxesTable";

export default function FarmCsaPage({ farm, isAdminMode }) {
  const { t } = useTranslation();
  const editorSwitch = useSwitch(false);
  const deleteDialogSwitch = useSwitch(false);

  const boxSaved = useStoreActions((actions) => actions.boxSaved);
  const boxDeleted = useStoreActions((actions) => actions.boxDeleted);

  const onSubmit = React.useCallback(
    async (box) => {
      const objectId = editorSwitch.state?.objectId;
      const point = await ApiClient.Farm.saveBox({
        ...box,
        objectId
      });
      boxSaved(point);
      editorSwitch.reset();
    },
    [boxSaved, editorSwitch]
  );

  const onDelete = React.useCallback(
    async (pointId) => {
      deleteDialogSwitch.reset();
      await ApiClient.Farm.deleteBox(pointId);
      boxDeleted(pointId);
    },
    [boxDeleted, deleteDialogSwitch]
  );

  const submitter = useAsync(onSubmit, { functionName: "onSubmit" });
  const deletter = useAsync(onDelete, { functionName: "onDelete" });

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        {editorSwitch.isOn && (
          <BoxEditor
            box={editorSwitch.state}
            onClose={() => editorSwitch.reset()}
            onSubmit={submitter.execute}
          />
        )}
        <Box mb="16px" maxWidth="800px">
          <Typography>{t("csaPage.about")}</Typography>
        </Box>
        <BoxesTable
          farm={farm}
          onAdd={() => editorSwitch.switchOn()}
          onEdit={editorSwitch.switchOn}
          onDelete={deleteDialogSwitch.switchOn}
          isAdminMode={isAdminMode}
        />
      </Box>

      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError || deletter.hasError}
        onClose={submitter.hasError ? submitter.reset : deletter.reset}
      />
      <Dialog
        isOpen={deleteDialogSwitch.isOn}
        isLoading={deletter.isLoading}
        text={t("areYouSure")}
        primaryButton={{
          onClick: () => deletter.execute(deleteDialogSwitch.state),
          children: t("delete")
        }}
        secondaryButton={{
          onClick: () => deleteDialogSwitch.reset(),
          children: t("cancel")
        }}
      />
    </>
  );
}

FarmCsaPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};