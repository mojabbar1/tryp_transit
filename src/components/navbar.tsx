'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context-provider';
import { useRouter } from 'next/navigation';
import TrypLogo from '@/public/tryp.svg';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div>
      <nav className="p-6 bg-primary">
        <div className="flex items-center justify-between">
          <Link
            href={isLoggedIn ? '/dashboard' : '/'}
            className="flex items-center gap-2 hover:filter hover:brightness-125"
          >
            <Image
              src={TrypLogo}
              alt="Tryp Logo"
              width={20}
              height={20}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <h1 className="font-bold text-2xl text-secondary">Tryp Transit</h1>
          </Link>
          <div>
            {isLoggedIn && (
              <>
                <Link
                  className="ml-4 font-bold text-secondary hover:text-[#FFDF57]/95"
                  href="/find-rides"
                >
                  Find Rewards
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 font-bold text-secondary hover:text-[#FFDF57]/95"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
