import React from "react";
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
  }).countryRelativeReverse;
  const nameLabel = i18next.t("name");
  const addressLabel = i18next.t("address");
  const pickupDayLabel = i18next.t("pickupDayLabel");
  const pickupPointName = point.isFarmPickupPoint
    ? i18next.t("pickupPoint.isFarmPickupPoint.name")
    : point.name;

  return {
    address,
    id: point.objectId,
    label: (
      <span>
        <b>{addressLabel}:</b>
        {` ${address}`}
        <br />
        <b>{nameLabel}:</b>
        {` ${pickupPointName}`}
        <br />
        <b>{pickupDayLabel}:</b>
        {` ${point.pickupDay}`}
      </span>
    )
  };
}

function PickupPointSelector({ farm }) {
  const { t } = useTranslation();
  const selectedPoint = useStoreState(selectors.orderDraft.getPickupPoint);
  const setPickupPoint = useStoreActions(
    (actions) => actions.orderDraft.setPickupPoint
  );
  const options = React.useMemo(() => {
    const result = {};
    const points = [...farm.pickupPoints];
    if (farm.isFarmPickupPoint) {
      points.push(farm);
    }
    points
      .map((point) => createOption(point))
      .sort((a, b) => {
        if (a.address === b.address) return 0;
        if (a.address < b.address) return -1;
        return 1;
      })
      .forEach((point) => {
        result[point.id] = point;
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
      email: pickupPoint.email,
      isFarmPickupPoint: pickupPoint.isFarmPickupPoint,
      name: pickupPoint.name,
      objectId: pickupPoint.objectId,
      phoneNumber: pickupPoint.phoneNumber,
      pickupDay: pickupPoint.pickupDay,
      postcode: pickupPoint.postcode,
      street: pickupPoint.street,
      webUrl: pickupPoint.webUrl
    });
  }

  return (
    <>
      <Select
        sx={{
          maxHeight: "360px"
        }}
        size="small"
        onChange={onChange}
        value={selectedPoint?.objectId || ""}
        label={t("pickupPoint")}
        options={options}
        name="pickupPoints"
        itemHeight={92}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MyLocationIcon />
            </InputAdornment>
          )
        }}
      />
    </>
  );
}
PickupPointSelector.propTypes = {
  farm: FarmPropTypes.isRequired
};

export default React.memo(PickupPointSelector);
