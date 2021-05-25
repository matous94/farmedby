import * as React from "react";
import { useTranslation } from "react-i18next";

export const DeliveryPeriodEnum = Object.freeze({
  week: "week",
  twoWeeks: "twoWeeks",
  threeWeeks: "threeWeeks",
  fourWeeks: "fourWeeks"
});

export function useDeliveryPeriodOptions() {
  const { t } = useTranslation();

  return React.useMemo(
    () =>
      Object.values(DeliveryPeriodEnum).reduce((options, period) => {
        // eslint-disable-next-line no-param-reassign
        options[period] = {
          id: period,
          label: t(`pickupPoint.deliveryPeriod.${period}`)
        };
        return options;
      }, {}),
    [t]
  );
}

export function getNumberOfWeeks(period) {
  return (
    {
      week: 1,
      twoWeeks: 2,
      threeWeeks: 3,
      fourWeeks: 4
    }[period] || 1
  );
}

// export const Options = {
//   week: {
//     id: "week",
//     duration: "7 * 24 * 60 * 60 * 1000",
//     numberOfWeeks: 1
//   },
//   twoWeeks: {
//     id: "twoWeeks",
//     duration: "2 * 7 * 24 * 60 * 60 * 1000",
//     numberOfWeeks: 2
//   },
//   threeWeeks: {
//     id: "threeWeeks",
//     duration: "3 * 7 * 24 * 60 * 60 * 1000",
//     numberOfWeeks: 3
//   },
//   fourWeeks: {
//     id: "fourWeeks",
//     duration: "4 * 7 * 24 * 60 * 60 * 1000",
//     numberOfWeeks: 4
//   }
// };
