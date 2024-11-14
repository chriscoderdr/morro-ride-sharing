import { FlatList } from 'react-native-gesture-handler';
import PlaceItem from '../place-item';
import { IPlaceListProps } from './props';
import { ItemSeparator } from './item-separator';

const PlaceList = ({ sugestions, onItemPress }: IPlaceListProps) => {
  return (
    <FlatList
      data={sugestions}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <PlaceItem item={item} key={item.mapbox_id} onPress={onItemPress} />
      )}
    />
  );
};

export default PlaceList;
