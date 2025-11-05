// scripts/fetch-youtube.mjs
import fs from "node:fs";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import yaml from "yaml";

const PLAYLISTS = [
  { name: "MD Personal", id: "PLyHDAg9JOEnxubgaUYGLFrZJkPDi6lBX-" },
  { name: "CNT",         id: "PLyHDAg9JOEnwA_QHpPrUbBBtagjQPT8tZ" },
];

const FEED_URL = (id) => `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`;

async function fetchLatest(p) {
  const r = await fetch(FEED_URL(p.id));
  if (!r.ok) throw new Error(`Falha ao buscar RSS da playlist ${p.name}`);
  const xml = await r.text();
  const data = await parseStringPromise(xml);

  const entry = data?.feed?.entry?.[0]; // último vídeo
  if (!entry) {
    return {
      ...p,
      last_id: "",
      title_last: "",
      // published vazio força a cair pro fim no sort
      published: "",
      url_playlist: `https://www.youtube.com/playlist?list=${p.id}`,
      url_watch: "",
      thumb_hq: "",
    };
  }

  const videoId   = entry?.["yt:videoId"]?.[0] || "";
  const title     = entry?.title?.[0] || "";
  const published = entry?.published?.[0] || ""; // ISO 8601 (ok p/ sort lexicográfico)

  return {
    ...p,
    last_id: videoId,
    title_last: title,
    published, // ISO, ex: 2025-11-05T12:34:56+00:00
    url_playlist: `https://www.youtube.com/playlist?list=${p.id}`,
    url_watch: videoId ? `https://www.youtube.com/watch?v=${videoId}&list=${p.id}` : "",
    thumb_hq: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
  };
}

async function main() {
  const playlists = [];
  for (const p of PLAYLISTS) {
    try { playlists.push(await fetchLatest(p)); }
    catch (e) {
      console.error(e);
      playlists.push({
        ...p,
        last_id: "",
        title_last: "",
        published: "",
        url_playlist: `https://www.youtube.com/playlist?list=${p.id}`,
        url_watch: "",
        thumb_hq: "",
      });
    }
  }

  const doc = { updated_at: new Date().toISOString(), playlists };
  fs.mkdirSync("_data", { recursive: true });
  fs.writeFileSync("_data/youtube.yml", yaml.stringify(doc), "utf8");
  console.log("OK: _data/youtube.yml atualizado");
}

main().catch(err => { console.error(err); process.exit(1); });