export type IconName = "phone" | "globe" | "cart" | "card" | "wrench" | "grid";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: readonly string[];
  icon: IconName;
};

export const services: readonly Service[] = [
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    summary: "Android and iOS apps designed around how your customers actually use their phones.",
    points: ["Customer-facing apps", "Admin and staff apps", "Push notifications", "Play Store and App Store publishing"],
    icon: "phone",
  },
  {
    slug: "websites",
    title: "Website Development",
    summary: "Fast, search-friendly websites that look right on every screen and are easy to keep updated.",
    points: ["Company and product sites", "Mobile-first layouts", "SEO setup", "Domain and hosting setup"],
    icon: "globe",
  },
  {
    slug: "online-ordering",
    title: "E-commerce & Online Ordering",
    summary: "Let customers browse, order and get home delivery, with an order flow your team can manage.",
    points: ["Product catalogue", "Cart and checkout", "Order tracking", "Delivery management"],
    icon: "cart",
  },
  {
    slug: "payments",
    title: "Payment Integration",
    summary: "Secure online payments built into your app or website through trusted payment gateways.",
    points: ["UPI, cards and wallets", "Payment gateway setup", "Payment confirmations", "Refund handling"],
    icon: "card",
  },
  {
    slug: "custom-software",
    title: "Custom Business Software",
    summary: "Software shaped to your workflow, replacing paperwork and spreadsheets with one reliable system.",
    points: ["Billing and invoicing", "Inventory and stock", "Reports", "Multi-user access"],
    icon: "grid",
  },
  {
    slug: "it-support",
    title: "Software Installation & IT Support",
    summary: "Setup, installation and ongoing support so your systems keep running without interruptions.",
    points: ["Software installation", "System setup", "Troubleshooting", "Maintenance"],
    icon: "wrench",
  },
];
