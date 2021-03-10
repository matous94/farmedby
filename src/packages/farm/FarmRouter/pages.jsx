/* eslint-disable react/prop-types */
import * as React from "react";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import WcIcon from "@material-ui/icons/Wc";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PhotoIcon from "@material-ui/icons/Photo";
import HotelIcon from "@material-ui/icons/Hotel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CreateIcon from "@material-ui/icons/Create";

import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";

export const landingPage = {
  name: "landing",
  translationKey: "farm",
  Icon: FarmIcon,
  PageContent: ({ farm }) => {
    return (
      <>
        Landing page
        <br />
        <pre>{JSON.stringify(farm, null, 2)}</pre>
      </>
    );
  }
};

export default {
  csa: {
    name: "csa",
    translationKey: "farmPage.csa",
    Icon: ProductsIcon,
    disabled: false,
    PageContent: ({ farm }) => {
      return (
        <>
          CSA page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  "pickup-points": {
    name: "pickup-points",
    translationKey: "pickupPoints",
    Icon: MyLocationIcon,
    disabled: false,
    PageContent: ({ farm }) => {
      return (
        <>
          Pickup points page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  eshop: {
    name: "eshop",
    translationKey: "farmPage.eshop",
    Icon: ShoppingCartIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Eshop page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  blog: {
    name: "blog",
    translationKey: "farmPage.blog",
    Icon: CreateIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Blog page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  reviews: {
    name: "reviews",
    translationKey: "farmPage.reviews",
    Icon: RateReviewIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Reviews page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  "photo-gallery": {
    name: "photo-gallery",
    translationKey: "farmPage.photoGallery",
    Icon: PhotoIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Photo gallery page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  volunteers: {
    name: "volunteers",
    translationKey: "farmPage.volunteers",
    Icon: WcIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Help page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  accommodation: {
    name: "accommodation",
    translationKey: "farmPage.accommodation",
    Icon: HotelIcon,
    disabled: true,
    PageContent: ({ farm }) => {
      return (
        <>
          Accomodation page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  }
};
