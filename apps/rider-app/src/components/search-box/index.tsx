import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  InputText,
  InputTextField
} from 'react-native-morro-taxi-rn-components';

export const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (text: string) => {
        setSearchQuery(text);
    };

    useEffect(() => {
        console.log(searchQuery);
    }, [searchQuery]);

  return (
    <View style={{ paddingVertical: 100, paddingHorizontal: 20 }}>
      <InputText placeholder="Where to?" onChangeText={handleSearchQueryChange} />
    </View>
  );
};
