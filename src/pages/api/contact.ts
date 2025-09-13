// src/pages/api/contact.ts
// import type { APIRoute } from "astro";
// import { Resend } from "resend";

// export const prerender = false; // kalau site kamu masih output: 'static', ini wajib

// const resend = new Resend(import.meta.env.RESEND_API_KEY || "");

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const ct = request.headers.get("content-type") || "";
//     let body: any = {};

//     if (ct.includes("application/json")) {
//       body = await request.json();
//     } else {
//       // fallback to formData if needed
//       const fd = await request.formData();
//       body = Object.fromEntries(fd.entries() as any);
//     }

//     const name = (body.name || "Guest").toString();
//     const email = (body.email || "").toString();
//     const message = (body.message || "").toString();

//     if (!email || !message) {
//       return new Response(JSON.stringify({ success: false, message: "Missing email or message" }), { status: 400 });
//     }

//     // GANTI domainkamu.com ke domain yang sudah kamu verifikasi di Resend
//     const FROM_ADDRESS = "contact@habibmuhammad.my.id";
//     const TO_ADDRESS = "muhabib10alhud@gmail.com";

//     await resend.emails.send({
//       from: `Website Contact <${FROM_ADDRESS}>`,
//       to: TO_ADDRESS,
//       subject: `New message from ${name}`,
//       html: `
//         <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
//         <hr />
//         <p>${message.replace(/\n/g, "<br/>")}</p>
//       `,
//     });

//     return new Response(JSON.stringify({ success: true, message: "Email sent" }), { status: 200 });
//   } catch (err) {
//     console.error("CONTACT POST ERROR:", err);
//     return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
//   }
// };

import type { APIRoute } from "astro";

export const prerender = false; // 👈 WAJIB biar route ini bukan static

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_ADDRESS = "contact@habibmuhammad.my.id"; // email/domain terverifikasi di Resend
const TO_ADDRESS = "muhabib10alhud@gmail.com"; // email tujuan kamu

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid form data" }),
        { status: 400 }
      );
    }

    // Panggil Resend API via fetch
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Website Contact <${FROM_ADDRESS}>`,
        to: [TO_ADDRESS],
        subject: `New message from ${name}`,
        reply_to: email,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          <p>${(message as string).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API Error:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to send email" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("CONTACT POST ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
};
