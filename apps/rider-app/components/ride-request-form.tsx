import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { InputText, multiply, TestComponent } from 'react-native-morro-taxi-rn-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceSelector from './place-selector';

const RideRequestForm: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState<{
    address: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);
  const [dropOffLocation, setDropOffLocation] = useState<{
    address: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);

  const baseUrl = 'http://chriscoder.tplinkdns.com:3000'; // replace with actual base URL

  multiply(2, 3).then((result) => {
    console.log('Result:', result);
  });

  const handleSubmit = async () => {
    if (!pickupLocation || !dropOffLocation) {
      Alert.alert('Error', 'Please select both pickup and drop-off locations.');
      return;
    }

    const payload = {
      pickupLocation: {
        latitude: pickupLocation.coordinates.latitude,
        longitude: pickupLocation.coordinates.longitude,
        address: pickupLocation.address
      },
      dropOffLocation: {
        latitude: dropOffLocation.coordinates.latitude,
        longitude: dropOffLocation.coordinates.longitude,
        address: dropOffLocation.address
      }
    };

    const requestUrl = `${baseUrl}/riders/createRideRequest`;

    try {
      console.log('Request URL:', requestUrl);
      console.log('Payload:', JSON.stringify(payload));

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZWViOTljMC03N2NhLTRlMDItYjAxMi04YTdkNzFiZmJlNjYiLCJ1c2VyVHlwZSI6InJpZGVyIiwiaWF0IjoxNzMwNzQ4MDAzLCJleHAiOjE3MzA4MzQ0MDN9.00vxAPszghU4o6MxNY6M2W9TPjkfuw-ZR3mmFgkeyIU'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        Alert.alert('Success', 'Ride request created successfully!');
      } else {
        Alert.alert(
          'Error',
          `Failed to create ride request: ${
            responseData.message || 'Unknown error'
          }`
        );
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        {/* Pickup Location Selector */}
        <PlaceSelector
          label="Pickup Address"
          placeholder="Enter pickup address"
          currentLocation={{ latitude: 14.189096, longitude: 121.131042 }}
          onSelect={(selection) => setPickupLocation(selection)}
        />

        {/* Drop-Off Location Selector */}
        <PlaceSelector
          label="Drop-Off Address"
          placeholder="Enter drop-off address"
          currentLocation={{ latitude: 14.189096, longitude: 121.131042 }}
          onSelect={(selection) => setDropOffLocation(selection)}
        />
        <TestComponent />
        <InputText />
        {/* <InputText  /> */}
        {/* <Button title="Create Ride Request" onPress={handleSubmit} /> */}
      </View>
    </SafeAreaView>
  );
};

export default RideRequestForm;
