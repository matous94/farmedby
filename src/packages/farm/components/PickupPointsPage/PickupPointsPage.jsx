import React from "react";
// import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import { FarmPropTypes } from "src/packages/farm/farm-types";

import PickupPointsTable from "./PickupPointsTable";

export default function PickupPointsPage({ farm }) {
  const openEditor = React.useCallback((pickupPoint) => {
    console.log("clicked");
    alert("open pickup point editor", pickupPoint?.name);
  }, []);
  const deletePickupPoint = React.useCallback((pointId) => {
    // dialog can live in PickupPointTable
    alert("Opens delete point dialog with id:", pointId);
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <PickupPointsTable
        farm={farm}
        onEdit={openEditor}
        onDelete={deletePickupPoint}
      />
    </Box>
  );
}

PickupPointsPage.propTypes = {
  farm: FarmPropTypes.isRequired
  // isAdminMode: PropTypes.bool.isRequired
};
