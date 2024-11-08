import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PlaceItem from '../place-item';

const PlaceList = ({ sugestions, onItemPress }) => {
  return (
    <FlatList
      data={sugestions}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: '#000000' }} />
      )}
      renderItem={({ item }) => (
        <PlaceItem item={item} key={item.mapbox_id} onPress={onItemPress} />
      )}
    />
  );
};

export default PlaceList;
