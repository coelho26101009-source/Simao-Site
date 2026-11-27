# Agrupamento de Escolas Tomaz Pelayo — proposta de novo site

Projeto privado: uma nova cara para home.tomazpelayo.com. HTML, CSS e JavaScript simples, sem framework.

- `src/data.mjs`: todo o conteúdo (menus, ligações, notícias, ranking, projetos e logótipos).
- `build.mjs`: gera o `index.html` a partir dos dados. Correr `node build.mjs` depois de mudar o conteúdo, o CSS ou o JS (atualiza as versões dos ficheiros).
- `assets/img/`: logótipos e fotografias copiados do site atual.

As ligações levam ao site atual e aos sites de cada serviço, por isso tudo continua a funcionar.

## Ver no PC

    node build.mjs
    npx serve .

## Em falta
- Os logótipos `pba.png` (notícia de recrutamento) e o ícone do site estavam protegidos pelo servidor da escola e não foram copiados.
