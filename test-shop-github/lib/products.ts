export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in centesimi di euro
  image: string;
};

const img = (text: string, bg: string) =>
  `https://placehold.co/600x450/${bg}/ffffff.png?text=${encodeURIComponent(text)}`;

export const products: Product[] = [
  {
    id: "tazza-classica",
    name: "Tazza Classica",
    description: "Tazza in ceramica da 350 ml, perfetta per il caffè del mattino.",
    price: 1290,
    image: img("Tazza Classica", "2f6f5e"),
  },
  {
    id: "borsa-tela",
    name: "Borsa in Tela",
    description: "Borsa riutilizzabile in cotone organico, resistente e capiente.",
    price: 1900,
    image: img("Borsa in Tela", "c8553d"),
  },
  {
    id: "quaderno-a5",
    name: "Quaderno A5",
    description: "Quaderno a puntini con 160 pagine in carta riciclata.",
    price: 990,
    image: img("Quaderno A5", "3d5a80"),
  },
  {
    id: "candela-profumata",
    name: "Candela Profumata",
    description: "Candela in cera di soia alla vaniglia, 40 ore di durata.",
    price: 2450,
    image: img("Candela", "8a6d3b"),
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(cents / 100);
}
