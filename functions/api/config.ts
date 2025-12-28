export async function onRequestGet({ request, env }) {

  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "config";

  const raw = await env.SITE_KV.get(key);
  const value = raw ? JSON.parse(raw) : null;

  return new Response(JSON.stringify({ value }), {
    headers: { "content-type": "application/json" },
  });
}
