"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Feedback = { form: "login" | "register" | "recovery"; message: string } | null;

const inputClass = "mt-2 h-13 w-full border border-border bg-background px-4 text-sm normal-case outline-none transition-colors focus:border-clay";

export function AccountAccess() {
  const [mode, setMode] = useState<"login" | "register">("login");
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

  function changeMode(nextMode: "login" | "register") {
    setMode(nextMode);
    setFeedback(null);
  }

  return (
    <section className="border border-border bg-background shadow-[0_24px_70px_rgba(64,64,64,.08)]" aria-label="Acesso à conta">
      <div className="grid grid-cols-2 border-b border-border" role="tablist" aria-label="Escolha uma forma de acesso">
        <button className={`eyebrow relative px-4 py-6 transition-colors ${mode === "login" ? "text-clay" : "text-muted-foreground hover:text-graphite"}`} onClick={() => changeMode("login")} role="tab" aria-selected={mode === "login"} type="button">Entrar<span className={`absolute inset-x-0 bottom-0 h-0.5 bg-clay transition-transform duration-300 ${mode === "login" ? "scale-x-100" : "scale-x-0"}`} /></button>
        <button className={`eyebrow relative px-4 py-6 transition-colors ${mode === "register" ? "text-clay" : "text-muted-foreground hover:text-graphite"}`} onClick={() => changeMode("register")} role="tab" aria-selected={mode === "register"} type="button">Criar conta<span className={`absolute inset-x-0 bottom-0 h-0.5 bg-clay transition-transform duration-300 ${mode === "register" ? "scale-x-100" : "scale-x-0"}`} /></button>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        {mode === "login" ? (
          <div role="tabpanel">
            <p className="eyebrow text-clay">Bem-vinda de volta</p>
            <h2 className="mt-3 font-serif text-7xl leading-none" id="login-title">Acessar conta</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Entre para consultar pedidos, endereços e preferências.</p>
            <form className="mt-9 space-y-5" onSubmit={(event) => submit(event, "login")}>
              <Field autoComplete="email" label="E-mail" name="email" type="email" />
              <Field autoComplete="current-password" label="Senha" minLength={6} name="password" type="password" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-muted-foreground"><input className="h-4 w-4 accent-clay" name="remember" type="checkbox" />Lembrar de mim</label>
                <button className="text-sm text-clay underline underline-offset-4 transition-colors hover:text-graphite" onClick={() => setFeedback({ form: "recovery", message: "A recuperação de senha será ativada com a autenticação da loja." })} type="button">Esqueci minha senha</button>
              </div>
              <button className="button-primary eyebrow w-full px-8 py-4" type="submit">Entrar na minha conta</button>
              {(feedback?.form === "login" || feedback?.form === "recovery") && <FeedbackMessage message={feedback.message} />}
            </form>
          </div>
        ) : (
          <div role="tabpanel">
            <p className="eyebrow text-clay">Primeira compra</p>
            <h2 className="mt-3 font-serif text-7xl leading-none" id="register-title">Criar minha conta</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Cadastre-se para tornar sua experiência na Vieste mais rápida.</p>
            <form className="mt-9 space-y-5" onSubmit={(event) => submit(event, "register")}>
              <Field autoComplete="name" label="Nome completo" name="name" type="text" />
              <Field autoComplete="email" label="E-mail" name="email" type="email" />
              <Field autoComplete="new-password" label="Crie uma senha" minLength={6} name="password" type="password" />
              <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"><input className="mt-0.5 h-4 w-4 shrink-0 accent-clay" required type="checkbox" />Li e aceito a Política de Privacidade e os Termos de Uso.</label>
              <button className="button-primary eyebrow w-full px-8 py-4" type="submit">Criar minha conta</button>
              {feedback?.form === "register" && <FeedbackMessage message={feedback.message} />}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ autoComplete, label, minLength, name, type }: { autoComplete: string; label: string; minLength?: number; name: string; type: string }) {
  return <label className="block text-xs font-medium uppercase tracking-wider">{label}<input className={inputClass} autoComplete={autoComplete} minLength={minLength} name={name} required type={type} /></label>;
}

function FeedbackMessage({ message }: { message: string }) {
  return <p className="border-l-2 border-clay bg-peach-soft px-4 py-3 text-sm leading-relaxed text-clay" role="status">{message}</p>;
}
