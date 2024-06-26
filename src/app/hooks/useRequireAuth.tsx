'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context-provider';

const useRequireAuth = (redirectTo: string = '/') => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, redirectTo, router]);

  return isLoggedIn;
};

export default useRequireAuth;
