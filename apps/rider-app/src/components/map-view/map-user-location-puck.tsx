import Mapbox from '@rnmapbox/maps';

const MapUserLocationPuck = () => {
  return (
    <Mapbox.LocationPuck
      visible
      topImage="me"
      puckBearingEnabled
      pulsing={{
        isEnabled: true,
        color: '#CCCCCC',
        radius: 50.0
      }}
    />
  );
};

export default MapUserLocationPuck;
