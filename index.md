---
layout: default
title: Início
body_class: home-page
description: "{{ site.meta_descriptions.home }}"
---

<section class="blog-header">
  <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
  <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão de academias — base dos vídeos do canal.</p>
</section>

<div class="blog-layout">
  <!-- Lateral fixa de categorias -->
  <aside class="blog-sidebar">
    <h3>Categorias</h3>
    <nav class="blog-filtros-vertical">
      <button data-filter="ultimos" class="on">Últimos</button>
      <button data-filter="treino">Treino</button>
      <button data-filter="neurociência">Neurociência</button>
      <button data-filter="nutrição">Nutrição</button>
      <button data-filter="gestão">Gestão</button>
    </nav>
  </aside>

  <section class="blog-lista">
    <!-- Destaque (top 1 do paginator) -->
    {% assign top = paginator.posts | first %}
    {% if top %}
    <a class="dst-wrap" href="{{ top.url | relative_url }}">
      <span class="dst-thumb" style="background-image:url('{{ top.cover | default: site.default_thumb | relative_url }}')"></span>
      <span class="dst-info">
        <span class="cat">{{ top.category | default: 'Treino' }}</span>
        <h2>{{ top.title }}</h2>
        <p>{{ top.description | default: top.excerpt | strip_html | truncate: 140 }}</p>
      </span>
    </a>
    {% endif %}

    <!-- Cards (pula o primeiro) -->
    <div class="cards">
      {% for post in paginator.posts offset:1 %}
      <article class="card" data-cats="{{ post.category | downcase }}">
        <a href="{{ post.url | relative_url }}">
          <span class="thumb" style="background-image:url('{{ post.cover | default: site.default_thumb | relative_url }}')"></span>
          <div class="card-body">
            <div class="meta">
              <span class="cat">{{ post.category | default: 'Treino' }}</span>
              <span class="date">{{ post.date | date: "%d %b %Y" }}</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p class="exc">{{ post.description | default: post.excerpt | strip_html | truncate: 110 }}</p>
            <span class="ler">Ler artigo →</span>
          </div>
        </a>
      </article>
      {% endfor %}
    </div>

    <!-- Paginação -->
    <nav class="post-nav" aria-label="Paginação">
      {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}">← Mais recentes</a>
      {% else %}
        <span></span>
      {% endif %}

      {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}">Mais antigos →</a>
      {% endif %}
    </nav>
  </section>
</div>

<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card[data-cats]'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));
  const norm = s => (s||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();

  function applyFilter(slug){
    const f = norm(slug);
    cards.forEach(c=>{
      const cat = norm(c.dataset.cats||'');
      c.style.display = (!f || f==='ultimos' || cat.includes(f)) ? '' : 'none';
    });
  }
  btns.forEach(b=>b.addEventListener('click',()=>{
    btns.forEach(x=>x.classList.remove('on')); b.classList.add('on');
    applyFilter(b.dataset.filter);
    window.scrollTo({top:0,behavior:'smooth'});
  }));
  applyFilter('ultimos');
})();
</script>

