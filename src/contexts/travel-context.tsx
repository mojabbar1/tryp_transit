'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdditionalRide {
  travelTime: number | null;
  trafficDensity: string | null;
}

interface TravelContextProps {
  travelTime: number | null;
  trafficDensity: string | null;
  costSavings: number | null;
  additionalRides: AdditionalRide[];
  setTravelData: (data: {
    travelTime: number | null;
    trafficDensity: string | null;
    costSavings: number | null;
    additionalRides: AdditionalRide[];
  }) => void;
}

const TravelContext = createContext<TravelContextProps | undefined>(undefined);

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};

interface TravelProviderProps {
  children: ReactNode;
}

export const TravelProvider = ({ children }: TravelProviderProps) => {
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [trafficDensity, setTrafficDensity] = useState<string | null>(null);
  const [costSavings, setCostSavings] = useState<number | null>(null);
  const [additionalRides, setAdditionalRides] = useState<AdditionalRide[]>([]);

  const setTravelData = ({
    travelTime,
    trafficDensity,
    costSavings,
    additionalRides,
  }: {
    travelTime: number | null;
    trafficDensity: string | null;
    costSavings: number | null;
    additionalRides: AdditionalRide[];
  }) => {
    setTravelTime(travelTime);
    setTrafficDensity(trafficDensity);
    setCostSavings(costSavings !== undefined ? costSavings : null);
    setAdditionalRides(additionalRides);
  };

  return (
    <TravelContext.Provider
      value={{
        travelTime,
        trafficDensity,
        costSavings,
        additionalRides,
        setTravelData,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
