import Image from 'next/image';
import React from 'react';
import TrypLogo from '@/public/tryp.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-6 bg-primary">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={TrypLogo}
          alt="Tryp Logo"
          width={20}
          height={20}
          style={{ width: 'auto', height: 'auto' }}
        />
        <h1 className="font-bold text-2xl text-secondary">Tryp Transit</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
