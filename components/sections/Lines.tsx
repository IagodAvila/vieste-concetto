import Image from "next/image";

export function Lines() {
  return (
    <section className="grid md:grid-cols-2" aria-label="Coleções por linha">
      <div className="relative" id="feminino">
        <Image src="/assets/feminino.jpg" alt="Modelo em vestido longo de tricot em ambiente litorâneo minimalista" width={1008} height={1408} sizes="(min-width:768px) 50vw, 100vw" className="h-[70vh] w-full object-cover md:h-[86vh]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 bg-gradient-to-t from-graphite/60 to-transparent p-8 md:p-12">
          <p className="eyebrow text-white/80">Linha principal</p>
          <h2 className="font-serif text-3xl text-white md:text-4xl">Feminino</h2>
          <a className="eyebrow bg-background px-8 py-3.5 transition-colors hover:bg-peach" href="#novidades">Descobrir</a>
        </div>
      </div>
      <div className="bg-forest" id="uomo">
        <Image src="/assets/uomo.jpg" alt="Modelo masculino em camisa de linho verde em arquitetura litorânea" width={1600} height={1200} sizes="(min-width:768px) 50vw, 100vw" className="h-[46vh] w-full object-cover md:h-[54vh]" />
        <div className="flex flex-col items-start gap-5 p-8 md:h-[32vh] md:justify-center md:p-12">
          <Image src="/assets/logo-uomo-light.png" alt="VIESTE CONCETTO UOMO" width={320} height={180} className="h-32 w-auto object-contain md:h-36" />
          <p className="max-w-sm text-sm text-white/85">Linho, tricot e alfaiataria leve em uma paleta sóbria. A divisão masculina da casa.</p>
          <a className="eyebrow bg-white px-8 py-3.5 text-forest transition-colors hover:bg-peach hover:text-graphite" href="#uomo">Ver UOMO</a>
        </div>
      </div>
    </section>
  );
}
