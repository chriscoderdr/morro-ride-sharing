import { Text, View, TouchableOpacity } from 'react-native';

const PlaceItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={{ paddingHorizontal: 14, paddingVertical: 8 }}>
        <Text>{item.name}</Text>
        <Text>{item.full_address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
