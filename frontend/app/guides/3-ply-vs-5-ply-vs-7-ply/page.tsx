import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";
import { LegalPageFrame } from "@/components/legal/LegalPageFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/guides/3-ply-vs-5-ply-vs-7-ply";
const TITLE = "3-Ply vs 5-Ply vs 7-Ply Corrugated Boxes";
const DESCRIPTION =
  "Compare 3-ply, 5-ply and 7-ply corrugated boxes: construction, flute types, typical uses, and the specifications (GSM, BF, BCT) that decide box strength.";
const PUBLISHED = "2026-11-19";

export function generateMetadata() {
  return pageMetadata(TITLE, DESCRIPTION, PATH);
}

const COMPARISON = [
  {
    label: "Construction",
    three: "2 liners + 1 fluted layer (single wall)",
    five: "3 liners + 2 fluted layers (double wall)",
    seven: "4 liners + 3 fluted layers (triple wall)",
  },
  {
    label: "Approx. board thickness",
    three: "About 3–5 mm",
    five: "About 6–9 mm",
    seven: "About 10–15 mm",
  },
  {
    label: "Common flutes",
    three: "B, C or E",
    five: "BC or EB",
    seven: "AAC, BCA or similar",
  },
  {
    label: "Typical uses",
    three: "E-commerce parcels, apparel, light FMCG, retail cartons",
    five: "Appliances, auto parts, bulk FMCG, heavier or stacked goods",
    seven: "Export cargo, machinery, heavy or high-value industrial loads",
  },
  {
    label: "Relative cost",
    three: "Lowest",
    five: "Medium",
    seven: "Highest",
  },
];

const FLUTES = [
  { name: "A-flute", height: "≈ 4.5–5 mm", note: "Most cushioning and stacking strength per layer; bulky." },
  { name: "C-flute", height: "≈ 3.5–4 mm", note: "The common all-rounder for shipping cartons." },
  { name: "B-flute", height: "≈ 2.5–3 mm", note: "Good puncture resistance; folds and prints well." },
  { name: "E-flute", height: "≈ 1.1–1.6 mm", note: "Thin and smooth; used for mailers, retail and printed boxes." },
];

