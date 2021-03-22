import * as React from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import { isIllustrativeFarm } from "src/packages/utils";
import logger from "src/packages/logger";
import { selectors } from "src/store";
import ApiClient from "src/packages/api-client";

export default function useGetFarm() {
  const { farmId } = useParams();
  const myFarm = useStoreState(selectors.getMyFarm);
  const isFarmOwner = useStoreState((state) =>
    selectors.isFarmOwner(state, farmId)
  );

  // loading, resolved, error
  const [status, setStatus] = React.useState(
    isFarmOwner ? "resolved" : "loading"
  );
  const [visitedFarm, setVisitedFarm] = React.useState(null);

  React.useEffect(() => {
    if (isFarmOwner) return;
    ApiClient.Farm.getFarmById(farmId)
      .then((fetchedFarm) => {
        setVisitedFarm(fetchedFarm);
        setStatus("resolved");
      })
      .catch((error) => {
        logger.farm("useGetFarm => getFarmById failed", error);
        setStatus("error");
      });
  }, [farmId, isFarmOwner]);

  return React.useMemo(
    () => ({
      status,
      farm: isFarmOwner ? myFarm : visitedFarm,
      isFarmOwner: isIllustrativeFarm(farmId) || isFarmOwner
    }),
    [status, isFarmOwner, myFarm, visitedFarm, farmId]
  );
}
