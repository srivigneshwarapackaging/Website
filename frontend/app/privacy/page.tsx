import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";

export async function generateMetadata() {
  const content = await getSiteContent();
  return {
    title: `Privacy Policy | ${content.company.name}`,
    description: `Privacy policy for ${content.company.name}.`,
  };
}

export default async function PrivacyPage() {
  const content = await getSiteContent();
  const { company, contact } = content;

  return (
    <main className="min-h-screen bg-charcoal text-stone-300">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-kraft-light hover:text-white">
          ← Back to site
        </Link>
        <h1 className="mt-8 font-display text-4xl text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-400">
          Last updated {new Date().getFullYear()}. {company.name} (&quot;we&quot;, &quot;us&quot;) respects your
          privacy when you visit our website or submit a packaging inquiry.
        </p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Information we collect</h2>
            <p>
              When you use our contact form we may collect your name, email, phone number, company name, and
              packaging requirements. We also collect basic analytics (pages viewed, device type) to improve
              the site experience.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-display text-xl text-white">How we use it</h2>
            <p>
              Inquiry details are used to respond with quotes, specifications, and follow-up communication
              related to corrugated packaging orders. We do not sell your personal information to third parties.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-display text-xl text-white">Contact</h2>
            <p>
              Questions about this policy:{" "}
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
