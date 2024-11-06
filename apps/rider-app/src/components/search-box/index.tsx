import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  InputText,
  InputTextField
} from 'react-native-morro-taxi-rn-components';
import { SearchBoxCore, SessionToken } from '@mapbox/search-js-core';
import config from '@/src/config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SearchBox = ({ showList, placeholder, onSuggestions }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchPlace = async (query: string) => {
    const search = new SearchBoxCore({
      accessToken: config.MAPBOX_ACCESS_TOKEN
    });
    const sessionToken = new SessionToken();
    const result = await search.suggest(query, { sessionToken });
    onSuggestions(result.suggestions);
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
    <View style={{ paddingHorizontal: 20 }}>
      <InputText
        placeholder={placeholder}
        onChangeText={handleSearchQueryChange}
      />
    </View>
  );
};
