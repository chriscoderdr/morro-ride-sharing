import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  InputText,
  InputTextField
} from 'react-native-morro-taxi-rn-components';
import { SearchBoxCore, SessionToken } from '@mapbox/search-js-core';
import config from '@/src/config';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);

  const searchPlace = async (query: string) => {
    const search = new SearchBoxCore({
      accessToken: config.MAPBOX_ACCESS_TOKEN
    });
    const sessionToken = new SessionToken();
    const result = await search.suggest(query, { sessionToken });
    setPlaces(result.suggestions);
    console.log(`Search result: ${JSON.stringify(result)}`);
  };

  useEffect(() => {
    if (searchQuery.length > 3) {
      searchPlace(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <View style={{ paddingVertical: 100, paddingHorizontal: 20 }}>
      <InputText
        placeholder="Where to?"
        onChangeText={handleSearchQueryChange}
      />
      <FlatList
        data={places}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#000000' }} />}
        renderItem={({ item }) => (
          <PlaceItem item={item} key={item.mapbox_id} />
        )}
      />
    </View>
  );
};
