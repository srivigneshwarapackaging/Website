"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileUp,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { Magnetic } from "@/components/motion/MagneticButton";
import {
  ACCEPTED_FILE_TYPES,
  MAX_ATTACHMENT_BYTES,
  PLY_OPTIONS,
  type ContactInput,
} from "@/shared/validation/contact";

type FormState = {
  ply: ContactInput["ply"] | "";
  message: string;
  company: string;
  email: string;
};

type Attachment = NonNullable<ContactInput["attachment"]>;

const STEPS = ["Your details", "Product requirements", "Review & send"] as const;

const inputClass =
  "peer w-full rounded-2xl border border-stone-200/90 bg-white px-4 pb-3 pt-7 text-sm shadow-sm outline-none transition-all focus:border-kraft focus:ring-2 focus:ring-kraft/15 focus:shadow-[0_0_0_4px_rgba(196,165,116,0.1)] dark:border-zinc-700 dark:bg-zinc-950";

const labelClass =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-stone-400 transition-all peer-focus:top-2.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-kraft-dark peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em] peer-[:not(:placeholder-shown)]:text-stone-400";

function plyLabel(ply: FormState["ply"]) {
  if (!ply) return "Not selected";
  if (ply === "diecut") return "Die-cut / custom";
  return `${ply}-ply`;
}

async function readAttachment(file: File): Promise<Attachment> {
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    throw new Error("Use PDF, PNG, or JPG files only.");
  }
  if (file.size > MAX_ATTACHMENT_BYTES) {
    throw new Error("File must be under 2 MB.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const data = result.includes(",") ? result.split(",")[1] : result;
      resolve({ filename: file.name, mimeType: file.type as Attachment["mimeType"], data });
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export function ContactFormWizard({
  onSent,
  submitLabel = "Get your quote",
}: {
  onSent: (email: string) => void;
  submitLabel?: string;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ply: "",
    message: "",
    company: "",
    email: "",
  });
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = useCallback(async (file: File | null) => {
    setFileError("");
    if (!file) {
      setAttachment(null);
      return;
    }
    try {
      setAttachment(await readAttachment(file));
    } catch (e) {
      setAttachment(null);
      setFileError(e instanceof Error ? e.message : "Invalid file.");
    }
  }, []);

  const canAdvance = () => {
    if (step === 0) return form.company.trim().length > 0 && form.email.includes("@");
    if (step === 1) return form.message.trim().length >= 10;
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setSubmitError("");
    try {
      const payload: ContactInput & { website?: string } = {
        name: form.company.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        website: "",
      };
      if (form.ply) payload.ply = form.ply;
      if (attachment) payload.attachment = attachment;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      onSent(form.email.trim());
    } catch {
      setSubmitError("Could not send. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-colors ${
                i < step
                  ? "bg-kraft text-charcoal"
                  : i === step
                    ? "bg-charcoal text-kraft ring-2 ring-kraft/40 dark:bg-kraft dark:text-charcoal"
                    : "bg-stone-200 text-stone-500 dark:bg-zinc-800"
              }`}
            >
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`hidden text-[10px] font-black uppercase tracking-wider sm:block ${
                i === step ? "text-stone-800 dark:text-stone-200" : "text-stone-400"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-1 hidden h-px flex-1 sm:block ${i < step ? "bg-kraft" : "bg-stone-200 dark:bg-zinc-700"}`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35 }}
          className="space-y-5"
        >
          {step === 0 && (
            <>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                  Step 1 — Your details
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Where should we send your quote?
                </p>
              </div>
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
              <WizardField
                id="wizard-company"
                label="Company / name"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />
              <WizardField
                id="wizard-email"
                label="Work email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                  Step 2 — Product requirements
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Select ply type and describe dimensions, print, or volume.
                </p>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">
                  Ply configuration
                </p>
                <div className="flex flex-wrap gap-2">
                  {PLY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          ply: f.ply === opt.value ? "" : opt.value,
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${
                        form.ply === opt.value
                          ? "bg-gradient-to-r from-kraft to-kraft-dark text-charcoal shadow-md"
                          : "border border-stone-200 bg-white text-stone-500 hover:border-kraft dark:border-zinc-700 dark:bg-zinc-950"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <textarea
                  required
                  id="wizard-specs"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder=" "
                  className={`${inputClass} resize-none`}
                />
                <label htmlFor="wizard-specs" className={labelClass}>
                  Project specifications
                </label>
              </div>

              <FileDropzone
                attachment={attachment}
                error={fileError}
                onFile={onFile}
                onClear={() => onFile(null)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                  Step 3 — Review & send
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Confirm everything looks right before sending.
                </p>
              </div>
              <dl className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-5 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                <ReviewRow label="Company" value={form.company} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Ply" value={plyLabel(form.ply)} />
                <ReviewRow label="Attachment" value={attachment?.filename ?? "None"} />
                <div>
                  <dt className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                    Specifications
                  </dt>
                  <dd className="mt-2 whitespace-pre-wrap leading-relaxed text-stone-600 dark:text-stone-300">
                    {form.message}
                  </dd>
                </div>
              </dl>
              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30">
                  {submitError}
                </p>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {step > 0 && (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={14} /> Back
          </Button>
        )}
        <div className="flex-1" />
        {step < 2 ? (
          <Button
            type="button"
            disabled={!canAdvance()}
            onClick={() => setStep((s) => s + 1)}
            className="group"
          >
            Continue
            <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Button>
        ) : (
          <Magnetic className="w-full sm:w-auto">
            <Button
              type="button"
              disabled={loading}
              onClick={submit}
              className="group w-full !px-10 !py-4 !text-base sm:min-w-[14rem]"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin shrink-0" />
                  Sending…
                </>
              ) : (
                <>
                  {submitLabel}
                  <Send size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </Magnetic>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-stone-100 pb-3 last:border-0 dark:border-zinc-800">
      <dt className="text-[10px] font-black uppercase tracking-wider text-stone-400">{label}</dt>
      <dd className="text-right font-medium text-stone-800 dark:text-stone-200">{value}</dd>
    </div>
  );
}

function WizardField({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        required
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={inputClass}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  );
}

function FileDropzone({
  attachment,
  error,
  onFile,
  onClear,
}: {
  attachment: Attachment | null;
  error: string;
  onFile: (file: File | null) => void;
  onClear: () => void;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">
        Artwork / dieline (optional)
      </p>
      {!attachment ? (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) onFile(file);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
            dragging
              ? "border-kraft bg-kraft/5"
              : "border-stone-200 bg-white hover:border-kraft/50 dark:border-zinc-700 dark:bg-zinc-950"
          }`}
        >
          <FileUp size={22} className="mb-2 text-kraft" />
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Drop PDF or image here
          </span>
          <span className="mt-1 text-xs text-stone-400">Max 2 MB · PDF, PNG, JPG</span>
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-kraft/30 bg-kraft/5 px-4 py-3">
          <FileUp size={18} className="shrink-0 text-kraft" />
          <span className="flex-1 truncate text-sm font-medium text-stone-700 dark:text-stone-300">
            {attachment.filename}
          </span>
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-zinc-800"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
