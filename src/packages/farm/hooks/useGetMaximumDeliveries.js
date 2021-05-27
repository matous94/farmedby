import * as React from "react";

import { getNumberOfWeeks } from "src/packages/pickup-point/delivery-period";
import { numberOfDaysUntilEndOfSeason } from "src/packages/farm/utils";

export default function useGetMaximumDeliveries({
  deliveryPeriod,
  endOfSeason,
  maximumNumberOfDeliveries
}) {
  return React.useMemo(() => {
    const deliveryPeriodInWeeks = deliveryPeriod
      ? getNumberOfWeeks(deliveryPeriod)
      : 1;

    if (maximumNumberOfDeliveries == null && endOfSeason == null) return 50;
    if (maximumNumberOfDeliveries) return maximumNumberOfDeliveries;

    const diffInDays = numberOfDaysUntilEndOfSeason(endOfSeason);

    if (diffInDays <= 0) return 0;
    const diffInWeeks = diffInDays / 7;

    return Math.ceil(diffInWeeks / deliveryPeriodInWeeks);
  }, [endOfSeason, deliveryPeriod, maximumNumberOfDeliveries]);
}
