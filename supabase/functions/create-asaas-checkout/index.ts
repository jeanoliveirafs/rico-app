import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const plans = {
  essential: { name: 'Rico Essencial', description: 'Controle financeiro completo', monthly: 9.90, annual: 99.90 },
  intelligent: { name: 'Rico Inteligente', description: 'Controle financeiro + assistente de IA', monthly: 19.90, annual: 199.90 },
} as const

type PlanKey = keyof typeof plans

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return response({ error: 'Método não permitido' }, 405)

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) return response({ error: 'Não autenticado' }, 401)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const asaasKey = Deno.env.get('ASAAS_API_KEY')
    const asaasUrl = (Deno.env.get('ASAAS_API_URL') || 'https://sandbox.asaas.com/api/v3').replace(/\/$/, '')
    const siteUrl = (Deno.env.get('SITE_URL') || 'https://jeanoliveirafs.github.io/rico-app').replace(/\/$/, '')
    if (!asaasKey) return response({ error: 'Asaas ainda não configurado no Supabase.' }, 503)

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } })
    const admin = createClient(supabaseUrl, serviceKey)
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user?.email) return response({ error: 'Sessão inválida' }, 401)

    const body = await req.json().catch(() => ({}))
    const plan = body.plan as PlanKey
    const billing = body.billing === 'annual' ? 'annual' : 'monthly'
    if (!plan || !plans[plan]) return response({ error: 'Plano inválido' }, 400)

    const { data: existing } = await admin.from('subscriptions')
      .select('id,asaas_customer_id')
      .eq('user_id', user.id)
      .in('status', ['pending', 'trialing', 'active', 'past_due'])
      .maybeSingle()

    let customerId = existing?.asaas_customer_id
    if (!customerId) {
      const customerResponse = await fetch(`${asaasUrl}/customers`, {
        method: 'POST',
        headers: { access_token: asaasKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name: user.user_metadata?.name || user.email.split('@')[0], externalReference: user.id }),
      })
      const customer = await customerResponse.json()
      if (!customerResponse.ok) return response({ error: customer.errors?.[0]?.description || 'Não foi possível criar o cliente no Asaas.' }, 502)
      customerId = customer.id
    }

    const selected = plans[plan]
    const amount = billing === 'annual' ? selected.annual : selected.monthly
    const cycle = billing === 'annual' ? 'YEARLY' : 'MONTHLY'
    const checkoutResponse = await fetch(`${asaasUrl}/checkouts`, {
      method: 'POST',
      headers: { access_token: asaasKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        billingTypes: ['CREDIT_CARD'],
        chargeTypes: ['RECURRENT'],
        minutesToExpire: 60,
        customer: customerId,
        externalReference: `${user.id}:${plan}`,
        callback: { successUrl: `${siteUrl}/?checkout=success`, cancelUrl: `${siteUrl}/?checkout=cancelled`, expiredUrl: `${siteUrl}/?checkout=expired` },
        items: [{ name: selected.name, description: selected.description, quantity: 1, value: amount }],
        subscription: { cycle },
      }),
    })
    const checkout = await checkoutResponse.json()
    if (!checkoutResponse.ok) return response({ error: checkout.errors?.[0]?.description || 'Não foi possível criar o checkout.' }, 502)

    const subscriptionPatch = { user_id: user.id, plan_key: plan, status: 'pending', asaas_customer_id: customerId, asaas_checkout_id: checkout.id }
    if (existing?.id) await admin.from('subscriptions').update(subscriptionPatch).eq('id', existing.id)
    else await admin.from('subscriptions').insert(subscriptionPatch)

    return response({ checkoutUrl: checkout.link || checkout.url, checkoutId: checkout.id, plan, billing })
  } catch (error) {
    console.error(error)
    return response({ error: 'Erro interno ao preparar o checkout.' }, 500)
  }
})
