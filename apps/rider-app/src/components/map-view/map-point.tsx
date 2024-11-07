import Mapbox from '@rnmapbox/maps';

const MapPoint = ({ coordinates, iconImage, pointId, title }) => {
  const shapeId = `${pointId}Source`;
  const symbolId = `${pointId}Symbol`;

  return (
    <Mapbox.ShapeSource
      id={shapeId}
      shape={{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        properties: {
          title: title
        }
      }}
    >
      <Mapbox.SymbolLayer
        id={symbolId}
        style={{
          iconImage: iconImage,
          iconSize: 1
        }}
      />
    </Mapbox.ShapeSource>
  );
};

export default MapPoint;
