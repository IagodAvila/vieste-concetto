"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Feedback = { form: "login" | "register" | "recovery"; message: string } | null;

const inputClass = "mt-2 h-13 w-full border border-border bg-background px-4 text-sm normal-case outline-none transition-colors focus:border-clay";

export function AccountAccess() {
  const [feedback, setFeedback] = useState<Feedback>(null);

  function submit(event: FormEvent<HTMLFormElement>, form: "login" | "register") {
    event.preventDefault();
    setFeedback({
      form,
      message: form === "login"
        ? "O acesso à conta será liberado assim que a autenticação da loja for conectada."
        : "O cadastro será liberado assim que a autenticação da loja for conectada.",
    });
  }

  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-16 md:grid-cols-2 md:px-10 md:py-24">
      <section className="border border-border bg-background p-6 md:p-10" aria-labelledby="login-title">
        <p className="eyebrow text-clay">Já sou cliente</p>
        <h2 className="mt-3 font-serif text-7xl" id="login-title">Entrar</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Acesse seus pedidos, endereços e preferências.</p>

        <form className="mt-8 space-y-5" onSubmit={(event) => submit(event, "login")}>
          <label className="block text-xs font-medium uppercase tracking-wider">E-mail
            <input className={inputClass} autoComplete="email" name="email" required type="email" />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wider">Senha
            <input className={inputClass} autoComplete="current-password" minLength={6} name="password" required type="password" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground"><input className="accent-clay" name="remember" type="checkbox" />Lembrar de mim</label>
            <button className="text-sm text-clay underline underline-offset-4" onClick={() => setFeedback({ form: "recovery", message: "A recuperação de senha será ativada com a autenticação da loja." })} type="button">Esqueci minha senha</button>
          </div>
          <button className="eyebrow w-full bg-clay px-8 py-4 text-white transition-colors hover:bg-graphite" type="submit">Entrar na minha conta</button>
          {(feedback?.form === "login" || feedback?.form === "recovery") && <p className="border-l-2 border-clay pl-3 text-sm leading-relaxed text-clay" role="status">{feedback.message}</p>}
        </form>
      </section>

      <section className="bg-peach p-6 text-graphite md:p-10" aria-labelledby="register-title">
        <p className="eyebrow text-clay">Primeira compra</p>
        <h2 className="mt-3 font-serif text-7xl text-clay" id="register-title">Criar conta</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed">Cadastre-se para tornar sua experiência na Vieste mais simples.</p>

        <form className="mt-8 space-y-5" onSubmit={(event) => submit(event, "register")}>
          <label className="block text-xs font-medium uppercase tracking-wider">Nome completo
            <input className={inputClass} autoComplete="name" name="name" required type="text" />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wider">E-mail
            <input className={inputClass} autoComplete="email" name="email" required type="email" />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wider">Crie uma senha
            <input className={inputClass} autoComplete="new-password" minLength={6} name="password" required type="password" />
          </label>
          <label className="flex items-start gap-3 text-xs leading-relaxed"><input className="mt-0.5 accent-clay" required type="checkbox" />Li e aceito a Política de Privacidade e os Termos de Uso.</label>
          <button className="eyebrow w-full bg-forest px-8 py-4 text-white transition-colors hover:bg-graphite" type="submit">Criar minha conta</button>
          {feedback?.form === "register" && <p className="border-l-2 border-clay pl-3 text-sm leading-relaxed text-clay" role="status">{feedback.message}</p>}
        </form>
      </section>
    </div>
  );
}
