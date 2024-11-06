import { useState } from 'react';
import MapService, {
  Coordinates,
  RouteGeometry
} from '../services/map-service';

interface UseRouteResult {
  route: RouteGeometry | null;
  loading: boolean;
  error: string | null;
  fetchRoute: (
    userLocation: Coordinates,
    pickupPoint: Coordinates,
    dropOffPoint: Coordinates
  ) => Promise<void>;
}

const useRoute = (): UseRouteResult => {
  const [route, setRoute] = useState<RouteGeometry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoute = async (
    userLocation: Coordinates,
    pickupPoint: Coordinates,
    dropOffPoint: Coordinates
  ) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedRoute = await MapService.getRoute(
        userLocation,
        pickupPoint,
        dropOffPoint
      );
      setRoute(fetchedRoute || null);
    } catch (err) {
      setError('Failed to fetch route');
    } finally {
      setLoading(false);
    }
  };

  return { route, loading, error, fetchRoute };
};

export default useRoute;
