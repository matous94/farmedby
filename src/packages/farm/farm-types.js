import PropTypes from "prop-types";

export const ProductTypes = Object.freeze({
  meat: "meat",
  vegetables: "vegetables",
  eggs: "eggs",
  dairy: "dairy",
  fruits: "fruits"
});

export const BoxPropTypes = PropTypes.shape({
  content: PropTypes.string.isRequired,
  discountPerBox: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired
});

export const PickUpPointPropTypes = PropTypes.shape({
  city: PropTypes.string.isRequired,
  houseNumber: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  deliveryDay: PropTypes.string.isRequired, // eg Biweekly, on Wednesday, from 10am to 5pm
  email: PropTypes.string,
  name: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  postcode: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  webUrl: PropTypes.string
});

export const FarmPropTypes = PropTypes.shape({
  about: PropTypes.string,
  boxes: PropTypes.arrayOf(BoxPropTypes),
  city: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  houseNumber: PropTypes.string.isRequired,
  isPickUpPoint: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  pickUpPoints: PropTypes.arrayOf(PickUpPointPropTypes),
  postcode: PropTypes.string.isRequired,
  productTypes: PropTypes.arrayOf(Object.values(ProductTypes)).isRequired,
  public: PropTypes.bool.isRequired,
  street: PropTypes.string.isRequired,
  webUrl: PropTypes.string
});
