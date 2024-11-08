import Mapbox from '@rnmapbox/maps';

export const MapRoute = ({ route }) => {
  return (
    <Mapbox.ShapeSource id="routeSource" shape={route}>
      <Mapbox.LineLayer
        id="routeLine"
        style={{
          lineWidth: 5,
          lineColor: '#00A8FF'
        }}
      />
    </Mapbox.ShapeSource>
  );
};

export default MapRoute;
