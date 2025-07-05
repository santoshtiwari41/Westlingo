import Image from "next/image";

export default function LogoSection() {
  return (
    <a href="/" className="transition-transform hover:scale-105">
      <Image
        src="/logo.png"
        alt="Smart Consult Logo"
        width={120}
        height={38}
        className="w-auto cursor-pointer drop-shadow-sm"
      />
    </a>
  );
}
