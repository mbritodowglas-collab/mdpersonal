---
layout: default
title: Blog
---

<div class="container">
  <h1>Últimos artigos</h1>
  <ul>
  {% assign posts = site.pages | where_exp: "p", "p.path contains 'blog/'" | sort: "date" | reverse %}
  {% for p in posts %}
    {% if p.title and p.path != "blog/index.md" %}
      <li style="margin:.5rem 0;">
        <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>
        {% if p.date %}<span class="small"> — {{ p.date | date: "%d/%m/%Y" }}</span>{% endif %}
      </li>
    {% endif %}
  {% endfor %}
  </ul>
</div>
