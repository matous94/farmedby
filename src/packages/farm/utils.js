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
