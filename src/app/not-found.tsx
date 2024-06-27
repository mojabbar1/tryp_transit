import { Card } from '@/components/ui/card';
import Speed from '@/public/speed-img.jpg';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-bold w-full bg-secondary p-6 text-center">
        404 Page Not Found
      </h2>
      <p className="text-center text-primary text-lg pt-2">
        Sorry, the page you are looking for does not exist. Here is a photo of
        Keanu Reaves from Speed instead.
      </p>
      <div className="flex flex-col items-center justify-center text-secondary-foreground text-center">
        <Image
          className="shadow-2xl my-10"
          src={Speed}
          alt="Keanu Reaves in Speed"
          width={650}
          height={200}
        />
      </div>
    </div>
  );
};

export default NotFound;
