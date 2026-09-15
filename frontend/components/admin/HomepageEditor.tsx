"use client";
import type { HomepageContent } from "@/shared/types/homepage";
import { AdminListEditor, ImageUrlField } from "./AdminListEditor";
import { AdminEditorSection, AdminField } from "./AdminUI";

const sections = [
  ["belief", "Brand statement"], ["materials", "Material film"],
  ["solutions", "Solutions feature"], ["why", "Why Sri Vigneshwara"],
  ["lab", "Lab introduction"], ["applications", "Industries introduction"],
] as const;

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <AdminField label={label} value={value} onChange={onChange} textarea />;
}

export function HomepageEditor({ data, onChange }: { data: HomepageContent; onChange: (value: HomepageContent) => void }) {
  return <div className="space-y-8">
    <p className="text-sm text-stone-400">These fields follow the current homepage design. Hero, About and metrics, Products, Contact, and company details have their own tabs. Preview opens the published site; publish your changes first.</p>
    {sections.map(([key, label]) => {
      const value = data[key];
      const update = (patch: Partial<typeof value>) => onChange({ ...data, [key]: { ...value, ...patch } });
      return <details key={key} className="rounded-xl border border-white/15 p-5" open={key === "belief"}>
        <summary className="cursor-pointer font-semibold text-white">{label}</summary>
        <div className="mt-5 space-y-5"><AdminEditorSection>
          <Text label="Eyebrow" value={value.eyebrow} onChange={eyebrow => update({ eyebrow })} />
          <Text label="Heading" value={value.title} onChange={title => update({ title })} />
          <Text label="Description" value={value.description} onChange={description => update({ description })} />
          {(key === "solutions" || key === "lab") && <Text label="Button label" value={value.cta} onChange={cta => update({ cta })} />}
          {key === "solutions" && <ImageUrlField label="Feature image" value={value.imageUrl} onChange={imageUrl => update({ imageUrl })} />}
        </AdminEditorSection>
        {["materials", "why", "lab"].includes(key) && <AdminListEditor title="Items in display order" items={value.items} onChange={items => update({ items })} createItem={() => ({ title: "New item", description: "", imageUrl: "" })} renderItem={(item, _i, change) => <>
          <Text label="Title" value={item.title} onChange={title => change({ title })} />
          <Text label="Description" value={item.description} onChange={description => change({ description })} />
          {key === "materials" && <ImageUrlField label="Material image" value={item.imageUrl} onChange={imageUrl => change({ imageUrl })} />}
        </>} />}</div>
      </details>;
    })}
    <AdminListEditor title="Sustainability principles" items={data.principles} onChange={principles => onChange({ ...data, principles })} createItem={() => "New principle"} renderItem={(item, index) => <Text label="Principle" value={item} onChange={value => onChange({ ...data, principles: data.principles.map((p, i) => i === index ? value : p) })} />} />
  </div>;
}
