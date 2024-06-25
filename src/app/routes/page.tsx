'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useGeolocation } from '@/contexts/geolocation-context-provider';
import useRequireAuth from '../hooks/useRequireAuth';

const loginFormSchema = z.object({
  destination: z.string().min(1, 'Must be a valid destination.'),
  timeToDestination: z.string().min(1, 'Must be a valid time.'),
});

const RoutesForm = () => {
  const { coordinates } = useGeolocation();
  const isLoggedIn = useRequireAuth();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      destination: '',
      timeToDestination: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log(data);
    console.log(coordinates);
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative flex justify-center w-full h-screen">
      <div className="absolute md:grid md:grid-cols-2 grid-rows-2 w-full h-full hidden">
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoTwelve}
            alt="Bus Photo One"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoTen}
            alt="Bus Photo Two"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoFour}
            alt="Bus Photo Three"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoEight}
            alt="Bus Photo Four"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="relative bottom-20 z-10 flex justify-center items-center w-full max-w-md">
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
                    <FormItem>
                      <FormLabel>Destination:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="Destination"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeToDestination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time to Destination:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="4:00 pm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
  );
};

export default RoutesForm;
