---
layout: default
title: Início
---

<section class="hero" style="background-image:url('{{ '/assets/hero.jpg' | relative_url }}')">
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
  <div class="cards">
    {% if site.posts and site.posts.size > 0 %}
      {% for post in site.posts limit:3 %}
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
