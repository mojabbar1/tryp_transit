'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import BusPhotoOne from '@/public/bus-one.jpg';
import BusPhotoTwo from '@/public/bus-two.jpg';
import BusPhotoThree from '@/public/bus-three.jpg';
import BusPhotoFour from '@/public/bus-four.jpg';
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
import Image from 'next/image';

const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Must be a valid name'),
    email: z.string().email('Must be a valid email.'),
    password: z.string().min(1, 'Must be a valid password'),
    confirmPassword: z.string().min(1, 'Must be a valid password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const hashedPassword = await bcrypt.hash(data.password, 12);
    users.push({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    localStorage.setItem('users', JSON.stringify(users));
    router.push('/login');
  }

  return (
    <div className="relative flex justify-center w-full h-screen">
      <div className="absolute md:grid md:grid-cols-2 grid-rows-2 w-full h-full hidden">
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoOne}
            alt="Bus Photo One"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoTwo}
            alt="Bus Photo Two"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoFour}
            alt="Bus Photo Three"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoThree}
            alt="Bus Photo Four"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
      </div>
      <div className="relative z-10 flex justify-center items-center w-full max-w-md">
        <Card className="bg-primary shadow-2xl w-full border-secondary">
          <CardHeader>
            <CardTitle className="text-center text-secondary font-bold">
              Register
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="secondary" type="submit">
                  Register
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <Link
                className="font-bold hover:underline text-secondary"
                href="/login"
              >
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
