import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBox } from '../search-box';
import { useState } from 'react';

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

  const handleFocusChange = (focus) => {};

  return (
    <View style={{ flex: 1 }}>
      <SearchBox
        showList
        placeholder={'Current Location'}
        onSuggestions={handleOnPickupSuggestions}
      />
      <View style={{ marginTop: 30 }} />
      <SearchBox
        showList
        placeholder={'Where to?'}
        onSuggestions={handleDropoffSuggestions}
      />
      <View style={{ marginTop: 30 }} />
      {pickupSuggestions && (
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
      {dropoffSuggestions && (
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