export default async function PlyGuidePage() {
  const content = await getSiteContent();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "3-ply vs 5-ply vs 7-ply boxes", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: PUBLISHED,
          dateModified: PUBLISHED,
          mainEntityOfPage: new URL(PATH, SITE_URL).href,
          image: `${SITE_URL}/opengraph-image`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <LegalPageFrame
        content={content}
        eyebrow="Packaging guide"
        title="3-ply vs 5-ply vs 7-ply boxes"
        introduction={
          <>
            The number of plies tells you how a corrugated board is built, not exactly how much it can carry. This
            guide explains what each construction is, where it is usually used, and which specifications actually
            decide whether a box will survive your shipment.
          </>
        }
        sections={[
          { id: "what-ply-means", label: "What “ply” means" },
          { id: "comparison", label: "Side-by-side" },
          { id: "three-ply", label: "3-ply" },
          { id: "five-ply", label: "5-ply" },
          { id: "seven-ply", label: "7-ply" },
          { id: "flutes", label: "Flute types" },
          { id: "strength", label: "What decides strength" },
          { id: "choose", label: "How to choose" },
          { id: "faq", label: "Common questions" },
        ]}
      >
        <section id="what-ply-means">
          <h2>What “ply” means</h2>
          <p>
            Corrugated board is made of flat sheets called <strong>liners</strong> glued to wavy sheets called the{" "}
            <strong>fluting</strong> (or medium). Each sheet counts as one ply.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li><strong>3-ply</strong> (single wall): liner, flute, liner.</li>
            <li><strong>5-ply</strong> (double wall): liner, flute, liner, flute, liner.</li>
            <li><strong>7-ply</strong> (triple wall): four liners with three fluted layers between them.</li>
          </ul>
          <p>
            More plies generally mean a thicker, stiffer board that resists crushing and puncture better. But two 5-ply
            boxes can perform very differently depending on the paper used, so ply count is a starting point, not a
            specification on its own.
          </p>
        </section>

        <section id="comparison">
          <h2>Side-by-side comparison</h2>
          <div className="mt-6 overflow-x-auto rounded-sm border border-charcoal/10 bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-[0.88rem] leading-6">
              <thead>
                <tr className="border-b border-charcoal/10 bg-pearl/60 text-charcoal">
                  <th scope="col" className="w-[22%] px-4 py-3 font-semibold"><span className="sr-only">Property</span></th>
                  <th scope="col" className="px-4 py-3 font-semibold">3-ply</th>
                  <th scope="col" className="px-4 py-3 font-semibold">5-ply</th>
                  <th scope="col" className="px-4 py-3 font-semibold">7-ply</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-charcoal/10 last:border-b-0 align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-charcoal">{row.label}</th>
                    <td className="px-4 py-3">{row.three}</td>
                    <td className="px-4 py-3">{row.five}</td>
                    <td className="px-4 py-3">{row.seven}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-muted">
            Thicknesses are approximate and vary with the flute combination and paper grade.
          </p>
        </section>

        <section id="three-ply">
          <h2>3-ply (single wall) boxes</h2>
          <p>
            The most widely used corrugated box. A single fluted layer between two liners gives a light, economical
            board that is easy to print and fold.
          </p>
          <p>
            <strong>Good for:</strong> e-commerce shipments, apparel and footwear, light consumer goods, retail and
            display cartons, and inner boxes that go inside a stronger outer carton.
          </p>
          <p>
            <strong>Watch out for:</strong> heavy contents, tall pallet stacks, long storage in humid warehouses, and
            rough multi-stage handling. If any of these apply, check whether a stronger paper grade or a 5-ply board is
            needed.
          </p>
        </section>

        <section id="five-ply">
          <h2>5-ply (double wall) boxes</h2>
          <p>
            Two fluted layers, usually of different heights such as B and C, give much better stacking and puncture
            resistance than single wall. This is the usual choice when a box will be stacked several high or carries
            dense, heavy goods.
          </p>
          <p>
            <strong>Good for:</strong> home appliances, kitchenware, automotive and machine parts, bulk FMCG master
            cartons, and goods that sit in warehouses for weeks.
          </p>
          <p>
            <strong>Trade-off:</strong> heavier and more expensive than 3-ply, and the thicker board takes more space
            when stored flat.
          </p>
        </section>

        <section id="seven-ply">
          <h2>7-ply (triple wall) boxes</h2>
          <p>
            Three fluted layers make a very rigid board that can replace wooden crates for many heavy or export
            shipments, while staying lighter and easier to dispose of or recycle.
          </p>
          <p>
            <strong>Good for:</strong> sea and air export cargo, heavy machinery and components, large castings, and
            high-value goods that face long, rough transit.
          </p>
          <p>
            <strong>Trade-off:</strong> the highest cost per box, and usually more than you need for ordinary domestic
            parcels.
          </p>
        </section>

        <section id="flutes">
          <h2>Flute types</h2>
          <p>
            The flute is the wavy layer. Its height affects cushioning, stacking strength and print quality. Taller
            flutes cushion and stack better; shorter flutes resist puncture and print more sharply.
          </p>
          <div className="mt-6 overflow-x-auto rounded-sm border border-charcoal/10 bg-white">
            <table className="w-full min-w-[520px] border-collapse text-left text-[0.88rem] leading-6">
              <thead>
                <tr className="border-b border-charcoal/10 bg-pearl/60 text-charcoal">
                  <th scope="col" className="px-4 py-3 font-semibold">Flute</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Approx. height</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Characteristics</th>
                </tr>
              </thead>
              <tbody>
                {FLUTES.map((flute) => (
                  <tr key={flute.name} className="border-b border-charcoal/10 last:border-b-0 align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-charcoal">{flute.name}</th>
                    <td className="whitespace-nowrap px-4 py-3">{flute.height}</td>
                    <td className="px-4 py-3">{flute.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Multi-wall boards combine flutes. A BC double wall, for example, pairs the puncture resistance of B-flute
            with the cushioning of C-flute.
          </p>
        </section>

        <section id="strength">
          <h2>What actually decides box strength</h2>
          <p>
            Ply count alone does not give a safe weight rating. When you ask for a quote, these are the specifications
            that matter:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            <li>
              <strong>Paper GSM</strong> — the weight of each paper layer in grams per square metre. Heavier paper
              makes a stronger board.
            </li>
            <li>
              <strong>Bursting factor (BF)</strong> — how strong the paper is against bursting. Higher-BF kraft makes
              a stronger box at the same GSM.
            </li>
            <li>
              <strong>Bursting strength</strong> — how much pressure the finished board withstands before it bursts.
              Useful for puncture and rough handling.
            </li>
            <li>
              <strong>Edge crush test (ECT)</strong> and <strong>box compression test (BCT)</strong> — how much
              top-down load the board and the finished box can take. BCT is the best guide to how high boxes can be
              stacked.
            </li>
            <li>
              <strong>Box size and style</strong> — a larger box of the same board is weaker in stacking than a smaller
              one. Flap style, joints and inserts matter too.
            </li>
            <li>
              <strong>Moisture and time</strong> — corrugated board loses a large share of its compression strength in
              humid conditions and under long-term stacking. Monsoon storage and cold chains need a safety margin.
            </li>
          </ul>
        </section>

        <section id="choose">
          <h2>How to choose the right box</h2>
          <p>Answer these before deciding on a ply:</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            <li><strong>Product:</strong> weight, dimensions, and whether it is fragile, sharp-edged or liquid.</li>
            <li><strong>Stacking:</strong> how many boxes high, on pallets or loose, and for how long.</li>
            <li><strong>Journey:</strong> courier, truck, rail, sea or air; domestic or export; number of handling stages.</li>
            <li><strong>Environment:</strong> humidity, cold storage, or outdoor exposure.</li>
            <li><strong>Presentation:</strong> whether the box is seen by customers and needs printing.</li>
          </ol>
          <p>
            As a rough rule: start with 3-ply for light, individually shipped goods; move to 5-ply when boxes are heavy
            or stacked for storage; and consider 7-ply for export or very heavy, high-value loads. Then confirm the paper
            grade with your manufacturer, and test a sample with your actual product before a large order.
          </p>
          <div className="mt-8 border border-copper/30 bg-white px-6 py-6">
            <p className="!mt-0 font-semibold text-charcoal">Not sure which construction you need?</p>
            <p className="!mt-2">
              Send us your product size, weight and how it ships. We will recommend a board and box style and share a
              sample before production.
            </p>
            <p className="!mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/contact">Request a quote</Link>
              <Link href="/products">See our box range</Link>
              <Link href="/lab#configure">Build your box</Link>
            </p>
          </div>
        </section>

        <section id="faq">
          <h2>Common questions</h2>
          <h3 className="mt-6 font-semibold text-charcoal">Is 5-ply always stronger than 3-ply?</h3>
          <p className="!mt-2">
            Usually, but not always. A 3-ply box made from heavy, high-BF kraft can outperform a 5-ply box made from
            light, low-grade paper. Compare the paper specifications, not only the ply count.
          </p>
          <h3 className="mt-6 font-semibold text-charcoal">Which ply is best for e-commerce?</h3>
          <p className="!mt-2">
            Most courier parcels use 3-ply, often B- or E-flute for a smooth printable surface. Heavier or fragile
            items, or parcels that travel through several hubs, may need 5-ply or added inserts.
          </p>
          <h3 className="mt-6 font-semibold text-charcoal">Do export shipments need 7-ply?</h3>
          <p className="!mt-2">
            Not always. Many export cartons are 5-ply. 7-ply is used for heavy, high-value or long sea-freight loads,
            and where a box replaces a wooden crate. Check your buyer’s or freight forwarder’s requirements too.
          </p>
          <h3 className="mt-6 font-semibold text-charcoal">Can I get the same strength with fewer plies?</h3>
          <p className="!mt-2">
            Sometimes. Upgrading paper GSM or BF, changing the flute, or redesigning the box can reach the needed
            strength at a lower cost. Testing with your product is the reliable way to confirm it.
          </p>
        </section>
      </LegalPageFrame>
    </>
  );
}
