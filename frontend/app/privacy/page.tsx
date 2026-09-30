import { getSiteContent } from "@/backend/services/content/get-site-content";
import { LegalPageFrame } from "@/components/legal/LegalPageFrame";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(
    "Privacy Policy",
    "How Sri Vigneshwara Packing handles website enquiries, business contacts, email outreach, analytics and privacy requests.",
    "/privacy"
  );
}

export default async function PrivacyPage() {
  const content = await getSiteContent();
  const { contact } = content;

  return (
    <LegalPageFrame
      content={content}
      eyebrow="Your information"
      title="Privacy Policy"
      introduction={<>Sri Vigneshwara Packing (&quot;we&quot;, &quot;us&quot;) operates this website and an internal business-contact workflow. This policy explains how we handle website enquiries, business contact details and related communications.</>}
      updated="30 September 2026"
      sections={[
        { id: "who", label: "Who is responsible" },
        { id: "information", label: "Information we collect" },
        { id: "use", label: "How we use it" },
        { id: "outreach", label: "Business email" },
        { id: "google", label: "Google integration" },
        { id: "sharing", label: "Sharing and storage" },
        { id: "retention", label: "Retention" },
        { id: "cookies", label: "Cookies" },
        { id: "security", label: "Security" },
        { id: "choices", label: "Your choices" },
        { id: "changes", label: "Changes" },
        { id: "contact", label: "Contact" },
      ]}
    >
          <section id="who">
            <h2>Who is responsible</h2>
            <p>
              Sri Vigneshwara Packing operates from {contact.address}. For privacy questions, email
              {" "}<a href="mailto:svcartons2015@gmail.com">svcartons2015@gmail.com</a>
              {" "}or <a href="mailto:svpcorrugators@gmail.com">svpcorrugators@gmail.com</a>.
            </p>
          </section>

          <section id="information">
            <h2>Information we collect</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-copper">
              <li><strong className="text-charcoal">Enquiries:</strong> the name or company name, email address, packaging requirements and optional ply selection you enter. If you attach a PDF or image, it is included in the enquiry email.</li>
              <li><strong className="text-charcoal">Business contacts:</strong> a company name, contact name, business email address, contact status, last-sent and follow-up dates, internal notes and, where recorded, how we received the details. Some details are shared with us by other business contacts rather than provided through this website.</li>
              <li><strong className="text-charcoal">Website use:</strong> aggregate page view counts and time spent in site sections. We do not attach your name or email to these analytics events. Our host may process standard request details such as IP address, browser information and request time to deliver and protect the site.</li>
              <li><strong className="text-charcoal">Admin access:</strong> authorised staff use Google sign-in. Account details are used to confirm access and maintain a secure session.</li>
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

          <section id="outreach">
            <h2>Business email and opt-outs</h2>
            <p>
              Separately from website enquiries, we use a locally operated n8n workflow with Google Sheets
              to manage business contact records and Gmail to send business emails. The workflow records
              when an email was sent and helps us avoid duplicate or unwanted follow-ups. Receiving a
              contact&apos;s details from another business does not mean that person subscribed to our emails
              or agreed to receive marketing from us. Contacts without confirmed permission are not
              treated as eligible for automated marketing.
            </p>
            <p>
              If you receive a business email from us and do not want further messages, reply asking to be
              removed or write to either privacy contact below. We mark that address as opted out and keep
              the minimum record needed to prevent future outreach.
            </p>
          </section>

          <section id="google">
            <h2>Google integration</h2>
            <p>
              Our authorised Google account connects the local n8n workflow to Google Sheets to read and
              update business contact records and to Gmail to send business emails. Google provides the
              account authentication needed for these connections. We use information received through
              these Google services for the described contact-management and email functions, not for
              personalised advertising, sale to data brokers or training general-purpose AI models.
              The account owner can revoke the workflow&apos;s access in their Google Account settings;
              doing so may stop the workflow from working.
            </p>
          </section>

          <section id="sharing">
            <h2>Sharing and storage</h2>
            <p>
              Enquiry text and contact details are stored in our MongoDB database. When email delivery is
              configured, Resend sends a copy to our business inbox. Optional attachments go with that email;
              the database stores the attachment name, not the file. Business contact records and email
              activity are held in Google Sheets and Gmail; our n8n workflow runs locally. Vercel hosts the
              website, and Google handles authorised admin sign-ins. These providers may process information
              outside India under their service arrangements. We may disclose information when required by
              law. We do not sell enquiry or business-contact information.
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
            <p>
              We review business-contact records manually and keep them only while needed for the stated
              communication purpose. If someone opts out, we may keep the minimum information necessary
              to prevent further emails to that address.
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
              information where required by law or for an ongoing business obligation. You may also ask us
              to stop business emails. A website quote request does not, by itself, subscribe you to ongoing
              marketing.
            </p>
          </section>

          <section id="changes">
            <h2>Changes to this policy</h2>
            <p>We may update this page when our practices change. The date above identifies this version.</p>
          </section>

          <section id="contact">
            <h2>Contact us</h2>
            <p>
              For privacy requests, email <a href="mailto:svcartons2015@gmail.com">svcartons2015@gmail.com</a>
              {" "}or <a href="mailto:svpcorrugators@gmail.com">svpcorrugators@gmail.com</a>.
              You can also call <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>.
              Please mention &ldquo;Privacy request&rdquo; and enough detail to identify your enquiry.
            </p>
          </section>
    </LegalPageFrame>
  );
}
