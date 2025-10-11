source "https://rubygems.org"

# Usa o mesmo ambiente do GitHub Pages (inclui Jekyll e plugins compatíveis)
gem "github-pages", group: :jekyll_plugins

# Necessário para builds locais e no CI (Ruby 3.x não inclui mais webrick)
gem "webrick", "~> 1.8"

# HTMLProofer só roda no CI, não é plugin do Jekyll
gem "html-proofer", group: :development