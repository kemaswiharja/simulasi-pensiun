// Penghitung Suka & pengunjung untuk Simulasi Uang Pensiun.
// Penyimpanan: Upstash Redis (Vercel Marketplace). Env var diisi otomatis
// saat database disambungkan ke proyek di Vercel (Storage → Upstash for Redis).
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const K = "simulasi-pensiun:";

const ACTIONS = {
  visit: [["INCR", K + "visitors"], ["INCR", K + "views"]], // kunjungan pertama dari browser ini
  view: [["INCR", K + "views"]],                             // kunjungan ulang
  like: [["INCR", K + "likes"]],
  unlike: [["DECR", K + "likes"]],
};

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(503).json({ error: "Database penghitung belum disambungkan" });
  }

  const action = (req.query && req.query.action) || "";
  let cmds = [];
  if (req.method === "POST") {
    if (!ACTIONS[action]) return res.status(400).json({ error: "Aksi tidak dikenal" });
    cmds = ACTIONS[action].slice();
  } else if (req.method !== "GET") {
    return res.status(405).json({ error: "Metode tidak didukung" });
  }
  cmds.push(["MGET", K + "likes", K + "visitors", K + "views"]);

  try {
    const r = await fetch(REDIS_URL.replace(/\/$/, "") + "/pipeline", {
      method: "POST",
      headers: { Authorization: "Bearer " + REDIS_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
    });
    if (!r.ok) throw new Error("Redis HTTP " + r.status);
    const out = await r.json();
    const [likes, visitors, views] = out[out.length - 1].result.map((v) => Math.max(0, Number(v) || 0));
    return res.status(200).json({ likes, visitors, views });
  } catch (e) {
    return res.status(502).json({ error: "Gagal menghubungi database" });
  }
};
