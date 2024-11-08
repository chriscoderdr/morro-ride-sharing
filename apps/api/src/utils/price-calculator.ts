const calculateRidePrice = (distance: number): number => {
  const price = distance * 30;
  if (price < 100) {
    return 100;
  }
  return price;
};

export default { calculateRidePrice };
