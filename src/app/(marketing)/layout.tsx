import Navbar from "./Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full">
    <Navbar />
    <main className="h-full pt-40">{children}</main>
  </div>
);

export default LandingPageLayout;
