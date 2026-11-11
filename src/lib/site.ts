export const site = {
  name: "Niyosoft Technologies",
  shortName: "Niyosoft",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niyosoft.in",
  tagline: "Transforming Enterprises through Digital Innovation",
  description:
    "Niyosoft Technologies is a software company in Pollachi, Coimbatore building mobile apps, websites, online ordering and payment solutions, and providing software installation and IT support.",
  founder: "Ashok Thomas",
  foundedDate: "2021-01-14",
  foundedYear: 2021,
  udyam: "UDYAM-TN-03-0129180",
  phone: "+91 79041 53087",
  phoneHref: "tel:+917904153087",
  whatsappHref: "https://wa.me/917904153087",
  email: "niyosofttechnologies@gmail.com",
  address: {
    street: "No 2/281A, Selvaganapathy Nagar, Unjavelampatti",
    locality: "Pollachi",
    region: "Tamil Nadu",
    district: "Coimbatore",
    postalCode: "642003",
    country: "IN",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.district}, ${site.address.region} ${site.address.postalCode}`;

export type NavLink = { href: string; label: string; section?: string };

export const navLinks: readonly NavLink[] = [
  { href: "/#services", label: "Services", section: "services" },
  { href: "/projects/", label: "Projects" },
  { href: "/#about", label: "About Us", section: "about" },
  { href: "/#contact", label: "Contact", section: "contact" },
];
