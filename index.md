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
  <h2>Últimos artigos</h2>

  {% comment %}
    Se houver vídeo em _data/youtube.yml, mostramos 1 card de vídeo + 2 artigos.
    Caso contrário, mantemos 3 artigos (comportamento atual).
  {% endcomment %}
  {% assign has_video = false %}
  {% if site.data.youtube and site.data.youtube.last_id %}
    {% assign has_video = true %}
  {% endif %}

  {% assign limit_posts = 3 %}
  {% if has_video %}
    {% assign limit_posts = 2 %}
  {% endif %}

  <div class="cards">

    {% if has_video %}
      {% assign vid = site.data.youtube %}
      <article class="card card-video">
        <a href="https://www.youtube.com/watch?v={{ vid.last_id | escape }}" target="_blank" rel="noopener" aria-label="Assistir: {{ vid.title | default: 'Último vídeo no YouTube' }}">
          <div class="thumb video-thumb" style="--yt-thumb:url('https://img.youtube.com/vi/{{ vid.last_id | escape }}/hqdefault.jpg')">
            <span class="play-badge" aria-hidden="true">▶</span>
          </div>
          <div class="card-body">
            <p class="meta">
              <span class="cat">YouTube</span>
              {% if vid.published %}<span class="date">{{ vid.published }}</span>{% endif %}
            </p>
            <h3>{{ vid.title | default: 'Último vídeo no YouTube' }}</h3>
            <p class="exc">Assista à atualização mais recente do canal. Conteúdo alinhado com os artigos da semana.</p>
            <span class="ler">Ver no YouTube →</span>
          </div>
        </a>
      </article>
    {% endif %}

    {% if site.posts and site.posts.size > 0 %}
      {% for post in site.posts limit:limit_posts %}
        <article class="card">
          <a href="{{ post.url | relative_url }}">
            <div class="thumb" style="background-image:url('{{ post.image | default: '/assets/posts/default.jpg' | relative_url }}')"></div>
            <div class="card-body">
              <p class="meta">
                {% if post.categories and post.categories.size > 0 %}
                  <span class="cat">{{ post.categories[0] }}</span>
                {% endif %}
                <span class="date">{{ post.date | date: "%d %b %Y" }}</span>
              </p>
              <h3>{{ post.title }}</h3>
              <p class="exc">{{ post.excerpt | default: post.content | strip_html | truncate: 140 }}</p>
              <span class="ler">Ler artigo →</span>
            </div>
          </a>
        </article>
      {% endfor %}
    {% else %}
      <p>Em breve, novos artigos no blog.</p>
    {% endif %}
  </div>
</section>

<style>
/* Ajuste visual do card de vídeo para manter o padrão dos cards */
.card-video .video-thumb{
  position: relative;
  background-image: var(--bg, none);
  background: #000;
}
.card-video .video-thumb{
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