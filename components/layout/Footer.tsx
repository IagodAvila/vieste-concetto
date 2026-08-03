import Image from "next/image";

const groups = [
  { title: "Atendimento", links: ["Fale com a gente", "Minha conta", "Guia de medidas"] },
  { title: "Ajuda", links: ["Trocas e devoluções", "Envios e entregas", "Política de privacidade"] },
  { title: "A marca", links: ["Nossa história", "Novidades", "UOMO"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand-deep">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Image src="/assets/logo-vieste.svg" alt="VIESTE CONCETTO" width={1098} height={423} className="h-auto w-[10.5rem]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">Moda brasileira contemporânea. Peças de forma precisa e matérias que acolhem o corpo.</p>
            <div className="mt-6 flex gap-3"><SocialLink label="Instagram">◎</SocialLink><SocialLink label="WhatsApp">◯</SocialLink></div>
          </div>
          {groups.map((group) => <nav aria-label={group.title} key={group.title}><h2 className="eyebrow text-clay">{group.title}</h2><ul className="mt-5 space-y-3">{group.links.map((link) => <li key={link}><a className="link-underline text-sm" href="#">{link}</a></li>)}</ul></nav>)}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vieste Concetto. Todos os direitos reservados.</p>
          <ul className="flex flex-wrap gap-2">{["Pix", "Visa", "Mastercard", "Elo", "Amex", "Boleto"].map((item) => <li className="border border-border px-2.5 py-1 tracking-wide" key={item}>{item}</li>)}</ul>
        </div>
        <p className="mt-6 text-[.65rem] text-muted-foreground">Protótipo de demonstração. Produtos, preços e descrições são fictícios.</p>
      </div>
    </footer>
  );
}

function SocialLink({ label, children }: { label: string; children: string }) {
  return <a href="#" aria-label={label} className="flex h-11 w-11 items-center justify-center border border-border text-lg transition-colors hover:border-clay hover:text-clay">{children}</a>;
}
