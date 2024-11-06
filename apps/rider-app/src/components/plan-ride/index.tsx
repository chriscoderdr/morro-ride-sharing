import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBox } from '../search-box';
import { useEffect, useState } from 'react';
import { RoundedButton } from 'react-native-morro-taxi-rn-components';

const PlaceItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
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
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);

  const handleOnPickupSuggestions = (suggestions) => {
    setPickupSuggestions(suggestions);
  };

  const handleDropoffSuggestions = (suggestions) => {
    setDropoffSuggestions(suggestions);
  };

  const handleDropOffPlaceItemPress = (item) => {
    setSelectedPickup(item);
  };

  const handlePickupPlaceItemPress = (item) => {
    setSelectedDropoff(item);
  };

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
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
      {selectedPickup && selectedDropoff && (
        <View>
          <Text>From: {selectedPickup.name}</Text>
          <Text>To: {selectedDropoff.name}</Text>
          <RoundedButton
            text={'Plan Ride'}
            onPress={() => console.log('Plan ride')}
          />
        </View>
      )}

      <View style={{ marginTop: 30 }} />
      {pickupSuggestions && focus === 'pickup' && (
        <FlatList
          data={pickupSuggestions}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: '#000000' }} />
          )}
          renderItem={({ item }) => (
            <PlaceItem
              item={item}
              key={item.mapbox_id}
              onPress={handlePickupPlaceItemPress}
            />
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
            <PlaceItem
              item={item}
              key={item.mapbox_id}
              onPress={handleDropOffPlaceItemPress}
            />
          )}
        />
      )}
    </View>
  );
};
