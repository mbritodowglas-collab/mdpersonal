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
      <div class="thumb" style="background-image:url('{{ post.image | default: '/assets/img/thumb-default.jpg' | relative_url }}')"></div>
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
  <h3>Categorias</h3>
  <nav class="blog-filtros-vertical">
    <button data-filter="all" class="on">Últimos</button>
    <button data-filter="Treino">Treino</button>
    <button data-filter="Neurociência">Neurociência</button>
    <button data-filter="Nutrição">Nutrição</button>
    <button data-filter="Gestão">Gestão</button>
  </nav>
</aside>
  <section class="blog-lista">
    <div class="cards">
      {% if site.posts and site.posts.size > 0 %}
        {% for post in site.posts %}
          <article class="card" data-cats="{{ post.categories | join: ',' }}">
            <a href="{{ post.url | relative_url }}">
              <div class="thumb" style="background-image:url('{{ post.image | default: '/assets/css/thumb-default.jpg' | relative_url }}')"></div>
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

<!-- SCRIPT (filtro sem scroll) -->
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      // estado ativo
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');

      // filtra
      const f = (btn.dataset.filter || 'all').toLowerCase();
      cards.forEach(c=>{
        const cats = (c.dataset.cats || '').toLowerCase();
        const match = (f === 'all' || cats.includes(f));
        c.style.display = match ? '' : 'none';
      });
    });
  });
})();
</script>
