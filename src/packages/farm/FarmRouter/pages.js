import MyLocationIcon from "@material-ui/icons/MyLocation";
import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";

export default [
  {
    id: "about",
    label: "Farma",
    Icon: FarmIcon
    // as: `/farm/${requestedFarmId}?tab=about`,
    // url: "/farm/[farmId]?tab=about"
  },
  {
    id: "csa",
    label: "Bedýnky",
    Icon: ProductsIcon
    // as: `/farm/${requestedFarmId}?tab=csa`,
    // url: "/farm/[farmId]?tab=csa"
  },
  {
    id: "dropOffPoints",
    label: "Odběrová místa",
    Icon: MyLocationIcon
    // as: `/farm/${requestedFarmId}?tab=dropOffPoints`,
    // url: "/farm/[farmId]?tab=dropOffPoints"
  }
];
