import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBox } from '../search-box';
import { useEffect, useState } from 'react';

const PlaceItem = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={{ paddingHorizontal: 14, paddingVertical: 8 }}>
        <Text>{item.name}</Text>
        <Text>{item.place_formatted}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PlanRide = () => {
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [focus, setFocus] = useState('drop-off');

  const handleOnPickupSuggestions = (suggestions) => {
    setPickupSuggestions(suggestions);
  };

  const handleDropoffSuggestions = (suggestions) => {
    setDropoffSuggestions(suggestions);
  };

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1 }}>
      <SearchBox
        placeholder={'Current Location'}
        onSuggestions={handleOnPickupSuggestions}
        onFocus={() => setFocus('pickup')}
      />
      <View style={{ marginTop: 30 }} />
      <SearchBox
        placeholder={'Where to?'}
        onSuggestions={handleDropoffSuggestions}
        onFocus={() => setFocus('drop-off')}
      />
      <View style={{ marginTop: 30 }} />
      {pickupSuggestions && focus === 'pickup' && (
        <FlatList
          data={pickupSuggestions}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: '#000000' }} />
          )}
          renderItem={({ item }) => (
            <PlaceItem item={item} key={item.mapbox_id} />
          )}
        />
      )}
      {dropoffSuggestions && focus === 'drop-off' && (
        <FlatList
          data={dropoffSuggestions}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: '#000000' }} />
          )}
          renderItem={({ item }) => (
            <PlaceItem item={item} key={item.mapbox_id} />
          )}
        />
      )}
    </View>
  );
};
