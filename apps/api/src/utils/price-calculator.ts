const calculateRidePrice = (distance: number): number => {
  const distanceInKm = distance / 1000;
  const price = distanceInKm * 30;
  if (price < 100) {
    return 100;
  }
  return Math.floor(price);
};

export default { calculateRidePrice };
