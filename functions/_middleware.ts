export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);

  // Never touch API routes or non-GET
  if (url.pathname.startsWith("/api/") || request.method !== "GET") {
    return next();
  }

  // Only redirect real page navigations
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/html")) {
    return next();
  }

  // Already has version
  if (url.searchParams.has("v")) {
    return next();
  }

  // Generate Pages-safe unique version
  const version = Math.random().toString(36).slice(2, 10);
  url.searchParams.set("v", version);

  return Response.redirect(url.toString(), 302);
};




