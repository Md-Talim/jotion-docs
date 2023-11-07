import Heading from './Heading';
import Heroes from './Heroes';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;