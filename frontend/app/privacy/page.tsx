import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(
    "Privacy Policy",
    "How Sri Vigneshwara Packing handles packaging enquiries, website analytics, cookies and privacy requests.",
    "/privacy"
  );
}

const linkClass = "text-kraft-light underline underline-offset-4 hover:text-white";

export default async function PrivacyPage() {
  const content = await getSiteContent();
  const { contact } = content;

  return (
    <main id="main-content" className="min-h-screen bg-charcoal text-stone-300">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-kraft-light hover:text-white">
          ← Back to site
        </Link>

        <p className="mt-14 text-xs font-semibold uppercase tracking-[0.24em] text-kraft-light">Your information</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-white sm:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-stone-400">Last updated: 30 September 2026</p>
        <p className="mt-8 text-base leading-8 text-stone-200">
          Sri Vigneshwara Packing (&quot;we&quot;, &quot;us&quot;) operates this website. This policy explains
          what happens to information you share when you visit the site or request a packaging quote.
        </p>

        <nav aria-label="On this page" className="mt-10 border-y border-white/15 py-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">On this page</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a className={linkClass} href="#information">Information</a>
            <a className={linkClass} href="#use">Use</a>
            <a className={linkClass} href="#sharing">Sharing</a>
            <a className={linkClass} href="#choices">Your choices</a>
            <a className={linkClass} href="#contact">Contact</a>
          </div>
        </nav>

        <div className="mt-12 space-y-12 text-sm leading-7 sm:text-base sm:leading-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_p]:mt-4">
          <section id="who">
            <h2>Who is responsible</h2>
            <p>
              Sri Vigneshwara Packing operates from Old Sy. No. 45/1, New Sy. No. 45/9,
              Kadaranahalli Village, Dasanapura Hobli, Bengaluru North Taluk, Karnataka 562162, India.
              For privacy questions, email
              {" "}<a className={linkClass} href="mailto:svcartons2015@gmail.com">svcartons2015@gmail.com</a>
              {" "}or <a className={linkClass} href="mailto:svpcorrugators@gmail.com">svpcorrugators@gmail.com</a>.
            </p>
          </section>

          <section id="information">
            <h2>Information we collect</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-kraft-light">
              <li><strong className="text-white">Enquiries:</strong> the name or company name, email address, packaging requirements and optional ply selection you enter. If you attach a PDF or image, it is included in the enquiry email.</li>
              <li><strong className="text-white">Website use:</strong> aggregate page view counts and time spent in site sections. We do not attach your name or email to these analytics events. Our host may process standard request details such as IP address, browser information and request time to deliver and protect the site.</li>
              <li><strong className="text-white">Admin access:</strong> authorised staff use Google sign-in. Account details are used to confirm access and maintain a secure session.</li>
            </ul>
          </section>

          <section id="use">
            <h2>How we use information</h2>
            <p>
              We use enquiries to answer your request, prepare specifications or a quotation, and follow up
              about the packaging you asked for. Aggregate website activity helps us improve the site. Admin
              account information keeps the content management system restricted to authorised people. Sending
              a quote request does not subscribe you to a marketing mailing list.
            </p>
          </section>

          <section id="sharing">
            <h2>Sharing and storage</h2>
            <p>
              Enquiry text and contact details are stored in our MongoDB database. When email delivery is
              configured, Resend sends a copy to our business inbox. Optional attachments go with that email;
              the database stores the attachment name, not the file. Vercel hosts the website, and Google
              handles authorised admin sign-ins. These providers may process information outside India under
              their service arrangements. We may disclose information when required by law. We do not sell
              enquiry information.
            </p>
          </section>

          <section id="retention">
            <h2>How long we keep information</h2>
            <p>
              We review enquiry records and aggregate analytics after six months and manually delete records
              that are no longer needed. Some information may be kept longer for an ongoing order, a legal
              obligation or a dispute. Deletion is not automatic. Email copies and hosting logs follow the
              applicable provider settings. You may ask us to review or delete your enquiry sooner.
            </p>
          </section>

          <section id="cookies">
            <h2>Cookies and other services</h2>
            <p>
              The public site uses first-party aggregate analytics without an advertising cookie. Essential
              cookies keep authorised staff signed in to the admin area. Your browser&apos;s session storage
              remembers whether you have seen the opening animation. If you open a Google Maps or WhatsApp
              link, that service&apos;s own privacy terms apply.
            </p>
          </section>

          <section id="security">
            <h2>Security</h2>
            <p>
              The site uses HTTPS and limits admin access to authorised accounts. No internet service can
              guarantee absolute security. Please do not send payment details or other highly sensitive
              personal information through the quote form.
            </p>
          </section>

          <section id="choices">
            <h2>Your choices and requests</h2>
            <p>
              You may ask what personal information we hold about you, request a correction or deletion,
              ask us to stop using your enquiry for follow-up, or raise a privacy complaint. Please write
              from the email address used for the enquiry so we can verify your request. We may retain
              information where required by law or for an ongoing business obligation.
            </p>
          </section>

          <section id="changes">
            <h2>Changes to this policy</h2>
            <p>We may update this page when our practices change. The date above identifies this version.</p>
          </section>

          <section id="contact" className="border-t border-white/15 pt-10">
            <h2>Contact us</h2>
            <p>
              For privacy requests, email <a className={linkClass} href="mailto:svcartons2015@gmail.com">svcartons2015@gmail.com</a>
              {" "}or <a className={linkClass} href="mailto:svpcorrugators@gmail.com">svpcorrugators@gmail.com</a>.
              You can also call <a className={linkClass} href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>.
              Please mention &ldquo;Privacy request&rdquo; and enough detail to identify your enquiry.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-white/15 pt-7 text-sm">
          <Link href="/" className={linkClass}>Return to the website →</Link>
        </div>
      </div>
    </main>
  );
}
