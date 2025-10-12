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

      {%- comment -%}
      Construir lista única de categorias a partir dos itens (site.data.afiliados é uma LISTA).
      Guardamos pares [slug, label] em 'cat_pairs'.
      {%- endcomment -%}
      {%- assign cat_pairs = "" | split: "|" -%}
      {%- for it in site.data.afiliados -%}
        {%- if it.cat -%}
          {%- for c in it.cat -%}
            {%- assign label = c | strip -%}
            {%- assign slug  = label | downcase | strip | replace: "ç","c" | replace: "ã","a" | replace: "á","a" | replace: "â","a" | replace:"à","a" | replace:"é","e" | replace:"ê","e" | replace:"í","i" | replace:"ó","o" | replace:"ô","o" | replace:"õ","o" | replace:"ú","u" | replace:"ü","u" | replace:"’","" | replace:"'","" | replace:"&","e" | replace:"/","-" | replace:"  "," " | replace:" ","-" -%}
            {%- capture pair %}{{ slug }}::{{ label }}{%- endcapture -%}
            {%- unless cat_pairs contains pair -%}
              {%- assign cat_pairs = cat_pairs | push: pair -%}
            {%- endunless -%}
          {%- endfor -%}
        {%- endif -%}
      {%- endfor -%}

      {%- comment -%} Ordena alfabeticamente pelas labels {%- endcomment -%}
      {%- assign cat_pairs_sorted = cat_pairs | sort -%}
      {%- for p in cat_pairs_sorted -%}
        {%- assign parts = p | split: "::" -%}
        {%- assign slug  = parts[0] -%}
        {%- assign label = parts[1] -%}
        <button data-filter="{{ slug }}">{{ label }}</button>
      {%- endfor -%}
    </nav>
  </aside>

  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">

      {%- comment -%}
      Render dos cards. data-cats recebe todos os slugs de categorias do item,
      separados por espaço, para permitir match por includes.
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
    const f = (slug || 'all').toLowerCase();
    cards.forEach(c=>{
      const cats = (c.dataset.cats || '').toLowerCase().split(' ');
      c.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
    });
  }

  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
    });
  });
})();
</script>
