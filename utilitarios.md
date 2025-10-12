---
layout: default
title: Utilitários
permalink: /utilitarios/
body_class: utilitarios-page
description: "Acessórios, suplementos e ferramentas recomendadas — curadoria prática por categoria."
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
      Renderiza cada item de _data/afiliados.yml
      data-cats recebe todos os slugs das categorias (minúsculos, sem acentos)
      {%- endcomment -%}
      {%- for it in site.data.afiliados -%}
        {%- assign cats = "" -%}
        {%- if it.cat -%}
          {%- assign slugs = "" | split:"|" -%}
          {%- for c in it.cat -%}
            {%- assign label = c | strip -%}
            {%- assign slug  = label | downcase | strip
              | replace:"ç","c" | replace:"ã","a" | replace:"á","a" | replace:"â","a" | replace:"à","a"
              | replace:"é","e" | replace:"ê","e" | replace:"í","i"
              | replace:"ó","o" | replace:"ô","o" | replace:"õ","o"
              | replace:"ú","u" | replace:"ü","u"
              | replace:"’",""  | replace:"'",""
              | replace:"&","e" | replace:"/","-" | replace:"  "," " | replace:" ","-"
            -%}
            {%- assign slugs = slugs | push: slug -%}
          {%- endfor -%}
          {%- assign cats = slugs | join: " " -%}
        {%- endif -%}

        <article class="card" data-cats="{{ cats }}">
          <a class="af-card"
             href="{{ it.url }}"
             target="_blank"
             rel="noopener nofollow sponsored">
            <span class="af-thumb"
                  data-bg="{{ it.image | default: site.default_af_thumb | relative_url }}"
                  style="background:#111 center/cover no-repeat; border:1px solid #1c1c1c; border-radius:12px; width:100%; aspect-ratio:1/1;"></span>
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
  // força classe no body por segurança
  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('utilitarios-page');
  });

  const cards = Array.from(document.querySelectorAll('.card[data-cats]'));
  const btns  = Array.from(document.querySelectorAll('.blog-filtros-vertical [data-filter]'));

  function applyFilter(slug){
    const f = (slug || '').toLowerCase();
    cards.forEach(c=>{
      const cats = (c.dataset.cats || '').toLowerCase().split(' ').filter(Boolean);
      c.style.display = (!f || cats.includes(f)) ? '' : 'none';
    });
  }

  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

<!-- Estilo escopado desta página (duas colunas inclusive no mobile) -->
<style>
.utilitarios-page .blog-lista .cards{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: .95rem;
}
.utilitarios-page .blog-lista .card{ border:0; background:transparent; padding:0; }
.utilitarios-page .blog-lista .card .af-card{
  display:flex; flex-direction:column; gap:.65rem;
  width:100%; height:100%; padding:.75rem;
  background:#0f0f0f; border-radius:14px; border:1px solid #1c1c1c;
}
.utilitarios-page .blog-lista .card .af-card:hover{
  transform:translateY(-3px);
  border-color:#2a2a2a; transition:.25s;
}

/* Thumb: 1:1 por padrão */
.utilitarios-page .blog-lista .card .af-thumb{
  display:block; width:100%; aspect-ratio:1/1;
}

/* Parceiros: thumb mais horizontal (16:9) */
.utilitarios-page .blog-lista .card[data-cats*="parceiros"] .af-thumb{
  aspect-ratio:16/9;
}

/* Conteúdo */
.utilitarios-page .blog-lista .card .af-info{ display:flex; flex-direction:column; gap:.35rem; }
.utilitarios-page .blog-lista .card .meta{ display:flex; align-items:center; gap:.5rem; font-size:.9rem; opacity:.9; margin:0; }
.utilitarios-page .blog-lista .card .cat{
  background:rgba(227,197,101,.1);
  color:#e3c565; border:1px solid rgba(227,197,101,.35);
  padding:.14rem .5rem; border-radius:999px; font-weight:600;
}
.utilitarios-page .blog-lista .card h3{ margin:.2rem 0 .25rem; font-size:1.02rem; color:#fff; line-height:1.35; }
.utilitarios-page .blog-lista .card .exc{ margin:0; color:#cfcfcf; }
.utilitarios-page .blog-lista .card .ler{ color:#d62828; font-weight:700; margin-top:.2rem; }
.utilitarios-page .blog-lista .card:hover .ler{ color:#ff4040; }
</style>
