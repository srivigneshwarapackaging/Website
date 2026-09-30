import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";
import { LegalPageFrame } from "@/components/legal/LegalPageFrame";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const content = await getSiteContent();
  return pageMetadata("Terms of Use", `Website terms for ${content.company.name}, including product specifications, packaging inquiries and quotations.`, "/terms");
}

export default async function TermsPage() {
  const content = await getSiteContent();
  const { company, contact } = content;

  return (
    <LegalPageFrame
      content={content}
      eyebrow="Using this website"
      title="Terms of Use"
      introduction={<>By using the {company.name} website you agree to the following terms.</>}
      sections={[
        { id: "content", label: "Website content" },
        { id: "quotes", label: "Quotes & orders" },
        { id: "liability", label: "Limitation of liability" },
        { id: "contact", label: "Contact" },
      ]}
    >
          <section id="content">
            <h2>Website content</h2>
            <p>
              Product specifications, imagery, and copy on this site are for general information. Final ply
              ratings, dimensions, print options, and pricing are confirmed only in written quotations.
            </p>
          </section>
          <section id="quotes">
            <h2>Quotes & orders</h2>
            <p>
              Submitting an inquiry does not constitute a binding order. Production timelines, MOQs, and payment
              terms are agreed separately before manufacturing begins.
            </p>
          </section>
          <section id="liability">
            <h2>Limitation of liability</h2>
            <p>
              We strive to keep site information accurate but do not warrant uninterrupted access or error-free
              content. To the extent permitted by law, {company.name} is not liable for indirect damages arising
              from use of this website.
            </p>
          </section>
          <section id="contact">
            <h2>Contact</h2>
            <p>
              For terms-related questions:{" "}
              <a href={`mailto:${contact.email}`}>
                {contact.email}
              </a>. For packaging, order or website problems, see our <Link href="/contact#help">Get help options</Link>.
            </p>
          </section>
    </LegalPageFrame>
  );
}
