'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useGeolocation } from '@/contexts/geolocation-context-provider';
import useRequireAuth from '../hooks/useRequireAuth';
import { busStops } from '@/app/data/busStops';
import BusPhotoFour from '@/public/bus-four.jpg';
import BusPhotoEight from '@/public/bus-eight.jpg';
import BusPhotoTen from '@/public/bus-ten.jpg';
import BusPhotoTwelve from '@/public/bus-twelve.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { routesFormSchema } from '@/validation/routesFormSchema';
import BackgroundPhoto from '@/components/background-photo';
import { useTravelContext } from '@/contexts/travel-context';
import { busStopCoordinates } from '../data/busStopCoordinates';
import Loading from '@/components/loading';

const getCoordinates = (stopName: string) => {
  return busStopCoordinates[stopName] || null;
};

const Dashboard = () => {
  const { coordinates } = useGeolocation();
  const isLoggedIn = useRequireAuth();
  const { setTravelData } = useTravelContext();
  const [selectedDepartureValue, setSelectedDepartureValue] = useState('');
  const [selectedDestinationValue, setSelectedDestinationValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(routesFormSchema),
    defaultValues: {
      departure: '',
      destination: '',
      timeToDestination: '',
    },
  });

  const { errors } = useFormState({ control: form.control });

  async function onSubmit(data: z.infer<typeof routesFormSchema>) {
    const departureCoordinates = getCoordinates(data.departure);
    const destinationCoordinates = getCoordinates(data.destination);

    if (!departureCoordinates || !destinationCoordinates) {
      console.error('Invalid coordinates');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/api/getTravelTime', {
        currentLocation: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        departure: departureCoordinates,
        destination: destinationCoordinates,
        timeToDestination: data.timeToDestination,
      });

      const travelTime = response?.data?.travelTime ?? null;
      const trafficDensity = response?.data?.trafficDensity ?? null;
      const costSavings = response?.data?.costSavingsPerTrip ?? null;
      const additionalRides = response?.data?.additionalRides ?? [];

      setTravelData({
        travelTime,
        trafficDensity,
        costSavings,
        additionalRides,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    router.push('/routes');
  }

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-6 bg-secondary text-secondary-foreground text-center">
        <h2 className="text-3xl font-bold">Welcome to Tryp Transit</h2>
        <div className="flex items-center justify-center">
          <p className="mt-2 text-lg">
            Plan your next bus ride with ease! Select your departure and
            destination, and we&apos;ll provide you with real-time travel times,
            traffic conditions, and cost-saving opportunities. Start your
            journey towards a more convenient and eco-friendly commute.
          </p>
        </div>
      </div>
      <div className="relative flex justify-center w-full h-screen">
        <BackgroundPhoto
          imgOne={BusPhotoFour}
          imgTwo={BusPhotoEight}
          imgThree={BusPhotoTen}
          imgFour={BusPhotoTwelve}
        />
        <div className="relative bottom-28 z-10 flex justify-center items-center w-full max-w-md">
          <Card className="bg-white shadow-2xl w-full border-secondary">
            <CardHeader>
              <CardTitle className="text-center text-black font-bold">
                FIND TRIP REWARDS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="departure"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel
                          className={`${
                            errors.departure ? 'text-red-700' : ''
                          }`}
                        >
                          Departure:
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDepartureValue(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                field.value ? 'text-black' : 'text-slate-500'
                              }`}
                            >
                              <SelectValue placeholder="Select a departure" />
                            </SelectTrigger>
                            <SelectContent>
                              {busStops.map((stop) => (
                                <SelectItem key={stop.value} value={stop.value}>
                                  {stop.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel
                          className={`${
                            errors.destination ? 'text-red-700' : ''
                          }`}
                        >
                          Destination:
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDestinationValue(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                field.value ? 'text-black' : 'text-slate-500'
                              }`}
                            >
                              <SelectValue placeholder="Select a destination" />
                            </SelectTrigger>
                            <SelectContent>
                              {busStops.map((stop) => (
                                <SelectItem key={stop.value} value={stop.value}>
                                  {stop.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeToDestination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`${
                            errors.timeToDestination ? 'text-red-700' : ''
                          }`}
                        >
                          Time to Destination:
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            type="time"
                            placeholder="4:00 pm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <Button variant="secondary" type="submit">
                    FIND
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
