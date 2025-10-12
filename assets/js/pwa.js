// assets/js/pwa.js
(function () {
  // --- Service Worker (necessário p/ instalar no Chrome/Edge) ---
  if ('serviceWorker' in navigator) {
    try {
      const link = document.querySelector('link[rel="manifest"]');
      // Deriva a raiz a partir do caminho do manifest (funciona com baseurl do GitHub Pages)
      let root = '/';
      if (link) {
        const u = new URL(link.href, location.href);
        root = u.pathname.replace(/\/manifest\.webmanifest$/i, '/');
      }
      navigator.serviceWorker.register(root + 'sw.js', { scope: root });
    } catch (e) {
      console.warn('SW register falhou:', e);
    }
  }

  // --- Instalação (beforeinstallprompt) ---
  let deferredPrompt = null;
  const bar = document.getElementById('pwa-install');
  if (!bar) return;

  const btnInstall = bar.querySelector('.pwa-install');
  const btnLater   = bar.querySelector('.pwa-later');

  // Não mostrar se já estiver instalado
  const isStandalone =
    window.matchMedia && window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (isStandalone) return;

  // Respeita “lembrar depois”
  const dismissedUntil = parseInt(localStorage.getItem('pwa_dismissed_until') || '0', 10);
  if (Date.now() < dismissedUntil) return;

  // iOS não dispara beforeinstallprompt — guardamos a info
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showBar();
  });

  // Fallback: se não vier o evento (ex.: iOS), mostramos mesmo assim
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!deferredPrompt) showBar();
    }, 1200);
  });

  function showBar() {
    bar.hidden = false;
    bar.classList.add('on');
  }
  function hideBar() {
    bar.classList.remove('on');
    setTimeout(() => (bar.hidden = true), 250);
  }

  btnLater?.addEventListener('click', () => {
    // esconde por 30 dias
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem('pwa_dismissed_until', String(Date.now() + THIRTY_DAYS));
    hideBar();
  });

  btnInstall?.addEventListener('click', async () => {
    if (deferredPrompt && typeof deferredPrompt.prompt === 'function') {
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } catch(_) {}
      hideBar();
      deferredPrompt = null;
    } else if (isIOS) {
      // Dica para iOS (Safari)
      alert('No iPhone/iPad: toque em Compartilhar ▸ Adicionar à Tela de Início para instalar.');
      hideBar();
    } else {
      // Fallback geral
      alert('Seu navegador pode não suportar instalação direta. Tente “Adicionar à Tela de Início”.');
      hideBar();
    }
  });
})();
