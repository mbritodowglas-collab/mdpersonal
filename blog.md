---
layout: default
title: Blog
permalink: /blog/
---

<!-- TÍTULO FIXO (fora do grid) -->
<section class="blog-header">
  <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
  <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão de academias — base dos vídeos do canal.</p>
</section>

<!-- DESTAQUE: player do YouTube no topo (substitui o antigo "último artigo") -->
<section class="blog-destaque">
  <div class="dst-wrap dst-video" aria-label="Playlist do YouTube — MD Personal">
    <div class="thumb" style="aspect-ratio:16/9; border-radius:12px; overflow:hidden;">
      <iframe
        src="https://www.youtube.com/embed/videoseries?list=PLyHDAg9JOEnxubgaUYGLFrZJkPDi6lBX-"
        title="Últimos vídeos — MD Personal"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="width:100%;height:100%;border:0;"></iframe>
    </div>
    <div class="dst-info">
      <span class="cat">YouTube</span>
      <h2>Últimos vídeos — MD Personal</h2>
      <p>Assista diretamente à playlist do canal. A capa e a ordem se atualizam conforme você organiza a playlist no YouTube.</p>
      <div class="row">
        <a class="btn" href="https://youtube.com/playlist?list=PLyHDAg9JOEnxubgaUYGLFrZJkPDi6lBX-" target="_blank" rel="noopener">Abrir playlist</a>
      </div>
    </div>
  </div>
</section>

<!-- GRID: lateral + lista -->
<div class="blog-layout">
  <aside class="blog-sidebar">
    <nav class="blog-filtros-vertical" aria-label="Filtrar por categoria">
      <button data-filter="all" class="on">Últimos</button>
      <button data-filter="Treino">Treino</button>
      <button data-filter="Neurociência">Neurociência</button>
      <button data-filter="Nutrição">Nutrição</button>
      <button data-filter="Gestão">Gestão</button>
      <button data-filter="Depoimentos">Depoimentos</button>
    </nav>
  </aside>

  <section class="blog-lista">
    <div class="cards">
      {% if site.posts and site.posts.size > 0 %}
        {% for post in site.posts %}
          {% assign cats = post.categories | join: ' ' %}
          {% assign tags = post.tags | join: ' ' %}
          <article class="card" data-cats="{{ cats }} {{ tags }}">
            <a href="{{ post.url | relative_url }}">
              <div class="thumb" style="background-image:url('{{ post.image | default: '/assets/img/thumb-default.jpg' | relative_url }}')"></div>
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
        <p>Em breve, artigos sobre desempenho físico, mental e gestão de academias.</p>
      {% endif %}
    </div>
  </section>
</div>

<!-- SCRIPT (filtro + suporte a ?tag= e ?cat=) -->
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));

  function applyFilter(f){
    const needle = (f || 'all').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();
    cards.forEach(c=>{
      const cats = (c.dataset.cats || '')
        .normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
      const match = (needle === 'all' || cats.includes(needle));
      c.style.display = match ? '' : 'none';
    });
  }

  // Clique nos botões
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
    });
  });

  // Suporte a ?tag= e ?cat= (aceita acentos/maiúsculas)
  const params = new URLSearchParams(window.location.search);
  const qs = (params.get('tag') || params.get('cat') || '').trim();
  if (qs){
    // Tenta ativar botão se existir
    const matchBtn = btns.find(b => b.dataset.filter.toLowerCase() === qs.toLowerCase());
    if (matchBtn){ matchBtn.click(); }
    else { // Senão, filtra direto por substring (funciona p/ tags)
      btns.forEach(b=>b.classList.remove('on'));
      applyFilter(qs);
    }
  } else {
    applyFilter('all');
  }
})();
</script>

<style>
/* Ajustes visuais do destaque com vídeo (mantém estética do blog) */
.blog-destaque .dst-wrap{
  display:grid; gap:12px;
  grid-template-columns: 1fr;
  background:#0f0f0f; border:1px solid #1f1f1f; border-radius:16px;
  padding:12px;
}
.blog-destaque .thumb{ background:#000; }
.blog-destaque .dst-info{ display:flex; flex-direction:column; gap:.4rem; padding:4px 6px; }
.blog-destaque .dst-info .cat{
  display:inline-block; background:rgba(227,197,101,.1);
  color:#e3c565; border:1px solid rgba(227,197,101,.35);
  padding:.12rem .5rem; border-radius:999px; font-weight:600; font-size:.9rem;
}
.blog-destaque h2{ margin:.2rem 0 .25rem; font-size:1.2rem; color:#fff; }
.blog-destaque p{ color:#cfcfcf; margin:0; }
.blog-destaque .row{ margin-top:.5rem; }
.blog-destaque .btn{ display:inline-block; padding:.6rem .9rem; border-radius:10px; background:#d62828; color:#fff; text-decoration:none; font-weight:700; }
.blog-destaque .btn:hover{ background:#ff4040; }

/* Layout responsivo do destaque */
@media (min-width:860px){
  .blog-destaque .dst-wrap{ grid-template-columns: 1.3fr .7fr; }
}

/* Opcional: garantir mesma “cara” dos cards */
.blog-lista .cards .thumb{ aspect-ratio:16/9; background-size:cover; background-position:center; }
</style>