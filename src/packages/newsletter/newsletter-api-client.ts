// eslint-disable-next-line import/extensions
import { callCloudFunction } from "src/packages/api-client/requester.js";

function subscribeToNewsletter(
  email: string
): Promise<Record<string, unknown>> {
  return callCloudFunction("subscribeToNewsletter", {
    email
  });
}

const NewsletterApiClient = {
  subscribeToNewsletter
};

export default NewsletterApiClient;
