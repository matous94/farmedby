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

export const landingPage = {
  name: "landing",
  translationKey: "farm",
  Icon: FarmIcon,
  disabled: false,
  private: false,
  PageContent: FarmLandingPage
};

export default {
  subscriptions: {
    name: "subscriptions",
    translationKey: "subscriptionsPage.heading",
    Icon: ProductsIcon,
    disabled: false,
    private: false,
    PageContent: FarmSubscriptionsPage
  },
  "pickup-points": {
    name: "pickup-points",
    translationKey: "pickupPoints",
    Icon: MyLocationIcon,
    disabled: false,
    private: false,
    PageContent: FarmPickupPointsPage
  },
  orders: {
    name: "orders",
    translationKey: "orders",
    Icon: PaymentIcon,
    disabled: false,
    private: true,
    PageContent: OrdersPage
  },
  eshop: {
    name: "eshop",
    translationKey: "eshop.heading",
    Icon: ShoppingCartIcon,
    disabled: true,
    private: true,
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
    Icon: CreateIcon,
    disabled: true,
    private: true,
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
    Icon: RateReviewIcon,
    disabled: true,
    private: true,
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
    Icon: PhotoIcon,
    disabled: true,
    private: true,
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
    Icon: WcIcon,
    disabled: true,
    private: true,
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
    Icon: HotelIcon,
    disabled: true,
    private: true,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  }
};
