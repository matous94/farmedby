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
import FarmCsaPage from "src/packages/farm/components/FarmCsaPage";

export const landingPage = {
  name: "landing",
  translationKey: "farm",
  Icon: FarmIcon,
  disabled: false,
  private: false,
  PageContent: FarmLandingPage
};

export default {
  csa: {
    name: "csa",
    translationKey: "farmPage.csa",
    Icon: ProductsIcon,
    disabled: false,
    private: false,
    PageContent: FarmCsaPage
  },
  "pickup-points": {
    name: "pickup-points",
    translationKey: "pickupPoints",
    Icon: MyLocationIcon,
    disabled: false,
    private: false,
    PageContent: FarmPickupPointsPage
  },
  eshop: {
    name: "eshop",
    translationKey: "farmPage.eshop",
    Icon: ShoppingCartIcon,
    disabled: true,
    private: false,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  },
  orders: {
    name: "orders",
    translationKey: "orders",
    Icon: PaymentIcon,
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
    translationKey: "farmPage.blog",
    Icon: CreateIcon,
    disabled: true,
    private: false,
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
    translationKey: "farmPage.reviews",
    Icon: RateReviewIcon,
    disabled: true,
    private: false,
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
    translationKey: "farmPage.photoGallery",
    Icon: PhotoIcon,
    disabled: true,
    private: false,
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
    translationKey: "farmPage.volunteers",
    Icon: WcIcon,
    disabled: true,
    private: false,
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
    translationKey: "farmPage.accommodation",
    Icon: HotelIcon,
    disabled: true,
    private: false,
    PageContent: ({ farm }) => {
      return (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farm, null, 2)}
        </pre>
      );
    }
  }
};
