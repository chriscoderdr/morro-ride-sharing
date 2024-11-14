export interface Coordinates {
    longitude: number;
    latitude: number;
}
export interface LineStringGeometry {
    type: 'LineString';
    coordinates: [number, number][];
}
export interface MultiLineStringGeometry {
    type: 'MultiLineString';
    coordinates: [number, number][][];
}
export type RouteGeometry = LineStringGeometry | MultiLineStringGeometry;
declare class MapService {
    private static instance;
    private config;
    private client;
    private constructor();
    static getInstance(config: {
        MAPBOX_ACCESS_TOKEN: string;
    }): MapService;
    private initializeMapService;
    getRoute: (userLocation: any, pickupPoint: any, dropOffPoint: any) => Promise<RouteGeometry | undefined>;
}
export default MapService;
//# sourceMappingURL=map-service.d.ts.map