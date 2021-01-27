import PropTypes from "prop-types";

export const FarmPropTypes = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  owner: PropTypes.string,
  public: PropTypes.bool,
  about: PropTypes.string,
  phoneNumber: PropTypes.string,
  street: PropTypes.string,
  houseNumber: PropTypes.string,
  city: PropTypes.string,
  postalCode: PropTypes.string,
  webUrl: PropTypes.string,
  country: PropTypes.string,
  aboutCsa: PropTypes.string,
  dropOffPoints: PropTypes.arrayOf(PropTypes.shape({})),
  useFarmAsDropOffPoint: PropTypes.bool,
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      display: PropTypes.bool,
      name: PropTypes.string,
      monthlySubscription: PropTypes.shape({
        display: PropTypes.bool,
        price: PropTypes.number
      }),
      biannualSubscription: PropTypes.shape({
        display: PropTypes.bool,
        price: PropTypes.number
      }),
      annualSubscription: PropTypes.shape({
        display: PropTypes.bool,
        price: PropTypes.number
      })
    })
  )
});

/* const DropOffPoint = {
  id: 7f61cf1,
  name: "BioKoko",
  address: {
    country: "Czech Republic",
    city: "Decin",
    street: "Ruzovka",
    houseNumber: 12,
    psc: 40502
  }
}
 */
