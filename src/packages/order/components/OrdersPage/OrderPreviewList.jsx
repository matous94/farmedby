import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { getLanguageCode } from "src/i18n";

import LabelValueData from "src/components/LabelValueData";
import { OrderPreviewPropTypes } from "src/types";

function OrderPreview({ order, sortBy, mb }) {
  const { t } = useTranslation();

  const createdAtData = (
    <LabelValueData
      label={t("dateOfCreation")}
      value={new Intl.DateTimeFormat(getLanguageCode(), {
        dateStyle: "medium",
        timeStyle: "medium"
      }).format(new Date(order.createdAt))}
      sx={{
        mb: sortBy === "createdAt" ? "6px" : "0px"
      }}
    />
  );

  const pickupPointData = (
    <LabelValueData
      label={t("pickupPoint")}
      value={order.pickupPointName}
      sx={{
        mb: sortBy === "pickupPointName" ? "6px" : "0px"
      }}
    />
  );

  return (
    <Box sx={{ width: "100%", mb }}>
      {sortBy === "createdAt" ? createdAtData : pickupPointData}
      <LabelValueData
        label={t("orderId")}
        value={order.objectId}
        to={`/order/${order.objectId}`}
        sx={{
          mb: "6px"
        }}
      />
      {sortBy === "createdAt" ? pickupPointData : createdAtData}
    </Box>
  );
}
OrderPreview.propTypes = {
  order: OrderPreviewPropTypes.isRequired,
  sortBy: PropTypes.oneOf(["createdAt", "pickupPointName"]).isRequired,
  mb: PropTypes.string.isRequired
};

function OrderPreviewList({ orders, sortBy }) {
  const sortedOrders = orders.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;
    if (a[sortBy] > b[sortBy]) return -1;
    return 1;
  });

  return sortedOrders.map((order, index) => (
    <OrderPreview
      key={order.objectId}
      order={order}
      sortBy={sortBy}
      mb={index + 1 === sortedOrders.length ? "0px" : "24px"}
    />
  ));
}
OrderPreviewList.propTypes = {
  orders: PropTypes.arrayOf(OrderPreviewPropTypes).isRequired,
  sortBy: PropTypes.oneOf(["createdAt", "pickupPointName"]).isRequired
};

export default React.memo(OrderPreviewList);
