---
layout: default
title: Blog
---

<div class="blog-layout">
  <aside class="blog-sidebar">
    <h3>Categorias</h3>
    <nav class="blog-filtros-vertical">
      <button data-filter="all" class="on">🏋️ Treino</button>
      <button data-filter="Neurociência">🧠 Neurociência</button>
      <button data-filter="Nutrição">🥗 Nutrição</button>
      <button data-filter="Gestão">🧾 Gestão</button>
    </nav>
  </aside>

  <section class="blog-lista">
    <div class="cards">
      {% assign posts_ok = site.posts | where_exp: "p", "p.draft != true" %}
      {% if posts_ok.size > 0 %}
        {% for post in posts_ok %}
          <article class="card" data-cats="{{ post.categories | join: ',' }}">
            <a href="{{ post.url | relative_url }}">
              <div class="thumb" style="background-image:url('{{ post.image | default: site.default_thumb | relative_url }}')"></div>
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

<section class="blog-header">
  <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
  <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão de academias — base dos vídeos do canal.</p>
</section>

<section class="blog-lista">
  <div class="cards">
    {% if site.posts and site.posts.size > 0 %}
      {% for post in site.posts %}
        <article class="card" data-cats="{{ post.categories | join: ',' }}">
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
      <p>Em breve, artigos sobre desempenho físico, mental e gestão de academias.</p>
    {% endif %}
  </div>
</section>
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      const f = (btn.dataset.filter || 'all').toLowerCase();
      cards.forEach(c=>{
        const cats = (c.dataset.cats || '').toLowerCase();
        c.style.display = (f==='all' || cats.includes(f)) ? '' : 'none';
      });
      document.querySelector('.blog-lista')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
</script>

