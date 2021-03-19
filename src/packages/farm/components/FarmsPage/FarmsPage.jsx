import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import LoadingOverlay from "src/components/LoadingOverlay";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import AppBar from "src/components/AppBar";
import { selectors } from "src/store";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import FarmsTable from "./FarmsTable";
import useFarmFilter from "./useFarmFilter";

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
  const { filterValue, onChange, filteredFarms } = useFarmFilter(farms);

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
          <Typography align="center" color="secondary" variant="h4">
            {t("farmsPage.heading")}
          </Typography>
          <Box mb="24px" mt="16px" width="256px">
            <TextField
              onChange={onChange}
              value={filterValue}
              size="small"
              name="cityFilter"
              label={t("farmsTable.deliversToHeading")}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <FarmsTable farms={filteredFarms} />
        </Box>
      )}
    </>
  );
}
