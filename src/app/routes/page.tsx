'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTravelContext } from '@/contexts/travel-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RoutesPage = () => {
  const { costSavings, trafficDensity, travelTime } = useTravelContext();
  const router = useRouter();

  useEffect(() => {
    if (!costSavings || !trafficDensity || !travelTime) {
      router.push('/dashboard');
    }
  }, [costSavings, trafficDensity, travelTime, router]);

  const getIncentive = (density: string | null) => {
    if (!density) {
      return 'No incentive';
    }
    switch (density.toLowerCase()) {
      case 'light':
        return '$1 e-card';
      case 'medium':
        return '$2 e-card';
      case 'heavy':
        return '$4 e-card';
      default:
        return 'No incentive';
    }
  };

  const getCurrentTime = () => new Date();

  const calculateArrivalTime = () => {
    const now = getCurrentTime();
    const arrivalTime = new Date(now.getTime() + travelTime! * 60000);
    const bufferTime = 10;
    const arrivalAtBusStop = new Date(
      arrivalTime.getTime() - bufferTime * 60000,
    );
    return arrivalAtBusStop.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className="p-6 bg-secondary text-secondary-foreground text-center">
        <h2 className="text-3xl font-bold">DID YOU KNOW?</h2>
        <p className="mt-2 text-lg">
          On average, users save{' '}
          <span className="font-bold">{costSavings}</span> on this trip by
          taking the <span className="font-bold">bus</span> versus driving.
        </p>
      </div>
      <div className="flex flex-col items-center mx-10 mt-10 lg:mx-24">
        <h1 className="text-primary font-bold text-4xl mb-8">MY REWARDS</h1>
        <Card className="w-full max-w-2xl bg-primary-foreground rounded-lg overflow-hidden mb-8 shadow-2xl">
          <CardHeader className="bg-primary p-6">
            <CardTitle className="text-primary-foreground text-2xl font-semibold">
              My Tryp
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-primary-foreground">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-center bg-primary p-4 rounded-lg shadow-md w-full">
                <p className="text-lg text-white font-medium">
                  You should arrive at the bus stop by:{' '}
                  <span className="font-bold">{calculateArrivalTime()}</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center bg-secondary p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-secondary-foreground">
                  Traffic Density
                </p>
                <p className="text-2xl text-primary-foreground font-bold">
                  {trafficDensity}
                </p>
              </div>
              <div className="flex flex-col items-center bg-secondary p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-secondary-foreground">
                  Travel Time
                </p>
                <p className="text-2xl text-primary-foreground font-bold">
                  {travelTime} minutes
                </p>
              </div>
              <div className="flex flex-col items-center bg-secondary p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-secondary-foreground">
                  Incentive
                </p>
                <p className="text-2xl text-primary-foreground font-bold">
                  {getIncentive(trafficDensity)}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-secondary flex justify-between">
            <a
              href="https://www.ridecarta.com/fares-passes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-[#3CC168]/80">
                BOOK NOW WITH CARTA
              </Button>
            </a>
            <Link href="/find-rides">
              <Button className="bg-primary hover:bg-[#3CC168]/80">
                PLAN ANOTHER ROUTE
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RoutesPage;
