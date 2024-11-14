import { LineStringGeometry, MultiLineStringGeometry } from '../../services/map-service';
import { ViewStyle } from 'react-native';
export interface IMapViewProps {
    pickup?: [number, number];
    dropoff?: [number, number];
    route?: MultiLineStringGeometry | LineStringGeometry;
    myLocationButtonStyle?: ViewStyle;
    navigationButtonStyle?: ViewStyle;
    points?: IMapPointProps[];
    onUserLocationUpdate?: (location: any) => void;
    showNavigationButton?: boolean;
}
export interface IMapPointProps {
    coordinates: [number, number];
    iconImage: string;
    pointId: string;
    title: string;
}
//# sourceMappingURL=props.d.ts.map