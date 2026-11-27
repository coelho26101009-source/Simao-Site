# NorteBit — novo site

Versão redesenhada de nortebit.vercel.app. HTML, CSS e JavaScript simples, sem framework nem build.

| Ficheiro | O que tem |
|---|---|
| `index.html` | Todo o texto da página. |
| `assets/js/data.js` | Tabela de preços e lista de avarias (valores de referência). |
| `assets/js/app.js` | Filtros de preços, formulário, estimativa, envio para o Google Sheets e WhatsApp. |
| `assets/css/style.css` | Estilo. As cores estão no topo, em `:root`. |

O formulário envia exatamente os mesmos campos que o site anterior para o Google Apps Script,
por isso a folha de cálculo continua a funcionar. Os preços são lidos do Sheets (`?action=getPrices`)
quando a página abre; se falhar, ficam os de `data.js`.

## Ver no PC

```
npx serve .
```

## Publicar no Vercel

No projeto da NorteBit, aponta o **Root Directory** para esta pasta (`nortebit`), ou copia o
conteúdo desta pasta para o repositório do site. Não precisa de build.

Fontes: Inter Tight, Instrument Serif e JetBrains Mono (SIL Open Font License), alojadas no próprio site.
