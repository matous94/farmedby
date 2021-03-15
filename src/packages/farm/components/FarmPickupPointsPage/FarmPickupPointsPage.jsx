import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useStoreActions } from "easy-peasy";

import { useSwitch } from "src/packages/hooks";
import { FarmPropTypes } from "src/types";
import ApiClient from "src/packages/api-client";

import PickupPointEditor from "./PickupPointEditor";
import PickupPointsTable from "./PickupPointsTable";

export default function FarmPickupPointsPage({ farm, isAdminMode }) {
  const editorSwitch = useSwitch(false);
  const pickupPointSaved = useStoreActions(
    (actions) => actions.pickupPointSaved
  );

  const openDeleteDialog = React.useCallback((pointId) => {
    alert("Open delete point dialog with id:", pointId);
  }, []);

  const onSubmit = React.useCallback(
    async (pickupPoint) => {
      const objectId = editorSwitch.state?.objectId;
      const point = await ApiClient.Farm.savePickupPoint({
        ...pickupPoint,
        objectId
      });
      pickupPointSaved(point);
    },
    [pickupPointSaved, editorSwitch.state]
  );

  return (
    <Box display="flex" justifyContent="center">
      {editorSwitch.isOn && (
        <PickupPointEditor
          point={editorSwitch.state}
          onClose={() => editorSwitch.switchOff()}
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
