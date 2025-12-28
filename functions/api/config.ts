export async function onRequestGet({ env }: any) {
  const data = await env.SITE_KV.get("site_config", "json");
  return new Response(JSON.stringify(data ?? {}), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}
