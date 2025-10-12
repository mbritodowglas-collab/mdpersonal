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
      <!-- Ordem fixa dos filtros -->
      <button data-filter="parceiros" class="on">Parceiros</button>
      <button data-filter="nutricao">Nutrição</button>
      <button data-filter="treino">Treino</button>
      <button data-filter="autocuidado">Autocuidado</button>
    </nav>
  </aside>

  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">

      {%- comment -%}
      Renderiza cada item de afiliados.yml.
      Cada item pode ter várias categorias (cat), gerando múltiplos slugs.
      {%- endcomment -%}
      {%- for it in site.data.afiliados -%}
        {%- assign cats = "" -%}
        {%- if it.cat -%}
          {%- assign slugs = "" | split:"|" -%}
          {%- for c in it.cat -%}
            {%- assign label = c | strip -%}
            {%- assign slug  = label | downcase | strip | replace:"ç","c" | replace:"ã","a" | replace:"á","a" | replace:"â","a" | replace:"à","a" | replace:"é","e" | replace:"ê","e" | replace:"í","i" | replace:"ó","o" | replace:"ô","o" | replace:"õ","o" | replace:"ú","u" | replace:"ü","u" | replace:"’","" | replace:"'","" | replace:"&","e" | replace:"/","-" | replace:"  "," " | replace:" ","-" -%}
            {%- assign slugs = slugs | push: slug -%}
          {%- endfor -%}
          {%- assign cats = slugs | join: " " -%}
        {%- endif -%}

        <article class="card" data-cats="{{ cats }}">
          <a class="af-card" href="{{ it.url }}" target="_blank" rel="noopener">
            <span class="af-thumb"
              style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></span>
            <span class="af-info">
              {%- if it.cat and it.cat.size > 0 -%}
                <span class="meta"><span class="cat">{{ it.cat[0] }}</span></span>
              {%- endif -%}
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
  const cards = Array.from(document.querySelectorAll('.card[data-cats]'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));

  function applyFilter(slug){
    const f = (slug || '').toLowerCase();
    cards.forEach(c=>{
      const cats = (c.dataset.cats || '').toLowerCase().split(' ').filter(Boolean);
      c.style.display = (!f || cats.includes(f)) ? '' : 'none';
    });
  }

  // clique nos botões
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
    });
  });

  // filtro inicial: Parceiros
  const initial = 'parceiros';
  const startBtn = btns.find(b => (b.dataset.filter||'').toLowerCase() === initial);
  if (startBtn) {
    btns.forEach(b=>b.classList.remove('on'));
    startBtn.classList.add('on');
  }
  applyFilter(initial);
})();
</script>

<!-- Ajuste de layout mobile -->
<style>
@media (max-width: 640px){
  /* Oculta thumb e deixa texto ocupar toda a largura */
  .blog-lista .af-card .af-thumb{
    display:none !important;
  }
  .blog-lista .af-card{
    gap:.4rem !important;
    align-items:flex-start;
  }
  .blog-lista .af-info{
    width:100%;
  }
}
</style>
