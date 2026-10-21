export type Category = "principais" | "acompanhamentos" | "sobremesas";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  badge: { type: "popular" | "precious" | "spicy"; text: string } | null;
};

export const CATEGORIES: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "📜 Todos os Pratos" },
  { id: "principais", label: "⚔️ Pratos Principais" },
  { id: "acompanhamentos", label: "🍟 Acompanhamentos" },
  { id: "sobremesas", label: "🍰 Sobremesas & Bebidas" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "combo-frodo",
    name: "Combo Frodo Fritinho",
    category: "principais",
    price: 32.9,
    description:
      "2 pedaços de frango empanado, pequenos como um hobbit mas com o peso de uma missão épica. Vem com batata frita e refrigerante — a jornada começa aqui.",
    image: "/assets/hero.png",
    badge: { type: "popular", text: "⭐ Recomendado" },
  },
  {
    id: "balde-comunidade",
    name: "Balde da Comunidade do Frango",
    category: "principais",
    price: 69.9,
    description:
      "10 pedaços de frango crocante, feitos pra reunir toda a Comunidade (ou pelo menos sua família). Acompanha 2 porções de batata e molho barbecue.",
    image: "/assets/hero.png",
    badge: { type: "precious", text: "👑 Épico" },
  },
  {
    id: "tiras-legolas",
    name: "Tiras de Legolas",
    category: "principais",
    price: 24.9,
    description:
      "5 tiras certeiras de peito de frango, rápidas e precisas como uma flechada élfica. Servidas com molho honey mustard.",
    image: "/assets/sanduiche.png",
    badge: null,
  },
  {
    id: "sanduiche-aragorn",
    name: "Sanduíche Aragorn, o Retorno do Crocante",
    category: "principais",
    price: 22.9,
    description:
      "Filé de frango empanado, alface, tomate e maionese da casa no pão brioche. Simples, nobre e digno de um rei.",
    image: "/assets/sanduiche.png",
    badge: { type: "popular", text: "🗡️ Mais Pedido" },
  },
  {
    id: "asinhas-nazgul",
    name: "Asinhas de Nazgûl",
    category: "principais",
    price: 28.9,
    description:
      "8 asinhas fritas cobertas no molho picante que assombra até os Espectros do Anel. Vem com molho ranch pra suavizar o terror.",
    image: "/assets/asinhas.png",
    badge: { type: "spicy", text: "🔥 Picante" },
  },
  {
    id: "batata-gimli",
    name: "Batata Rústica de Gimli",
    category: "acompanhamentos",
    price: 18.9,
    description:
      "Batata rústica coberta com cheddar cremoso e bacon, robusta e cheia de personalidade — assim como o anão mais teimoso da Terra Média.",
    image: "/assets/batata.png",
    badge: { type: "precious", text: "🥓 Robusta" },
  },
  {
    id: "batata-shire",
    name: "Batatas Fritas de Shire",
    category: "acompanhamentos",
    price: 12.9,
    description:
      "A batata clássica e reconfortante, do jeitinho que os hobbits gostam: simples, quentinha e sem pressa.",
    image: "/assets/batata.png",
    badge: null,
  },
  {
    id: "onion-rings",
    name: "Onion Rings do Um Anel",
    category: "acompanhamentos",
    price: 15.9,
    description:
      "Anéis de cebola empanados e dourados — um para fritar a todos, e no forno da cozinha, dominá-los.",
    image: "/assets/hero.png",
    badge: { type: "precious", text: "💍 O Um Anel" },
  },
  {
    id: "milkshake-galadriel",
    name: "Milk-shake de Galadriel",
    category: "sobremesas",
    price: 16.9,
    description:
      "Cremoso, luminoso e um pouco mágico. Disponível em Chocolate, Morango ou Vanilla — escolha seu presente do Espelho.",
    image: "/assets/milkshake.png",
    badge: { type: "popular", text: "✨ Mágico" },
  },
  {
    id: "sundae-precioso",
    name: "Sundae do Precioso",
    category: "sobremesas",
    price: 10.9,
    description:
      "Sorvete de vanilla com calda de caramelo quente e chantilly. Você vai querer chamar de 'meu precioso'.",
    image: "/assets/milkshake.png",
    badge: { type: "precious", text: "💎 Meu Precioso" },
  },
];

export const formatPrice = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;
