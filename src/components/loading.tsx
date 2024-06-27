'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context-provider';
import Image from 'next/image';
import BusPhotoOne from '@/public/bus-one.jpg';
import BusPhotoTwo from '@/public/bus-two.jpg';

const Loading = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-secondary-foreground">
      <div className="bg-secondary text-center p-4 w-full">
        <h1 className="text-4xl font-bold">Hold Tight! 🚍</h1>
        <p className="text-xl mt-2 text-center">
          We&apos;re just getting your ride ready.
        </p>
      </div>
      <div className="flex items-center justify-center bg-primary w-full h-full">
        <p className="text-lg text-center p-4">
          Did you know that taking the bus can reduce your carbon footprint by
          up to 66.82%? Plus, you can relax, read, or even catch a nap while we
          drive!
        </p>
      </div>
      <div className="flex items-center justify-between w-full h-full">
        <Image
          src={BusPhotoOne}
          alt="Bus Photo"
          width={750}
          height={50}
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <Image
          src={BusPhotoTwo}
          alt="Bus Photo"
          width={750}
          height={50}
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );
};

export default Loading;
