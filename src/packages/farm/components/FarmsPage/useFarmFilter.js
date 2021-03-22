import * as React from "react";
import { normalizeText } from "normalize-text";

import { localStorageKeys } from "src/packages/local-storage";

const TIMEOUT_DURATION = 150;

export default function useFarmFilter(farms) {
  const timeoutIdRef = React.useRef();
  const [filterValue, setFilterValue] = React.useState(
    localStorage.getItem(localStorageKeys.cityFilter) || ""
  );
  const [filteredFarms, setFilteredFarms] = React.useState([]);

  const runFilter = React.useCallback(
    (toFilter) => {
      const normalizedFilter = normalizeText(toFilter);
      localStorage.setItem(localStorageKeys.cityFilter, normalizedFilter);

      if (normalizedFilter === "" || !farms) {
        setFilteredFarms(farms);
        return;
      }
      const result = [];

      farms.forEach((farm) => {
        const { deliversTo } = farm;
        const filteredCities = deliversTo.filter((city) =>
          normalizeText(city).startsWith(normalizedFilter)
        );
        if (filteredCities.length) {
          result.push({ ...farm, deliversTo: filteredCities });
        }
      });
      setFilteredFarms(result);
    },
    [farms]
  );

  const onChange = React.useCallback(
    (e) => {
      const { value } = e.target;
      clearTimeout(timeoutIdRef.current);
      setFilterValue(value);
      setTimeout(() => runFilter(value), TIMEOUT_DURATION);
    },
    [runFilter]
  );
  React.useEffect(() => {
    runFilter(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runFilter]);
  React.useEffect(() => () => clearTimeout(timeoutIdRef), []);

  return React.useMemo(
    () => ({
      onChange,
      filterValue,
      filteredFarms
    }),
    [onChange, filterValue, filteredFarms]
  );
}
