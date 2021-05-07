import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import InputAdornment from "@material-ui/core/InputAdornment";

import { PickupPointPropTypes } from "src/types";
import Select from "src/components/Select";
import { createAddress } from "src/packages/utils";
import { selectors } from "src/store";

export default function PickupPointSelector({ points, sx }) {
  const { t } = useTranslation();
  const selectedPoint = useStoreState(selectors.orderDraft.getPickupPoint);
  const setPickupPoint = useStoreActions(
    (actions) => actions.orderDraft.setPickupPoint
  );
  const options = React.useMemo(() => {
    return points.reduce((optionsAccu, point) => {
      const address = createAddress({
        city: point.city,
        postcode: point.postcode,
        street: point.street
      }).districtRelativeReverse;
      // eslint-disable-next-line no-param-reassign
      optionsAccu[point.objectId] = {
        id: point.objectId,
        label: `${point.name}. ${address}. ${point.pickupDay}${
          point.pickupDay.endsWith(".") ? "" : "."
        }`
      };
      return optionsAccu;
    }, {});
  }, [points]);

  function onChange(e) {
    const pickupPointId = e.target.value;
    const pickupPoint = points.find(
      (point) => point.objectId === pickupPointId
    );
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
  points: PropTypes.arrayOf(PickupPointPropTypes).isRequired,
  sx: PropTypes.shape({})
};
PickupPointSelector.defaultProps = {
  sx: undefined
};
