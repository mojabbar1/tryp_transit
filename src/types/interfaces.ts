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

export interface LocationInterface {
  lat: number;
  lng: number;
}

export interface RequestBody {
  departure: LocationInterface;
  destination: LocationInterface;
  timeToDestination: string;
}

export interface TravelContextProps {
  travelTime: number | null;
  trafficDensity: string | null;
  costSavings: number | null;
  setTravelData: (data: {
    travelTime: number | null;
    trafficDensity: string | null;
    costSavings: number | null;
  }) => void;
}

export interface BusStopCoordinates {
  [key: string]: LocationInterface;
}
