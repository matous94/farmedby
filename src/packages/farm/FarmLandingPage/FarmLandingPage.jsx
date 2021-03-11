import React from "react";
import PropTypes from "prop-types";
import { useStoreActions } from "easy-peasy";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ApiClient from "src/packages/api-client";
import { FarmPropTypes } from "src/packages/farm/farm-types";
import FarmEditor from "src/packages/farm/components/FarmEditor";

import FarmView from "./FarmView";

export default function FarmLandingPage({ farm, isEditMode, toggleEditMode }) {
  const updateMyFarm = useStoreActions((actions) => actions.updateMyFarm);

  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const onErrorDissmiss = React.useCallback(() => setHasError(false), []);

  const submitHandler = React.useCallback(
    async (farmData) => {
      try {
        setIsLoading(true);
        await ApiClient.Farm.updateFarm(farmData);
        updateMyFarm(farmData);
        setIsLoading(false);
        toggleEditMode();
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    },
    [updateMyFarm, toggleEditMode]
  );

  return (
    <>
      <Box mb="8px" mt="16px" width="100%">
        <Typography align="center" color="secondary" variant="h4">
          {farm.name}
        </Typography>
      </Box>
      {isEditMode ? (
        <FarmEditor
          mode="edit"
          farm={farm}
          onSubmit={submitHandler}
          hasError={hasError}
          isLoading={isLoading}
          onErrorDissmiss={onErrorDissmiss}
        />
      ) : (
        <FarmView farm={farm} />
      )}
    </>
  );
}
FarmLandingPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired
};
