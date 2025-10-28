import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false; // penting! biar endpoint tetap server-side

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields" }),
        { status: 400 }
      );
    }

    const FROM_ADDRESS = "contact@habibmuhammad.my.id"; // pastikan sudah diverifikasi di Resend
    const TO_ADDRESS = "muhabib10alhud@gmail.com";

    await resend.emails.send({
      from: `Website Contact <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent" }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("CONTACT POST ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
};

