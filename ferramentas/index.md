---
layout: default
title: Ferramentas de Treino
permalink: /ferramentas/
description: "Calculadoras e utilitários práticos para planejar intensidade, carga e frequência de treino com base científica."
image: "/assets/img/ferramentas-bg.jpg"
---

<section class="tools-hero">
  <h1>Ferramentas de Treino</h1>
  <p>Calculadoras práticas para ajustar intensidade, planejar treinos e acompanhar sua evolução física.</p>
</section>

<section class="tools-list">
  <div class="tools-grid">

    <!-- FC de Reserva -->
    <a href="{{ '/utilitarios/fc-reserva/' | relative_url }}" class="tool-card">
      <div class="tool-icon">💓</div>
      <div class="tool-info">
        <h3>Intensidade por FC de Reserva</h3>
        <p>Descubra sua zona ideal de treino cardiovascular pelo método Karvonen.</p>
      </div>
      <span class="tool-btn">Abrir Calculadora →</span>
    </a>

    <!-- Repetições Máximas -->
    <a href="{{ '/utilitarios/rm-intensidade/' | relative_url }}" class="tool-card">
      <div class="tool-icon">🏋️‍♀️</div>
      <div class="tool-info">
        <h3>Intensidade por Repetições Máximas (RM)</h3>
        <p>Calcule sua 1RM e defina cargas ideais para força, hipertrofia e resistência.</p>
      </div>
      <span class="tool-btn">Abrir Calculadora →</span>
    </a>

  </div>
</section>

<style>
/* === FERRAMENTAS === */
.tools-hero {
  text-align: center;
  margin: 2rem auto 1.5rem;
  max-width: 850px;
}
.tools-hero h1 {
  color: #f0d26a;
  font-size: 1.8rem;
  margin-bottom: .5rem;
}
.tools-hero p {
  color: #ccc;
  font-size: 1rem;
  line-height: 1.5;
}

.tools-list {
  max-width: 900px;
  margin: 1rem auto 3rem;
  padding: 0 1rem;
}
.tools-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
.tool-card {
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: .25s ease;
}
.tool-card:hover {
  transform: translateY(-3px);
  border-color: #d62828;
}
.tool-icon {
  font-size: 2rem;
  margin-bottom: .75rem;
}
.tool-info h3 {
  color: #f0d26a;
  font-size: 1.1rem;
  margin-bottom: .3rem;
}
.tool-info p {
  color: #bbb;
  font-size: .9rem;
  line-height: 1.4;
}
.tool-btn {
  margin-top: 1rem;
  color: #d62828;
  font-weight: 600;
  font-size: .9rem;
}
</style>

