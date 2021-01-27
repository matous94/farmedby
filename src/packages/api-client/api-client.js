import FarmApiClient from "src/packages/farm/farm-api-client";
import UserApiClient from "src/packages/user/user-api-client";
import NewsletterApiClient from "src/packages/newsletter/newsletter-api-client";

const ApiClient = {
  Farm: FarmApiClient,
  User: UserApiClient,
  Newsletter: NewsletterApiClient,
};

export default ApiClient;
