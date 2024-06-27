import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-secondary-foreground">
      <div className="flex justify-center space-x-4 bg-secondary w-full h-full p-8 text-white">
        <Link href="/emissions-stats" className="hover:text-primary">
          Environmental Impact
        </Link>
        <Link href="/safety-cost-comparison" className="hover:text-primary">
          Safety & Cost Savings
        </Link>
        <Link className="hover:text-primary" href="/incentives">
          Incentives Program
        </Link>
      </div>
      <div className="text-center bg-primary p-4">
        <p>
          &copy; {new Date().getFullYear()} Tryp Transit. All rights reserved.
        </p>
        <div className="mt-2">
          <Link href="/privacy-policy" className="hover:text-[#FFDF57]/95 mx-2">
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-[#FFDF57]/95 mx-2"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
