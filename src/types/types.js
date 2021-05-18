import PropTypes from "prop-types";

export const UserPropTypes = PropTypes.shape({
  createdAt: PropTypes.string,
  email: PropTypes.string,
  objectId: PropTypes.string,
  sessionToken: PropTypes.string,
  updatedAt: PropTypes.string,
  username: PropTypes.string
});

export const ProductTypes = Object.freeze({
  vegetables: "vegetables",
  fruits: "fruits",
  eggs: "eggs",
  meat: "meat",
  dairy: "dairy"
});

export const ProductTypesPropTypes = PropTypes.arrayOf(
  PropTypes.oneOf(Object.values(ProductTypes))
);

export const SubscriptionOptionPropTypes = PropTypes.shape({
  numberOfDeliveries: PropTypes.number,
  pricePerDelivery: PropTypes.number
});
export const SubscriptionPropTypes = PropTypes.shape({
  content: PropTypes.string,
  name: PropTypes.string,
  objectId: PropTypes.string,
  options: PropTypes.arrayOf(SubscriptionOptionPropTypes)
});

export const PickupPointPropTypes = PropTypes.shape({
  addressLevel1: PropTypes.string,
  city: PropTypes.string,
  countryCode: PropTypes.string,
  email: PropTypes.string,
  isFarmPickupPoint: PropTypes.bool,
  name: PropTypes.string,
  objectId: PropTypes.string,
  phoneNumber: PropTypes.string,
  pickupDay: PropTypes.string, // eg Biweekly, on Wednesday, from 10am to 5pm
  postcode: PropTypes.string,
  street: PropTypes.string,
  webUrl: PropTypes.string
});

export const OrderPreviewPropTypes = PropTypes.shape({
  completed: PropTypes.bool,
  createdAt: PropTypes.string,
  objectId: PropTypes.string,
  pickupPointName: PropTypes.string,
  farmId: PropTypes.string
});
export const FarmPropTypes = PropTypes.shape({
  about: PropTypes.string,
  addressLevel1: PropTypes.string,
  subscriptions: PropTypes.arrayOf(SubscriptionPropTypes),
  city: PropTypes.string,
  countryCode: PropTypes.string,
  email: PropTypes.string,
  isFarmPickupPoint: PropTypes.bool,
  name: PropTypes.string,
  objectId: PropTypes.string,
  owner: PropTypes.shape({ objectId: PropTypes.string }),
  phoneNumber: PropTypes.string,
  pickupDay: PropTypes.string,
  pickupPoints: PropTypes.arrayOf(PickupPointPropTypes),
  postcode: PropTypes.string,
  productTypes: ProductTypesPropTypes,
  published: PropTypes.bool,
  orders: PropTypes.arrayOf(OrderPreviewPropTypes),
  street: PropTypes.string,
  webUrl: PropTypes.string
});

export const OrderedSubscriptionPropTypes = PropTypes.shape({
  content: PropTypes.string,
  name: PropTypes.string,
  numberOfDeliveries: PropTypes.number,
  pricePerDelivery: PropTypes.number
});

export const OrderPropTypes = PropTypes.shape({
  completed: PropTypes.bool,
  customer: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  farm: PropTypes.shape({
    countryCode: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    objectId: PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  farmId: PropTypes.string,
  journal: PropTypes.string,
  note: PropTypes.string,
  objectId: PropTypes.string,
  pickupPoint: PickupPointPropTypes,
  subscriptions: PropTypes.arrayOf(OrderedSubscriptionPropTypes)
});

export const SortByOrdersEnum = Object.freeze({
  createdAt: "createdAt",
  pickupPointName: "pickupPointName"
});

export const SortByOrdersPropTypes = PropTypes.oneOf(
  Object.values(SortByOrdersEnum)
);
