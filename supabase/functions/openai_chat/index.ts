// ============================================================
// RICO — IA com login obrigatório, plano verificado e limite de uso
//
// ESTA É A PEÇA QUE FECHA O FURO: sem ela, o endpoint de IA aceita
// qualquer requisição e o custo dos tokens fica com você.
//
// Secrets usados (Supabase → Edge Functions → Secrets):
//   OPENAI_API_KEY                       (obrigatório)
//   SUPABASE_URL, SUPABASE_ANON_KEY,     (já existem por padrão)
//   SUPABASE_SERVICE_ROLE_KEY
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

// ── Cotas por situação do plano ─────────────────────────────────
// intelligent + active  → 300/mês (40/dia)
// intelligent + trialing → 20/mês  (8/dia)
// essential             → sem IA
const LIMITS: Record<string, { month: number; day: number }> = {
  intelligent_active: { month: 300, day: 40 },
  intelligent_trial:  { month: 20,  day: 8  },
  essential:          { month: 0,   day: 0  },
  none:               { month: 0,   day: 0  },
};

const MAX_TOKENS_HARD_CAP = 1500; // o teto é decidido no servidor, não no navegador

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') return json({ error: { message: 'Método não permitido' } }, 405);

  // ── 1. Exige usuário autenticado ──────────────────────────────
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return json({ error: { code: 'auth_required', message: 'Faça login para usar a IA.' } }, 401);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return json({ error: { code: 'auth_required', message: 'Sessão inválida. Entre novamente.' } }, 401);
  }
  const userId = userData.user.id;

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // ── 2. Descobre a situação real do plano (no banco, não no navegador) ──
  const { data: sub } = await admin
    .from('subscriptions')
    .select('plan_key, status, current_period_end')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let key = 'none';
  if (sub) {
    const endOk = !sub.current_period_end || new Date(sub.current_period_end) > new Date();
    if (sub.plan_key === 'intelligent' && sub.status === 'trialing' && endOk) key = 'intelligent_trial';
    else if (sub.plan_key === 'intelligent' && sub.status === 'active') key = 'intelligent_active';
    else if (sub.plan_key === 'essential' && sub.status === 'active') key = 'essential';
  }

  const limit = LIMITS[key] ?? LIMITS.none;

  if (limit.month <= 0) {
    const msg = key === 'essential'
      ? 'O assistente de IA está no plano Inteligente. Faça upgrade para usá-lo.'
      : 'Seu acesso à IA expirou. Escolha o plano Inteligente para continuar.';
    return json({ error: { code: 'plan_required', message: msg }, plan: key }, 402);
  }

  // ── 3. Consome a cota (atômico, no banco) ─────────────────────
  const { data: quota, error: quotaErr } = await admin.rpc('consume_ai_quota', {
    p_user: userId,
    p_month_limit: limit.month,
    p_day_limit: limit.day,
  });

  if (quotaErr) {
    console.error('consume_ai_quota:', quotaErr);
    return json({ error: { code: 'quota_error', message: 'Não consegui validar seu uso agora. Tente de novo.' } }, 500);
  }

  const q = Array.isArray(quota) ? quota[0] : quota;
  if (!q?.allowed) {
    const reason = q?.reason ?? 'month_limit';
    const msg = reason === 'day_limit'
      ? `Você atingiu o limite de ${limit.day} usos da IA hoje. Volte amanhã.`
      : `Você usou suas ${limit.month} interações de IA deste mês. O controle financeiro continua funcionando normalmente.`;
    return json({
      error: { code: reason === 'day_limit' ? 'day_limit' : 'month_limit', message: msg },
      usage: { month: q?.month_count ?? 0, monthLimit: limit.month },
    }, 429);
  }

  // ── 4. Chama a OpenAI ─────────────────────────────────────────
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: { message: 'Corpo da requisição inválido.' } }, 400);
  }

  const requested = Number(body.max_tokens);
  const maxTokens = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), MAX_TOKENS_HARD_CAP)
    : MAX_TOKENS_HARD_CAP;

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: typeof body.temperature === 'number' ? body.temperature : 0.7,
      messages: body.messages ?? [],
      max_tokens: maxTokens,
    }),
  });

  const data = await upstream.json();
  return json(data, upstream.status === 200 ? 200 : upstream.status);
});
