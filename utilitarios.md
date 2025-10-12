---
layout: default
title: Utilitários
permalink: /utilitarios/
---

<section class="blog-header">
  <h1>Utilitários de treino</h1>
  <p>Ferramentas, acessórios e suplementos que recomendo — com curadoria por categoria.</p>
</section>

<!-- Barra horizontal de categorias (igual ao blog) -->
<nav class="blog-filtros-vertical" id="utiFiltros" style="position:sticky;top:4.5rem;z-index:9;background:#0b0b0b;border-bottom:1px solid var(--borda);padding:.6rem 1rem .8rem;max-width:1000px;margin:0 auto;">
  <button data-filter="__all" class="on">Todos</button>
  {%- assign cats = site.data.afiliados
    | map: 'cat' | join: ',' | split: ',' | map: 'strip'
    | reject: '' | uniq | sort -%}
  {%- for cat in cats -%}
    <button data-filter="{{ cat | downcase }}">{{ cat }}</button>
  {%- endfor -%}
</nav>

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

<!-- Filtro (mesma lógica do blog) -->
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

  applyFilter('__all');
})();
</script>
