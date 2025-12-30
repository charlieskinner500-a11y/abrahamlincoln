export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "config";

  try {
    const raw = await env.SITE_KV.get(key);
    if (!raw) {
      return new Response(JSON.stringify({ value: null }), {
        headers: { "content-type": "application/json" },
      });
    }

    // If old/bad data exists in KV, this prevents 1101
    const value = JSON.parse(raw);

    return new Response(JSON.stringify({ value }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    // Don’t crash the worker — return null instead
    return new Response(JSON.stringify({ value: null, error: "Bad JSON in KV for this key" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}









