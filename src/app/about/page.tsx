import { Button } from '@/components/ui/button';
import Image from 'next/image';
import BusPhotoOne from '@/public/bus-one.jpg';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center mx-10 mt-10 lg:mx-24">
      <h1 className="text-primary font-bold text-left mr-auto text-6xl">
        What is Tryp Transit?
      </h1>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex">
          <div className="flex flex-col gap-4">
            <section>
              <h2 className="text-primary font-bold text-xl">
                Ride the Bus, Earn Rewards!
              </h2>
              <p>
                <span className="font-bold">Earn points</span> and{' '}
                <span className="font-bold">rewards</span> every time you
                <span className="font-bold"> ride the bus.</span> Let&apos;s
                make commuting fun and rewarding!
              </p>
            </section>

            <section>
              <h2 className="text-primary font-bold text-xl">Features</h2>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-bold">Incentives & Rewards</h3>
                  <p>
                    Highlight the rewards users can earn, such as discounts,
                    freebies, or special offers.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Easy Tracking</h3>
                  <p>
                    Explain how users can easily track their rides and points.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Eco-Friendly</h3>
                  <p>Promote the environmental benefits of riding the bus.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-primary font-bold text-xl">How It Works</h2>
              <ol className="flex flex-col gap-2">
                <li>
                  <span className="font-bold">Sign Up:</span> Create an account.
                </li>
                <li>
                  <span className="font-bold">Ride the Bus:</span> Use the app
                  to track your bus rides.
                </li>
                <li>
                  <span className="font-bold">Earn Points:</span> Collect points
                  for every ride.
                </li>
                <li>
                  <span className="font-bold">Get Rewards:</span> Redeem your
                  points for exciting rewards.
                </li>
              </ol>
            </section>
          </div>

          <Image
            className="hidden lg:flex rounded-lg"
            src={BusPhotoOne}
            alt="Bus Photo"
            height={150}
            width={450}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>

        <section>
          <h2 className="text-primary font-bold text-xl">Testimonials</h2>
          <div className="flex flex-col gap-2">
            <blockquote>
              “This app made my commute so much more rewarding!” - Johnny
              Tsunami
            </blockquote>
            <blockquote>
              “As someone who cares deeply about our environment, I was thrilled
              to discover Tryp Transit. It&apos;s a brilliant way to reduce our
              carbon footprint while enjoying a seamless public transit
              experience. I highly recommend it!“ - Leonardo DiCaprio
            </blockquote>
            <blockquote>
              “Being on the go constantly, Tryp Transit has been a lifesaver. It
              makes navigating public transport a breeze, and the incentives are
              a great bonus. Can&apos;t recommend it enough!“ - Bill Murray
            </blockquote>
          </div>
        </section>

        <section>
          <h2 className="text-primary font-bold text-xl">Contact Us</h2>
          <p>
            <span className="font-bold">Email: </span>support@tryptransit.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-primary font-bold text-xl mb-2">Socials</h2>
          <div className="flex items-center gap-4">
            <Button className="hover:bg-[#3CC168]/80">Facebook</Button>
            <Button className="hover:bg-[#3CC168]/80">Twitter</Button>
            <Button className="hover:bg-[#3CC168]/80">Instagram</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
