import PropTypes from "prop-types";

export const UserPropTypes = PropTypes.shape({
  createdAt: PropTypes.string,
  email: PropTypes.string,
  objectId: PropTypes.string,
  sessionToken: PropTypes.string,
  updatedAt: PropTypes.string,
  username: PropTypes.string
});
