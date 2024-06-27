'use client';

import { TravelContextProps, TravelProviderProps } from '@/types/interfaces';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const TravelContext = createContext<TravelContextProps | undefined>(undefined);

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};

export const TravelProvider = ({ children }: TravelProviderProps) => {
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [trafficDensity, setTrafficDensity] = useState<string | null>(null);
  const [costSavings, setCostSavings] = useState<number | null>(null);

  const setTravelData = ({
    travelTime,
    trafficDensity,
    costSavings,
  }: {
    travelTime: number | null;
    trafficDensity: string | null;
    costSavings: number | null;
  }) => {
    setTravelTime(travelTime);
    setTrafficDensity(trafficDensity);
    setCostSavings(costSavings !== undefined ? costSavings : null);
  };

  return (
    <TravelContext.Provider
      value={{
        travelTime,
        trafficDensity,
        costSavings,
        setTravelData,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
