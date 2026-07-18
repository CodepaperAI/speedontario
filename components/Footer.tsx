import Link from "next/link";
import { SHOP } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="bg-speedy-black text-speedy-gray-300 mt-24" id="contact">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-speedy-blue text-white grid place-items-center font-display font-extrabold text-2xl rounded-sm">S</div>
            <div className="font-display font-extrabold text-lg uppercase text-white">Speedy St. Catharines</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            {SHOP.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wide text-white mb-4">Visit us</h4>
          <p className="text-sm leading-relaxed">{SHOP.address}</p>
          <a href={`tel:${SHOP.phoneHref}`} className="block mt-3 text-sm font-semibold text-white hover:text-speedy-blue transition">
            {SHOP.phone}
          </a>
          <a href={`mailto:${SHOP.email}`} className="block text-sm hover:text-white transition">
            {SHOP.email}
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

      <div className="border-t border-speedy-gray-700">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} Speedy Auto Service St. Catharines. All rights reserved.</span>
          <span className="text-speedy-gray-500">Independent franchise · Mondofix Inc.</span>
        </div>
      </div>
    </footer>
  );
}
