import React from "react";
import { useTranslation } from "react-i18next";

import { createAddress } from "src/packages/utils";
import LabelValueDataList from "src/components/LabelValueDataList";
import { FarmPropTypes } from "src/types";

export default function FarmData({ farm }) {
  const { t } = useTranslation();
  const items = React.useMemo(
    () => [
      {
        label: t("name"),
        value: farm.name,
        to: `/farm/${farm.objectId}`
      },
      {
        label: t("address"),
        value: createAddress({
          addressLevel1: farm.addressLevel1,
          city: farm.city,
          countryCode: farm.countryCode,
          street: farm.street,
          postcode: farm.postcode
        }).full
      },
      {
        label: t("email"),
        value: farm.email
      },
      { label: t("phoneNumber"), value: farm.phoneNumber }
    ],
    [t, farm]
  );

  return <LabelValueDataList heading={t("farm")} items={items} />;
}
FarmData.propTypes = {
  farm: FarmPropTypes.isRequired
};
