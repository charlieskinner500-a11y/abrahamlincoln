export interface Env {
  SITE_KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (!key) {
      return new Response(JSON.stringify({ value: null }), {
        headers: { "content-type": "application/json" },
      });
    }

    const value = await env.SITE_KV.get(key);

    return new Response(
      JSON.stringify({ value: value ? JSON.parse(value) : null }),
      {
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "config read failed" }),
      { status: 500 }
    );
  }
};


