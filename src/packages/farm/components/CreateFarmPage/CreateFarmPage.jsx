import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useTranslation } from "react-i18next";

import ApiClient from "src/packages/api-client";
import { selectors } from "src/store";
import AppBar from "src/components/AppBar";
import logger from "src/packages/logger";
import { getCountryCode } from "src/i18n";
import FarmEditor from "src/packages/farm/components/FarmEditor";

import Heading from "./Heading";

export default function CreateFarmPage() {
  const history = useHistory();
  const { t } = useTranslation();

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
          countryCode: getCountryCode()
        });

        logger.farm("CreateFarmPage -> createdFarm", farm);
        farmCreated(farm);

        history.push(`/farm/${farm.objectId}`);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    },
    [history, farmCreated]
  );
  return (
    <>
      <AppBar />
      <Heading />
      <FarmEditor
        farm={{ email: user.email }}
        isLoading={isLoading}
        onSubmit={submitHandler}
        onErrorDissmiss={onErrorDissmiss}
        hasError={hasError}
        submitButtonText={t("createFarm")}
        mode="create"
      />
    </>
  );
}
