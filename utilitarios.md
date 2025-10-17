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

<!-- Faixa rolável de categorias -->
<nav class="cat-strip" aria-label="Filtrar por categoria">
  <button data-filter="parceiros" class="on">Parceiros</button>
  <button data-filter="nutrição">Nutrição</button>
  <button data-filter="treino">Treino</button>
  <button data-filter="autocuidado">Autocuidado</button>
  <button data-filter="roupas">Roupas</button>
  <button data-filter="livros">Livros</button>
</nav>

<div class="blog-layout">
  <!-- Lista de utilitários -->
  <section class="blog-lista">
    <div class="cards">

      {%- comment -%}
        Lê _data/afiliados.yml.
        data-cats = categorias do item (lowercase) para o filtro.
        Thumb: 1:1 por padrão; 16:9 para itens com categoria Parceiros.
      {%- endcomment -%}
      {%- for it in site.data.afiliados -%}
        {%- assign cats_arr   = it.cat | default: empty -%}
        {%- assign cats_lower = cats_arr | join:' ' | downcase -%}
        {%- assign is_partner = cats_lower contains 'parceiros' -%}

        <article class="card" data-cats="{{ cats_lower }}">
          <a class="af-card"
             href="{{ it.url }}"
             target="_blank"
             rel="{% if is_partner %}noopener nofollow sponsored{% else %}noopener{% endif %}">

            <!-- Wrapper fixa a proporção por padding-top -->
            <span class="af-thumb {% if is_partner %}r16x9{% else %}r1x1{% endif %}">
              <span class="af-img"
                    style="background-image:url('{{ it.image | default: site.default_af_thumb | relative_url }}')"></span>
            </span>

            <span class="af-info">
              {%- if cats_arr and cats_arr.size > 0 -%}
                <span class="meta">
                  {%- for c in cats_arr -%}<span class="cat">{{ c }}</span>{%- endfor -%}
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

<!-- CTA para Ferramentas -->
<section class="tools-cta">
  <a href="{{ '/ferramentas/' | relative_url }}" class="btn-cta">Abrir Ferramentas de Treino →</a>
  <p class="tools-note">Calculadoras: FC de Reserva (Karvonen) e Intensidade por RM.</p>
</section>

<!-- Filtro por categoria -->
<script>
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('utilitarios-page');
  });

  const cards = Array.from(document.querySelectorAll('.card[data-cats]'));
  const btns  = Array.from(document.querySelectorAll('.cat-strip [data-filter]'));

  const norm = (s='') => s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();

  function applyFilter(slug){
    const f = norm(slug);
    cards.forEach(c=>{
      const cats = norm(c.dataset.cats || '');
      c.style.display = (!f || cats.includes(f)) ? '' : 'none';
    });
  }

  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(btn.dataset.filter);
      // rola a faixa pra mostrar o botão ativo
      document.querySelector('.cat-strip').scrollTo({ left: btn.offsetLeft - 16, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Começa em Parceiros
  applyFilter('parceiros');
})();
</script>

<!-- Estilo escopado desta página -->
<style>
/* ===== Faixa rolável de categorias ===== */
.cat-strip{
  display:flex;
  gap:.6rem;
  overflow-x:auto;
  padding:.25rem 1rem .9rem;
  margin:0 auto .6rem;
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
  max-width:980px;
}
.cat-strip::-webkit-scrollbar{ display:none; }
.cat-strip button{
  flex:0 0 auto;
  border:1px solid #2a2a2a;
  background:#0e0e0e;
  color:#e9e9e9;
  padding:.55rem .95rem;
  border-radius:999px;
  font-weight:700;
  font-size:.95rem;
  transition:.2s ease;
}
.cat-strip button.on{
  background:#f0d26a;
  color:#121212;
  border-color:#f0d26a;
  box-shadow:0 6px 18px rgba(240,210,106,.18);
}
.cat-strip button:active{ transform:scale(.98); }

/* ===== Grid e cards (mantido em 2 colunas) ===== */
.utilitarios-page .blog-lista .cards{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap:.95rem;
}
.utilitarios-page .blog-lista .card{ border:0; background:transparent; padding:0; }
.utilitarios-page .blog-lista .card .af-card{
  display:flex; flex-direction:column; gap:.65rem;
  width:100%; height:100%; padding:.75rem;
  background:#0f0f0f; border-radius:14px; border:1px solid #1c1c1c;
  transition:.25s;
}
.utilitarios-page .blog-lista .card .af-card:hover{
  transform:translateY(-3px);
  border-color:#2a2a2a;
}

/* Wrapper de proporção */
.utilitarios-page .blog-lista .card .af-thumb{
  position:relative; display:block; width:100%;
  border:1px solid #1c1c1c; border-radius:12px;
  background:#111; overflow:hidden;
}
.utilitarios-page .blog-lista .card .af-thumb.r1x1{ padding-top:100%; }      /* 1:1 */
.utilitarios-page .blog-lista .card .af-thumb.r16x9{ padding-top:56.25%; }   /* 16:9 */

/* Imagem preenchendo o wrapper */
.utilitarios-page .blog-lista .card .af-thumb .af-img{
  position:absolute; inset:0;
  background-position:center; background-size:cover;
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

/* CTA Ferramentas */
.utilitarios-page .tools-cta{
  text-align:center;
  margin: 1.5rem 0 2.5rem;
}
.utilitarios-page .tools-cta .btn-cta{
  display:inline-block;
  background:#d62828;
  color:#fff;
  padding:.85rem 1.2rem;
  border-radius:10px;
  font-weight:700;
  text-decoration:none;
  transition:.25s;
}
.utilitarios-page .tools-cta .btn-cta:hover{ background:#ff4040; }
.utilitarios-page .tools-cta .tools-note{
  margin-top:.5rem; color:#bdbdbd; font-size:.9rem;
}
</style>
