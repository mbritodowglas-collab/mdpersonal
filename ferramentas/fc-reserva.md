---
layout: default
title: Intensidade por FC de Reserva
permalink: /ferramentas/fc-reserva/
description: "Calcule as zonas por FC de Reserva (Karvonen) – 50% a 80%."
---

<section class="tool-hero">
  <h1>Intensidade por FC de Reserva</h1>
  <p>Descubra suas zonas de treino entre <strong>50% e 80%</strong> da FC de reserva (método Karvonen).</p>
</section>

<section class="tool-card-full">
  <form id="form-fcr" class="tool-form" onsubmit="return false;" autocomplete="off">
    <div class="grid">
      <label class="field">
        <span>Idade <small>(opcional)</small></span>
        <input type="number" id="idade" inputmode="numeric" min="8" max="100" placeholder="ex.: 32">
      </label>

      <label class="field">
        <span>FC Máxima <small>(se não souber, calculo por 220 − idade)</small></span>
        <input type="number" id="fcmax" inputmode="numeric" min="80" max="220" placeholder="ex.: 190">
      </label>

      <label class="field">
        <span>FC de Repouso</span>
        <input type="number" id="fcrep" inputmode="numeric" min="30" max="120" placeholder="ex.: 62" required>
      </label>
    </div>

    <button type="button" class="btn-cta" id="btn-fcr">Calcular</button>
    <p class="hint">Dica: meça a FC de repouso ao acordar, ainda deitado(a).</p>
  </form>

  <div id="out-fcr" class="tool-out" hidden>
    <div class="out-meta">
      <div><strong>FCmáx usada:</strong> <span id="out-fcmax">—</span> bpm</div>
      <div><strong>FCrep:</strong> <span id="out-fcrep">—</span> bpm</div>
      <div><strong>FC de reserva (HRR):</strong> <span id="out-hrr">—</span> bpm</div>
    </div>

    <div class="table-wrap">
      <table class="tool-table" aria-describedby="tbl-title-fcr">
        <caption id="tbl-title-fcr" style="text-align:left;opacity:.75;padding:.5rem 0 .25rem;">
          Tabela de FC alvo por percentual da FC de reserva (Karvonen)
        </caption>
        <thead>
          <tr>
            <th>% da FC de Reserva</th>
            <th>FC Alvo (bpm)</th>
          </tr>
        </thead>
        <tbody id="tbody-fcr"></tbody>
      </table>
    </div>
  </div>
</section>

<style>
.tool-hero{max-width:860px;margin:1.5rem auto 1rem;padding:0 1rem;text-align:center}
.tool-hero h1{color:#f0d26a;font-size:1.7rem;margin:.2rem 0 .4rem}
.tool-hero p{color:#cfcfcf}

.tool-card-full{max-width:860px;margin:0 auto 2.5rem;padding:1rem}
.tool-form .grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}
.field{display:flex;flex-direction:column;gap:.35rem}
.field span{color:#ddd;font-weight:600}
.field small{opacity:.7}
.field input{background:#0f0f0f;border:1px solid #222;border-radius:10px;color:#fff;padding:.7rem .8rem}
.btn-cta{margin-top:.8rem;background:#d62828;color:#fff;border:0;border-radius:10px;padding:.85rem 1rem;font-weight:700;cursor:pointer}
.btn-cta:hover{background:#ff4040}
.hint{color:#aaa;font-size:.9rem;margin:.45rem 0 0}

.tool-out{margin-top:1.2rem}
.out-meta{display:flex;flex-wrap:wrap;gap:.8rem;color:#ddd;margin-bottom:.8rem}
.out-meta div{background:#0f0f0f;border:1px solid #1f1f1f;border-radius:10px;padding:.55rem .75rem}

.table-wrap{overflow:auto;border:1px solid #1f1f1f;border-radius:12px}
.tool-table{width:100%;border-collapse:collapse;min-width:420px}
.tool-table th,.tool-table td{padding:.75rem;border-bottom:1px solid #1f1f1f}
.tool-table thead th{background:#101010;color:#f0d26a;text-align:left}
.tool-table tbody tr:hover{background:#0c0c0c}
</style>

<script>
document.addEventListener('DOMContentLoaded', function(){
  const pctList = [50,55,60,65,70,75,80]; // % desejados
  const el = (id)=>document.getElementById(id);

  function round(x){ return Math.round(x); }

  function calc() {
    const idade = parseInt(el('idade').value,10);
    const fcMaxInput = parseInt(el('fcmax').value,10);
    const fcRep = parseInt(el('fcrep').value,10);

    if (isNaN(fcRep)) { alert('Informe sua FC de repouso.'); return; }

    let fcMax = fcMaxInput;
    if (isNaN(fcMax)) {
      if (isNaN(idade)) { alert('Informe Idade ou FC Máxima.'); return; }
      fcMax = 220 - idade; // estimativa simples
    }

    const hrr = fcMax - fcRep;

    // preenche meta
    el('out-fcmax').textContent = fcMax;
    el('out-fcrep').textContent = fcRep;
    el('out-hrr').textContent = hrr;

    // tabela
    const tbody = el('tbody-fcr');
    tbody.innerHTML = '';
    pctList.forEach(p=>{
      const alvo = round(hrr * (p/100) + fcRep);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p}%</td><td><strong>${alvo}</strong> bpm</td>`;
      tbody.appendChild(tr);
    });

    el('out-fcr').hidden = false;
  }

  el('btn-fcr').addEventListener('click', calc);
});
</script>
