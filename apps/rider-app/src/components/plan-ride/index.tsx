import { Alert, Text, View } from 'react-native';
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
import { useCreateRideRequestRideMutation } from '@/src/store/slices/api-slice';
import PlaceList from '../place-list';
import { styles } from './styles';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { setRidePickup, setRidePlaces } from '@/src/store/slices/ride-slice';
import { useRouter } from 'expo-router';

export const PlanRide = () => {
  const searchSessionTokenRef = useRef<SessionToken | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [focus, setFocus] = useState('drop-off');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);
  const userLocation = useLocationManager();
  const [userCurrentLocationInfo, setUserCurrentLocationInfo] =
    useState<GeocodingResponse>(null);
  const [createRideRequest, { isLoading }] = useCreateRideRequestRideMutation();

  const handleOnPickupSuggestions = (suggestions: SearchBoxSuggestion[]) => {
    setPickupSuggestions(suggestions);
  };

  const handleDropoffSuggestions = (suggestions: SearchBoxSuggestion[]) => {
    setDropoffSuggestions(suggestions);
  };

  const handleDropOffPlaceItemPress = (item: SearchBoxSuggestion) => {
    setSelectedDropoff(item);
  };

  const handlePickupPlaceItemPress = (item: SearchBoxSuggestion) => {
    setSelectedPickup(item);
  };

  const handlePlanRide = async () => {
    try {
      const pickupCoordinates = await retrieveSuggestionCoordinates(
        selectedPickup
      );
      const dropoffCoordinates = await retrieveSuggestionCoordinates(
        selectedDropoff
      );
      dispatch(
        setRidePlaces({
          pickup: {
            address: selectedPickup.name,
            coordinates: [
              pickupCoordinates.features[0].geometry.coordinates[0],
              pickupCoordinates.features[0].geometry.coordinates[1]
            ]
          },
          dropoff: {
            address: selectedPickup.name,
            coordinates: [
              dropoffCoordinates.features[0].geometry.coordinates[0],
              dropoffCoordinates.features[0].geometry.coordinates[1]
            ]
          }
        })
      );

      const response = await createRideRequest({
        pickupLocation: {
          address: selectedPickup.name,
          latitude: pickupCoordinates.features[0].geometry.coordinates[1],
          longitude: pickupCoordinates.features[0].geometry.coordinates[0]
        },
        dropOffLocation: {
          address: selectedDropoff.name,
          latitude: dropoffCoordinates.features[0].geometry.coordinates[1],
          longitude: dropoffCoordinates.features[0].geometry.coordinates[0]
        }
      });
      Alert.alert('Ride Request', response.data.message);
      router.navigate('/confirm-ride');
    } catch (error) {
      Alert.alert('Ride Request Error', error.message);
    }
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
    return result;
  };

  useEffect(() => {
    if (searchSessionTokenRef.current === null) {
      searchSessionTokenRef.current = new SessionToken();
      console.log('Search session token', searchSessionTokenRef.current);
    }
  }, []);

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder={'Current Location'}
        onSuggestions={handleOnPickupSuggestions}
        onFocus={() => setFocus('pickup')}
        userCurrentLocationInfo={userCurrentLocationInfo}
        sessionRef={searchSessionTokenRef}
      />
      <View style={styles.separator} />
      <SearchBox
        placeholder={'Where to?'}
        onSuggestions={handleDropoffSuggestions}
        onFocus={() => setFocus('drop-off')}
        userCurrentLocationInfo={userCurrentLocationInfo}
        sessionRef={searchSessionTokenRef}
      />

      {selectedPickup && selectedDropoff && (
        <View style={styles.planRideContainer}>
          <Text>From: {selectedPickup.name}</Text>
          <Text>To: {selectedDropoff.name}</Text>
          <RoundedButton
            text={isLoading ? 'Planning Ride' : 'Plan Ride'}
            onPress={handlePlanRide}
          />
        </View>
      )}

      <View style={styles.listContainers} />
      {pickupSuggestions && focus === 'pickup' && (
        <PlaceList
          sugestions={pickupSuggestions}
          onItemPress={handlePickupPlaceItemPress}
        />
      )}
      {dropoffSuggestions && focus === 'drop-off' && (
        <PlaceList
          sugestions={dropoffSuggestions}
          onItemPress={handleDropOffPlaceItemPress}
        />
      )}
    </View>
  );
};
