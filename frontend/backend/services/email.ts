export async function sendInquiryEmail(payload: {
  name: string;
  email: string;
  message: string;
  ply?: string;
  attachment?: { filename: string; mimeType: string; data: string };
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SALES_EMAIL;
  if (!apiKey || !to) return;

  const plyLine = payload.ply
    ? `Ply: ${payload.ply === "diecut" ? "Die-cut / custom" : `${payload.ply}-ply`}\n`
    : "";

  const body: Record<string, unknown> = {
    from: "Sri Vigneshwara Packaging <onboarding@resend.dev>",
    to: [to],
    reply_to: payload.email,
    subject: `New inquiry from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n${plyLine}\n${payload.message}`,
  };

  if (payload.attachment) {
    body.attachments = [
      {
        filename: payload.attachment.filename,
        content: payload.attachment.data,
      },
    ];
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
