import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import { FarmPropTypes } from "src/packages/farm/farm-types";

import PickupPointsTable from "./PickupPointsTable";

export default function FarmPickupPointsPage({ farm, isAdminMode }) {
  const openEditor = React.useCallback((pickupPoint) => {
    console.log("clicked");
    alert("open pickup point editor", pickupPoint?.name);
  }, []);
  const openDeleteDialog = React.useCallback((pointId) => {
    alert("Open delete point dialog with id:", pointId);
  }, []);
  const onAdd = React.useCallback(() => {
    alert("Open empty pickup point editor");
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <PickupPointsTable
        farm={farm}
        onAdd={onAdd}
        onEdit={openEditor}
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
