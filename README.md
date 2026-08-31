# Focinho Feliz

Landing page para o **Focinho Feliz**, um pet shop com banho & tosa, day care e consultas veterinárias em São Paulo.

**Demo:** https://petshop-focinho-feliz.vercel.app/

## Identidade visual

O conceito parte de algo real do universo pet: a **carteirinha de vacinação**, onde cada visita ao pet shop ou ao veterinário vira um carimbo. Essa é a peça de assinatura do design — reaproveitada na hero (um cartão estilo foto 3x4 com cantos de moldura e um carimbo "aprovado"), no grid de serviços (cada card é uma "página" da carteirinha) e numa seção dedicada só aos carimbos possíveis (banho, tosa, vacina, day care, check-up, higiene).

Nenhuma foto de banco de imagens: a ilustração de um cão e um gato na hero é feita em SVG, mantendo a identidade 100% original.

- **Tipografia:** Baloo 2 (display, arredondada e amigável) + Mulish (corpo) + JetBrains Mono (carimbos e rótulos)
- **Paleta:** menta (`#CFEEE1`), tinta (`#1B3A3A`), coral (`#FF7A59`), papel (`#F4FBF8`)
- **Responsivo:** grid de serviços e carimbos se reorganizam até mobile

## Stack

HTML, CSS e JavaScript puros — sem framework de frontend. Servido em produção como site estático (Vercel); localmente roda via um `server.js` (Express) simples para servir a pasta `public/`.

## Rodando localmente

```bash
npm install
npm start
```

Abre em `http://localhost:3000`.

## Estrutura

```
public/
  index.html
  css/style.css
  js/main.js
server.js       # servidor Express só para dev local
vercel.json     # deploy como site estático
```
