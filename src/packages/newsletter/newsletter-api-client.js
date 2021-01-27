import sendRequest from "src/packages/api-client/sendRequest";

function subscribe(email) {
  return sendRequest("classes/Newsletter", {
    body: {
      email,
      objectId: email,
    },
  });
}

const NewsletterApiClient = {
  subscribe,
};

export default NewsletterApiClient;
