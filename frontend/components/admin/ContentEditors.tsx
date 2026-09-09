"use client";

import type {
  SiteContentData,
  StatItem,
  ProcessStep,
  ProductItem,
  SustainabilityStat,
  Certification,
  OfficeHour,
  NavLink,
  ProcessIcon,
  SocialLink,
} from "@/shared/types/content-types";
import { AdminEditorSection, AdminField } from "./AdminUI";
import { AdminListEditor, ImageUrlField } from "./AdminListEditor";

const PROCESS_ICONS: ProcessIcon[] = ["package", "factory", "print", "check"];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function SeoEditor({
  data,
  onChange,
}: {
  data: SiteContentData["seo"];
  onChange: (seo: SiteContentData["seo"]) => void;
}) {
  return (
    <AdminEditorSection>
      <Field label="Page title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <Field
        label="Meta description"
        value={data.description}
        onChange={(v) => onChange({ ...data, description: v })}
        textarea
      />
      <ImageUrlField
        label="OG image URL"
        value={data.ogImage || ""}
        onChange={(v) => onChange({ ...data, ogImage: v })}
      />
    </AdminEditorSection>
  );
}

export function SiteSettingsEditor({
  data,
  onChange,
}: {
  data: SiteContentData["siteSettings"];
  onChange: (s: SiteContentData["siteSettings"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field
          label="Header CTA label"
          value={data.headerCta}
          onChange={(v) => onChange({ ...data, headerCta: v })}
        />
        <Field
          label="Footer headline"
          value={data.footerHeadline}
          onChange={(v) => onChange({ ...data, footerHeadline: v })}
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Navigation links"
        items={data.nav}
        minItems={1}
        onChange={(nav) => onChange({ ...data, nav })}
        createItem={() => ({ label: "New link", id: "section" })}
        renderItem={(item, _i, update) => (
          <>
            <Field label="Label" value={item.label} onChange={(v) => update({ label: v } as Partial<NavLink>)} />
            <Field label="Section ID" value={item.id} onChange={(v) => update({ id: v } as Partial<NavLink>)} />
          </>
        )}
      />
      <AdminListEditor
        title="Social links (footer)"
        items={data.socialLinks || []}
        onChange={(socialLinks) => onChange({ ...data, socialLinks })}
        createItem={() => ({ label: "LinkedIn", url: "" })}
        renderItem={(item, _i, update) => (
          <>
            <Field
              label="Platform"
              value={item.label}
              onChange={(v) => update({ label: v } as Partial<SocialLink>)}
            />
            <Field
              label="Profile URL"
              value={item.url}
              onChange={(v) => update({ url: v } as Partial<SocialLink>)}
            />
          </>
        )}
      />
    </div>
  );
}

export function HeroEditor({
  data,
  onChange,
}: {
  data: SiteContentData["hero"];
  onChange: (hero: SiteContentData["hero"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
        <Field
          label="Subtitle"
          value={data.subtitle}
          onChange={(v) => onChange({ ...data, subtitle: v })}
          textarea
        />
        <Field
          label="Primary CTA"
          value={data.ctaPrimary}
          onChange={(v) => onChange({ ...data, ctaPrimary: v })}
        />
        <Field
          label="Secondary CTA"
          value={data.ctaSecondary}
          onChange={(v) => onChange({ ...data, ctaSecondary: v })}
        />
        <ImageUrlField
          label="Hero image URL"
          value={data.imageUrl || ""}
          onChange={(v) => onChange({ ...data, imageUrl: v })}
        />
        <ImageUrlField
          label="Background video URL"
          value={data.videoUrl || ""}
          onChange={(v) => onChange({ ...data, videoUrl: v })}
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Hero stats"
        items={data.stats}
        onChange={(stats) => onChange({ ...data, stats })}
        createItem={() => ({ value: "0", label: "Label" })}
        renderItem={(stat, _i, update) => (
          <>
            <Field label="Value" value={stat.value} onChange={(v) => update({ value: v } as Partial<StatItem>)} />
            <Field label="Label" value={stat.label} onChange={(v) => update({ label: v } as Partial<StatItem>)} />
          </>
        )}
      />
    </div>
  );
}

export function TrustBarEditor({
  data,
  onChange,
}: {
  data: SiteContentData["trustBar"];
  onChange: (t: SiteContentData["trustBar"]) => void;
}) {
  return (
      <AdminListEditor
        title="Marquee industries"
        items={data.industries}
        onChange={(industries) => onChange({ industries })}
        createItem={() => "New industry"}
        renderItem={(item, i) => (
          <Field
            label="Industry"
            value={item}
            onChange={(v) => {
              const next = [...data.industries];
              next[i] = v;
              onChange({ industries: next });
            }}
          />
        )}
      />
  );
}

export function AboutEditor({
  data,
  onChange,
}: {
  data: SiteContentData["about"];
  onChange: (about: SiteContentData["about"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
        <Field
          label="Description"
          value={data.description}
          onChange={(v) => onChange({ ...data, description: v })}
          textarea
        />
        <Field
          label="Pull quote"
          value={data.pullQuote}
          onChange={(v) => onChange({ ...data, pullQuote: v })}
          textarea
        />
        <ImageUrlField
          label="Image URL"
          value={data.imageUrl || ""}
          onChange={(v) => onChange({ ...data, imageUrl: v })}
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Stats"
        items={data.stats}
        onChange={(stats) => onChange({ ...data, stats })}
        createItem={() => ({ value: "0", label: "Label" })}
        renderItem={(stat, _i, update) => (
          <>
            <Field label="Value" value={stat.value} onChange={(v) => update({ value: v } as Partial<StatItem>)} />
            <Field label="Label" value={stat.label} onChange={(v) => update({ label: v } as Partial<StatItem>)} />
          </>
        )}
      />
    </div>
  );
}

export function ProcessEditor({
  data,
  onChange,
}: {
  data: SiteContentData["process"];
  onChange: (process: SiteContentData["process"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field
          label="Section title"
          value={data.title}
          onChange={(v) => onChange({ ...data, title: v })}
        />
        <Field
          label="Intro paragraph"
          value={data.intro}
          onChange={(v) => onChange({ ...data, intro: v })}
          textarea
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Process steps"
        items={data.steps}
        minItems={1}
        onChange={(steps) => onChange({ ...data, steps })}
        createItem={() => ({ title: "New step", description: "", icon: "package" as ProcessIcon })}
        renderItem={(step, _i, update) => (
          <>
            <Field label="Title" value={step.title} onChange={(v) => update({ title: v } as Partial<ProcessStep>)} />
            <Field
              label="Description"
              value={step.description}
              onChange={(v) => update({ description: v } as Partial<ProcessStep>)}
              textarea
            />
            <label className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
              Icon
            </label>
            <select
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-sm text-white outline-none focus:border-kraft/40"
              value={step.icon || "package"}
              onChange={(e) => update({ icon: e.target.value as ProcessIcon } as Partial<ProcessStep>)}
            >
              {PROCESS_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </>
        )}
      />
    </div>
  );
}

export function ProductsEditor({
  data,
  onChange,
}: {
  data: SiteContentData["products"];
  onChange: (products: SiteContentData["products"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field
          label="Section title"
          value={data.title}
          onChange={(v) => onChange({ ...data, title: v })}
        />
        <Field
          label="Section blurb"
          value={data.description}
          onChange={(v) => onChange({ ...data, description: v })}
          textarea
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Applications"
        items={data.applications}
        onChange={(applications) => onChange({ ...data, applications })}
        createItem={() => "New application"}
        renderItem={(item, i) => (
          <Field
            label="Application"
            value={item}
            onChange={(v) => {
              const next = [...data.applications];
              next[i] = v;
              onChange({ ...data, applications: next });
            }}
          />
        )}
      />
      <AdminListEditor
        title="Products"
        items={data.items}
        minItems={1}
        onChange={(items) => onChange({ ...data, items })}
        createItem={() => ({
          slug: "new-product",
          name: "New product",
          strength: "",
          flute: "",
          use: "",
          ply: "3" as ProductItem["ply"],
          imageUrl: "",
        })}
        renderItem={(item, _i, update) => (
          <>
            <Field
              label="Name"
              value={item.name}
              onChange={(v) =>
                update({ name: v, slug: slugify(v) } as Partial<ProductItem>)
              }
            />
            <Field
              label="Strength"
              value={item.strength}
              onChange={(v) => update({ strength: v } as Partial<ProductItem>)}
            />
            <Field label="Flute" value={item.flute} onChange={(v) => update({ flute: v } as Partial<ProductItem>)} />
            <Field label="Use case" value={item.use} onChange={(v) => update({ use: v } as Partial<ProductItem>)} />
            <ImageUrlField
              label="Image URL"
              value={item.imageUrl || ""}
              onChange={(v) => update({ imageUrl: v } as Partial<ProductItem>)}
            />
            <label className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
              Ply type
            </label>
            <select
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-sm text-white outline-none focus:border-kraft/40"
              value={item.ply}
              onChange={(e) => update({ ply: e.target.value as ProductItem["ply"] } as Partial<ProductItem>)}
            >
              <option value="3">3 ply</option>
              <option value="5">5 ply</option>
              <option value="7">7 ply</option>
              <option value="diecut">Die-cut</option>
            </select>
          </>
        )}
      />
    </div>
  );
}

export function SustainabilityEditor({
  data,
  onChange,
}: {
  data: SiteContentData["sustainability"];
  onChange: (s: SiteContentData["sustainability"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
        <Field
          label="Description"
          value={data.description}
          onChange={(v) => onChange({ ...data, description: v })}
          textarea
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Ring metrics"
        items={data.stats}
        onChange={(stats) => onChange({ ...data, stats })}
        createItem={() => ({ stat: "0%", label: "Label" })}
        renderItem={(stat, _i, update) => (
          <>
            <Field label="Stat" value={stat.stat} onChange={(v) => update({ stat: v } as Partial<SustainabilityStat>)} />
            <Field
              label="Label"
              value={stat.label}
              onChange={(v) => update({ label: v } as Partial<SustainabilityStat>)}
            />
          </>
        )}
      />
    </div>
  );
}

export function MarqueeEditor({
  data,
  onChange,
}: {
  data: SiteContentData["marqueeCta"];
  onChange: (m: SiteContentData["marqueeCta"]) => void;
}) {
  return (
    <AdminEditorSection>
      <Field label="Marquee phrase" value={data.label} onChange={(v) => onChange({ label: v })} />
    </AdminEditorSection>
  );
}

export function ContactEditor({
  data,
  onChange,
}: {
  data: SiteContentData["contact"];
  onChange: (c: SiteContentData["contact"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <Field label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
        <Field
          label="Description"
          value={data.description}
          onChange={(v) => onChange({ ...data, description: v })}
          textarea
        />
        <Field label="Phone" value={data.phone} onChange={(v) => onChange({ ...data, phone: v })} />
        <Field label="Email" value={data.email} onChange={(v) => onChange({ ...data, email: v })} />
        <Field label="Address" value={data.address} onChange={(v) => onChange({ ...data, address: v })} />
        <Field
          label="Google Maps URL"
          value={data.mapUrl || ""}
          onChange={(v) => onChange({ ...data, mapUrl: v })}
        />
        <Field label="Map label" value={data.mapLabel} onChange={(v) => onChange({ ...data, mapLabel: v })} />
        <Field
          label="Coordinates display"
          value={data.coordinates}
          onChange={(v) => onChange({ ...data, coordinates: v })}
        />
        <Field
          label="Info panel headline"
          value={data.infoHeadline}
          onChange={(v) => onChange({ ...data, infoHeadline: v })}
        />
        <Field
          label="Info panel subtext"
          value={data.infoSubtext}
          onChange={(v) => onChange({ ...data, infoSubtext: v })}
          textarea
        />
        <Field
          label="Form submit label"
          value={data.formSubmitLabel}
          onChange={(v) => onChange({ ...data, formSubmitLabel: v })}
        />
        <Field
          label="WhatsApp prefill message"
          value={data.whatsappMessage}
          onChange={(v) => onChange({ ...data, whatsappMessage: v })}
          textarea
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Trust pills"
        items={data.trustPoints}
        onChange={(trustPoints) => onChange({ ...data, trustPoints })}
        createItem={() => "New trust point"}
        renderItem={(item, i) => (
          <Field
            label="Label"
            value={item}
            onChange={(v) => {
              const next = [...data.trustPoints];
              next[i] = v;
              onChange({ ...data, trustPoints: next });
            }}
          />
        )}
      />
      <AdminListEditor
        title="Office hours"
        items={data.officeHours}
        onChange={(officeHours) => onChange({ ...data, officeHours })}
        createItem={() => ({ label: "Day", value: "Hours" })}
        renderItem={(row, _i, update) => (
          <>
            <Field label="Label" value={row.label} onChange={(v) => update({ label: v } as Partial<OfficeHour>)} />
            <Field label="Value" value={row.value} onChange={(v) => update({ value: v } as Partial<OfficeHour>)} />
          </>
        )}
      />
    </div>
  );
}

export function CompanyEditor({
  data,
  onChange,
}: {
  data: SiteContentData["company"];
  onChange: (c: SiteContentData["company"]) => void;
}) {
  return (
    <div className="space-y-6">
      <AdminEditorSection>
        <Field
          label="Company name"
          value={data.name}
          onChange={(v) => onChange({ ...data, name: v })}
        />
        <Field
          label="Tagline"
          value={data.tagline}
          onChange={(v) => onChange({ ...data, tagline: v })}
        />
        <ImageUrlField
          label="Logo URL"
          value={data.logoUrl || ""}
          onChange={(v) => onChange({ ...data, logoUrl: v })}
        />
        <Field
          label="GSTIN (footer)"
          value={data.gstin || ""}
          onChange={(v) => onChange({ ...data, gstin: v })}
        />
      </AdminEditorSection>
      <AdminListEditor
        title="Certifications"
        items={data.certifications}
        onChange={(certifications) => onChange({ ...data, certifications })}
        createItem={() => ({ name: "New certification", imageUrl: "" })}
        renderItem={(cert, _i, update) => (
          <>
            <Field
              label="Name"
              value={cert.name}
              onChange={(v) => update({ name: v } as Partial<Certification>)}
            />
            <ImageUrlField
              label="Badge image URL"
              value={cert.imageUrl || ""}
              onChange={(v) => update({ imageUrl: v } as Partial<Certification>)}
            />
          </>
        )}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return <AdminField label={label} value={value} onChange={onChange} textarea={textarea} />;
}
