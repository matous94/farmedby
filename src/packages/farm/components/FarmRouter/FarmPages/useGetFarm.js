import * as React from "react";
import { useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

import logger from "src/packages/logger";
import { selectors } from "src/store";
import ApiClient from "src/packages/api-client";

export default function useGetFarm() {
  const { farmId } = useParams();
  const myFarm = useStoreState(selectors.getMyFarm);
  const visitedFarmResolved = useStoreActions(
    (actions) => actions.visitedFarmResolved
  );
  const resetVisitedFarm = useStoreActions(
    (actions) => actions.resetVisitedFarm
  );
  const visitedFarm = useStoreState(selectors.getVisitedFarm);
  const isFarmOwner = useStoreState((state) =>
    selectors.isFarmOwner(state, farmId)
  );

  const hasVisitedFarm = visitedFarm && visitedFarm.objectId === farmId;
  // loading, resolved, error
  const [status, setStatus] = React.useState(
    isFarmOwner || hasVisitedFarm ? "resolved" : "loading"
  );
  React.useEffect(() => {
    if (isFarmOwner || hasVisitedFarm) return;
    ApiClient.Farm.getFarmById(farmId)
      .then((fetchedFarm) => {
        visitedFarmResolved(fetchedFarm);
        setStatus("resolved");
      })
      .catch((error) => {
        logger.farm("useGetFarm => getFarmById failed", error);
        setStatus("error");
      });
  }, [farmId, isFarmOwner, hasVisitedFarm, visitedFarmResolved]);
  React.useEffect(() => {
    if (isFarmOwner && hasVisitedFarm) {
      resetVisitedFarm();
    }
  });

  return React.useMemo(
    () => ({
      status,
      farm: isFarmOwner ? myFarm : visitedFarm,
      isFarmOwner
    }),
    [status, isFarmOwner, myFarm, visitedFarm]
  );
}
