import * as React from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

import logger from "src/packages/logger";
import { selectors } from "src/store";
import ApiClient from "src/packages/api-client";

export default function useGetFarm() {
  const { farmId } = useParams();
  const myFarm = useStoreState(selectors.getMyFarm);
  const isFarmOwner = useStoreState((state) =>
    selectors.isFarmOwner(state, farmId)
  );
  const refreshMyFarm = useStoreActions((actions) => actions.refreshMyFarm);

  // loading, resolved, error
  const [status, setStatus] = React.useState(
    isFarmOwner ? "resolved" : "loading"
  );
  const [visitedFarm, setVisitedFarm] = React.useState(null);

  React.useEffect(() => {
    ApiClient.Farm.getFarmById(farmId)
      .then((fetchedFarm) => {
        if (isFarmOwner) {
          refreshMyFarm(fetchedFarm);
        } else {
          setVisitedFarm(fetchedFarm);
        }
        setStatus("resolved");
      })
      .catch((error) => {
        logger.farm("useGetFarm => getFarmById failed", error);
        setStatus("error");
      });
  }, [farmId, refreshMyFarm, isFarmOwner]);

  return React.useMemo(
    () => ({
      status,
      farm: isFarmOwner ? myFarm : visitedFarm,
      isFarmOwner
    }),
    [status, isFarmOwner, myFarm, visitedFarm]
  );
}
