import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBox } from '../search-box';
import { useEffect, useState } from 'react';
import { RoundedButton } from 'react-native-morro-taxi-rn-components';
import useLocationManager from '@/src/hooks/use-location-manager';
import { GeocodingCore, GeocodingResponse } from '@mapbox/search-js-core';
import config from '@/src/config';

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
  const userLocation = useLocationManager();
  const [userCurrentLocationInfo, setUserCurrentLocationInfo] =
    useState<GeocodingResponse>(null);

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

  const handlePlanRide = () => {
    console.log('Plan ride');
  };

  useEffect(() => {
    console.log(userLocation?.location);
    if (userLocation?.location) {
      userLocation.stopLocationUpdates();
      const fetchData = async () => {
        const userLocationInfo = await getLocatioInfo(userLocation.location);
        setUserCurrentLocationInfo(userLocationInfo);
      };

      fetchData().then().catch(console.error);
    }
  }, [userLocation.location]);

  const getLocatioInfo = async (location) => {
    const geocoding = new GeocodingCore({
      accessToken: config.MAPBOX_ACCESS_TOKEN
    });
    const result = await geocoding.reverse(location);
    console.log(result.features[0].properties.context.country);
    return result;
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <SearchBox
        placeholder={'Current Location'}
        onSuggestions={handleOnPickupSuggestions}
        onFocus={() => setFocus('pickup')}
        userCurrentLocationInfo={userCurrentLocationInfo}
      />
      <View style={{ marginTop: 30 }} />
      <SearchBox
        placeholder={'Where to?'}
        onSuggestions={handleDropoffSuggestions}
        onFocus={() => setFocus('drop-off')}
        userCurrentLocationInfo={userCurrentLocationInfo}
      />
      <View style={{ marginTop: 30 }} />
      {selectedPickup && selectedDropoff && (
        <View>
          <Text>From: {selectedPickup.name}</Text>
          <Text>To: {selectedDropoff.name}</Text>
          <RoundedButton text={'Plan Ride'} onPress={handlePlanRide} />
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
