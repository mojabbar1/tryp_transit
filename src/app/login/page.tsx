'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import BusPhotoFive from '@/public/bus-five.jpg';
import BusPhotoSix from '@/public/bus-six.jpg';
import BusPhotoSeven from '@/public/bus-seven.jpg';
import BusPhotoEight from '@/public/bus-eight.jpg';
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

const loginFormSchema = z.object({
  email: z.string().email('Must be a valid email.'),
  password: z.string().min(1, 'Must be a valid password'),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    const { email, password } = data;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      router.push('/dashboard');
    } else {
      form.setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      form.setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    }
  }

  return (
    <div className="relative flex justify-center w-full h-screen">
      <div className="absolute md:grid md:grid-cols-2 grid-rows-2 w-full h-full hidden">
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoSix}
            alt="Bus Photo One"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoFive}
            alt="Bus Photo Two"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoSeven}
            alt="Bus Photo Three"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={BusPhotoEight}
            alt="Bus Photo Four"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
      </div>
      <div className="relative bottom-20 z-10 flex justify-center items-center w-full max-w-md">
        <Card className="bg-primary shadow-2xl w-full border-secondary">
          <CardHeader>
            <CardTitle className="text-center text-secondary font-bold">
              Login
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
                <Button variant="secondary" type="submit">
                  Login
                </Button>
              </form>
            </Form>
            <div className="mt-2 text-center">
              Don&apos;t have an account?{' '}
              <Link
                className="font-bold hover:underline text-secondary"
                href="/"
              >
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
