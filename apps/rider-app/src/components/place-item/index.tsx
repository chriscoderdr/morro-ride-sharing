import { Text, View, TouchableOpacity } from 'react-native';
import { IPlaceItemProps } from './props';
import { styles } from './styles';

const PlaceItem = ({ item, onPress }: IPlaceItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Text>{item.name}</Text>
        <Text>{item.full_address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
