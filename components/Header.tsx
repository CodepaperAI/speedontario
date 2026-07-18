import Link from "next/link";
import { SHOP } from "@/lib/shop";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-speedy-gray-300 shadow-sm">
      <div className="bg-speedy-black text-speedy-gray-100 text-xs">
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

      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-speedy-blue text-white grid place-items-center font-display font-extrabold text-2xl leading-none rounded-sm group-hover:bg-speedy-blue-dark transition">
            S
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Speedy Auto Service
            </div>
            <div className="text-[11px] md:text-xs text-speedy-gray-700 uppercase tracking-widest">
              St. Catharines
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
          <Link href="/" className="hover:text-speedy-blue transition">Home</Link>
          <Link href="/#services" className="hover:text-speedy-blue transition">Services</Link>
          <Link href="/blog" className="hover:text-speedy-blue transition">Blog</Link>
          <Link href="/#contact" className="hover:text-speedy-blue transition">Contact</Link>
        </nav>

        <a
          href={`tel:${SHOP.phoneHref}`}
          className="hidden sm:inline-flex items-center gap-2 bg-speedy-blue hover:bg-speedy-blue-dark text-white px-4 py-2.5 rounded-sm font-semibold text-sm uppercase tracking-wide transition"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
