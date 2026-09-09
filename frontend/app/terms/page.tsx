import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";

export async function generateMetadata() {
  const content = await getSiteContent();
  return {
    title: `Terms of Use | ${content.company.name}`,
    description: `Terms of use for ${content.company.name}.`,
  };
}

export default async function TermsPage() {
  const content = await getSiteContent();
  const { company, contact } = content;

  return (
    <main className="min-h-screen bg-charcoal text-stone-300">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-kraft-light hover:text-white">
          ← Back to site
        </Link>
        <h1 className="mt-8 font-display text-4xl text-white">Terms of Use</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-400">
          By using the {company.name} website you agree to the following terms.
        </p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Website content</h2>
            <p>
              Product specifications, imagery, and copy on this site are for general information. Final ply
              ratings, dimensions, print options, and pricing are confirmed only in written quotations.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Quotes & orders</h2>
            <p>
              Submitting an inquiry does not constitute a binding order. Production timelines, MOQs, and payment
              terms are agreed separately before manufacturing begins.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Limitation of liability</h2>
            <p>
              We strive to keep site information accurate but do not warrant uninterrupted access or error-free
              content. To the extent permitted by law, {company.name} is not liable for indirect damages arising
              from use of this website.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Contact</h2>
            <p>
              For terms-related questions:{" "}
              <a href={`mailto:${contact.email}`} className="text-kraft-light hover:text-white">
                {contact.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
