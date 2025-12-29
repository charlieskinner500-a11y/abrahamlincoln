export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  // If URL already has v, allow through
  if (url.searchParams.has("v")) {
    return fetch(request);
  }

  // Check for existing cookie
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/site_v=([a-z0-9]+)/);

  let v = match?.[1];

  // If no cookie, create one
  if (!v) {
    v = crypto.randomUUID().slice(0, 8);
  }

  url.searchParams.set("v", v);

  const response = Response.redirect(url.toString(), 302);

  // Persist v for this device
  response.headers.set(
    "Set-Cookie",
    `site_v=${v}; Path=/; Max-Age=31536000; SameSite=Lax`
  );

  return response;
};

