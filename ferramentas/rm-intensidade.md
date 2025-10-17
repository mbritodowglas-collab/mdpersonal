---
layout: default
title: Intensidade por RM
permalink: /ferramentas/rm-intensidade/
description: "Informe reps máximas e carga; veja percentuais relativos à 1RM."
---

<section class="tool-hero">
  <h1>Intensidade por Repetições Máximas (RM)</h1>
  <p>Informe o <strong>peso</strong> e as <strong>repetições</strong> realizadas. Eu estimo a sua <strong>1RM</strong> (fórmula de Epley) e mostro as cargas por percentual.</p>
</section>

<section class="tool-card-full">
  <form id="form-rm" class="tool-form" onsubmit="return false;">
    <div class="grid">
      <label class="field">
        <span>Peso levantado (kg)</span>
        <input type="number" id="peso" inputmode="decimal" min="1" step="0.5" placeholder="ex.: 40" required>
      </label>

      <label class="field">
        <span>Repetições (até a falha)</span>
        <input type="number" id="reps" inputmode="numeric" min="1" max="20" placeholder="ex.: 8" required>
      </label>
    </div>

    <button type="button" class="btn-cta" id="btn-rm">Calcular</button>
    <p class="hint">Obs.: fórmula de Epley: 1RM ≈ Peso × (1 + Reps/30). Útil para prescrição de cargas.</p>
  </form>

  <div id="out-rm" class="tool-out" hidden>
    <div class="out-meta">
      <div><strong>1RM estimada:</strong> <span id="out-1rm">—</span> kg</div>
    </div>

    <div class="table-wrap">
      <table class="tool-table">
        <thead>
          <tr>
            <th>% da 1RM</th>
            <th>Carga (kg)</th>
          </tr>
        </thead>
        <tbody id="tbody-rm"></tbody>
      </table>
    </div>
  </div>
</section>

<style>
/* Reutiliza o mesmo estilo da outra calculadora */
.tool-hero{max-width:860px;margin:1.5rem auto 1rem;padding:0 1rem;text-align:center}
.tool-hero h1{color:#f0d26a;font-size:1.7rem;margin:.2rem 0 .4rem}
.tool-hero p{color:#cfcfcf}

.tool-card-full{max-width:860px;margin:0 auto 2.5rem;padding:1rem}
.tool-form .grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}
.field{display:flex;flex-direction:column;gap:.35rem}
.field span{color:#ddd;font-weight:600}
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
(function(){
  // percentuais mais usados em prescrição
  const pctList = [50,60,70,75,80,85,90];
  const el = (id)=>document.getElementById(id);

  function round1(x){ return Math.round(x*10)/10; }

  function calc() {
    const peso = parseFloat(el('peso').value);
    const reps = parseInt(el('reps').value,10);

    if (isNaN(peso) || peso <= 0) { alert('Informe o peso levantado.'); return; }
    if (isNaN(reps) || reps < 1) { alert('Informe o número de repetições.'); return; }

    // Epley
    const rm = peso * (1 + reps/30);

    el('out-1rm').textContent = round1(rm);

    const tbody = el('tbody-rm');
    tbody.innerHTML = '';
    pctList.forEach(p=>{
      const carga = rm * (p/100);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p}%</td><td><strong>${round1(carga)}</strong> kg</td>`;
      tbody.appendChild(tr);
    });

    el('out-rm').hidden = false;
  }

  el('btn-rm').addEventListener('click', calc);
})();
</script>

