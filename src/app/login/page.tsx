'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
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
    <div className="flex justify-center mt-8">
      <Card className="max-w-md w-11/12 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-primary font-bold">
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
            <Link className="font-bold hover:underline text-primary" href="/">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
