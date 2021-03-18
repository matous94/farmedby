import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import LoadingOverlay from "src/components/LoadingOverlay";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import AppBar from "src/components/AppBar";
import { selectors } from "src/store";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import FarmsTable from "./FarmsTable";

export default function FarmsPage() {
  const { t } = useTranslation();
  const farms = useStoreState(selectors.getFarms);
  const farmsResolved = useStoreActions((actions) => actions.farmsResolved);
  const farmGetter = useAsync(
    async () => {
      const refreshedFarms = await ApiClient.Farm.getFarms();
      farmsResolved(refreshedFarms);
    },
    {
      runIfEmpty: true,
      refreshCache: true,
      cachedResult: farms,
      functionName: "getFarms"
    }
  );
  return (
    <>
      <AppBar />
      <Toolbar />
      {farmGetter.isLoading && <LoadingOverlay />}
      <GenericFailureDialog
        isOpen={farmGetter.hasError}
        onClose={farmGetter.reset}
      />
      {farmGetter.isResolved && (
        <Box
          pt="16px"
          pb="32px"
          px={["16px", "24px", "32px", "64px"]}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box mb="16px">
            <Typography align="center" color="secondary" variant="h4">
              {t("farmsPage.heading")}
            </Typography>
          </Box>
          <FarmsTable farms={farms} />
        </Box>
      )}
    </>
  );
}
