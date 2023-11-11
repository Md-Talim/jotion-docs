import Image from "next/image";
import WelcomeHeadingWithCTA from "./WelcomeHeadingWithCTA";

const DocumentsPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/empty-dark.png" />
        <Image
          src="/empty.png"
          alt="Illustration of a person flipping pages."
          className="object-contain"
          height={300}
          width={300}
        />
      </picture>
      <WelcomeHeadingWithCTA />
    </div>
  );
};

export default DocumentsPage;
