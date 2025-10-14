---
layout: default
title: Início
body_class: home-page
description: "{{ site.meta_descriptions.home }}"
---

<!-- HERO da Home -->
<section class="home-hero" style="background-image:url('{{ site.og_image | default: "/assets/img/og-default.jpg" | relative_url }}')">
  <div class="home-hero__overlay"></div>
  <div class="home-hero__content">
    <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
    <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão de academias — base dos vídeos do canal.</p>
  </div>
</section>

<!-- Destaque (post mais recente) -->
{% assign _posts = paginator.posts | default: site.posts %}
{% assign top = _posts | first %}
{% if top %}
<section class="home-feature">
  <a class="dst-wrap" href="{{ top.url | relative_url }}">
    <span class="dst-thumb" style="background-image:url('{{ top.cover | default: site.default_thumb | relative_url }}')"></span>
    <span class="dst-info">
      <span class="cat">{{ top.category | default: 'Treino' }}</span>
      <h2>{{ top.title }}</h2>
      <p>{{ top.description | default: top.excerpt | strip_html | truncate: 160 }}</p>
      <span class="ler">Ler artigo →</span>
    </span>
  </a>
</section>
{% endif %}

<!-- Lista de artigos (pula o primeiro) -->
<section class="blog-lista">
  <div class="cards">
    {% for post in _posts offset:1 %}
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

  <!-- Paginação (Últimos / Antigos) -->
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
