'use client';

import { Coordinates, GeolocationContextProps } from '@/types/interfaces';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

const GeolocationContext = createContext<GeolocationContextProps | undefined>(
  undefined,
);

const GeolocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Error: ${err.message}`);
        },
      );
    }
  }, []);

  return (
    <GeolocationContext.Provider value={{ coordinates, error }}>
      {children}
    </GeolocationContext.Provider>
  );
};

const useGeolocation = (): GeolocationContextProps => {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
};

export { GeolocationProvider, useGeolocation };
