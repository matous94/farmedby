const domains = {
  user: true
};

const logger = Object.entries(domains).reduce(
  (accu, [domainName, isActive]) => ({
    ...accu,
    [domainName]: (message) => {
      if (!isActive || process.env.NODE_ENV === "production") return;
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }),
  {}
);

export default logger;
