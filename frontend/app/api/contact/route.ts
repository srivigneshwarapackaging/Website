import { connectDB } from "@/backend/db/connection";
import Inquiry from "@/backend/models/Inquiry";
import { sendInquiryEmail } from "@/backend/services/email";
import { contactSchema } from "@/shared/validation/contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    await connectDB();
    const newInquiry = await Inquiry.create({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      ply: parsed.data.ply,
      attachmentName: parsed.data.attachment?.filename,
      date: new Date(),
    });

    sendInquiryEmail(parsed.data).catch(console.error);

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("Contact Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
