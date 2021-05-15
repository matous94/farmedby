/* eslint-disable react/prop-types */
import * as React from "react";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import WcIcon from "@material-ui/icons/Wc";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PhotoIcon from "@material-ui/icons/Photo";
import HotelIcon from "@material-ui/icons/Hotel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CreateIcon from "@material-ui/icons/Create";
import PaymentIcon from "@material-ui/icons/Payment";

import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";

import FarmLandingPage from "src/packages/farm/components/FarmLandingPage";
import FarmPickupPointsPage from "src/packages/farm/components/FarmPickupPointsPage";
import FarmSubscriptionsPage from "src/packages/farm/components/FarmSubscriptionsPage";
import OrdersPage from "src/packages/order/components/OrdersPage";
import OrderOverview from "src/packages/order/components/OrderOverview/OrderOverview";

export const landingPage = {
  name: "landing",
  translationKey: "farm",
  renderHeading: false,
  Icon: FarmIcon,
  disabled: false,
  private: false,
  PageContent: FarmLandingPage
};

export default {
  subscriptions: {
    name: "subscriptions",
    translationKey: "subscription.subscriptions.heading",
    renderHeading: true,
    Icon: ProductsIcon,
    disabled: false,
    private: false,
    selectable: true,
    PageContent: FarmSubscriptionsPage
  },
  "pickup-points": {
    name: "pickup-points",
    translationKey: "pickupPoints",
    renderHeading: true,
    Icon: MyLocationIcon,
    disabled: false,
    private: false,
    selectable: true,
    PageContent: FarmPickupPointsPage
  },
  orders: {
    name: "orders",
    translationKey: "orders",
    renderHeading: true,
    Icon: PaymentIcon,
    disabled: false,
    private: true,
    selectable: true,
    PageContent: OrdersPage
  },
  order: {
    name: "order",
    renderHeading: false,
    disabled: false,
    private: false,
    selectable: false,
    PageContent: OrderOverview
  },
  eshop: {
    name: "eshop",
    translationKey: "eshop.heading",
    renderHeading: true,
    Icon: ShoppingCartIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  blog: {
    name: "blog",
    translationKey: "blog.heading",
    renderHeading: true,
    Icon: CreateIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  reviews: {
    name: "reviews",
    translationKey: "reviews.heading",
    renderHeading: true,
    Icon: RateReviewIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  "photo-gallery": {
    name: "photo-gallery",
    translationKey: "photoGallery.heading",
    renderHeading: true,
    Icon: PhotoIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  volunteers: {
    name: "volunteers",
    translationKey: "volunteers.heading",
    renderHeading: true,
    Icon: WcIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  accommodation: {
    name: "accommodation",
    translationKey: "accommodation.heading",
    renderHeading: true,
    Icon: HotelIcon,
    disabled: true,
    private: true,
    selectable: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  }
};
