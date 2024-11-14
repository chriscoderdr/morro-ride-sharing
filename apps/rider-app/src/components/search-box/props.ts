import { GeocodingResponse, SearchBoxSuggestion, SessionToken } from "@mapbox/search-js-core";

export interface ISearchBoxProps {
  placeholder: string;
  onSuggestions: (suggestions: SearchBoxSuggestion[]) => void;
  onFocus?: () => void;
  userCurrentLocationInfo?: GeocodingResponse;
  sessionRef?: React.MutableRefObject<SessionToken | null>;
}