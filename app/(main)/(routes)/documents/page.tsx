import Image from "next/image";
import WelcomeHeadingWithCTA from "./WelcomeHeadingWithCTA";

const DocumentsPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Illustration of a person flipping pages."
        className="object-contain dark:hidden"
        height={300}
        width={300}
      />
      <Image
        src="/empty-dark.png"
        alt="Illustration of a person flipping pages."
        className="hidden object-contain dark:block"
        height={300}
        width={300}
      />
      <WelcomeHeadingWithCTA />
    </div>
  );
};

export default DocumentsPage;
