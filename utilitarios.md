---
layout: default
title: "Utilitários de treino"
description: "Ferramentas, acessórios e suplementos que recomendo — com curadoria por categoria."
permalink: /utilitarios/
body_class: utilitarios-page
---

<div class="blog-header">
  <h1>Utilitários de treino</h1>
  <p>Ferramentas, acessórios e suplementos que recomendo — com curadoria por categoria.</p>
</div>

<section class="blog-lista">
  <!-- Categorias (filtros visuais simples) -->
  <div class="blog-sidebar" style="position:sticky;top:4.5rem;margin-bottom:.75rem">
    <h3>Categorias</h3>
    <div class="blog-filtros-vertical">
      <button class="on" data-cat="all">Todos</button>
      <button data-cat="Parceiros">Parceiros</button>
      <button data-cat="Nutrição">Nutrição</button>
      <button data-cat="Treino">Treino</button>
      <button data-cat="Autocuidado">Autocuidado</button>
    </div>
  </div>

  {% comment %}
  Busca a fonte de dados: prioriza _data/utilitarios.yml; se não existir, usa _data/catalogo.yml
  Cada item deve ter: title, url, image, note, cat (array de categorias)
  {% endcomment %}
  {% assign items = site.data.utilitarios %}
  {% if items == nil or items == empty %}
    {% assign items = site.data.catalogo %}
  {% endif %}

  <div class="cards" id="uti-cards">
    {% for it in items %}
      {% assign cats = it.cat | join: ',' %}
      {% assign is_parceiro = it.cat contains 'Parceiros' %}
      {% if is_parceiro %}
        {% assign ar = '16/9' %}
      {% else %}
        {% assign ar = '1/1' %}
      {% endif %}

      <article class="card" data-cats="{{ cats }}">
        <a class="af-card" href="{{ it.url }}" {% if is_parceiro %}rel="nofollow sponsored noopener"{% else %}rel="noopener"{% endif %} target="_blank">
          <!-- THUMB: força a proporção via inline para garantir o corte correto -->
          <div class="af-thumb"
               style="aspect-ratio: {{ ar }}; background-image:url('{{ it.image | relative_url }}');">
          </div>

          <div class="af-info card-body">
            <div class="meta">
              {% for c in it.cat %}
                <span class="cat">{{ c }}</span>
              {% endfor %}
            </div>

            <h3>{{ it.title }}</h3>
            {% if it.note %}
              <p class="exc">{{ it.note }}</p>
            {% endif %}
            <span class="af-cta">Ver detalhes →</span>
          </div>
        </a>
      </article>
    {% endfor %}
  </div>
</section>

<script>
  // Filtro simples por categoria (sem recarregar)
  (function(){
    const buttons = document.querySelectorAll('.blog-filtros-vertical button');
    const cards = document.querySelectorAll('#uti-cards .card');

    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(b=>b.classList.remove('on'));
        btn.classList.add('on');

        const cat = btn.dataset.cat;
        cards.forEach(card=>{
          if(cat === 'all'){ card.style.display = ''; return; }
          const has = (card.getAttribute('data-cats')||'').includes(cat);
          card.style.display = has ? '' : 'none';
        });
      });
    });
  })();
</script>
