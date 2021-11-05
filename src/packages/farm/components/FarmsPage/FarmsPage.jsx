import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import Select from "src/components/Select";
import LoadingOverlay from "src/components/LoadingOverlay";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import AppBar from "src/components/AppBar";
import { selectors } from "src/store";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import useProductTypesOptions from "src/packages/farm/hooks/useProductTypesOptions";

import FarmsTable from "./FarmsTable";
import useLocationFilter from "./useLocationFilter";
import useProducingFilter from "./useProducingFilter";

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
      runOnMount: true,
      cache: farms,
      hasCache: farms && farms.length,
      functionName: "getFarms"
    }
  );
  const productTypesOptions = useProductTypesOptions();
  const locationFilter = useLocationFilter(farms || []);
  const producingFilter = useProducingFilter(locationFilter.filteredFarms);

  return (
    <>
      <AppBar />
      {farmGetter.isLoading && <LoadingOverlay />}
      <GenericFailureDialog
        isOpen={farmGetter.hasError}
        onClose={farmGetter.reset}
      />
      {farmGetter.isResolved && (
        <Box
          sx={{
            pt: "16px",
            pb: "32px",
            px: ["16px", "24px", "32px", "64px"],
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Typography align="center" color="secondary" variant="h3">
            {t("farmsPage.heading")}
          </Typography>
          <Box sx={{ my: "24px", width: "300px" }}>
            <TextField
              onChange={locationFilter.onChange}
              value={locationFilter.filterValue}
              size="small"
              name="cityFilter"
              label={t("farmsPage.deliversToHeading")}
              type="text"
              fullWidth
              placeholder={t("farmsTable.deliversToPlaceholder")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Select
              sx={{
                mt: "16px"
              }}
              size="small"
              onChange={producingFilter.onChange}
              value={producingFilter.filterValue}
              label={t("farmsPage.producingLabel")}
              options={productTypesOptions}
              multiple
              name="productTypes"
            />
          </Box>

          <FarmsTable
            farms={producingFilter.filteredFarms}
            productTypesFilter={producingFilter.filterValue}
          />
        </Box>
      )}
    </>
  );
}
