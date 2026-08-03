"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const images = [
  { src: "/assets/hero-3.jpg", alt: "Editorial em dunas ao fim da tarde", className: "h-[52vh]" },
  { src: "/assets/campaign-1.jpg", alt: "Detalhe de tecido terracota", className: "h-[40vh] self-end" },
  { src: "/assets/feminino.jpg", alt: "Vestido de tricot em luz natural", className: "h-[52vh]" },
  { src: "/assets/campaign-2.jpg", alt: "Vestido verde em movimento junto à costa", className: "h-[44vh] self-end" },
  { src: "/assets/hero-2.jpg", alt: "Vestido pêssego junto a parede branca", className: "h-[52vh]" },
];

export function Editorial() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);

  function stopDragging() {
    drag.current.active = false;
    setDragging(false);
  }

  return (
    <section className="pb-20 md:pb-28" aria-labelledby="editorial-title">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-clay">@viesteconcetto</p><h2 className="mt-3 font-serif text-6xl md:text-7xl" id="editorial-title">Editorial</h2></div><a className="eyebrow link-underline" href="#editorial-title">Seguir</a></div></div>
      <div
        ref={trackRef}
        className={`scrollbar-hidden mt-10 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 select-none md:px-10 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        aria-label="Galeria editorial arrastável"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || !trackRef.current) return;
          drag.current = { active: true, startX: event.clientX, startScroll: trackRef.current.scrollLeft };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (!drag.current.active || !trackRef.current) return;
          trackRef.current.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
      >{images.map((item) => <Image draggable={false} key={item.src} src={item.src} alt={item.alt} width={1000} height={1400} sizes="50vw" className={`w-auto shrink-0 snap-start bg-secondary object-cover ${item.className}`} />)}</div>
    </section>
  );
}
