import type { ComponentType } from "react";
import { MessageIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";

const benefits: { title: string; description: string; Icon: ComponentType<{ className?: string }> }[] = [
  { title: "Compra segura", description: "Ambiente protegido e dados criptografados.", Icon: ShieldIcon },
  { title: "Troca facilitada", description: "Primeira troca sem custo em até 30 dias.", Icon: RefreshIcon },
  { title: "Envio para todo o Brasil", description: "Embalagem cuidadosa e rastreio completo.", Icon: TruckIcon },
  { title: "Atendimento personalizado", description: "Consultoria de estilo por WhatsApp.", Icon: MessageIcon },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10" aria-labelledby="beneficios-title">
      <h2 className="sr-only" id="beneficios-title">Benefícios da compra</h2>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ title, description, Icon }) => <li key={title}><Icon className="h-[22px] w-[22px] text-clay" /><h3 className="mt-4 text-sm font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></li>)}</ul>
    </section>
  );
}
