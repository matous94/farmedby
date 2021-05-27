import dayjs from "dayjs";

export function getPricePerDelivery({ subscription, numberOfDeliveries }) {
  const { options } = subscription;
  const initialPrice = options[0].pricePerDelivery;

  return options.reduce((price, option) => {
    if (numberOfDeliveries >= option.numberOfDeliveries) {
      // eslint-disable-next-line no-param-reassign
      price = option.pricePerDelivery;
    }
    return price;
  }, initialPrice);
}

export function numberOfDaysUntilEndOfSeason(endOfSeason) {
  if (endOfSeason == null) throw new Error("endOfSeason is required argument");
  const endOfSeasonDate = dayjs(endOfSeason);
  const now = dayjs(dayjs().format("MM-DD-YYYY"));
  return endOfSeasonDate.diff(now, "day");
}

export function isSubscriptionExpired(endOfSeason) {
  if (endOfSeason == null) return false;
  return numberOfDaysUntilEndOfSeason(endOfSeason) <= 0;
}
