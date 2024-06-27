'use client';

import { useAuth } from '@/contexts/auth-context-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import BusPhotoOne from '@/public/bus-one.jpg';
import BusPhotoTwo from '@/public/bus-two.jpg';
import BusPhotoThree from '@/public/bus-three.jpg';
import BusPhotoEleven from '@/public/bus-eleven.jpg';
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
import { registerFormSchema } from '@/validation/registerFormSchema';
import BackgroundPhoto from '@/components/background-photo';
import Loading from '@/components/loading';

const RegisterForm = () => {
  const { isLoggedIn, isLoading } = useAuth();
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

  const { errors } = useFormState({ control: form.control });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    router.push('/');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    router.push('/dashboard');
  }

  return (
    <div className="relative flex justify-center w-full h-screen">
      <BackgroundPhoto
        imgOne={BusPhotoOne}
        imgTwo={BusPhotoTwo}
        imgThree={BusPhotoThree}
        imgFour={BusPhotoEleven}
      />
      <div className="relative z-10 flex justify-center items-center w-full max-w-md">
        <Card className="bg-white shadow-2xl w-full border-secondary">
          <CardHeader>
            <CardTitle className="text-center font-bold">REGISTER</CardTitle>
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
                      <FormLabel
                        className={`${errors.name ? 'text-red-700' : ''}`}
                      >
                        Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`${errors.email ? 'text-red-700' : ''}`}
                      >
                        Email:
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`${errors.password ? 'text-red-700' : ''}`}
                      >
                        Password:
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`${
                          errors.confirmPassword ? 'text-red-700' : ''
                        }`}
                      >
                        Confirm Password:
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                <Button variant="secondary" type="submit">
                  REGISTER
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <Link
                className="font-bold hover:underline text-secondary"
                href="/"
              >
                LOGIN HERE
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
