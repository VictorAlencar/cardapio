# Lord of the Chickens — Cardápio

Cardápio online da Taverna de Frango Crocante da Terra Média, feito com Next.js (App Router).

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

- `app/` — layout, página e estilos globais
- `components/` — Hero, Footer e `MenuApp` (cardápio, busca, filtros, comanda e checkout via WhatsApp)
- `lib/menu.ts` — itens do cardápio e categorias
- `public/assets/` — imagens
- `menu.md` — cardápio em texto
