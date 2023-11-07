import Image from 'next/image';

const Heroes = () => (
  <div className="flex items-center justify-center max-w-5xl">
    <div className="flex items-center gap-10">
      <div className="relative w-80 h-80 sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
        <Image
          src="/documents.png"
          alt="documents"
          fill
          className="object-contain"
        />
      </div>
      <div className="relative w-[400px] h-[400px] hidden md:block">
        <Image
          src="/reading.png"
          alt="documents"
          fill
          className="object-contain"
        />
      </div>
    </div>
  </div>
);

export default Heroes;
