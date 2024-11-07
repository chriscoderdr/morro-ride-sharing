import { forwardRef, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { InputText } from 'react-native-morro-taxi-rn-components';
import {
  GeocodingResponse,
  SearchBoxCore,
  SearchBoxSuggestion,
  SessionToken
} from '@mapbox/search-js-core';
import config from '@/src/config';

interface ISearchBoxProps {
  placeholder: string;
  onSuggestions: (suggestions: SearchBoxSuggestion[]) => void;
  onFocus?: () => void;
  userCurrentLocationInfo?: GeocodingResponse;
  sessionRef?: React.MutableRefObject<SessionToken | null>;
}

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
      if (!sessionRef || !sessionRef.current === null) {
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
        country: countryCode
      });
      console.log(`country code: ${countryCode}`);
      console.log(`proximity: ${latlng.lng}, ${latlng.lat}`);
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
      <View>
        <InputText
          placeholder={placeholder}
          onChangeText={handleSearchQueryChange}
          ref={ref}
          onFocus={onFocus}
        />
      </View>
    );
  }
);
