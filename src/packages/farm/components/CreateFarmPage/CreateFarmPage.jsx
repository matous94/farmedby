import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions, useStoreState } from "easy-peasy";

import ApiClient from "src/packages/api-client";
import { selectors } from "src/store";
import AppBar from "src/components/AppBar";
import logger from "src/packages/logger";
import { getCountryCode } from "src/i18n";
import FarmEditor from "src/packages/farm/components/FarmEditor";

export default function CreateFarmPage() {
  const history = useHistory();

  const user = useStoreState(selectors.getUser);
  const myFarm = useStoreState(selectors.getMyFarm);
  const farmCreated = useStoreActions((actions) => actions.farmCreated);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onErrorDissmiss = useCallback(() => setHasError(false), []);

  useEffect(() => {
    if (myFarm) {
      history.push(`/farm/${myFarm.objectId}`);
    }
  }, [history, myFarm]);

  const submitHandler = useCallback(
    async (farmData) => {
      try {
        setIsLoading(true);

        const farm = await ApiClient.Farm.createFarm({
          ...farmData,
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
        setHasError(true);
      }
    },
    [history, farmCreated, user]
  );
  return (
    <>
      <AppBar />
      <Toolbar />
      <FarmEditor
        farm={{ email: user.email }}
        isLoading={isLoading}
        onSubmit={submitHandler}
        onErrorDissmiss={onErrorDissmiss}
        hasError={hasError}
        mode="create"
      />
    </>
  );
}
