const formatDistance = (distance: number) => {
  if (distance < 0) {
    return '0 km';
  }
  const distanceInKm = Math.floor(distance / 1000);
  return `${distanceInKm} km`;
};

const formatTime = (duration: number) => {
  if (duration < 0) {
    return '0 minutes';
  }
  const timeInMinutes = Math.floor(duration / 60);
  return `${timeInMinutes} minutes`;
};

export default { formatDistance, formatTime };
