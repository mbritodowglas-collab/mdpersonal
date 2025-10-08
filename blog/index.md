---
layout: default
title: Blog
---

# Últimos artigos

<ul>
{% assign posts = site.pages | where_exp: "p", "p.path contains 'blog/'" | sort: "date" | reverse %}
{% for p in posts %}
  {% if p.title and p.path != "blog/index.md" %}
  <li style="margin: .5rem 0;">
    <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>
    <span style="opacity:.7"> — {{ p.date | date: "%d/%m/%Y" }}</span>
  </li>
  {% endif %}
{% endfor %}
</ul>
