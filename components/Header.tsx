import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/shop";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-speedy-blue-dark border-b border-black/40 shadow-md">
      <div className="bg-black/40 text-white/80 text-xs">
        <div className="container-x flex items-center justify-between py-2 gap-4">
          <span className="hidden sm:inline">{SHOP.address}</span>
          <span className="flex items-center gap-4">
            <a href={`mailto:${SHOP.email}`} className="hover:text-white transition">{SHOP.email}</a>
            <a href={`tel:${SHOP.phoneHref}`} className="hover:text-white transition font-semibold">
              {SHOP.phone}
            </a>
          </span>
        </div>
      </div>

      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-4 group" aria-label="Speedy Auto Service St. Catharines — home">
          <Image
            src="/speedy-logo-official.jpeg"
            alt="Speedy Auto Service — A Fix Network Company"
            width={220}
            height={70}
            priority
            className="h-12 md:h-14 w-auto mix-blend-screen"
          />
          <span className="hidden sm:block h-10 w-px bg-white/20" aria-hidden />
          <span className="hidden sm:block leading-tight">
            <span className="block font-display font-bold text-white text-sm uppercase tracking-widest">
              St. Catharines
            </span>
            <span className="block text-[11px] text-white/60 uppercase tracking-wider">
              Hartzel Road
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide text-white/90">
          <Link href="/" className="hover:text-speedy-yellow transition">Home</Link>
          <Link href="/#services" className="hover:text-speedy-yellow transition">Services</Link>
          <Link href="/blog" className="hover:text-speedy-yellow transition">Blog</Link>
          <Link href="/#contact" className="hover:text-speedy-yellow transition">Contact</Link>
        </nav>

        <a
          href={SHOP.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-speedy-yellow hover:bg-white text-speedy-blue-dark px-4 py-2.5 rounded-sm font-bold text-sm uppercase tracking-wide transition"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
