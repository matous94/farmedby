import React, { useState, useCallback, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import AppBar from "src/components/AppBar";
import GenericFailureDialog from "src/components/GenericFailureDialog";

import CreateFarmView from "./CreateFarmView";

export default function CreateFarmPage() {
  const router = useRouter();
  const user = useStoreState((state) => state.user);
  const usersFarm = useStoreState((state) => state.farm);

  const farmCreated = useStoreActions((actions) => actions.farmCreated);
  const [isFailureDialogOpened, setIsFailureDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeFailureDialog = useCallback(
    () => setIsFailureDialogOpened(false),
    []
  );

  useEffect(() => {
    if (usersFarm) {
      router.push("/farm/[farmId]", `/farm/${usersFarm.id}`);
    }
  }, [router, usersFarm]);

  const submitHandler = useCallback(
    async (farmData) => {
      try {
        setIsLoading(true);
        const farm = {
          ...farmData,
          email: user.email
        };
        const { data: createdFarm } = await callCloudFunction(
          "createFarm",
          farm
        );

        console.log("CreateFarmPage -> createdFarm", createdFarm);
        farmCreated(createdFarm);

        router.push("/farm/[farmId]", `/farm/${createdFarm.id}`);
      } catch (error) {
        setIsLoading(false);
        setIsFailureDialogOpened(true);
      }
    },
    [router, farmCreated, user]
  );
  return (
    <>
      <GenericFailureDialog
        open={isFailureDialogOpened}
        onClose={closeFailureDialog}
      />
      <AppBar />
      <Toolbar />
      <CreateFarmView isLoading={isLoading} onSubmit={submitHandler} />
    </>
  );
}
