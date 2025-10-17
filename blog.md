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

<!-- DESTAQUE (fora do header) -->
{% if site.posts and site.posts.size > 0 %}
  {% assign destaque = site.posts | first %}
  <section class="blog-destaque">
    <a class="dst-wrap" href="{{ destaque.url | relative_url }}">
      <div class="thumb" style="background-image:url('{{ destaque.image | default: '/assets/img/thumb-default.jpg' | relative_url }}')"></div>
      <div class="dst-info">
        {% if destaque.categories and destaque.categories.size > 0 %}
          <span class="cat">{{ destaque.categories[0] }}</span>
        {% endif %}
        <h2>{{ destaque.title }}</h2>
        <p>{{ destaque.excerpt | default: destaque.content | strip_html | truncate: 160 }}</p>
      </div>
    </a>
  </section>
{% endif %}

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
