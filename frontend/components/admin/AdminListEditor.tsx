"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { AdminButton } from "./AdminUI";

export function AdminListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  title,
  minItems = 1,
  maxItems = 20,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
  title?: string;
  minItems?: number;
  maxItems?: number;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const remove = (index: number) => {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    if (items.length >= maxItems) return;
    onChange([...items, createItem()]);
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">{title}</p>
          <AdminButton variant="ghost" onClick={add} disabled={items.length >= maxItems}>
            <Plus size={14} /> Add
          </AdminButton>
        </div>
      )}
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-charcoal/40 p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">
              Item {i + 1}
            </span>
            <div className="flex gap-1">
              <AdminButton variant="ghost" onClick={() => move(i, i - 1)} disabled={i === 0}>
                <ArrowUp size={14} />
              </AdminButton>
              <AdminButton
                variant="ghost"
                onClick={() => move(i, i + 1)}
                disabled={i === items.length - 1}
              >
                <ArrowDown size={14} />
              </AdminButton>
              <AdminButton
                variant="danger"
                onClick={() => remove(i)}
                disabled={items.length <= minItems}
              >
                <Trash2 size={14} />
              </AdminButton>
            </div>
          </div>
          {renderItem(item, i, (patch) => {
            const next = [...items];
            next[i] = { ...next[i], ...patch };
            onChange(next);
          })}
        </div>
      ))}
      {!title && (
        <AdminButton variant="ghost" onClick={add} disabled={items.length >= maxItems}>
          <Plus size={14} /> Add item
        </AdminButton>
      )}
    </div>
  );
}

export function ImageUrlField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload?: (url: string) => void;
}) {
  const upload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    onChange(data.url);
    onUpload?.(data.url);
  };

  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
        {label}
      </label>
      <div className="mt-1.5 flex gap-3">
        <input
          className="flex-1 rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-sm text-white outline-none focus:border-kraft/40"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
        />
        <label className="cursor-pointer rounded-xl border border-white/10 bg-charcoal/60 px-3 py-3 text-[10px] font-black uppercase tracking-wider text-kraft hover:border-kraft/40">
          Upload
          <input
            type="file"
            accept="image/*,video/mp4"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                await upload(file);
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload failed");
              }
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-2 h-16 w-16 rounded-lg object-cover ring-1 ring-white/10"
        />
      )}
    </div>
  );
}
