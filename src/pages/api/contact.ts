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


// btasss

// export const prerender = false; // biar endpoint tetap server-side

// export async function POST({ request }: { request: Request }) {
//   try {
//     const formData = await request.formData();
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const message = formData.get("message");

//     const FROM_ADDRESS = "contact@habibmuhammad.my.id";
//     const TO_ADDRESS = "muhabib10alhud@gmail.com";

//     const resendRes = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: `Website Contact <${FROM_ADDRESS}>`,
//         to: [TO_ADDRESS],
//         subject: `New message from ${name}`,
//         reply_to: email,
//         html: `
//           <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
//           <hr />
//           <p>${message}</p>
//         `,
//       }),
//     });

//     if (!resendRes.ok) {
//       const errText = await resendRes.text();
//       console.error("RESEND ERROR:", errText);
//       return new Response(
//         JSON.stringify({ success: false, message: "Failed to send email." }),
//         { status: 500 }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: "Email sent successfully!" }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("CONTACT POST ERROR:", err);
//     return new Response(
//       JSON.stringify({ success: false, message: "Server error" }),
//       { status: 500 }
//     );
//   }
// }


import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    // 🔑 pastikan RESEND_API_KEY sudah di-set di Cloudflare Pages Environment Variables
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website Contact <contact@habibmuhammad.my.id>",
        to: "muhabib10alhud@gmail.com",
        subject: `New message from ${name}`,
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><hr /><p>${message.replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend error:", errorText);
      throw new Error(errorText);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent" }),
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
