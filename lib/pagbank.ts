type CheckoutPayload = Record<string, unknown>;

type PagBankCheckoutResponse = {
  id?: string;
  reference_id?: string;
  links?: Array<{ rel?: string; href?: string; method?: string }>;
  error_messages?: Array<{ code?: string; description?: string; parameter_name?: string }>;
};

export async function createPagBankCheckout(payload: CheckoutPayload) {
  const runtimeEnv = await getRuntimeEnv();
  const token = await getPagBankToken(runtimeEnv);
  const apiUrl = readString(runtimeEnv.PAGBANK_API_URL) ?? process.env.PAGBANK_API_URL ?? "https://sandbox.api.pagseguro.com";
  if (!token) throw new PagBankConfigurationError("O token Sandbox do PagBank ainda não foi configurado.");

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json() as PagBankCheckoutResponse;
  if (!response.ok) {
    const description = result.error_messages?.map((error) => error.description).filter(Boolean).join("; ");
    throw new PagBankApiError(description || "O PagBank recusou a criação do checkout.", response.status);
  }

  const paymentUrl = result.links?.find((link) => link.rel === "PAY")?.href;
  if (!result.id || !paymentUrl) throw new PagBankApiError("O PagBank não devolveu um link de pagamento válido.", 502);
  return { checkoutId: result.id, paymentUrl };
}

export async function getPagBankToken(runtimeEnv?: Record<string, unknown>) {
  const environment = runtimeEnv ?? await getRuntimeEnv();
  const token = readString(environment.PAGBANK_TOKEN) ?? process.env.PAGBANK_TOKEN;
  if (!token) throw new PagBankConfigurationError("O token Sandbox do PagBank ainda não foi configurado.");
  return token;
}

async function getRuntimeEnv(): Promise<Record<string, unknown>> {
  try {
    const cloudflare = await import("cloudflare:workers");
    return cloudflare.env;
  } catch {
    return {};
  }
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export class PagBankConfigurationError extends Error {}

export class PagBankApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
