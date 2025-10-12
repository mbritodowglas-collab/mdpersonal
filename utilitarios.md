---
layout: default
title: Utilitários
permalink: /utilitarios/
body_class: utilitarios-page
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
          <a class="af-card" href="{{ it.url }}" target="_blank" rel="noopener">
            <span class="af-thumb" style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></span>
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

<!-- Estilos escopados desta página -->
<style>
/* ===== /utilitarios — grade 2 colunas fixas (inclusive no mobile) ===== */
.utilitarios-page .blog-lista .cards{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr)); /* Sempre duas colunas */
  gap:.9rem;
}

/* Corrige padding e largura para caber lado a lado no mobile */
.utilitarios-page .blog-lista{
  width:100%;
  padding:0 .5rem;
  box-sizing:border-box;
}

/* Cards */
.utilitarios-page .blog-lista .card{
  border:0;
  background:transparent;
  padding:0;
}
.utilitarios-page .blog-lista .card .af-card{
  display:flex;
  flex-direction:column;
  gap:.55rem;
  width:100%;
  height:100%;
  padding:.65rem;
  background:#0f0f0f;
  border-radius:14px;
  border:1px solid #1c1c1c;
  transition:transform .25s, border-color .25s;
}
.utilitarios-page .blog-lista .card .af-card:hover{
  transform:translateY(-3px);
  border-color:#2a2a2a;
}

/* Thumb QUADRADA */
.utilitarios-page .blog-lista .card .af-thumb{
  width:100%;
  aspect-ratio:1/1;
  background:#111 center/cover no-repeat;
  border-radius:12px;
  border:1px solid #1c1c1c;
}

/* Info */
.utilitarios-page .blog-lista .card .af-info{
  display:flex;
  flex-direction:column;
  gap:.3rem;
}
.utilitarios-page .blog-lista .card .meta{
  display:flex;
  align-items:center;
  gap:.4rem;
  font-size:.85rem;
  opacity:.9;
  margin:0;
}
.utilitarios-page .blog-lista .card .cat{
  background:rgba(227,197,101,.1);
  color:#e3c565;
  border:1px solid rgba(227,197,101,.35);
  padding:.1rem .45rem;
  border-radius:999px;
  font-weight:600;
  font-size:.8rem;
}
.utilitarios-page .blog-lista .card h3{
  margin:.15rem 0 .2rem;
  font-size:.9rem;
  color:#fff;
  line-height:1.35;
}
.utilitarios-page .blog-lista .card .exc{
  margin:0;
  color:#cfcfcf;
  font-size:.8rem;
  line-height:1.3;
}
.utilitarios-page .blog-lista .card .ler{
  color:#d62828;
  font-weight:700;
  margin-top:.15rem;
  font-size:.85rem;
}
.utilitarios-page .blog-lista .card:hover .ler{
  color:#ff4040;
}
</style>

<!-- Filtro JS -->
<script>
(function(){
  document.addEventListener('DOMContentLoaded', () => {
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
    });
  });

  const initial = 'parceiros';
  const startBtn = btns.find(b => (b.dataset.filter||'').toLowerCase() === initial);
  if (startBtn) {
    btns.forEach(b=>b.classList.remove('on'));
    startBtn.classList.add('on');
  }
  applyFilter(initial);
})();
</script>
