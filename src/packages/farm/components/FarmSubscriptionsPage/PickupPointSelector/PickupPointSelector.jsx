import React from "react";
import PropTypes from "prop-types";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import InputAdornment from "@material-ui/core/InputAdornment";

import { FarmPropTypes } from "src/types";
import Select from "src/components/Select";
import { createAddress } from "src/packages/utils";
import { selectors } from "src/store";

function createOption(point) {
  const address = createAddress({
    city: point.city,
    postcode: point.postcode,
    street: point.street
  }).districtRelativeReverse;
  const nameLabel = i18next.t("name");
  const addressLabel = i18next.t("address");
  const pickupDayLabel = i18next.t("pickupDayLabel");

  return {
    id: point.objectId,
    label: (
      <span>
        <b>{nameLabel}:</b>
        {` ${point.name}; `}
        <b>{addressLabel}:</b>
        {` ${address}; `}
        <b>{pickupDayLabel}:</b>
        {` ${point.pickupDay}`}
      </span>
    )
  };
}

export default function PickupPointSelector({ farm, sx }) {
  const { t } = useTranslation();
  const selectedPoint = useStoreState(selectors.orderDraft.getPickupPoint);
  const setPickupPoint = useStoreActions(
    (actions) => actions.orderDraft.setPickupPoint
  );
  const options = React.useMemo(() => {
    const result = {};
    if (farm.isPickupPoint) {
      result[farm.objectId] = createOption(farm);
    }
    farm.pickupPoints.forEach((point) => {
      result[point.objectId] = createOption(point);
    });
    return result;
  }, [farm]);

  function onChange(e) {
    const pickupPointId = e.target.value;
    let pickupPoint;
    if (pickupPointId === farm.objectId) {
      pickupPoint = farm;
    } else {
      pickupPoint = farm.pickupPoints.find(
        (point) => point.objectId === pickupPointId
      );
    }

    setPickupPoint({
      addressLevel1: pickupPoint.addressLevel1,
      city: pickupPoint.city,
      countryCode: pickupPoint.countryCode,
      pickupDay: pickupPoint.pickupDay,
      email: pickupPoint.email,
      name: pickupPoint.name,
      objectId: pickupPoint.objectId,
      phoneNumber: pickupPoint.phoneNumber,
      postcode: pickupPoint.postcode,
      street: pickupPoint.street,
      webUrl: pickupPoint.webUrl
    });
  }

  return (
    <Select
      sx={{
        "& .MuiSelect-select": {
          whiteSpace: "normal"
        },
        ...sx
      }}
      size="small"
      onChange={onChange}
      value={selectedPoint?.objectId || ""}
      label={t("pickupPoint")}
      options={options}
      name="pickupPoints"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MyLocationIcon />
          </InputAdornment>
        )
      }}
    />
  );
}
PickupPointSelector.propTypes = {
  farm: FarmPropTypes.isRequired,
  sx: PropTypes.shape({})
};
PickupPointSelector.defaultProps = {
  sx: undefined
};
