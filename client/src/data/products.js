const products = [
  {
    id: '1',
    name: 'Ski Mask Pro',
    price: 4999,
    description: 'Stay warm and stylish on the slopes.',
    image: '/images/ski-mask.jpg',
    paymentOptions: ['Regular']
  },
  {
    id: '2',
    name: 'Space Expedition',
    price: 899999,
    description: 'A once-in-a-lifetime orbital adventure.',
    image: '/images/space-trip.jpg',
    paymentOptions: ['Installments', 'Regular'],
  },
  {
    id: '3',
    name: 'Antarctica Cruise',
    price: 499999,
    description: '10-day cruise to the South Pole.',
    image: '/images/antarctica.jpg',
    paymentOptions: ['Installments', 'Regular'],
  },
  {
    id: '4',
    name: 'Monthly Ski Pass',
    price: 1999,
    description: 'Recurring ski pass charged monthly.',
    image: '/images/ski-pass.jpg',
    paymentOptions: ['Recurring'], 
    recurring: {
      interval: 'month',
      intervalCount: 1
    }
  },
  {
    id: '5',
    name: 'Mystery Adventure Voucher',
    price: 9999,
    description: 'Open-dated adventure trip of your choice.',
    image: '/images/mystery-trip.jpg',
    paymentOptions: ['Unscheduled'], 
  },
];

export default products;
