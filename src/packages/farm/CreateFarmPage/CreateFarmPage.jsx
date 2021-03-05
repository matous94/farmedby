import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions, useStoreState } from "easy-peasy";

import ApiClient from "src/packages/api-client";
import { selectors } from "src/store";
import AppBar from "src/components/AppBar";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import logger from "src/packages/logger";
import { getCountryCode } from "src/i18n";
import Dialog from "src/components/Dialog";

import CreateFarmView from "./CreateFarmView";

export default function CreateFarmPage() {
  const history = useHistory();

  const user = useStoreState(selectors.getUser);
  const existingFarm = useStoreState(selectors.getFarm);
  const farmCreated = useStoreActions((actions) => actions.farmCreated);

  const [isFailureDialogOpened, setIsFailureDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeFailureDialog = useCallback(
    () => setIsFailureDialogOpened(false),
    []
  );

  useEffect(() => {
    if (existingFarm) {
      history.push(`/farm/${existingFarm.objectId}`);
    }
  }, [history, existingFarm]);

  const submitHandler = useCallback(
    async (farmData) => {
      try {
        setIsLoading(true);

        const farm = await ApiClient.Farm.createFarm({
          ...farmData,
          about: "",
          countryCode: getCountryCode(),
          boxes: [],
          pickupPoints: []
        });
        farm.owner = { objectId: user.objectId };

        logger.farm("CreateFarmPage -> createdFarm", farm);
        farmCreated(farm);

        history.push(`/farm/${farm.objectId}`);
      } catch (error) {
        setIsLoading(false);
        setIsFailureDialogOpened(true);
      }
    },
    [history, farmCreated, user]
  );
  return (
    <>
      <GenericFailureDialog
        open={isFailureDialogOpened}
        onClose={closeFailureDialog}
      />
      <Dialog loading={isLoading} />
      <AppBar />
      <Toolbar />
      <CreateFarmView
        knownData={{ email: user.email }}
        isLoading={isLoading}
        onSubmit={submitHandler}
      />
    </>
  );
}
