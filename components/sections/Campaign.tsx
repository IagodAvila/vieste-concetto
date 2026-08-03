import Image from "next/image";

export function Campaign() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10 md:py-32" id="campanha" aria-labelledby="campanha-title">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5"><Image src="/assets/campaign-1.jpg" alt="Detalhe de tecido de linho terracota em luz natural" width={1000} height={1400} sizes="(min-width:768px) 42vw, 100vw" className="aspect-3/4 w-full object-cover" /></div>
        <div className="md:col-span-3"><p className="eyebrow text-clay">Coleção</p><h2 className="mt-3 font-serif text-7xl md:text-8xl" id="campanha-title">Movimento 01</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Silhuetas contínuas, tecidos que respiram e uma paleta construída a partir da luz do litoral brasileiro.</p><a href="#novidades" className="button-secondary eyebrow mt-8 px-8 py-4">Explorar coleção</a></div>
        <div className="md:col-span-4 md:pt-24"><Image src="/assets/campaign-2.jpg" alt="Modelo sentada em banco de pedra usando calça ampla e tricot" width={1400} height={1000} sizes="(min-width:768px) 34vw, 100vw" className="aspect-4/5 w-full object-cover" /></div>
      </div>
    </section>
  );
}
