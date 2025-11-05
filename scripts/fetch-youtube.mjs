// scripts/fetch-youtube.mjs
import fs from "node:fs";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import yaml from "yaml";

const PLAYLISTS = [
  {
    name: "MD Personal",
    id: "PLyHDAg9JOEnxubgaUYGLFrZJkPDi6lBX-", // sua playlist MD
  },
  {
    name: "CNT",
    id: "PLyHDAg9JOEnwA_QHpPrUbBBtagjQPT8tZ", // sua playlist CNT
  },
];

const FEED_URL = (playlistId) =>
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

async function fetchLatest(playlist) {
  const res = await fetch(FEED_URL(playlist.id));
  if (!res.ok) throw new Error(`Falha ao buscar RSS da playlist ${playlist.name}`);

  const xml = await res.text();
  const data = await parseStringPromise(xml);

  // Estrutura do feed:
  // data.feed.entry[0] é o vídeo mais recente
  const entry = data?.feed?.entry?.[0];
  if (!entry) return { ...playlist, last_id: null };

  const videoId = entry?.["yt:videoId"]?.[0] || null;
  const title = entry?.title?.[0] || "";
  const published = entry?.published?.[0] || "";

  return {
    ...playlist,
    last_id: videoId,
    title,
    published,
    url: videoId ? `https://www.youtube.com/watch?v=${videoId}&list=${playlist.id}` : "",
    thumb_hq: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
  };
}

async function main() {
  const results = [];
  for (const p of PLAYLISTS) {
    try {
      const r = await fetchLatest(p);
      results.push(r);
    } catch (e) {
      console.error(e);
      results.push({ ...p, last_id: null, title: "", published: "" });
    }
  }

  const doc = {
    updated_at: new Date().toISOString(),
    playlists: results,
  };

  const yml = yaml.stringify(doc);
  fs.mkdirSync("_data", { recursive: true });
  fs.writeFileSync("_data/youtube.yml", yml, "utf8");
  console.log("Escrito em _data/youtube.yml:\n", yml);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});