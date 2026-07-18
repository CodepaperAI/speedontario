export const SHOP = {
  name: "Speedy Auto Service",
  location: "St. Catharines",
  phone: process.env.NEXT_PUBLIC_SHOP_PHONE ?? "(905) 682-0005",
  phoneHref: (process.env.NEXT_PUBLIC_SHOP_PHONE ?? "(905) 682-0005").replace(/[^\d+]/g, ""),
  email: process.env.NEXT_PUBLIC_SHOP_EMAIL ?? "st.catharines@speedy.com",
  address: process.env.NEXT_PUBLIC_SHOP_ADDRESS ?? "76 Hartzel Road, St. Catharines ON L2P 1N1",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "9:00 AM – 3:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  services: [
    "Oil Change",
    "Brake Repair",
    "Tires & Wheels",
    "Exhaust & Mufflers",
    "Vehicle Maintenance",
    "Heating & Cooling",
    "Steering & Suspension",
    "Engine Service",
    "Batteries & Electrical",
    "Auto Glass Repair",
  ],
  tagline: "We put you back on the road safely and in no time.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://www.speedy.com/en-ca/contact-us/",
};
