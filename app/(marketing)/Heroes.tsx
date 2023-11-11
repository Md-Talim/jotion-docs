import Image from "next/image";

const Heroes = () => (
  <div className="flex max-w-5xl items-center justify-center">
    <div className="flex items-center gap-10">
      <div className="relative h-80 w-80 sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
        <Image
          alt="documents"
          className="hidden object-contain dark:block"
          fill
          src="/documents-dark.png"
        />
        <Image
          alt="documents"
          className="object-contain dark:hidden"
          fill
          src="/documents.png"
        />
      </div>
      <div className="relative hidden h-[400px] w-[400px] md:block">
        <Image
          src="/reading-dark.png"
          alt="Person sitting on a chair with a book in hand."
          fill
          className="hidden object-contain dark:block"
        />
        <Image
          src="/reading.png"
          alt="Person sitting on a chair with a book in hand."
          fill
          className="object-contain dark:hidden"
        />
      </div>
    </div>
  </div>
);

export default Heroes;
