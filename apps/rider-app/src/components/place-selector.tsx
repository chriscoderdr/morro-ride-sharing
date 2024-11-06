import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PlaceSelectorProps {
  label: string;
  placeholder: string;
  onSelect: (selection: { address: string; coordinates: { latitude: number; longitude: number } }) => void;
  currentLocation: { latitude: number; longitude: number }; // Pass the user's current location
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDn4c5WHIVH_m19qLVsb33IP610b-7meYg';

const PlaceSelector: React.FC<PlaceSelectorProps> = ({ label, placeholder, onSelect, currentLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ display_name: string; coordinates: { latitude: number; longitude: number } }[]>([]);

  const fetchNearbyPlaces = async (input: string) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&location=${currentLocation.latitude},${currentLocation.longitude}&radius=5000&keyword=`;
    try {
      const response = await fetch(`${baseUrl}${encodeURIComponent(input)}`);
      if (response.ok) {
        const data = await response.json();
        const formattedSuggestions = data.results.map((result: any) => ({
          display_name: result.name,
          coordinates: {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          },
        }));
        setSuggestions(formattedSuggestions);
      } else {
        setSuggestions([]);
        console.warn('Failed to fetch suggestions. Check API key and usage limits.');
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (input: string) => {
    setQuery(input);
    if (input.length > 2) {
      fetchNearbyPlaces(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (address: string, coordinates: { latitude: number; longitude: number }) => {
    setQuery(address);
    setSuggestions([]);
    onSelect({ address, coordinates });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{label}:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingLeft: 8,
          marginBottom: 5,
        }}
        placeholder={placeholder}
        value={query}
        onChangeText={handleInputChange}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.display_name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item.display_name, item.coordinates)}>
              <Text style={{ padding: 10, backgroundColor: '#f0f0f0' }}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 150, borderColor: 'gray', borderWidth: 1 }}
        />
      )}
    </View>
  );
};

export default PlaceSelector;
