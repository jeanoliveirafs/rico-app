import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

const activeEvents = new Set(['CHECKOUT_PAID', 'SUBSCRIPTION_CREATED', 'SUBSCRIPTION_UPDATED', 'PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED'])
const inactiveEvents = new Set(['SUBSCRIPTION_DELETED', 'SUBSCRIPTION_INACTIVATED', 'PAYMENT_OVERDUE', 'PAYMENT_REFUNDED', 'PAYMENT_DELETED'])

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Método não permitido' }, 405)
  const expectedToken = Deno.env.get('ASAAS_WEBHOOK_TOKEN')
  if (expectedToken && req.headers.get('asaas-access-token') !== expectedToken) return json({ error: 'Webhook não autorizado' }, 401)

  try {
    const payload = await req.json()
    const eventName = String(payload.event || '')
    const eventId = String(payload.id || `${eventName}:${payload.dateCreated || Date.now()}`)
    const object = payload.payment || payload.subscription || payload.checkout || payload.object || {}
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { error: eventError } = await supabase.from('asaas_webhook_events').insert({ event_id: eventId, event_name: eventName })
    if (eventError?.code === '23505') return json({ received: true, duplicate: true })
    if (eventError) return json({ error: 'Não foi possível registrar o evento' }, 500)

    let userId = object.externalReference?.split(':')[0]
    if (!userId && object.customer) {
      const { data } = await supabase.from('subscriptions').select('user_id').eq('asaas_customer_id', object.customer).maybeSingle()
      userId = data?.user_id
    }
    if (!userId) return json({ received: true, ignored: 'usuário não identificado' })

    const planFromReference = object.externalReference?.split(':')[1]
    const status = activeEvents.has(eventName) ? 'active' : inactiveEvents.has(eventName) ? (eventName === 'PAYMENT_OVERDUE' ? 'past_due' : 'canceled') : undefined
    const patch: Record<string, unknown> = { user_id: userId }
    if (status) patch.status = status
    if (planFromReference) patch.plan_key = planFromReference
    if (object.customer) patch.asaas_customer_id = object.customer
    if (object.subscription || eventName.startsWith('SUBSCRIPTION_')) patch.asaas_subscription_id = object.subscription || object.id
    if (object.checkout || eventName.startsWith('CHECKOUT_')) patch.asaas_checkout_id = object.checkout || object.id
    if (object.nextDueDate) patch.current_period_end = object.nextDueDate

    const { data: existingSubscription } = await supabase.from('subscriptions').select('id').eq('user_id', userId).maybeSingle()
    if (existingSubscription?.id) await supabase.from('subscriptions').update(patch).eq('id', existingSubscription.id)
    else await supabase.from('subscriptions').insert(patch)
    return json({ received: true })
  } catch (error) {
    console.error(error)
    return json({ error: 'Erro ao processar webhook' }, 500)
  }
})
