// scripts/fetch-youtube.mjs
import fs from "node:fs";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import yaml from "yaml";

const PLAYLISTS = [
  { name: "MD Personal — Playlist 1", id: "PLyHDAg9JOEnxubgaUYGLFrZJkPDi6lBX-" },
  { name: "MD Personal — Playlist 2", id: "PLyHDAg9JOEnwA_QHpPrUbBBtagjQPT8tZ" },
];

const FEED_URL = (playlistId) =>
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

async function fetchLatest(playlist) {
  const res = await fetch(FEED_URL(playlist.id));
  if (!res.ok) throw new Error(`Falha ao buscar RSS da playlist: ${playlist.name}`);

  const xml = await res.text();
  const data = await parseStringPromise(xml);

  // Vídeo mais recente
  const entry = data?.feed?.entry?.[0];
  const videoId = entry?.["yt:videoId"]?.[0] || "";
  const titleLast = entry?.title?.[0] || "";
  const published = entry?.published?.[0] || "";

  return {
    // título exibido no card (pode ser só o nome da playlist)
    title: playlist.name,
    // link PRINCIPAL usado no index -> abre a página da PLAYLIST
    url: `https://www.youtube.com/playlist?list=${playlist.id}`,

    // dados auxiliares do último vídeo (se quiser usar)
    last_id: videoId,
    title_last: titleLast,
    published,

    // miniatura (capa do último vídeo); o index usa 'thumb'
    thumb: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",

    // opcional: link direto para o vídeo já dentro da playlist
    url_video: videoId
      ? `https://www.youtube.com/watch?v=${videoId}&list=${playlist.id}`
      : "",

    // sempre bom manter o id da playlist
    id: playlist.id,
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
      results.push({
        title: p.name,
        url: `https://www.youtube.com/playlist?list=${p.id}`,
        last_id: "",
        title_last: "",
        published: "",
        thumb: "",
        url_video: "",
        id: p.id,
      });
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