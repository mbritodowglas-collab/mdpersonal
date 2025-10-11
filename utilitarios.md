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
  <!-- Lateral com filtros -->
  <aside class="blog-sidebar">
    <h3>Categorias</h3>
    <nav class="blog-filtros-vertical">
      <button data-filter="all" class="on">Todos</button>
      {%- assign cats = site.data.afiliados | keys | sort -%}
      {%- for cat in cats -%}
        <button data-filter="{{ cat | downcase }}">{{ cat }}</button>
      {%- endfor -%}
    </nav>
  </aside>

  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">
      {%- comment -%} Percorre categorias e itens {%- endcomment -%}
      {%- for cat in cats -%}
        {%- assign items = site.data.afiliados[cat] -%}
        {%- for it in items -%}
          <article class="card" data-cat="{{ cat | downcase }}">
            <a class="af-card" href="{{ it.url }}" target="_blank" rel="noopener">
              <span class="af-thumb"
                style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></span>
              <span class="af-info">
                <span class="meta">
                  <span class="cat">{{ cat }}</span>
                </span>
                <h3>{{ it.title }}</h3>
                {%- if it.note -%}<p class="exc">{{ it.note }}</p>{%- endif -%}
                <span class="ler">Ver detalhes →</span>
              </span>
            </a>
          </article>
        {%- endfor -%}
      {%- endfor -%}

      {%- comment -%} Parceiros fixos (Shopee e Fit House) {%- endcomment -%}
      <article class="card" data-cat="parceiros">
        <a class="af-card" href="{{ site.shopee_link }}" target="_blank" rel="noopener">
          <span class="af-thumb" style="background-image:url('{{ '/assets/img/afiliados/shopee.jpg' | relative_url }}')"></span>
          <span class="af-info">
            <span class="meta"><span class="cat">Parceiros</span></span>
            <h3>Shopee — Acessórios & Suplementos</h3>
            <p class="exc">Seleção com ótimo custo-benefício.</p>
            <span class="ler">Ver detalhes →</span>
          </span>
        </a>
      </article>

      <article class="card" data-cat="parceiros">
        <a class="af-card" href="{{ site.fithouse_link }}" target="_blank" rel="noopener">
          <span class="af-thumb" style="background-image:url('{{ '/assets/img/afiliados/fithouse.jpg' | relative_url }}')"></span>
          <span class="af-info">
            <span class="meta"><span class="cat">Parceiros</span></span>
            <h3>Fit House — Suplementos</h3>
            <p class="exc">Parceiro recomendado para qualidade.</p>
            <span class="ler">Ver detalhes →</span>
          </span>
        </a>
      </article>
    </div>
  </section>
</div>

<!-- Filtro por categoria (sem rolagem) -->
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card[data-cat]'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      const f = (btn.dataset.filter || 'all').toLowerCase();
      cards.forEach(c=>{
        const cat = (c.dataset.cat || '').toLowerCase();
        c.style.display = (f === 'all' || cat === f) ? '' : 'none';
      });
    });
  });
})();
</script>

