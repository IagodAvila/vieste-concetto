"use client";

import { useEffect, useState } from "react";

const messages = ["Frete grátis acima de R$ 499,00", "Primeira troca facilitada", "Até 6x sem juros"];
const ROTATION_INTERVAL_MS = 4500;

export function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % messages.length), ROTATION_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-clay text-white">
      <ul className="mx-auto hidden max-w-[1600px] items-center justify-between gap-8 px-4 py-2.5 text-center md:flex md:px-10">
        <li className="eyebrow text-base md:flex-1">{messages[0]}</li>
        <li className="eyebrow text-base md:flex-1 md:text-center">{messages[1]}</li>
        <li className="eyebrow text-base md:flex-1 md:text-right">{messages[2]}</li>
      </ul>
      <div className="relative h-11 overflow-hidden px-4 text-center md:hidden" aria-live="polite">
        {messages.map((message, index) => <p className={`eyebrow absolute inset-0 flex items-center justify-center text-base transition-[opacity,transform] duration-500 ${index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`} key={message} aria-hidden={index !== activeIndex}>{message}</p>)}
      </div>
    </div>
  );
}
