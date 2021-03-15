import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useStoreActions } from "easy-peasy";

import { useSwitch } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";
import logger from "src/packages/logger";

import PickupPointEditor from "./PickupPointEditor";
import PickupPointsTable from "./PickupPointsTable";

export default function FarmPickupPointsPage({ farm, isAdminMode }) {
  const editorSwitch = useSwitch(false);
  const pickupPointSaved = useStoreActions(
    (actions) => actions.pickupPointSaved
  );
  const pickupPointDeleted = useStoreActions(
    (actions) => actions.pickupPointDeleted
  );

  const openDeleteDialog = React.useCallback(
    async (pointId) => {
      await ApiClient.Farm.deletePickupPoint(pointId);
      pickupPointDeleted(pointId);
    },
    [pickupPointDeleted]
  );

  const onSubmit = React.useCallback(
    async (pickupPoint) => {
      try {
        const objectId = editorSwitch.state?.objectId;
        const point = await ApiClient.Farm.savePickupPoint({
          ...pickupPoint,
          objectId
        });
        pickupPointSaved(point);
        editorSwitch.reset();
      } catch (error) {
        logger.farm("FarmPickupPointsPage > savePickupPoint failed", error);
      }
    },
    [pickupPointSaved, editorSwitch]
  );

  return (
    <Box display="flex" justifyContent="center">
      {editorSwitch.isOn && (
        <PickupPointEditor
          point={editorSwitch.state}
          onClose={() => editorSwitch.reset()}
          onSubmit={onSubmit}
        />
      )}
      <PickupPointsTable
        farm={farm}
        onAdd={() => editorSwitch.switchOn()}
        onEdit={editorSwitch.switchOn}
        onDelete={openDeleteDialog}
        isAdminMode={isAdminMode}
      />
    </Box>
  );
}

FarmPickupPointsPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
