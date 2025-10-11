---
layout: default
title: Utilitários
permalink: /utilitarios/
---

<section class="blog-header">
  <h1>Utilitários de treino</h1>
  <p>Ferramentas, acessórios e suplementos que recomendo — com curadoria por categoria.</p>
</section>

<div class="blog-layout">
  <!-- Barra lateral: categorias -->
  <aside class="blog-sidebar">
    <h3>Categorias</h3>
    <nav class="blog-filtros-vertical" id="ufiltros">
      <button class="on" data-filter="all">🧰 Todos</button>
      {% assign keys = site.data.afiliados | keys %}
      {% for k in keys %}
        {% unless k == 'default' %}
          <button data-filter="{{ k }}">{{ k }}</button>
        {% endunless %}
      {% endfor %}
    </nav>
  </aside>

  <!-- Lista -->
  <section class="blog-lista">
    <div class="cards" id="ugrid">
      {% for k in keys %}
        {% unless k == 'default' %}
          {% for it in site.data.afiliados[k] %}
            <article class="card uitem" data-cats="{{ k }}">
              <a class="af-card" href="{{ it.url }}" target="_blank" rel="noopener">
                <span class="af-thumb"
                      style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></span>
                <span class="af-info">
                  <strong>{{ it.title }}</strong>
                  {% if it.note %}<span class="af-note">{{ it.note }}</span>{% endif %}
                  <span class="af-cta">Ver detalhes →</span>
                </span>
              </a>
            </article>
          {% endfor %}
        {% endunless %}
      {% endfor %}

      <!-- Parceiros fixos -->
      <article class="card uitem" data-cats="Parceiros">
        <a class="af-card" href="{{ site.shopee_link }}" target="_blank" rel="noopener">
          <span class="af-thumb" style="background-image:url('{{ site.shopee_thumb | relative_url }}')"></span>
          <span class="af-info">
            <strong>Shopee — Acessórios & Suplementos</strong>
            <span class="af-note">Seleção com ótimo custo-benefício.</span>
            <span class="af-cta">Ver detalhes →</span>
          </span>
        </a>
      </article>

      <article class="card uitem" data-cats="Parceiros">
        <a class="af-card" href="{{ site.fithouse_link }}" target="_blank" rel="noopener">
          <span class="af-thumb" style="background-image:url('{{ site.fithouse_thumb | relative_url }}')"></span>
          <span class="af-info">
            <strong>Fit House — Suplementos</strong>
            <span class="af-note">Parceiro recomendado pela qualidade.</span>
            <span class="af-cta">Ver detalhes →</span>
          </span>
        </a>
      </article>
    </div>
  </section>
</div>

<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.uitem'));
  const btns  = Array.from(document.querySelectorAll('#ufiltros [data-filter]'));
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      const f = (btn.dataset.filter || 'all').toLowerCase();
      cards.forEach(c=>{
        const cats = (c.dataset.cats || '').toLowerCase();
        c.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
      });
    });
  });
})();
</script>


