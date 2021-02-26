import PropTypes from "prop-types";

export const FarmPropTypes = PropTypes.shape({
  about: PropTypes.string,
  city: PropTypes.string,
  countryCode: PropTypes.string,
  email: PropTypes.string,
  houseNumber: PropTypes.string,
  isPickUpPoint: PropTypes.bool,
  name: PropTypes.string,
  owner: PropTypes.string,
  phoneNumber: PropTypes.string,
  postcode: PropTypes.string,
  productTypes: PropTypes.arrayOf(PropTypes.string),
  public: PropTypes.bool,
  street: PropTypes.string,
  webUrl: PropTypes.string
});

export const ProductTypes = {
  meat: "meat",
  vegetables: "vegetables",
  eggs: "eggs",
  dairy: "dairy",
  fruits: "fruits"
};
