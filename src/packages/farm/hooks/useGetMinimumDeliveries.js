import * as React from "react";

export default function useGetMinimumDeliveries(options) {
  return React.useMemo(() => {
    const initialMinimum = options[0].numberOfDeliveries;
    const result = options.reduce(
      (min, option) => Math.min(min, option.numberOfDeliveries),
      initialMinimum
    );
    return result;
  }, [options]);
}
