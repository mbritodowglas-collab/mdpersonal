---
layout: default
title: Utilitários
permalink: /utilitarios/
---

<section class="blog-header">
  <h1>Utilitários de treino</h1>
  <p>Ferramentas, acessórios e suplementos que recomendo — com curadoria por categoria.</p>
</section>

<div class="uti-layout">
  <!-- Lateral: filtros + busca -->
  <aside class="uti-sidebar">
    <h3>Categorias</h3>
    <nav class="uti-filtros">
      <button data-filter="all" class="on">🧰 Todos</button>
      {% assign cat_keys = site.data.afiliados | keys | sort %}
      {% for k in cat_keys %}
        {% if k != 'default' %}
          <button data-filter="{{ k | downcase }}">{{ k }}</button>
        {% endif %}
      {% endfor %}
    </nav>

    <div class="uti-busca">
      <input id="utiSearch" type="search" placeholder="Buscar por nome…" />
    </div>
  </aside>

  <!-- Lista -->
  <section class="blog-lista">
    <div class="cards" id="utiCards">
      {%- comment -%}
        Percorre todas as categorias do catálogo.
        Estrutura esperada em _data/afiliados.yml:
        categoria:
          - title: ...
            url: ...
            image: ...
            note: ...
      {%- endcomment -%}

      {% assign af = site.data.afiliados %}
      {% assign keys = af | keys | sort %}
      {% for cat in keys %}
        {% if cat != "default" %}
          {% assign itens = af[cat] %}
          {% for it in itens %}
            <article class="card uti-card"
                     data-cat="{{ cat | downcase }}"
                     data-title="{{ it.title | downcase }}">
              <a href="{{ it.url }}" target="_blank" rel="noopener">
                <div class="thumb" style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></div>
                <div class="card-body">
                  <p class="meta">
                    <span class="cat">{{ cat }}</span>
                  </p>
                  <h3>{{ it.title }}</h3>
                  {% if it.note %}<p class="exc">{{ it.note }}</p>{% endif %}
                  <span class="ler">Ver detalhes →</span>
                </div>
              </a>
            </article>
          {% endfor %}
        {% endif %}
      {% endfor %}

      {%- comment -%} Parceiros fixos (opcional) {%- endcomment -%}
      {% if site.shopee_link %}
        <article class="card uti-card" data-cat="parceiros" data-title="shopee">
          <a href="{{ site.shopee_link }}" target="_blank" rel="noopener">
            <div class="thumb" style="background-image:url('{{ site.shopee_image | default: site.default_af_thumb | relative_url }}')"></div>
            <div class="card-body">
              <p class="meta"><span class="cat">Parceiros</span></p>
              <h3>Shopee — Acessórios & Suplementos</h3>
              <p class="exc">Seleção com ótimo custo-benefício.</p>
              <span class="ler">Ver detalhes →</span>
            </div>
          </a>
        </article>
      {% endif %}

      {% if site.fithouse_link %}
        <article class="card uti-card" data-cat="parceiros" data-title="fit house">
          <a href="{{ site.fithouse_link }}" target="_blank" rel="noopener">
            <div class="thumb" style="background-image:url('{{ site.fithouse_image | default: site.default_af_thumb | relative_url }}')"></div>
            <div class="card-body">
              <p class="meta"><span class="cat">Parceiros</span></p>
              <h3>Fit House — Suplementos</h3>
              <p class="exc">Recomendado pela qualidade.</p>
              <span class="ler">Ver detalhes →</span>
            </div>
          </a>
        </article>
      {% endif %}
    </div>
  </section>
</div>

<!-- Filtro + busca -->
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.uti-card'));
  const btns  = Array.from(document.querySelectorAll('.uti-filtros [data-filter]'));
  const search = document.getElementById('utiSearch');

  function aplicaFiltro(){
    const ativo = (document.querySelector('.uti-filtros .on')?.dataset.filter || 'all').toLowerCase();
    const q = (search.value || '').trim().toLowerCase();
    cards.forEach(c=>{
      const cat = (c.dataset.cat||'').toLowerCase();
      const t = (c.dataset.title||'').toLowerCase();
      const passCat = (ativo==='all' || cat===ativo);
      const passTxt = (!