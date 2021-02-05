const domains = {
  user: true,
  apiClient: true
};

const logger = Object.entries(domains).reduce(
  (accu, [domainName, isActive]) => ({
    ...accu,
    [domainName]: (...messages) => {
      if (!isActive || process.env.NODE_ENV === "production") return;
      // eslint-disable-next-line no-console
      console.log(`${domainName} logger:`, ...messages);
    }
  }),
  {}
);

export default logger;
