import Image from "next/image";

export default function KronaLogo() {
  return (
    <Image
      src="/krona-logo.png"
      alt="Krona"
      height={190}
      width={160}
      style={{ 
        objectFit: "contain" 
        
      }}
      priority
    />
  );
}