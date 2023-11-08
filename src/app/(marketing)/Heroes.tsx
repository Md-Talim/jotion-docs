import Image from 'next/image';

const Heroes = () => (
  <div className="flex items-center justify-center max-w-5xl">
    <div className="flex items-center gap-10">
      <div className="relative w-80 h-80 sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcSet="/documents-dark.png"
          />
          <Image
            alt="documents"
            className="object-contain"
            fill
            src="/documents.png"
          />
        </picture>
      </div>
      <div className="relative w-[400px] h-[400px] hidden md:block">
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcSet="/reading-dark.png"
          />
          <Image
            src="/reading.png"
            alt="Person sitting on a chair with a book in hand."
            fill
            className="object-contain"
          />
        </picture>
      </div>
    </div>
  </div>
);

export default Heroes;
