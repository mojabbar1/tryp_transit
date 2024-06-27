'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IncentivesPage = () => {
  return (
    <>
      <h2 className="text-3xl md:text-5xl font-bold w-full bg-secondary p-6 text-center">
        Tryp Incentives Program
      </h2>
      <div className="flex flex-col items-center p-6 text-secondary-foreground text-center w-full">
        <div className="flex justify-center w-full"></div>
        <div className="w-full max-w-2xl space-y-4 pb-16">
          <p className="text-lg mb-8">
            The Tryp Incentives Program rewards you for taking the bus during
            different traffic conditions. Earn e-gift cards based on the traffic
            density when you ride!
          </p>
          <Card className="bg-primary-foreground shadow-2xl rounded-lg overflow-hidden">
            <CardHeader className="bg-primary p-4">
              <CardTitle className="text-secondary text-xl font-semibold">
                Light Traffic
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-primary-foreground text-center">
              <p className="text-lg text-secondary-foreground font-medium">
                Earn a $1 e-gift card for riding the bus during light traffic
                times.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground shadow-2xl rounded-lg overflow-hidden">
            <CardHeader className="bg-primary p-4">
              <CardTitle className="text-secondary text-xl font-semibold">
                Normal Traffic
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-primary-foreground text-center">
              <p className="text-lg text-secondary-foreground font-medium">
                Earn a $2 e-gift card for riding the bus during normal traffic
                times.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground shadow-2xl rounded-lg overflow-hidden">
            <CardHeader className="bg-primary p-4">
              <CardTitle className="text-secondary text-xl font-semibold">
                Heavy Traffic
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-primary-foreground text-center">
              <p className="text-lg text-secondary-foreground font-medium">
                Earn a $4 e-gift card for riding the bus during heavy traffic
                times.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default IncentivesPage;
