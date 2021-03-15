import React from "react";
import PropTypes from "prop-types";
import { useStoreActions } from "easy-peasy";

import ApiClient from "src/packages/api-client";
import { FarmPropTypes } from "src/types";
import FarmEditor from "src/packages/farm/components/FarmEditor";

import FarmView from "./FarmView";

export default function FarmLandingPage({
  farm,
  isAdminMode,
  toggleAdminMode
}) {
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
        toggleAdminMode();
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    },
    [updateMyFarm, toggleAdminMode]
  );

  return (
    <>
      {isAdminMode ? (
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
  isAdminMode: PropTypes.bool.isRequired,
  toggleAdminMode: PropTypes.func.isRequired
};
