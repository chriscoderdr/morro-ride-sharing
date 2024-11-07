import { LineStringGeometry, MultiLineStringGeometry } from "@/src/services/map-service";

export interface IMapViewProps {
  pickup: [number, number];
  dropoff: [number, number];
  route?: MultiLineStringGeometry | LineStringGeometry;
}

export interface IMapPointProps {
  coordinates: [number, number];
  iconImage: string;
  pointId: string;
  title: string;
}
