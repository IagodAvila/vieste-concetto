import Image from "next/image";

export function Manifesto() {
  return (
    <section className="bg-peach px-4 py-28 md:px-10 md:py-40" id="nossa-história" aria-labelledby="manifesto-title">
      <div className="mx-auto max-w-3xl text-center">
        <Image src="/assets/monogram-vieste.png" alt="" aria-hidden width={400} height={400} className="mx-auto h-36 w-auto object-contain opacity-80 md:h-44" />
        <h2 className="eyebrow mt-10 text-clay" id="manifesto-title">Manifesto</h2>
        <p className="mt-6 font-serif text-2xl leading-[1.4] text-clay md:text-[2.1rem]">A Vieste acredita em peças que permanecem. Formas precisas, matérias que acolhem o corpo e uma elegância que não depende da ocasião.</p>
        <a href="#nossa-história" className="eyebrow link-underline mt-10 inline-block text-clay">Nossa história</a>
      </div>
    </section>
  );
}
