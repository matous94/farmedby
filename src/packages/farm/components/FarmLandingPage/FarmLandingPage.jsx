import React from "react";
import PropTypes from "prop-types";
import { useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ApiClient from "src/packages/api-client";
import { FarmPropTypes } from "src/types";
import FarmEditor from "src/packages/farm/components/FarmEditor";

import FarmView from "./FarmView";

export default function FarmLandingPage({
  farm,
  isAdminMode,
  isFarmOwner,
  toggleAdminMode
}) {
  const updateMyFarm = useStoreActions((actions) => actions.updateMyFarm);
  const { t } = useTranslation();

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
      <Typography
        sx={{
          mb: "16px",
          pr: isAdminMode ? [null, null, null, "110px"] : undefined
        }}
        align="center"
        color="secondary"
        variant="h3"
      >
        {farm.name}
      </Typography>
      {isAdminMode ? (
        <Box sx={{ width: "100%", pr: [null, null, null, "110px"] }}>
          <FarmEditor
            mode="edit"
            farm={farm}
            onSubmit={submitHandler}
            hasError={hasError}
            isLoading={isLoading}
            onErrorDissmiss={onErrorDissmiss}
            submitButtonText={t("save")}
          />
        </Box>
      ) : (
        <FarmView farm={farm} isFarmOwner={isFarmOwner} />
      )}
    </>
  );
}
FarmLandingPage.propTypes = {
  farm: FarmPropTypes.isRequired,
  isAdminMode: PropTypes.bool.isRequired,
  isFarmOwner: PropTypes.bool.isRequired,
  toggleAdminMode: PropTypes.func.isRequired
};
