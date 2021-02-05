import { sendParseRequest } from "src/packages/api-client/requester";

function subscribe(email) {
  return sendParseRequest("classes/Newsletter", {
    body: {
      email,
      objectId: email
    }
  });
}

const NewsletterApiClient = {
  subscribe
};

export default NewsletterApiClient;
