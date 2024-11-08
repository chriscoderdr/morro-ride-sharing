import {
  LineStringGeometry,
  MultiLineStringGeometry
} from '@/src/services/map-service';
import { ViewStyle } from 'react-native';

export interface IMapViewProps {
  pickup: [number, number];
  dropoff: [number, number];
  route?: MultiLineStringGeometry | LineStringGeometry;
  myLocationButtonStyle?: ViewStyle;
  points?: IMapPointProps[];
}

export interface IMapPointProps {
  coordinates: [number, number];
  iconImage: string;
  pointId: string;
  title: string;
}
