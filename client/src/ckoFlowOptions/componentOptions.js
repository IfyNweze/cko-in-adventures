export const getComponentOptions = (customer) => ({
  flow: {
    acceptedCardTypes: ["credit"]
  },
  card: {
    data: {
      cardholderName: customer.name
    },
    displayCardholderName: 'top'
  }
});
