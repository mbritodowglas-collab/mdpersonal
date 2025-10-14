/* ===============================
   HOME (escopado em .home-page)
   =============================== */

/* Cabeçalho */
.home-page .blog-header{
  max-width:1000px; margin:0 auto; padding:2rem 1rem 1rem;
  border-bottom:1px solid var(--borda);
}
.home-page .blog-header h1{ color:var(--dourado); margin:0 0 .3rem; }
.home-page .blog-header p{ color:#ccc; margin:0; font-size:.95rem; }

/* Layout com lateral de categorias */
.home-page .blog-layout{
  display:grid; grid-template-columns:240px 1fr; gap:2rem;
  align-items:start; margin-top:.75rem; max-width:1000px; margin-inline:auto;
}
.home-page .blog-sidebar{ position:sticky; top:5rem; display:flex; flex-direction:column; }

/* Botões (mesmo look dos Utilitários) */
.home-page .blog-sidebar h3{
  color:var(--dourado); font-size:1rem; margin:0 0 .6rem;
  text-transform:uppercase; opacity:.95;
}
.home-page .blog-filtros-vertical{ display:flex; flex-direction:column; gap:.45rem; }
.home-page .blog-filtros-vertical button{
  background:#111; border:1px solid rgba(255,255,255,.10);
  color:#ccc; padding:.55rem .7rem; border-radius:10px;
  font-weight:700; font-size:.9rem; line-height:1.1; cursor:pointer;
  transition:.2s; text-align:left;
}
.home-page .blog-filtros-vertical button:hover{
  color:#fff; border-color:rgba(255,255,255,.18); background:rgba(255,255,255,.06);
}
.home-page .blog-filtros-vertical button.on{
  background:var(--vermelho); color:#fff; border-color:var(--vermelho);
}

/* Destaque (post 1: imagem + info) */
.home-page .blog-lista{ max-width:1000px; margin:0 auto; padding:1rem; }
.home-page .dst-wrap{
  display:grid; grid-template-columns:1.2fr 1fr; gap:1rem; align-items:stretch;
  text-decoration:none; color:inherit;
}
.home-page .dst-thumb{
  background:#111 center/cover no-repeat; border:1px solid #1c1c1c;
  border-radius:14px; min-height:220px;
}
.home-page .dst-info{
  background:#0f0f0f; border:1px solid #1c1c1c; border-radius:14px;
  padding:1rem; display:flex; flex-direction:column; justify-content:center;
}
.home-page .dst-wrap:hover .dst-info{ border-color:#2a2a2a; }

/* Cards de posts (2–3 col no desktop, 1 no mobile) */
.home-page .cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:1.2rem; }
@media (max-width:1000px){ .home-page .cards{ grid-template-columns:repeat(2,1fr); } }
@media (max-width:640px){ .home-page .cards{ grid-template-columns:1fr; } }

/* Thumb e corpo do card (usa os estilos globais existentes) */

/* Mobile: lateral vira faixa rolável no topo */
@media (max-width:768px){
  .home-page .blog-layout{ grid-template-columns:1fr; }
  .home-page .blog-sidebar{
    position:sticky; top:3.5rem; z-index:9;
    background:#0b0b0b; border-bottom:1px solid var(--borda);
    padding:.6rem 1rem .8rem;
  }
  .home-page .blog-filtros-vertical{
    flex-direction:row; overflow-x:auto; gap:.4rem;
  }
  .home-page .dst-wrap{ grid-template-columns:1fr; }
  .home-page .dst-thumb{ min-height:200px; }
}
