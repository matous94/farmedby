import { callCloudFunction } from "src/packages/api-client/requester";

import FarmApiClient from "src/packages/farm/farm-api-client";
import OrderApiClient from "src/packages/order/order-api-client";
import UserApiClient from "src/packages/user/user-api-client";
import NewsletterApiClient from "src/packages/newsletter/newsletter-api-client";

const ApiClient = {
  Farm: FarmApiClient,
  Order: OrderApiClient,
  User: UserApiClient,
  Newsletter: NewsletterApiClient,
  LegalDocument: {
    getLegalDocument(documentId) {
      return callCloudFunction("getLegalDocument", { documentId });
    }
  }
};

export default ApiClient;
