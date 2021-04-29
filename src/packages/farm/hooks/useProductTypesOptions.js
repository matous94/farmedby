import * as React from "react";
import { useTranslation } from "react-i18next";

import { ProductTypes } from "src/types";

export default function useProductTypesOptions() {
  const { t } = useTranslation();

  return React.useMemo(
    () =>
      Object.values(ProductTypes).reduce((options, productId) => {
        // eslint-disable-next-line no-param-reassign
        options[productId] = {
          id: productId,
          label: t(`productTypes.${productId}`)
        };
        return options;
      }, {}),
    [t]
  );
}
