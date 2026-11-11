import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("Terms of Service", `Terms of use for the ${site.name} website.`, "/terms/");

const sections = [
  { heading: "Use of this website", body: `This website gives general information about ${site.name} and its services. By using it, you agree to these terms.` },
  { heading: "Services", body: "Project scope, pricing, timelines and deliverables are agreed separately with each client in writing before work begins." },
  { heading: "Intellectual property", body: `The ${site.name} name, logo and website content belong to ${site.name} and may not be reused without permission.` },
  { heading: "Limitation of liability", body: "We keep the information on this website accurate and up to date, but it is provided as is and may change without notice." },
  { heading: "Governing law", body: "These terms are governed by the laws of India, and any disputes fall under the jurisdiction of the courts in Coimbatore, Tamil Nadu." },
] as const;

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="11 November 2026" sections={sections} />;
}
