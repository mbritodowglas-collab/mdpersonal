
---
layout: page
title: "Blog"
permalink: /blog/
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span class="post-meta"> — {{ post.date | date: "%d/%m/%Y" }}</span>
    </li>
  {% endfor %}
</ul>
