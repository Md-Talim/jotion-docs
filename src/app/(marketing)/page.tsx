import Heading from "./Heading";
import Heroes from "./Heroes";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
