---
layout: default
title: Blog
---

<section class="blog-header">
  <h1>Artigos sobre Treino, Mente e Gestão Fitness</h1>
  <p>Conteúdos práticos sobre treino, neurociência, nutrição e gestão de academias — base dos vídeos do canal.</p>
</section>

<section class="blog-lista">
  <div class="cards">
    {% assign posts_ok = site.posts | where_exp: "p", "p.draft != true" %}
    {% if posts_ok.size > 0 %}
      {% for post in posts_ok %}
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
      <p>Em breve, artigos sobre desempenho físico, mental e gestão de academias.</p>
    {% endif %}
  </div>
</section>
