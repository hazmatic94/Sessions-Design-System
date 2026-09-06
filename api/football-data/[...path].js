export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_API_TOKEN?.trim();

  if (!token) {
    return res.status(503).json({
      error:
        "Missing API token. Add FOOTBALL_DATA_API_TOKEN in Vercel environment variables.",
    });
  }

  const pathParts = req.query.path;
  const upstreamPath = Array.isArray(pathParts)
    ? pathParts.join("/")
    : pathParts || "";
  const queryIndex = req.url?.indexOf("?") ?? -1;
  const query = queryIndex >= 0 ? req.url.slice(queryIndex) : "";
  const upstreamUrl = `https://api.football-data.org/${upstreamPath}${query}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {"X-Auth-Token": token},
      method: "GET",
    });
    const body = await upstream.text();

    res.status(upstream.status);
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json",
    );
    res.setHeader("Cache-Control", "no-store");
    res.send(body);
  } catch (error) {
    res.status(502).json({error: String(error)});
  }
}
