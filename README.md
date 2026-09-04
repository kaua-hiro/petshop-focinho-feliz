# Anjos da Guarda — Creche & Hotel

Landing page para a **Anjos da Guarda**, creche canina, hotel/hospedagem e adestramento para cães no Tatuapé, São Paulo.

## Identidade visual

A peça de assinatura é a **plaquinha de identificação (dog tag)** que todo cão usa na coleira — reaproveitada na hero (o cartão com o logo pendurado, com o "anel" da coleira) e nos cards de serviço (cada um com o "furo" de plaquinha no topo). A ideia liga direto ao nome da marca: um cão identificado e visto de perto é um cão protegido.

- **Tipografia:** Fredoka (display, arredondada e amigável) + Nunito (corpo) + Space Mono (rótulos e dados)
- **Paleta:** Azul Royal (`#1B3B8F`), Azul Royal profundo (`#0F2050`), Laranja Tangerina (`#F5871F`), papel creme (`#FFF7EC`)
- **Logo:** fornecido pelo cliente, recortado e otimizado (`public/img/logo.png` / `.webp`)
- **Responsivo:** do desktop ao mobile, com formulário, mapa e CTAs testados

## Conteúdo do cliente

- Serviços: Creche Canina, Hotel/Hospedagem, Adestramento e Consultoria Comportamental
- Endereço: Rua Bom Sucesso, 1133 — Tatuapé, SP
- WhatsApp: (11) 94740-9090 (botão "Consulte os Valores" em várias seções)
- Instagram: [@crecheanjosdaguarda](https://www.instagram.com/crecheanjosdaguarda)

## Checklist de lançamento (pedida pelo cliente)

| Item | Status |
|---|---|
| Testado no celular | Layout responsivo pronto — revalidar após publicar |
| Formulário | Pronto (`#formulario`), valida campos e abre WhatsApp com a mensagem |
| Clique no WhatsApp | Botões testáveis em todas as seções + botão flutuante |
| Página 404 | `public/404.html` |
| Domínio próprio | **Pendente** — depende da compra pelo cliente |
| HTTPS | Automático ao publicar na Vercel |
| PageSpeed | A validar após publicar (imagens já otimizadas/comprimidas) |
| Compressão de imagens | Logo convertido para WebP e redimensionado |
| Favicon | SVG inline com as cores da marca |
| OG Image | `public/img/og-image.jpg` (1200x630) |
| Sitemap.xml | `public/sitemap.xml` — **atualizar domínio real** |
| Google Analytics | Snippet pronto no `index.html` — **trocar `G-XXXXXXXXXX` pelo ID real** |
| Cookies (LGPD) | Banner de consentimento simples implementado |
| Dados no rodapé | Endereço, telefone e Instagram |
| Robots.txt | `public/robots.txt` — **atualizar domínio real** |
| Títulos e meta descriptions | Preenchidos em `index.html` e `404.html` |
| Hospedagem | Vercel (recomendado, já configurado via `vercel.json`) |
| Links | A revalidar após publicar (WhatsApp, Instagram, mapa) |
| Segurança | Headers configurados em `vercel.json` (X-Frame-Options, nosniff, etc.) |

> Fotos e vídeos reais da creche/hotel ainda não foram enviados. A seção "Momentos" está pronta para recebê-los (fotos em WebP, vídeos em WebM).

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
  404.html
  robots.txt
  sitemap.xml
  css/style.css
  js/main.js
  img/            # logo, favicon, og-image
server.js         # servidor Express só para dev local
vercel.json       # deploy como site estático + headers de segurança
```
