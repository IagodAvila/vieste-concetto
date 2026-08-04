import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image";

export function Lines() {
  return (
    <section aria-label="Coleção feminina">
      <div className="relative" id="feminino">
        <Image src="/assets/feminino.jpg" alt="Modelo em vestido longo de tricot em ambiente litorâneo minimalista" width={1008} height={1408} sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="h-[72vh] w-full object-cover object-[center_38%] md:h-[86vh]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 bg-gradient-to-t from-graphite/60 to-transparent p-8 md:p-12">
          <p className="eyebrow text-white/80">Linha principal</p>
          <h2 className="font-serif text-6xl text-white md:text-7xl">Feminino</h2>
          <a className="button-light eyebrow px-8 py-3.5" href="#novidades">Descobrir</a>
        </div>
      </div>
    </section>
  );
}
