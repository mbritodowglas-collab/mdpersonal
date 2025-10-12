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
    <nav class="blog-filtros-vertical" id="utiFiltros">
      <button data-filter="__all" class="on">Todos</button>
      {%- assign cats = site.data.afiliados
        | map: 'cat'          /* pega arrays de categorias */
        | join: ','           /* achata em string */
        | split: ','          /* volta para lista */
        | map: 'strip'
        | reject: ''          /* remove vazios */
        | uniq | sort -%}
      {%- for cat in cats -%}
        <button data-filter="{{ cat | downcase }}">{{ cat }}</button>
      {%- endfor -%}
    </nav>
  </aside>

  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">
      {%- for it in site.data.afiliados -%}
        {%- assign classes = it.cat | join: ',' | downcase -%}
        <article class="card" data-cat="{{ classes }}">
          <a class="af-card" href="{{ it.url }}" target="_blank" rel="noopener">
            <span class="af-thumb"
              style="background-image:url('{{ it.image | default: site.default_af_thumb | default: "/assets/img/afiliados/thumb-default.jpg" | relative_url }}')"></span>
            <span class="af-info">
              <span class="meta"><span class="cat">{{ it.cat | first }}</span></span>
              <h3>{{ it.title }}</h3>
              {%- if it.note -%}<p class="exc">{{ it.note }}</p>{%- endif -%}
              <span class="ler">Ver detalhes →</span>
            </span>
          </a>
        </article>
      {%- endfor -%}
    </div>
  </section>
</div>

<!-- Filtro por categoria -->
<script>
(function(){
  const cards = Array.from(document.querySelectorAll('.card[data-cat]'));
  const btns  = Array.from(document.querySelectorAll('#utiFiltros [data-filter]'));

  function applyFilter(f){
    const filter = (f || '__all').toLowerCase();
    cards.forEach(card=>{
      const list = (card.dataset.cat || '').split(',').map(s=>s.trim());
      const hit  = list.includes(filter);
      card.style.display = (filter === '__all' || hit) ? '' : 'none';
    });
  }

  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
    });
  });

  // estado inicial
  applyFilter('__all');
})();
</script>
