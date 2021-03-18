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

export const BoxPropTypes = PropTypes.shape({
  content: PropTypes.string,
  discountPerBox: PropTypes.number,
  name: PropTypes.string,
  objectId: PropTypes.string,
  unitPrice: PropTypes.number
});

export const PickupPointPropTypes = PropTypes.shape({
  city: PropTypes.string,
  countryCode: PropTypes.string,
  pickupDay: PropTypes.string, // eg Biweekly, on Wednesday, from 10am to 5pm
  email: PropTypes.string,
  name: PropTypes.string,
  objectId: PropTypes.string,
  phoneNumber: PropTypes.string,
  postcode: PropTypes.string,
  street: PropTypes.string,
  webUrl: PropTypes.string
});

export const FarmPropTypes = PropTypes.shape({
  about: PropTypes.string,
  boxes: PropTypes.arrayOf(BoxPropTypes),
  city: PropTypes.string,
  countryCode: PropTypes.string,
  email: PropTypes.string,
  isPickupPoint: PropTypes.bool,
  name: PropTypes.string,
  objectId: PropTypes.string,
  owner: PropTypes.shape({ objectId: PropTypes.string }),
  phoneNumber: PropTypes.string,
  pickupPoints: PropTypes.arrayOf(PickupPointPropTypes),
  postcode: PropTypes.string,
  productTypes: ProductTypesPropTypes,
  published: PropTypes.bool,
  street: PropTypes.string,
  webUrl: PropTypes.string
});
