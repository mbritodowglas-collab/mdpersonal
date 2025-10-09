---
layout: avaliacao
title: Obrigado
body_class: obrigado
---

<div class="container prose" style="text-align:center">
  <h1>Obrigado por responder 💪</h1>
  <p>Recebi sua avaliação! Clique no botão abaixo para falarmos no WhatsApp e alinharmos seus próximos passos.</p>

  <p>
    <a class="btn" id="zap" href="https://wa.me/5592981037222?text=Oi%20Márcio,%20acabei%20de%20responder%20a%20avaliação%20no%20site%20e%20quero%20começar%20o%20programa." target="_blank" rel="noopener">
      Abrir WhatsApp
    </a>
  </p>

  <p class="small">Se o WhatsApp não abrir automaticamente, use o botão acima.</p>
</div>

<!-- Abre o WhatsApp automaticamente após 2 segundos -->
<script>
  setTimeout(function(){
    var a = document.getElementById('zap');
    if(a) a.click();
  }, 2000);
</script>
