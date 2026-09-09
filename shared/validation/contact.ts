import { z } from "zod";

const attachmentSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.enum([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ]),
  /** Base64-encoded file bytes (no data: prefix) */
  data: z.string().min(1).max(2_800_000),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
  ply: z.enum(["3", "5", "7", "diecut"]).optional(),
  attachment: attachmentSchema.optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const PLY_OPTIONS = [
  { value: "3" as const, label: "3-ply" },
  { value: "5" as const, label: "5-ply" },
  { value: "7" as const, label: "7-ply" },
  { value: "diecut" as const, label: "Die-cut / custom" },
];

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
