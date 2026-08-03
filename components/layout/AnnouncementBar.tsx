export function AnnouncementBar() {
  return (
    <div className="bg-clay text-white">
      <ul className="mx-auto flex max-w-[1600px] items-center justify-center gap-8 px-4 py-2.5 text-center md:justify-between md:px-10">
        <li className="eyebrow text-[.6rem] md:flex-1">Frete grátis acima de R$ 499,00</li>
        <li className="eyebrow hidden text-[.6rem] md:block md:flex-1 md:text-center">Primeira troca facilitada</li>
        <li className="eyebrow hidden text-[.6rem] md:block md:flex-1 md:text-right">Até 6x sem juros</li>
      </ul>
    </div>
  );
}
