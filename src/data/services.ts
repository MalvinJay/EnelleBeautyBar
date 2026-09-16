export type Service = { name: string; description: string; duration: string; price: string };
export type ServiceCategory = { name: string; image: string; services: Service[] };
export const serviceCategories: ServiceCategory[] = [
  {
    name: "Frontal Installs", image: "/enelle/ngWSEPyjxBwRLxYjdAIOJHFKJiVdLdCC.jpeg",
    services: [
      { name: "Luxury Frontal Install", description: "A seamless, tailored install with a glossy finish and a natural hairline.", duration: "2–3 hours", price: "From GH₵ 350" },
      { name: "Closure Install", description: "An effortless protective style with refined movement and clean parting.", duration: "2 hours", price: "From GH₵ 250" }
    ]
  },
  {
    name: "K-Tips", image: "/enelle/nPJefzRvBqWqvRvUNxRxLCVpQWLupwoi.jpeg",
    services: [
      { name: "K-Tip Extension Install", description: "Individual extensions expertly blended for natural movement and body.", duration: "4–6 hours", price: "From GH₵ 1,200" }
    ]
  },
  {
    name: "Tape-Ins", image: "/enelle/nquGsHrscWoTaphtsQZumiwSalfyWgBp.jpeg",
    services: [
      { name: "Tape-In Extension Install", description: "A discreet, versatile installation made to look and feel like your own hair.", duration: "2–3 hours", price: "From GH₵ 850" }
    ]
  },
  {
    name: "Bridal", image: "/enelle/nHyKacWgIAiuteKlxUIiDqFacinopKZD.jpeg",
    services: [
      { name: "Bridal Hair Styling", description: "A camera-ready bridal look, composed around your dress, veil and moment.", duration: "By consultation", price: "From GH₵ 1,500" },
      { name: "Bridal Install", description: "A secure, polished install designed to stay beautiful from first look to last dance.", duration: "By consultation", price: "From GH₵ 2,000" }
    ]
  },
];

