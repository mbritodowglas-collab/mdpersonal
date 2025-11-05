---
layout: default
title: Início
---

<section class="hero" style="background-image:url('{{ '/assets/css/hero.jpg' | relative_url }}')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1>MÁRCIO DOWGLAS PERSONAL TRAINER</h1>
    <p class="sub">Treino, neurociência e saúde mental — artigos que viram vídeos e resultados reais.</p>
    <div class="btn-row">
      <a class="btn destaque" href="{{ '/avaliacao' | relative_url }}">Avaliação gratuita</a>
    </div>
  </div>
</section>

<section class="artigos">
  <h2>Últimos artigos e vídeos</h2>

  {%- comment -%}
    Seleciona a playlist mais recente entre _data/youtube.yml -> playlists,
    comparando o campo "published" (quando existir).
  {%- endcomment -%}
  {%- assign has_video = false -%}
  {%- assign vid = nil -%}

  {%- if site.data.youtube and site.data.youtube.playlists and site.data.youtube.playlists.size > 0 -%}
    {%- assign vid = site.data.youtube.playlists[0] -%}
    {%- assign latest_date = vid.published | default: '' -%}
    {%- for it in site.data.youtube.playlists -%}
      {%- if it.published and it.published != '' -%}
        {%- if latest_date == '' -%}
          {%- assign latest_date = it.published -%}
          {%- assign vid = it -%}
        {%- else -%}
          {%- if it.published > latest_date -%}
            {%- assign latest_date = it.published -%}
            {%- assign vid = it -%}
          {%- endif -%}
        {%- endif -%}
      {%- endif -%}
    {%- endfor -%}
    {%- if vid -%}{%- assign has_video = true -%}{%- endif -%}
  {%- endif -%}

  {%- assign limit_posts = 3 -%}
  {%- if has_video -%}{%- assign limit_posts = 2 -%}{%- endif -%}

  <div class="cards">

    {%- if has_video -%}
      {%- comment -%} Monta URL da playlist {%- endcomment -%}
      {%- assign pl_url = vid.url -%}
      {%- if pl_url == nil or pl_url == '' -%}
        {%- if vid.id -%}
          {%- assign pl_url = 'https://www.youtube.com/playlist?list=' | append: vid.id -%}
        {%- endif -%}
      {%- endif -%}

      {%- comment -%} Resolve thumb (thumb > thumb_hq > last_id) {%- endcomment -%}
      {%- assign yt_thumb = vid.thumb -%}
      {%- if yt_thumb == nil or yt_thumb == '' -%}
        {%- assign yt_thumb = vid.thumb_hq -%}
      {%- endif -%}
      {%- if yt_thumb == nil or yt_thumb == '' -%}
        {%- if vid.last_id -%}
          {%- assign yt_thumb = 'https://img.youtube.com/vi/' | append: vid.last_id | append: '/hqdefault.jpg' -%}
        {%- endif -%}
      {%- endif -%}

      <article class="card card-video">
        <a href="{{ pl_url }}" target="_blank" rel="noopener" aria-label="Abrir playlist no YouTube: {{ vid.title | default: 'Últimos vídeos' }}">
          <div class="thumb video-thumb" style="--yt-thumb:url('{{ yt_thumb }}')">
            <span class="play-badge" aria-hidden="true">▶</span>
          </div>
          <div class="card-body">
            <p class="meta">
              <span class="cat">YouTube</span>
              {%- if vid.published and vid.published != '' -%}
                <span class="date">{{ vid.published }}</span>
              {%- endif -%}
            </p>
            <h3>{{ vid.title | default: 'Últimos vídeos' }}</h3>
            <p class="exc">Assista à playlist mais recente do canal. Mantemos alinhado com os artigos da semana.</p>
            <span class="ler">Abrir playlist →</span>
          </div>
        </a>
      </article>
    {%- endif -%}

    {%- if site.posts and site.posts.size > 0 -%}
      {%- for post in site.posts limit:limit_posts -%}
        <article class="card">
          <a href="{{ post.url | relative_url }}">
            <div class="thumb" style="background-image:url('{{ post.image | default: '/assets/posts/default.jpg' | relative_url }}')"></div>
            <div class="card-body">
              <p class="meta">
                {%- if post.categories and post.categories.size > 0 -%}
                  <span class="cat">{{ post.categories[0] }}</span>
                {%- endif -%}
                <span class="date">{{ post.date | date: "%d %b %Y" }}</span>
              </p>
              <h3>{{ post.title }}</h3>
              <p class="exc">{{ post.excerpt | default: post.content | strip_html | truncate: 140 }}</p>
              <span class="ler">Ler artigo →</span>
            </div>
          </a>
        </article>
      {%- endfor -%}
    {%- else -%}
      <p>Em breve, novos artigos no blog.</p>
    {%- endif -%}
  </div>
</section>

<style>
.artigos .cards{
  display:grid;
  gap:1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.artigos .card{
  background:#0f0f0f;
  border:1px solid #1f1f1f;
  border-radius:16px;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  transition:.25s ease;
}
.artigos .card:hover{ transform: translateY(-3px); border-color:#2a2a2a; }
.artigos .thumb{
  aspect-ratio:16/9;
  background-size:cover;
  background-position:center;
  filter:brightness(.92);
}
.artigos .card-body{ padding:1rem; display:flex; flex-direction:column; gap:.4rem; }
.artigos .meta{ display:flex; align-items:center; gap:.5rem; margin:0; font-size:.9rem; opacity:.95; }
.artigos .cat{
  background:rgba(227,197,101,.1);
  color:#e3c565; border:1px solid rgba(227,197,101,.35);
  padding:.12rem .5rem; border-radius:999px; font-weight:600;
}
.artigos h3{ color:#fff; font-size:1.08rem; margin:.2rem 0 .25rem; line-height:1.35; }
.artigos .exc{ color:#cfcfcf; margin:0; }
.artigos .ler{ color:#d62828; font-weight:700; margin-top:.2rem; }

/* Card de vídeo */
.card-video .video-thumb{
  position: relative;
  background-image: var(--yt-thumb);
  background-size: cover;
  background-position: center;
}
.card-video .thumb{
  aspect-ratio: 16/9;
  filter: brightness(.92);
}
.card-video .play-badge{
  position:absolute;
  inset:auto auto 10px 10px;
  display:inline-flex; align-items:center; justify-content:center;
  width:42px; height:42px; border-radius:50%;
  background:#ff0000; color:#fff; font-weight:700;
  box-shadow:0 6px 18px rgba(0,0,0,.35);
  font-size:1rem;
}
@media (hover:hover){
  .card-video:hover .thumb{ filter: brightness(1); }
}
</style>