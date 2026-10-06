# Configuração do billing do Rico com Asaas

## Planos

- `essential`: Rico Essencial — R$ 9,90/mês ou R$ 99,90/ano. Controle financeiro sem assistente de IA.
- `intelligent`: Rico Inteligente — R$ 19,90/mês ou R$ 199,90/ano. Controle financeiro + assistente de IA.

Os valores são a hipótese inicial de lançamento e podem ser ajustados antes de criar os produtos definitivos.

## 1. Banco

Execute **nesta ordem**, no SQL Editor do projeto Supabase:

1. `supabase_schema.sql` (tabelas do app — se ainda não rodou)
2. `supabase/billing.sql` (assinaturas + eventos de webhook)
3. `supabase/ai_access.sql` (contador de uso da IA + teste grátis de 7 dias)

## 2. Edge Functions

```bash
supabase functions deploy create-asaas-checkout
supabase functions deploy asaas-webhook --no-verify-jwt
supabase functions deploy openai_chat --no-verify-jwt
```

> `openai_chat` é a função que fala com a OpenAI. **Ela precisa ser deployada** — sem isso o endpoint continua aberto e qualquer pessoa usa seus tokens de graça.

Configure os segredos no projeto Supabase:

```bash
supabase secrets set ASAAS_API_KEY=...
supabase secrets set ASAAS_API_URL=https://sandbox.asaas.com/api/v3
supabase secrets set ASAAS_WEBHOOK_TOKEN=...
supabase secrets set SITE_URL=https://jeanoliveirafs.github.io/rico-app
supabase secrets set OPENAI_API_KEY=...
```

Use `https://api.asaas.com/api/v3` apenas quando sair do sandbox.

⚠️ **`SITE_URL` precisa ser a URL real do app publicado.** Ele monta os links de retorno do checkout (`successUrl`, `cancelUrl`, `expiredUrl`). Se ficar apontando para um domínio que não existe, o cliente paga e cai numa página de erro.

## 3. Webhook no Asaas

Cadastre a URL:

`https://SEU_PROJECT_REF.supabase.co/functions/v1/asaas-webhook`

Envie o token configurado em `ASAAS_WEBHOOK_TOKEN`. Acompanhe no mínimo eventos de checkout, assinatura e cobrança. O webhook é a fonte de verdade; o redirecionamento de sucesso não libera o plano sozinho.

## 4. Fluxo de acesso

1. Usuário escolhe plano e ciclo.
2. O frontend chama `create-asaas-checkout` com a sessão Supabase.
3. A função cria/recupera o cliente Asaas e retorna o link hospedado.
4. O usuário paga no Asaas.
5. Asaas envia webhook para `asaas-webhook`.
6. A função atualiza `subscriptions` com status e plano.
7. O frontend lê apenas a própria assinatura e libera a IA se `plan_key = intelligent` e status `active` ou `trialing`.

Nunca coloque `ASAAS_API_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` no frontend. O cliente deve poder ler sua assinatura, mas não criar ou alterar linhas da tabela `subscriptions`.

## 5. Limite de uso da IA (anti-abuso)

Sem isso, um único usuário pode consumir todo o seu crédito da OpenAI em uma noite. A cota é decidida **no servidor**, dentro da Edge Function `openai_chat`, com contagem no banco (`ai_usage` + função `consume_ai_quota`).

| Situação | Cota mensal | Cota diária |
|---|---|---|
| Inteligente ativo | 300 usos | 40 usos |
| Teste grátis (7 dias) | 20 usos | 8 usos |
| Essencial (sem IA) | 0 | 0 |

Para mudar os limites: objeto `LIMITS` em `supabase/functions/openai_chat/index.ts` (servidor) e a constante `AI_MONTH_LIMIT` em `main.js` (apenas exibição).

A `openai_chat` também **trava o `max_tokens` no servidor** — antes ele vinha do navegador, o que permitia pedir respostas gigantes para inflar o custo.

## 6. Teste grátis

`supabase/ai_access.sql` cria um teste de 7 dias no plano Inteligente para cada novo cadastro (status `trialing`), o que mantém honesto o botão "Começar grátis" da landing. Ao acabar o prazo, o acesso à IA cai sozinho e o app mostra o convite para assinar.

Para não oferecer teste, troque `interval '7 days'` por `interval '0 days'` no arquivo e rode de novo.

## Antes do primeiro pagamento real

- Testar no sandbox com um usuário de teste.
- Confirmar webhook `CHECKOUT_PAID` e `SUBSCRIPTION_CREATED`.
- Testar atraso, cancelamento e reembolso.
- Revisar termos, política de privacidade, renovação e cancelamento.
- Trocar `ASAAS_API_URL` para produção somente depois dos testes.

## Referências oficiais

- [Checkout com assinatura recorrente](https://docs.asaas.com/docs/checkout-com-assinatura-recorrente)
- [Criar novo Checkout](https://docs.asaas.com/reference/criar-novo-checkout)
- [Webhooks do Asaas](https://docs.asaas.com/docs/webhooks)
