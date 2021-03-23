import { callCloudFunction } from "src/packages/api-client/requester";

function subscribeToNewsletter(email) {
  return callCloudFunction("subscribeToNewsletter", {
    email
  });
}

const NewsletterApiClient = {
  subscribeToNewsletter
};

export default NewsletterApiClient;
