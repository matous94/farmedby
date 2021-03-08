import * as React from "react";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";

export default {
  about: {
    name: "about",
    label: "Farma",
    Icon: FarmIcon,
    PageContent: ({ farm }) => {
      return (
        <>
          About page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  boxes: {
    name: "boxes",
    label: "Bedýnky",
    Icon: ProductsIcon,
    PageContent: ({ farm }) => {
      return (
        <>
          Boxes page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  },
  "pickup-points": {
    name: "pickup-points",
    label: "Odběrová místa",
    Icon: MyLocationIcon,
    PageContent: ({ farm }) => {
      return (
        <>
          Pickup points page
          <br />
          <pre>{JSON.stringify(farm, null, 2)}</pre>
        </>
      );
    }
  }
};
