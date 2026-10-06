# Configuração do billing do Rico com Asaas

## Planos

- `essential`: Rico Essencial — R$ 9,90/mês ou R$ 99,90/ano. Controle financeiro sem assistente de IA.
- `intelligent`: Rico Inteligente — R$ 19,90/mês ou R$ 199,90/ano. Controle financeiro + assistente de IA.

Os valores são a hipótese inicial de lançamento e podem ser ajustados antes de criar os produtos definitivos.

## 1. Banco

Execute `supabase/billing.sql` no SQL Editor do projeto Supabase.

## 2. Edge Functions

```bash
supabase functions deploy create-asaas-checkout
supabase functions deploy asaas-webhook --no-verify-jwt
```

Configure os segredos no projeto Supabase:

```bash
supabase secrets set ASAAS_API_KEY=...
supabase secrets set ASAAS_API_URL=https://sandbox.asaas.com/api/v3
supabase secrets set ASAAS_WEBHOOK_TOKEN=...
supabase secrets set SITE_URL=https://seu-dominio.vercel.app
```

Use `https://api.asaas.com/api/v3` apenas quando sair do sandbox.

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
