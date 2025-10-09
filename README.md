
# Starter GitHub Pages (Jekyll) — PT-BR

Este é um modelo mínimo para publicar um site no GitHub Pages usando Jekyll.

## Como usar

1. **Crie o repositório** `seuusuario.github.io` (público).
2. Envie estes arquivos (upload via web ou `git push`).
3. Vá em **Settings → Pages** e confirme que a branch `main` está publicada.
4. Acesse: `https://seuusuario.github.io`.

## Estrutura
- `_config.yml`: Configurações do site (título, links, plugins).
- `index.md`: Página inicial.
- `pages/sobre.md`, `pages/contato.md`: Páginas estáticas.
- `_posts/`: Blog.
- `assets/css/style.scss`: Estilos extras.
- `_includes/header-custom.html`: Cabeçalho com links sociais.
- `_layouts/page.html`, `_layouts/home.html`: Layouts básicos.

## Desenvolvimento local (opcional)
- Instale Ruby e Bundler.
- Rode:
  ```bash
  bundle
  bundle exec jekyll serve
  ```
- Abra `http://localhost:4000`.
