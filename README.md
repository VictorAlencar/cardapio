# Lord of the Chickens — Cardápio

Cardápio online da Taverna de Frango Crocante da Terra Média, feito com Next.js (App Router).

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

- `app/` — layout, página e estilos globais
- `components/` — Hero, Footer e `MenuApp` (cardápio, busca, filtros, comanda e checkout via WhatsApp)
- `components/ChatWidget.tsx` — chat com o Taverneiro, atendente virtual (Gemini via AI SDK)
- `app/api/chat/route.ts` — rota que conversa com o Gemini
- `lib/menu.ts` — itens do cardápio e categorias
- `lib/attendant.ts` — instruções do atendente (gerado a partir do cardápio) e perguntas sugeridas
- `public/assets/` — imagens
- `menu.md` — cardápio em texto
