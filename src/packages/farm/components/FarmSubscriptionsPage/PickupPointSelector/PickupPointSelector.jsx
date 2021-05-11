import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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

  return {
    id: point.objectId,
    label: (
      <span>
        <b>{addressLabel}:</b>
        {` ${address}`}
        <br />
        <b>{nameLabel}:</b>
        {` ${point.name}`}
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
    const pointsList = [...farm.pickupPoints];
    if (farm.isPickupPoint) {
      pointsList.push(farm);
    }
    pointsList
      .sort((a, b) => {
        if (a.city === b.city) return 0;
        if (a.city < b.city) return -1;
        return 1;
      })
      .forEach((point) => {
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
    <>
      <Select
        sx={{
          maxHeight: "360px",
          "& .MuiSelect-select": {
            whiteSpace: "normal"
          }
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
      {/* <Box sx={{ mt: "8px", display: selectedPoint ? "block" : "none" }}>
        <Typography variant="h6">{t("pickupDayLabel")}:</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            display: selectedPoint ? "block" : "none"
          }}
        >
          {selectedPoint?.pickupDay}
        </Typography>
      </Box> */}
    </>
  );
}
PickupPointSelector.propTypes = {
  farm: FarmPropTypes.isRequired
};

export default React.memo(PickupPointSelector);
