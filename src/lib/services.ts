export type IconName = "phone" | "globe" | "cart" | "card" | "wrench" | "grid" | "bot" | "chart" | "bolt";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  points: readonly string[];
  icon: IconName;
};

export const services: readonly Service[] = [
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary: "Android and iOS apps designed around how your customers actually use their phones, including native Android apps.",
    points: ["Customer-facing apps", "Admin and staff apps", "Push notifications", "Play Store and App Store publishing"],
    icon: "phone",
  },
  {
    slug: "websites",
    title: "Website Development",
    shortTitle: "Websites",
    summary: "Fast, search-friendly websites and web apps that look right on every screen and are easy to keep updated.",
    points: ["Company and product sites", "Web apps and customer portals", "SEO setup", "Domain and hosting setup"],
    icon: "globe",
  },
  {
    slug: "online-ordering",
    title: "E-commerce & Online Ordering",
    shortTitle: "Online Ordering",
    summary: "Let customers browse, order and get home delivery, with an order flow your team can manage.",
    points: ["Product catalogue", "Cart and checkout", "Order tracking", "Delivery management"],
    icon: "cart",
  },
  {
    slug: "payments",
    title: "Payment Integration",
    shortTitle: "Payments",
    summary: "Secure online payments built into your app or website through trusted payment gateways.",
    points: ["UPI, cards and wallets", "Payment gateway setup", "Payment confirmations", "Refund handling"],
    icon: "card",
  },
  {
    slug: "custom-software",
    title: "Custom Business Software",
    shortTitle: "Custom Software",
    summary: "Software shaped to your workflow, replacing paperwork, spreadsheets and outdated systems with one reliable system.",
    points: ["Billing and GST invoicing", "Inventory and stock", "Customer credit and ledgers", "Multi-computer and desktop apps", "Data migration from old software"],
    icon: "grid",
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots & Assistants",
    shortTitle: "AI Chatbots",
    summary: "Chatbots that answer questions from your documents, products or data, on your website or WhatsApp.",
    points: ["Website and WhatsApp chatbots", "Answers from your PDFs and data", "Ask your database in plain language", "Secure, staff-only access"],
    icon: "bot",
  },
  {
    slug: "business-insights",
    title: "Business Insights & Forecasting",
    shortTitle: "Insights",
    summary: "Dashboards and predictions that show what is selling, what to reorder and what looks wrong.",
    points: ["Sales dashboards", "Demand forecasting", "Unusual activity alerts", "Reports on your phone"],
    icon: "chart",
  },
  {
    slug: "automation",
    title: "Automation & WhatsApp Integration",
    shortTitle: "Automation",
    summary: "Let routine work run itself, with statements, reminders and alerts sent automatically.",
    points: ["WhatsApp bills and statements", "Payment reminders", "Daily summaries", "Automated reports"],
    icon: "bolt",
  },
  {
    slug: "it-support",
    title: "Software Installation & IT Support",
    shortTitle: "IT Support",
    summary: "Setup, installation and ongoing support so your systems keep running without interruptions.",
    points: ["Software installation", "System setup", "Troubleshooting", "Maintenance"],
    icon: "wrench",
  },
];
