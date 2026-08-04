"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { image: "/assets/hero-1.jpg", alt: "Modelo em vestido longo de linho em terraço litorâneo ao sol" },
  { image: "/assets/hero-2.jpg", alt: "Modelo em vestido pêssego junto a uma parede branca" },
  { image: "/assets/hero-3.jpg", alt: "Editorial em dunas ao fim da tarde" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  function move(direction: -1 | 1) {
    setActive((value) => (value + direction + slides.length) % slides.length);
  }

  return (
    <section
      className="relative h-[82vh] min-h-[520px] w-full touch-pan-y overflow-hidden bg-secondary"
      id="top"
      aria-roledescription="carrossel"
      aria-label="Campanhas Vieste"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(event) => { pointerStart.current = event.clientX; }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
        pointerStart.current = null;
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      {slides.map((slide, index) => <Image priority={index === 0} key={slide.image} src={slide.image} alt={index === active ? slide.alt : ""} aria-hidden={index !== active} width={1920} height={1080} sizes="100vw" className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] ${index === active ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"}`} />)}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-graphite/10 to-transparent" />
      <div className="relative flex h-full flex-col items-start justify-end px-6 pb-16 md:px-14 md:pb-20 short-vh:pb-8">
        <Image src="/assets/logo-vieste.svg" alt="VIESTE CONCETTO" width={1098} height={423} className="h-auto w-48 invert md:w-64 short-vh:w-36" />
        <h1 className="mt-6 max-w-xl font-script text-3xl leading-[1.15] text-white md:text-5xl short-vh:mt-3 short-vh:text-3xl">Formas que acompanham o seu movimento</h1>
        <p className="mt-4 max-w-md text-sm text-white/85 md:text-base short-vh:mt-2">Uma coleção pensada para vestir presença, leveza e liberdade.</p>
        <a className="button-light eyebrow mt-8 px-9 py-4 short-vh:mt-4" href="#campanha">Conheça a coleção</a>
        <div className="mt-10 flex items-center gap-3 short-vh:mt-4">{slides.map((_, index) => <button onClick={() => setActive(index)} type="button" aria-label={`Ver campanha ${index + 1}`} aria-current={index === active} className="group flex h-8 items-center" key={index}><span className={`block h-[2px] transition-[width,background-color] duration-500 ${index === active ? "w-14 bg-white" : "w-9 bg-white/45 group-hover:bg-white/75"}`} /></button>)}</div>
      </div>
    </section>
  );
}
