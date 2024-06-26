'use client';

import Image from 'next/image';
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
  const { isLoggedIn } = useAuth();
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

  if (isLoggedIn) {
    router.push('/dashboard');
  }

  return (
    <div className="relative flex justify-center w-full h-screen">
      <div className="absolute md:grid md:grid-cols-2 grid-rows-2 w-full h-full">
        <div className="relative w-full h-full hidden md:block">
          <Image
            src={BusPhotoOne}
            alt="Bus Photo One"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="relative w-full h-full hidden md:block">
          <Image
            src={BusPhotoTwo}
            alt="Bus Photo Two"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoEleven}
            alt="Bus Photo Three"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="relative w-full h-full hidden md:block">
          <Image
            src={BusPhotoThree}
            alt="Bus Photo Four"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
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
                  Register
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <Link
                className="font-bold hover:underline text-secondary"
                href="/"
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
