
// src/pages/api/contact.ts
// import type { APIRoute } from "astro";
// import { Resend } from "resend";

// export const prerender = false; // penting kalau project output: static

// const resend = new Resend(import.meta.env.RESEND_API_KEY || "");

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const ct = request.headers.get("content-type") || "";

//     // terima JSON dulu (client kita kirim JSON). Jika tidak, fallback ke formData.
//     let name = "", email = "", message = "";
//     if (ct.includes("application/json")) {
//       const body = await request.json();
//       name = String(body.name ?? "");
//       email = String(body.email ?? "");
//       message = String(body.message ?? "");
//     } else {
//       // fallback: jika masih dikirim sebagai form-data
//       const data = await request.formData();
//       name = String(data.get("name") ?? "");
//       email = String(data.get("email") ?? "");
//       message = String(data.get("message") ?? "");
//     }

//     // validasi sederhana
//     if (!email || !message) {
//       return new Response(JSON.stringify({ success: false, message: "Missing fields" }), { status: 400 });
//     }

//     // kirim pake Resend
//     await resend.emails.send({
//       from: "mywebsite-contact <contact.habibmuhammad.my.id>",
//       to: "muhabib10alhud@gmail.com",
//       subject: `New message from ${name || "Guest"}`,
//       replyTo: email,
//       text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
//     });

//     return new Response(JSON.stringify({ success: true, message: "Email sent" }), { status: 200 });
//   } catch (err) {
//     console.error("CONTACT POST ERROR:", err);
//     return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
//   }
// };

// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false; // kalau site kamu masih output: 'static', ini wajib

const resend = new Resend(import.meta.env.RESEND_API_KEY || "");

export const POST: APIRoute = async ({ request }) => {
  try {
    const ct = request.headers.get("content-type") || "";
    let body: any = {};

    if (ct.includes("application/json")) {
      body = await request.json();
    } else {
      // fallback to formData if needed
      const fd = await request.formData();
      body = Object.fromEntries(fd.entries() as any);
    }

    const name = (body.name || "Guest").toString();
    const email = (body.email || "").toString();
    const message = (body.message || "").toString();

    if (!email || !message) {
      return new Response(JSON.stringify({ success: false, message: "Missing email or message" }), { status: 400 });
    }

    // GANTI domainkamu.com ke domain yang sudah kamu verifikasi di Resend
    const FROM_ADDRESS = "contact@habibmuhammad.my.id";
    const TO_ADDRESS = "muhabib10alhud@gmail.com";

    await resend.emails.send({
      from: `Website Contact <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      subject: `New message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent" }), { status: 200 });
  } catch (err) {
    console.error("CONTACT POST ERROR:", err);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
  }
};
