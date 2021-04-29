import * as React from "react";

function farmFilter(farmProductTypes, filterProductTypes) {
  return filterProductTypes.every((type) => farmProductTypes.includes(type));
}
export default function useProducingFilter(farms) {
  const [filterValue, setFilterValue] = React.useState([]);
  const [filteredFarms, setFilteredFarms] = React.useState(farms);

  React.useEffect(() => {
    setFilteredFarms(
      farms.filter((farm) => farmFilter(farm.productTypes, filterValue))
    );
  }, [farms, filterValue]);

  return React.useMemo(
    () => ({
      filteredFarms,
      filterValue,
      onChange: (e) => {
        setFilterValue(e.target.value);
      }
    }),
    [filterValue, filteredFarms]
  );
}
