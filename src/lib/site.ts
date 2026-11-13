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
  phone2: "+91 73394 56476",
  phone2Href: "tel:+917339456476",
  whatsappHref: "https://wa.me/917904153087",
  email: "niyosofttechnologies@gmail.com",
  hr: {
    name: "William Christopher",
    role: "Head HR",
    email: "hrniyosofttechnologies@gmail.com",
    photo: "/images/william-christopher.webp",
  },
  address: {
    street: "No 2/281A, Selvaganapathy Nagar, Unjavelampatti",
    locality: "Pollachi",
    region: "Tamil Nadu",
    district: "Coimbatore",
    postalCode: "642003",
    country: "IN",
  },
} as const;

export type Client = {
  name: string;
  /** Logo on a white background, with its pixel size. Clients without one show their initials. */
  logo?: { src: string; width: number; height: number };
  /** Link to our case study for this client, when one is published. */
  href?: string;
};

/** Businesses we have worked with. Only Ganesh Department Stores has a published case study. */
export const clients: readonly Client[] = [
  { name: "Ganesh Department Stores", logo: { src: "/images/client-ganesh-department-stores.webp", width: 183, height: 277 }, href: "/projects/" },
  { name: "Galuku Exports", logo: { src: "/images/client-galuku.webp", width: 216, height: 159 } },
];

export type TeamMember = { name: string; role: string; photo: string; bio: string };

/** Developers shown in the auto-sliding "people who build it" carousel. */
export const developers: readonly TeamMember[] = [
  {
    name: "Shyan Paul S",
    role: "Lead Developer",
    photo: "/images/shyan-paul.webp",
    bio: "Shyan leads development at Niyosoft Technologies. He designs and builds the company's software, from client apps to this website, and turns a business problem into a working product. He makes sure every project is fast, reliable and easy to use.",
  },
  {
    name: "Vishal P",
    role: "Frontend Developer",
    photo: "/images/vishal-p.webp",
    bio: "Vishal builds the screens customers see and use. He turns designs into clean, responsive websites and app interfaces that work smoothly on every phone and computer.",
  },
  {
    name: "Nithin Sachin R",
    role: "Backend & App Developer",
    photo: "/images/nithin-sachin.webp",
    bio: "Nithin works on the systems behind the apps: databases, payments and the logic that keeps orders and data flowing. He makes sure what we build stays secure and dependable as a business grows.",
  },
];

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.district}, ${site.address.region} ${site.address.postalCode}`;

export type NavLink = { href: string; label: string; section?: string };

export const navLinks: readonly NavLink[] = [
  { href: "/#services", label: "Services", section: "services" },
  { href: "/projects/", label: "Projects" },
  { href: "/#about", label: "About Us", section: "about" },
  { href: "/#contact", label: "Contact", section: "contact" },
];
