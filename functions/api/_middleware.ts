export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  // ✅ Never touch API routes or non-GET requests
  if (url.pathname.startsWith("/api/") || request.method !== "GET") {
    return fetch(request);
  }

  // ✅ Already has version → continue
  if (url.searchParams.has("v")) {
    return fetch(request);
  }

  // ✅ Generate lightweight version (Pages-safe)
  const version = Math.random().toString(36).slice(2, 10);

  url.searchParams.set("v", version);

  return Response.redirect(url.toString(), 302);
};


