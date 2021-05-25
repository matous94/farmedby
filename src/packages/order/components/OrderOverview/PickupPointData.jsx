import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { createAddress } from "src/packages/utils";
import LabelValueDataList from "src/components/LabelValueDataList";
import { PickupPointPropTypes } from "src/types";

export default function PickupPointData({ pickupPoint, sx }) {
  const { t } = useTranslation();
  const items = React.useMemo(() => {
    if (pickupPoint.isFarmPickupPoint) {
      return [
        {
          label: t("name"),
          value: t("pickupPoint.isFarmPickupPoint.name")
        },
        { label: t("pickupDayLabel"), value: pickupPoint.pickupDay }
      ];
    }
    return [
      {
        label: t("name"),
        value: pickupPoint.name
      },
      {
        label: t("address"),
        value: createAddress({
          addressLevel1: pickupPoint.addressLevel1,
          city: pickupPoint.city,
          countryCode: pickupPoint.countryCode,
          street: pickupPoint.street,
          postcode: pickupPoint.postcode
        }).full
      },
      {
        label: t("email"),
        value: pickupPoint.email
      },
      { label: t("phoneNumber"), value: pickupPoint.phoneNumber },
      { label: t("webAddress"), href: pickupPoint.webUrl },
      { label: t("pickupDayLabel"), value: pickupPoint.pickupDay },
      {
        label: t("pickupPoint.deliveryPeriod.label"),
        value: pickupPoint.deliveryPeriod
          ? t(`pickupPoint.deliveryPeriod.${pickupPoint.deliveryPeriod}`)
          : undefined
      }
    ];
  }, [t, pickupPoint]);

  return (
    <LabelValueDataList heading={t("pickupPoint")} items={items} sx={sx} />
  );
}
PickupPointData.propTypes = {
  pickupPoint: PickupPointPropTypes.isRequired,
  sx: PropTypes.shape({})
};
PickupPointData.defaultProps = {
  sx: undefined
};
