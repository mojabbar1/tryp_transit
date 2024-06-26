import { StaticImageData } from 'next/image';

export interface BackgroundPhotoProps {
  imgOne: StaticImageData;
  imgTwo: StaticImageData;
  imgThree: StaticImageData;
  imgFour: StaticImageData;
}

export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface GeolocationContextProps {
  coordinates: Coordinates;
  error: string | null;
}

export interface TrafficData {
  flow: any;
  incidents: any;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface RequestBody {
  currentLocation: Coordinates;
  destination: Location;
  timeToDestination: string;
}
