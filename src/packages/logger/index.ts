/* eslint-disable no-console */
const domains = {
  user: true,
  apiClient: true,
  app: true,
  farm: true,
  error: true,
  info: true
} as const;

type Domain = keyof typeof domains;

type Logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [domain in Domain]: (...messages: any[]) => void;
};

const logger = Object.entries(domains).reduce(
  (accu, [domainName, isActive]) => ({
    ...accu,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [domainName]: (...messages: any[]) => {
      if (!isActive || process.env.NODE_ENV === "production") return;
      // eslint-disable-next-line no-console
      console.log(`${domainName} logger:`, ...messages);
    }
  }),
  {}
);

export default logger as Logger;
