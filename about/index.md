---
layout: default
title: Sobre
permalink: /about/
---

<style>
  /* Escopo só desta página */
  .about-wrap{max-width:980px;margin:0 auto;padding:2rem 1rem}
  .about-head{margin:0 0 1.25rem}
  .about-head h1{color:var(--dourado);margin:.25rem 0}
  .about-head .lead{color:#d7d7d7;opacity:.95;margin:0}
  .about-grid{
    display:grid;grid-template-columns:260px 1fr;gap:1.5rem;align-items:start
  }
  .about-photo{
    width:100%;max-width:240px;aspect-ratio:1/1;border-radius:14px;
    background:#111 object-fit:cover;display:block;border:1px solid #1c1c1c
  }
  .about-text p{margin:.7rem 0;text-align:justify;text-justify:inter-word}
  .about-box{
    background:#0f0f0f;border:1px solid #1c1c1c;border-radius:14px;
    padding:1rem;margin:1rem 0
  }
  .about-box h3{color:#eedd9c;margin:.2rem 0 .5rem}
  .about-list{margin:.4rem 0;padding-left:1.1rem}
  .about-list li{margin:.35rem 0}
  .about-cta{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1rem}
  .btn{display:inline-block;border-radius:10px;padding:.9rem 1.4rem;font-weight:700}
  .btn.destaque{background:var(--vermelho);color:#fff}
  .btn.destaque:hover{background:var(--vermelho-claro);transform:translateY(-2px);transition:.2s}
  .btn.ghost{border:1px solid #2a2a2a;color:#fff}
  .btn.ghost:hover{border-color:#3a3a3a}
  .about-sign{margin-top:1rem;color:#cfcfcf}
  .about-social{margin-top:.5rem}
  .about-social a{color:var(--dourado);font-weight:600}
  @media(max-width:840px){
    .about-grid{grid-template-columns:1fr;gap:1rem}
    .about-photo{max-width:220px}
  }
</style>

<div class="about-wrap">
  <div class="about-head">
    <h1>Sobre o projeto</h1>
    <p class="lead">Conteúdo prático de treino, mente e saúde — para pessoas reais, com rotinas reais.</p>
  </div>

  <div class="about-grid">
    <div>
      <img class="about-photo" src="{{ '/assets/img/marcio.jpg' | relative_url }}" alt="Márcio Dowglas — Personal Trainer">
    </div>

    <div class="about-text">
      <p>
        Olá! Eu sou <strong>Márcio Dowglas</strong>, Personal Trainer. Este site existe para transformar
        conhecimento em prática: artigos curtos, diretos, e aplicáveis — a base dos vídeos que você vê nas plataformas.
      </p>

      <div class="about-box">
        <h3>Missão</h3>
        <ul class="about-list">
          <li>Unir <strong>treino</strong> e <strong>neurociência</strong> para resultados sustentáveis.</li>
          <li>Oferecer guias e utilitários que facilitem a rotina de quem treina.</li>
          <li>Compartilhar estratégias também para <strong>gestão fitness</strong> (profissionais e academias).</li>
        </ul>
      </div>

      <div class="about-box">
        <h3>O que você encontra aqui</h3>
        <ul class="about-list">
          <li>Artigos sobre <em>Treino, Neurociência, Nutrição</em> e <em>Gestão</em>.</li>
          <li>Templates e <strong>Utilitários</strong> para acelerar sua prática.</li>
          <li>Recomendações de produtos testados e com bom custo-benefício.</li>
        </ul>
      </div>

      <div class="about-cta">
        <a class="btn destaque" href="{{ '/avaliacao/' | relative_url }}">Fazer avaliação gratuita</a>
        <a class="btn ghost" href="{{ '/utilitarios/' | relative_url }}">Ver utilitários</a>
        <a class="btn ghost" href="{{ '/blog/' | relative_url }}">Ler artigos</a>
      </div>

      <p class="about-sign">— Márcio Dowglas, Personal Trainer</p>

      <p class="about-social">
        Siga no Instagram:
        <a href="https://www.instagram.com/marciodowglasfitness" target="_blank" rel="noopener">@marciodowglasfitness</a>
      </p>
    </div>
  </div>
</div>
