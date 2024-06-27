import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Tryp Transit
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
          <p className=" text-lg md:text-2xl">
            Helping you save time, money, and the environment
          </p>
          <Link
            href="/find-rides"
            className="bg-secondary text-secondary-foreground hover:bg-[#FFDF57]/95 py-2 px-6 rounded-full font-bold"
          >
            Get Started
          </Link>
        </div>
      </div>
      <section className="about bg-secondary text-secondary-foreground py-10 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-bold mb-6">What is Tryp?</h2>
        <p className="text-lg">
          Tryp is a revolutionary app designed to make your commute easier and
          more enjoyable. Leave your car at home, hop on a bus, and get rewarded
          for it. Check out our incentives program{' '}
          <span className="font-bold text-primary hover:underline">
            <Link href="/incentives">Here</Link>.
          </span>
        </p>
      </section>
      <section className="why-it-matters py-10 px-6 lg:px-24">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Why It Matters
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              For the Customer
            </h3>
            <p>Leave your car at home, reduce stress, and earn rewards.</p>
          </div>
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              For Humanity
            </h3>
            <p>
              Reduce carbon emissions and traffic accidents by taking the bus.
            </p>
          </div>
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              For the Government
            </h3>
            <p>
              Save on infrastructure costs and boost economic activity along bus
              routes.
            </p>
          </div>
        </div>
      </section>
      <section className="how-it-works bg-secondary text-secondary-foreground py-10 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="text-lg mb-4">
          Using AI models, Tryp analyzes real-time and historical traffic data
          to provide optimal travel times and routes.
        </p>
        <p className="text-lg">
          Get custom notifications to save time and money on your commute.
        </p>
      </section>
      <section className="early-adopters py-10 px-6 lg:px-24">
        <h2 className="text-3xl font-bold text-secondary text-center mb-6">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-primary mb-4">
              “Tryp Transit has completely transformed my daily commute. I used
              to spend hours stuck in traffic, but now I can relax on the bus,
              catch up on my reading, and save money on gas. The incentives and
              real-time updates make it even better. Highly recommend it to
              anyone looking to make their commute stress-free and
              cost-effective!”
            </h3>
            <p className="font-bold">- Johnny Tsunami</p>
          </div>
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-primary mb-4">
              “As a university student, Tryp Transit has been a game-changer for
              me. It&apos;s affordable, convenient, and environmentally
              friendly. I love the incentives and the fact that I can avoid the
              hassle of parking on campus. Plus, the app&pos;s real-time
              notifications ensure I never miss a bus. A must-have for
              students!“
            </h3>
            <p className="font-bold">- Leonardo DiCaprio</p>
          </div>
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-primary mb-4">
              “I was skeptical at first, but Tryp Transit has exceeded my
              expectations. The cost savings alone are worth it, but the added
              benefits like reduced road rage and fewer maintenance costs for my
              car are just icing on the cake. I also appreciate how much safer I
              feel taking the bus. It&apos;s a fantastic solution for anyone
              looking to simplify their life and save money.“
            </h3>
            <p className="font-bold">- Bill Murray</p>
          </div>
          <div className="card bg-primary-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-primary mb-4">
              “Living in downtown Charleston, traffic was a daily nightmare.
              Tryp Transit has made my life so much easier. I can avoid the
              stress of driving and parking, and the incentives are a nice
              bonus. The app&apos;s AI-driven recommendations are spot on, and I
              love that I&apos;m contributing to a greener environment by taking
              the bus.“
            </h3>
            <p className="font-bold">- Bill Nye the Science Guy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
