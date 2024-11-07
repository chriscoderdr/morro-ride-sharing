import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBox } from '../search-box';
import { useEffect, useRef, useState } from 'react';
import { RoundedButton } from 'react-native-morro-taxi-rn-components';
import useLocationManager from '@/src/hooks/use-location-manager';
import {
  GeocodingCore,
  GeocodingResponse,
  SearchBoxCore,
  SearchBoxSuggestion,
  SessionToken
} from '@mapbox/search-js-core';
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
  const searchSessionTokenRef = useRef<SessionToken | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [focus, setFocus] = useState('drop-off');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);
  const userLocation = useLocationManager();
  const [userCurrentLocationInfo, setUserCurrentLocationInfo] =
    useState<GeocodingResponse>(null);

  const handleOnPickupSuggestions = (suggestions: SearchBoxSuggestion[]) => {
    setPickupSuggestions(suggestions);
  };

  const handleDropoffSuggestions = (suggestions: SearchBoxSuggestion[]) => {
    setDropoffSuggestions(suggestions);
  };

  const handleDropOffPlaceItemPress = (item: SearchBoxSuggestion) => {
    setSelectedPickup(item);
  };

  const handlePickupPlaceItemPress = (item: SearchBoxSuggestion) => {
    setSelectedDropoff(item);
  };

  const handlePlanRide = async () => {
    console.log('Plan ride');
    const pickupCoordinates = await retrieveSuggestionCoordinates(
      selectedPickup
    );
    const dropoffCoordinates = await retrieveSuggestionCoordinates(
      selectedDropoff
    );
    console.log(
      `Pickup: ${JSON.stringify(pickupCoordinates)} | Dropoff: ${JSON.stringify(
        dropoffCoordinates
      )}`
    );
  };

  const retrieveSuggestionCoordinates = async (place: SearchBoxSuggestion) => {
    if (!searchSessionTokenRef || searchSessionTokenRef.current === null) {
      return;
    }
    const search = new SearchBoxCore({
      accessToken: config.MAPBOX_ACCESS_TOKEN
    });
    return search.retrieve(place, {
      sessionToken: searchSessionTokenRef.current
    });
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

  useEffect(() => {
    if (searchSessionTokenRef.current === null) {
      searchSessionTokenRef.current = new SessionToken();
      console.log('Search session token', searchSessionTokenRef.current);
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <SearchBox
        placeholder={'Current Location'}
        onSuggestions={handleOnPickupSuggestions}
        onFocus={() => setFocus('pickup')}
        userCurrentLocationInfo={userCurrentLocationInfo}
        sessionRef={searchSessionTokenRef}
      />
      <View style={{ marginTop: 30 }} />
      <SearchBox
        placeholder={'Where to?'}
        onSuggestions={handleDropoffSuggestions}
        onFocus={() => setFocus('drop-off')}
        userCurrentLocationInfo={userCurrentLocationInfo}
        sessionRef={searchSessionTokenRef}
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
