import Image from "next/image";

const images = [
  { src: "/assets/hero-3.jpg", alt: "Editorial em dunas ao fim da tarde", className: "h-[52vh]" },
  { src: "/assets/campaign-1.jpg", alt: "Detalhe de tecido terracota", className: "h-[40vh] self-end" },
  { src: "/assets/feminino.jpg", alt: "Vestido de tricot em luz natural", className: "h-[52vh]" },
  { src: "/assets/campaign-2.jpg", alt: "Vestido verde em movimento junto à costa", className: "h-[44vh] self-end" },
  { src: "/assets/hero-2.jpg", alt: "Vestido pêssego junto a parede branca", className: "h-[52vh]" },
];

export function Editorial() {
  return (
    <section className="pb-20 md:pb-28" aria-labelledby="editorial-title">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-clay">@viesteconcetto</p><h2 className="mt-3 font-serif text-6xl md:text-7xl" id="editorial-title">Editorial</h2></div><a className="eyebrow link-underline" href="#editorial-title">Seguir</a></div></div>
      <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-2 md:px-10">{images.map((item) => <Image key={item.src} src={item.src} alt={item.alt} width={1000} height={1400} sizes="50vw" className={`w-auto shrink-0 bg-secondary object-cover ${item.className}`} />)}</div>
    </section>
  );
}
