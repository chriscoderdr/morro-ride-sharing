import { forwardRef, useCallback, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { InputText } from 'react-native-morro-taxi-rn-components';
import { SearchBoxCore } from '@mapbox/search-js-core';
import config from '@/src/config';
import { debounce } from '@/src/utils/debouce';
import { ISearchBoxProps } from './props';

export const SearchBox = forwardRef<TextInput, ISearchBoxProps>(
  (
    {
      placeholder,
      onSuggestions,
      onFocus,
      userCurrentLocationInfo,
      sessionRef
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');

    const searchPlace = async (query: string) => {
      if (!sessionRef || sessionRef.current === null) {
        return;
      }
      const search = new SearchBoxCore({
        accessToken: config.MAPBOX_ACCESS_TOKEN
      });
      let latlng;
      let countryCode;
      if (
        userCurrentLocationInfo &&
        userCurrentLocationInfo.features &&
        userCurrentLocationInfo.features.length > 0 &&
        userCurrentLocationInfo.features[0].properties &&
        userCurrentLocationInfo.features[0].properties.context
      ) {
        countryCode = (
          userCurrentLocationInfo.features[0].properties.context.country as any
        )?.country_code;

        latlng = [
          userCurrentLocationInfo?.features[0].geometry.coordinates[0],
          userCurrentLocationInfo?.features[0].geometry.coordinates[1]
        ];
      }
      const result = await search.suggest(query, {
        sessionToken: sessionRef.current,
        proximity: latlng,
        radius: latlng ? 0.1 : undefined,
        country: countryCode,
        types: new Set([
          'poi',
          'address',
          'place',
          'locality',
          'region',
          'district'
        ]) as any,
        navigation_profile: 'driving'
      });
      onSuggestions(result.suggestions);
    };

    const noop = () => {};

    const debouncedSearchPlace = useCallback(
      debounce(searchPlace || noop, 500),
      [searchPlace]
    );

    useEffect(() => {
      if (searchQuery.length > 3) {
        debouncedSearchPlace(searchQuery);
      } else if (searchQuery.length === 0) {
        onSuggestions([]);
      }
    }, [searchQuery]);

    const handleSearchQueryChange = (text: string) => {
      setSearchQuery(text);
    };

    return (
      <View>
        <InputText
          placeholder={placeholder}
          onChangeText={handleSearchQueryChange}
          ref={ref}
          onFocus={onFocus}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  }
);
