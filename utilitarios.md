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
      <button data-filter="" class="on">Todos</button>
      <button data-filter="parceiros">Parceiros</button>
      <button data-filter="nutrição">Nutrição</button>
      <button data-filter="treino">Treino</button>
      <button data-filter="autocuidado">Autocuidado</button>
    </nav>
  </aside>

  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">

      {%- comment -%}
      Lê _data/afiliados.yml (lista de itens).
      data-cats recebe todas as categorias do item, em lowercase simples.
      A thumb é 1:1 por padrão e 16:9 quando o item tem "Parceiros".
      {%- endcomment -%}
      {%- for it in site.data.afiliados -%}
        {%- assign cats_arr = it.cat | default: empty -%}
        {%- assign cats_lower = cats_arr | join: ' ' | downcase -%}
        {%- assign is_partner = cats_lower contains 'parceiros' -%}

        <article class="card" data-cats="{{ cats_lower | escape }}">
          <a class="af-card"
             href="{{ it.url }}"
             target="_blank"
             rel="{% if is_partner %}noopener nofollow sponsored{% else %}noopener{% endif %}">

            {%- comment -%} 
            Thumb com proporção inline (garante visual mesmo se CSS conflitar)
            Parceiros = 16/9; demais = 1/1
            {%- endcomment -%}
            <span class="af-thumb"
                  style="
                    background:#111 center/cover no-repeat;
                    border:1px solid #1c1c1c; border-radius:12px; width:100%;
                    aspect-ratio:{% if is_partner %}16/9{% else %}1/1{% endif %};
                    background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}');
                  ">
            </span>

            <span class="af-info">
              {%- if cats_arr and cats_arr.size > 0 -%}
                <span class="meta">
                  {%- for c in cats_arr -%}
                    <span class="cat">{{ c }}</span>
                  {%- endfor -%}
                </span>
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
    const f = (slug || '').trim().toLowerCase();
    cards.forEach(c=>{
      const cats = (c.dataset.cats || '');
      c.style.display = (!f || cats.includes(f)) ? '' : 'none';
    });
  }

  // clique nos botões
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Sem filtro inicial: mostra tudo para facilitar debug visual
  applyFilter('');
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

/* Thumb: 1:1 por padrão; Parceiros 16:9 (também reforçado inline) */
.utilitarios-page .blog-lista .card .af-thumb{
  display:block; width:100%; aspect-ratio:1/1;
}
.utilitorios-page .blog-lista .card[data-cats*="parceiros"] .af-thumb,
.utilitarios-page .blog-lista .card[data-cats*="parceiro"] .af-thumb{
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
