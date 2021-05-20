import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStoreActions } from "easy-peasy";

import { useSwitch, useAsync } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import DeleteDialog from "src/components/DeleteDialog";
import { getCountry } from "src/i18n";

import PickupPointEditor from "./PickupPointEditor";
import PickupPointsTable from "./PickupPointsTable";

export default function FarmPickupPointsPage({ farm, isAdminMode }) {
  const { t } = useTranslation();
  const editorSwitch = useSwitch(false);
  const deleteDialogSwitch = useSwitch(false);

  const pickupPointSaved = useStoreActions(
    (actions) => actions.pickupPointSaved
  );
  const pickupPointDeleted = useStoreActions(
    (actions) => actions.pickupPointDeleted
  );

  const onSubmit = React.useCallback(
    async (pickupPoint) => {
      const objectId = editorSwitch.state?.objectId;
      const point = await ApiClient.Farm.savePickupPoint({
        ...pickupPoint,
        countryCode: farm.countryCode,
        objectId
      });
      pickupPointSaved(point);
      editorSwitch.reset();
    },
    [pickupPointSaved, editorSwitch, farm.countryCode]
  );

  const onDelete = React.useCallback(
    async (pointId) => {
      deleteDialogSwitch.reset();
      await ApiClient.Farm.deletePickupPoint(pointId);
      pickupPointDeleted(pointId);
    },
    [pickupPointDeleted, deleteDialogSwitch]
  );

  const submitter = useAsync(onSubmit, { functionName: "onSubmit" });
  const deletter = useAsync(onDelete, { functionName: "onDelete" });
  const hasPickupPoints = farm.isFarmPickupPoint || farm.pickupPoints.length;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {editorSwitch.isOn && (
          <PickupPointEditor
            point={editorSwitch.state}
            onClose={() => editorSwitch.reset()}
            onSubmit={submitter.execute}
            requiresAddressLevel1={
              getCountry(farm.countryCode).requiresAddressLevel1
            }
          />
        )}
        {!hasPickupPoints || isAdminMode ? (
          <PickupPointsTable
            farm={farm}
            onAdd={() => editorSwitch.switchOn()}
            onEdit={editorSwitch.switchOn}
            onDelete={deleteDialogSwitch.switchOn}
            isAdminMode={isAdminMode}
          />
        ) : (
          <Typography
            variant="subtitle1"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textAlign: "center"
            }}
          >
            {t("pickupPoint.empty.text")}
          </Typography>
        )}
      </Box>
      <Dialog isLoading={submitter.isLoading} />
      <GenericFailureDialog
        isOpen={submitter.hasError || deletter.hasError}
        onClose={submitter.hasError ? submitter.reset : deletter.reset}
      />
      <DeleteDialog
        isOpen={deleteDialogSwitch.isOn}
        isLoading={deletter.isLoading}
        onDelete={() => deletter.execute(deleteDialogSwitch.state)}
        onDismiss={() => deleteDialogSwitch.reset()}
      />
    </>
  );
}

FarmPickupPointsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
