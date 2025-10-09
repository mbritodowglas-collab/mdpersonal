---
layout: default
title: Início
---

<div class="hero">
  <div class="hero-inner">
    <h1>MD Personal • Blog CNT</h1>
    <p>Treino, neurociência e saúde mental — artigos que viram vídeos e resultados reais.</p>
    <div class="btn-row">
      <a class="btn" href="./blog">Ver artigos</a>
      <a class="btn" href="./avaliacao">Avaliação</a>
      <a class="btn" href="./recursos">Recursos</a>
    </div>
  </div>
</div>

<div class="container">
  <div class="section">
    <h2>Últimos artigos</h2>
    <div class="grid">
      {% assign posts = site.pages | where_exp: "p", "p.path contains 'blog/'" | sort: "date" | reverse %}
      {% for p in posts limit:6 %}
        {% if p.title and p.path != "blog/index.md" %}
          {% assign thumb = p.image | default: '/mdpessoal/assets/thumb-default.jpg' %}
          <article class="card">
            <a href="{{ p.url | relative_url }}"><img class="thumb" src="{{ thumb }}" alt=""></a>
            <div class="card-body">
              <a href="{{ p.url | relative_url }}" class="title">{{ p.title }}</a>
              {% if p.date %}<div class="meta">{{ p.date | date: "%d/%m/%Y" }}</div>{% endif %}
              <a class="more" href="{{ p.url | relative_url }}">Ler artigo →</a>
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
