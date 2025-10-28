import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const token = btoa(`${a + b}:${Date.now()}`);

  const html = `
    <label class="block text-sm font-medium text-gray-200 mb-2">
      Berapa hasil dari <strong>${a} + ${b}</strong>?
    </label>
    <input type="number" id="captcha_answer" name="captcha_answer" required
      class="w-full rounded-lg border border-gray-600 bg-gray-800 text-white p-2" />
  `;

  return new Response(JSON.stringify({ html, token }), {
    headers: { "Content-Type": "application/json" },
  });
};
