// Vercel serverless function: append review records to reviews/<who>.jsonl in this GitHub repo.
// Env: GITHUB_TOKEN (fine-grained, Contents: read+write on this repo), GITHUB_REPO ("owner/name").
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const recs = Array.isArray(req.body) ? req.body : [req.body];
  const token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPO;
  if (!token || !repo) return res.status(500).json({ error: "GITHUB_TOKEN / GITHUB_REPO not set" });
  const byWho = {};
  for (const r of recs) (byWho[(r.who || "anon").replace(/[^a-z0-9_-]/gi, "")] ||= []).push(JSON.stringify(r));
  const h = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" };
  for (const [who, lines] of Object.entries(byWho)) {
    const path = `reviews/${who}.jsonl`, url = `https://api.github.com/repos/${repo}/contents/${path}`;
    for (let attempt = 0; attempt < 3; attempt++) {
      const cur = await fetch(url, { headers: h });
      let sha, old = "";
      if (cur.ok) { const j = await cur.json(); sha = j.sha; old = Buffer.from(j.content, "base64").toString("utf8"); }
      const body = { message: `review: ${who} +${lines.length}`, content: Buffer.from(old + lines.join("\n") + "\n").toString("base64"), ...(sha ? { sha } : {}) };
      const put = await fetch(url, { method: "PUT", headers: h, body: JSON.stringify(body) });
      if (put.ok) break;
      if (put.status !== 409 && put.status !== 422) return res.status(502).json({ error: await put.text() });
    }
  }
  res.status(200).json({ ok: true, n: recs.length });
}
