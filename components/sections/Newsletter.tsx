export function Newsletter() {
  return (
    <section className="bg-peach px-4 py-20 text-graphite md:px-10 md:py-28" id="contato" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-script text-3xl leading-[1.2] text-clay md:text-4xl" id="newsletter-title">Novidades chegam primeiro aqui</h2>
        <p className="mt-4 text-sm">Coleções, editoriais e pré-lançamentos — sem excessos na sua caixa de entrada.</p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row"><div className="flex-1 text-left"><label className="sr-only" htmlFor="newsletter-email">Seu e-mail</label><input className="h-13 w-full border border-clay/40 bg-transparent px-4 text-sm outline-none placeholder:opacity-60 focus:border-clay" id="newsletter-email" type="email" placeholder="seu@email.com" /></div><button type="submit" className="eyebrow h-13 bg-clay px-8 text-white transition-colors hover:bg-graphite">Cadastrar</button></form>
      </div>
    </section>
  );
}
