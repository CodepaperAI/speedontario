import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="bg-speedy-blue-dark text-white/75 mt-24" id="contact">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div>
          <Image
            src="/speedy-logo-official.jpeg"
            alt="Speedy Auto Service — A Fix Network Company"
            width={220}
            height={70}
            className="h-14 w-auto mix-blend-screen"
          />
          <div className="mt-4 font-display font-bold text-white text-sm uppercase tracking-widest">
            St. Catharines
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            {SHOP.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wide text-white mb-4">Visit us</h4>
          <p className="text-sm leading-relaxed">{SHOP.address}</p>
          <a href={`tel:${SHOP.phoneHref}`} className="block mt-3 text-sm font-semibold text-white hover:text-speedy-yellow transition">
            {SHOP.phone}
          </a>
          <a href={`mailto:${SHOP.email}`} className="block text-sm hover:text-white transition">
            {SHOP.email}
          </a>
          <a
            href={SHOP.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-4 bg-speedy-yellow text-speedy-blue-dark hover:bg-white transition px-4 py-2 rounded-sm font-bold text-xs uppercase tracking-wide"
          >
            Book Appointment
          </a>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wide text-white mb-4">Hours</h4>
          <ul className="text-sm space-y-1.5">
            {SHOP.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-white">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wide text-white mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/#services" className="hover:text-white transition">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} Speedy Auto Service St. Catharines. All rights reserved.</span>
          <span className="text-white/50">Independent franchise · Mondofix Inc.</span>
        </div>
      </div>
    </footer>
  );
}
