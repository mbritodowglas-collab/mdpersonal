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

<!-- Ajuste mobile: cards sem thumb (fica tudo como Nutrição) -->
<style>
/* Fallback imediato: esconde a thumb dos Parceiros em qualquer largura */
.card[data-cats*="parceiros"] .af-thumb{ display:none !important; }

/* Mobile/tablet: esconde a thumb de TODOS os cards */
@media (max-width: 900px){
  /* seletor bem específico para garantir que vença qualquer CSS anterior */
  .blog-lista .cards .card .af-card .af-thumb,
  .af-thumb{
    display:none !important;
  }
  .blog-lista .cards .card .af-card{
    gap:.6rem !important;
    align-items:flex-start !important;
  }
  .blog-lista .cards .card .af-info{
    width:100% !important;
  }
}
</style>

/* ====== FORÇA LAYOUT CHEIO SÓ NA PÁGINA /utilitarios ====== */

/* 1) Card ocupa a grade normalmente */
.blog-lista .cards{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:1rem;
}

/* 2) No mobile e telas médias, 1 ou 2 colunas */
@media (max-width: 1000px){ .blog-lista .cards{ grid-template-columns: repeat(2,1fr); } }
@media (max-width: 640px){  .blog-lista .cards{ grid-template-columns: 1fr; } }

/* 3) Transforma TODOS os .af-card em formato “card cheio” (thumb grande em cima) */
.blog-lista .card .af-card{
  display:flex;
  flex-direction:column;
  gap:.65rem;
  width:100%;
  height:100%;
  padding:.75rem;                /* mesmo respiro do card de Nutrição */
  background:#0f0f0f;            /* fundo igual ao card */
  border-radius:14px;
  border:1px solid #1c1c1c;
}

/* remove possíveis estilos herdados que deixem o af-card “solto” */
.blog-lista .card{
  border:none;
  background:transparent;
  padding:0;
}

/* Thumb full-bleed no topo */
.blog-lista .card .af-thumb{
  width:100%;
  height:auto;
  aspect-ratio: 16/9;
  background:#111 center/cover no-repeat;
  border-radius:10px;
  border:1px solid #1c1c1c;
}

/* Info preenche o restante e alinha com o estilo do blog */
.blog-lista .card .af-info{
  display:flex;
  flex-direction:column;
  gap:.35rem;
}
.blog-lista .card .meta{
  display:flex; align-items:center; gap:.5rem;
  font-size:.9rem; opacity:.9; margin:0;
}
.blog-lista .card .cat{
  background:rgba(227,197,101,.1);
  color:#e3c565; border:1px solid rgba(227,197,101,.35);
  padding:.14rem .5rem; border-radius:999px; font-weight:600;
}
.blog-lista .card h3{
  margin:.2rem 0 .25rem; font-size:1.05rem; color:#fff; line-height:1.35;
}
.blog-lista .card .exc{ margin:0; color:#cfcfcf; }
.blog-lista .card .ler{ color:#d62828; font-weight:700; margin-top:.2rem; }
.blog-lista .card:hover .ler{ color:#ff4040; }

/* 4) Ajuste do botão “Ver detalhes” e hover “lift” */
.blog-lista .card .af-card:hover{
  transform:translateY(-3px);
  border-color:#2a2a2a;
  transition:.25s;
}

/* 5) Quando filtrar (mostrar 1 coluna no mobile), os cards continuam 100% */
@media (max-width:640px){
  .blog-lista .card, .blog-lista .card .af-card{ width:100%; }
}
</style>


