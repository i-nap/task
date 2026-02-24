import Image from 'next/image';

export default function GroupLogo() {
  const logos = [
    { src: '/logo1.png', alt: 'Cloud Education' },
    { src: '/logo2.png', alt: 'CMC' },
    { src: '/logo3.png', alt: 'SNP IT' },
    { src: '/logo4.png', alt: 'Zebec' },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 grayscale opacity-80">
      {logos.map((logo, index) => (
        <div key={index} className="relative w-32 h-18.75">
          <Image
            src={logo.src}
            alt={logo.alt}
            fill 
            className="object-contain"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}