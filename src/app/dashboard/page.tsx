'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { useGeolocation } from '@/contexts/geolocation-context-provider';
import useRequireAuth from '../hooks/useRequireAuth';
import { convertToUTC } from '@/lib/convertToUTC';
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

const busStops = [
  {
    value: 'Mary Street / Meeting Street',
  },
  {
    value: 'King Street / Morris Street',
  },
  {
    value: 'Market Street / Meeting Street',
  },
];

const Dashboard = () => {
  const { coordinates } = useGeolocation();
  const isLoggedIn = useRequireAuth();
  const [selectedValue, setSelectedValue] = useState('');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(routesFormSchema),
    defaultValues: {
      destination: '',
      timeToDestination: '',
    },
  });

  const { errors } = useFormState({ control: form.control });

  async function onSubmit(data: z.infer<typeof routesFormSchema>) {
    let destinationCoordinates;

    switch (data.destination) {
      case 'Mary Street / Meeting Street':
        destinationCoordinates = { lat: 32.7913, lng: -79.9353 };
        break;
      case 'King Street / Morris Street':
        destinationCoordinates = { lat: 32.7872, lng: -79.9416 };
        break;
      case 'Market Street / Meeting Street':
        destinationCoordinates = { lat: 32.7813, lng: -79.9306 };
        break;
      default:
        break;
    }

    const utcTime = convertToUTC(data.timeToDestination);
    console.log(utcTime);
    console.log('My coordinates', coordinates);
    console.log('Destination coordinates', destinationCoordinates);

    router.push('/routes');
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className="p-6 bg-secondary text-secondary-foreground text-center">
        <h2 className="text-3xl font-bold">Welcome to Tryp Transit</h2>
        <p className="mt-2 text-lg">
          Your ultimate solution to easy and efficient bus rides.
        </p>
      </div>
      <div className="relative flex justify-center w-full h-screen">
        <BackgroundPhoto
          imgOne={BusPhotoFour}
          imgTwo={BusPhotoEight}
          imgThree={BusPhotoTen}
          imgFour={BusPhotoTwelve}
        />
        <div className="relative bottom-28 z-10 flex justify-center items-center w-full max-w-md">
          <Card className="bg-primary shadow-2xl w-full border-secondary">
            <CardHeader>
              <CardTitle className="text-center text-secondary font-bold">
                Find Routes
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
                              setSelectedValue(value);
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
                            type="text"
                            placeholder="4:00 pm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <Button variant="secondary" type="submit">
                    Find Routes
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
