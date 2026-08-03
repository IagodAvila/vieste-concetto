"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { image: "/assets/hero-1.jpg", alt: "Modelo em vestido longo de linho em terraço litorâneo ao sol" },
  { image: "/assets/hero-2.jpg", alt: "Modelo em vestido pêssego junto a uma parede branca" },
  { image: "/assets/hero-3.jpg", alt: "Editorial em dunas ao fim da tarde" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden bg-secondary" id="top">
      {slides.map((slide, index) => <Image priority={index === 0} key={slide.image} src={slide.image} alt={index === active ? slide.alt : ""} aria-hidden={index !== active} width={1920} height={1080} sizes="100vw" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${index === active ? "opacity-100" : "opacity-0"}`} />)}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-graphite/10 to-transparent" />
      <div className="relative flex h-full flex-col items-start justify-end px-6 pb-16 md:px-14 md:pb-20">
        <Image src="/assets/logo-vieste-light.png" alt="VIESTE CONCETTO" width={320} height={180} className="h-12 w-auto object-contain md:h-16" />
        <h1 className="mt-6 max-w-xl font-serif text-3xl leading-[1.15] text-white md:text-5xl">Formas que acompanham o seu movimento.</h1>
        <p className="mt-4 max-w-md text-sm text-white/85 md:text-base">Uma coleção pensada para vestir presença, leveza e liberdade.</p>
        <a className="eyebrow mt-8 bg-background px-9 py-4 transition-colors hover:bg-peach" href="#campanha">Conheça a coleção</a>
        <div className="mt-10 flex items-center gap-3">{slides.map((_, index) => <button onClick={() => setActive(index)} type="button" aria-label={`Ver campanha ${index + 1}`} aria-current={index === active} className={`h-[2px] w-10 transition-colors ${index === active ? "bg-white" : "bg-white/40"}`} key={index} />)}</div>
      </div>
    </section>
  );
}
