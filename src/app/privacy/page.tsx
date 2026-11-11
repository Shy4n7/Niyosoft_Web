import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("Privacy Policy", `Privacy policy for the ${site.name} website.`, "/privacy/");

const sections = [
  { heading: "Information we collect", body: "This website does not use forms, accounts or tracking cookies, and does not collect personal information. If you call, message or email us, we receive only the details you choose to share." },
  { heading: "How we use it", body: "We use the details you share only to reply to you and to provide the services you ask for. We do not sell or rent your information." },
  { heading: "Third-party services", body: "The contact page shows an embedded Google Map, and the WhatsApp link opens WhatsApp. These services are run by their own providers under their own privacy policies." },
  { heading: "Contact", body: `For any privacy question, email ${site.email} or call ${site.phone}.` },
] as const;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="11 November 2026" sections={sections} />;
}
