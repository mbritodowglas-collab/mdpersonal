---
layout: default
title: Início
body_class: home-page
description: "{{ site.meta_descriptions.home }}"
---

<!-- HERO com imagem + título centralizado -->
<section class="home-hero" style="--hero:url('{{ site.og_image | relative_url }}')">
  <div class="home-hero__overlay"></div>
  <div class="home-hero__content">
    <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
    <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão — base dos vídeos do canal.</p>
  </div>
</section>

<!-- Lista de posts -->
<section class="blog-lista">
  <!-- Card do post mais recente em destaque (opcional) -->
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

  <!-- Demais posts (pula o primeiro) -->
  <div class="cards">
    {% for post in paginator.posts offset:1 %}
    <article class="card">
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

  <!-- Paginação (barras no rodapé) -->
  <nav class="post-nav home-pager" aria-label="Paginação">
    {% if paginator.previous_page %}
      <a class="prev" href="{{ paginator.previous_page_path | relative_url }}">← Mais recentes</a>
    {% else %}
      <span></span>
    {% endif %}

    {% if paginator.next_page %}
      <a class="next" href="{{ paginator.next_page_path | relative_url }}">Mais antigos →</a>
    {% endif %}
  </nav>
</section>
