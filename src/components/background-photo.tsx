import Image, { StaticImageData } from 'next/image';

interface BackgroundPhotoProps {
  imgOne: StaticImageData;
  imgTwo: StaticImageData;
  imgThree: StaticImageData;
  imgFour: StaticImageData;
}

const BackgroundPhoto = ({
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
}: BackgroundPhotoProps) => {
  return (
    <div className="absolute md:grid md:grid-cols-2 grid-rows-2 w-full h-full">
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={imgOne}
          alt="Bus Photo"
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="relative w-full h-full">
        <Image
          src={imgTwo}
          alt="Bus Photo"
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={imgThree}
          alt="Bus Photo"
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={imgFour}
          alt="Bus Photo"
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );
};

export default BackgroundPhoto;
