/* eslint-disable react/prop-types */
import * as React from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import WcIcon from "@mui/icons-material/Wc";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PhotoIcon from "@mui/icons-material/Photo";
import HotelIcon from "@mui/icons-material/Hotel";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreateIcon from "@mui/icons-material/Create";
import PaymentIcon from "@mui/icons-material/Payment";
import FaqIcon from "@mui/icons-material/Help";
import UserIcon from "@mui/icons-material/AccountCircle";

import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";

import FarmLandingPage from "src/packages/farm/components/FarmLandingPage";
import FarmPickupPointsPage from "src/packages/farm/components/FarmPickupPointsPage";
import FarmSubscriptionsPage from "src/packages/farm/components/FarmSubscriptionsPage";
import OrdersPage from "src/packages/order/components/OrdersPage";
import OrderOverview from "src/packages/order/components/OrderOverview/OrderOverview";
import UserCredentials from "src/packages/user/UserCredentials";

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
  // eshop: {
  //   name: "eshop",
  //   translationKey: "eshop.heading",
  //   renderHeading: true,
  //   Icon: ShoppingCartIcon,
  //   disabled: true,
  //   private: true,
  //   selectable: true,
  //   PageContent: ({ farm }) => {
  //     return (
  //       <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
  //         {JSON.stringify(farm, null, 2)}
  //       </pre>
  //     );
  //   }
  // },
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
  },
  faq: {
    name: "faq",
    translationKey: "faq.heading",
    renderHeading: true,
    Icon: FaqIcon,
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
  user: {
    name: "user",
    translationKey: "credentialsChange.heading",
    renderHeading: true,
    Icon: UserIcon,
    disabled: false,
    private: true,
    selectable: true,
    PageContent: UserCredentials
  }
};
