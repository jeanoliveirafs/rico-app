-- ============================================================
-- RICO — Limite de uso da IA + teste grátis
-- Rode DEPOIS de supabase_schema.sql e de supabase/billing.sql.
-- Idempotente: pode rodar mais de uma vez.
-- ============================================================

-- ------------------------------------------------------------
-- 1) CONTADOR DE USO DA IA (por mês e por dia)
-- ------------------------------------------------------------
create table if not exists public.ai_usage (
  user_id     uuid not null references auth.users(id) on delete cascade,
  period      text not null,                 -- 'YYYY-MM'
  month_count integer not null default 0,
  day_key     text,                          -- 'YYYY-MM-DD'
  day_count   integer not null default 0,
  primary key (user_id, period)
);

alter table public.ai_usage enable row level security;

drop policy if exists "Users can read own ai usage" on public.ai_usage;
create policy "Users can read own ai usage" on public.ai_usage
  for select using (auth.uid() = user_id);

-- Sem policy de escrita: só o service_role (Edge Functions) grava.

-- ------------------------------------------------------------
-- 2) CONSUMO ATÔMICO DA COTA
--    Chamada pela Edge Function com service_role.
--    Decide E incrementa na mesma transação (sem condição de corrida).
-- ------------------------------------------------------------
create or replace function public.consume_ai_quota(
  p_user        uuid,
  p_month_limit integer,
  p_day_limit   integer
)
returns table (allowed boolean, month_count integer, day_count integer, reason text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_period text := to_char(now(), 'YYYY-MM');
  v_day    text := to_char(now(), 'YYYY-MM-DD');
  v_row    public.ai_usage%rowtype;
begin
  if p_month_limit is null or p_month_limit <= 0 then
    return query select false, 0, 0, 'plan_required';
    return;
  end if;

  insert into public.ai_usage (user_id, period, month_count, day_key, day_count)
  values (p_user, v_period, 0, v_day, 0)
  on conflict (user_id, period) do nothing;

  select * into v_row from public.ai_usage
   where user_id = p_user and period = v_period
   for update;

  if v_row.day_key is distinct from v_day then
    v_row.day_count := 0;
    v_row.day_key := v_day;
  end if;

  if v_row.month_count >= p_month_limit then
    update public.ai_usage set day_key = v_row.day_key, day_count = v_row.day_count
     where user_id = p_user and period = v_period;
    return query select false, v_row.month_count, v_row.day_count, 'month_limit';
    return;
  end if;

  if v_row.day_count >= p_day_limit then
    return query select false, v_row.month_count, v_row.day_count, 'day_limit';
    return;
  end if;

  update public.ai_usage
     set month_count = v_row.month_count + 1,
         day_count   = v_row.day_count + 1,
         day_key     = v_day
   where user_id = p_user and period = v_period;

  return query select true, v_row.month_count + 1, v_row.day_count + 1, null::text;
end;
$$;

-- ------------------------------------------------------------
-- 3) TESTE GRÁTIS NO CADASTRO
--    Todo usuário novo entra no plano Inteligente em teste por 7 dias.
--    (o frontend e a Edge Function já tratam o status 'trialing')
--
--    Para NÃO dar teste, troque '7 days' por '0 days' e rode de novo.
-- ------------------------------------------------------------
create or replace function public.handle_new_subscription()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.subscriptions (user_id, plan_key, status, current_period_end)
  select new.id, 'intelligent', 'trialing', now() + interval '7 days'
  where not exists (
    select 1 from public.subscriptions where user_id = new.id
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_subscription on auth.users;
create trigger on_auth_user_created_subscription
  after insert on auth.users
  for each row execute procedure public.handle_new_subscription();

-- Backfill: usuários que já existem e ainda não têm assinatura ganham o teste.
-- Se NÃO quiser dar teste aos antigos, comente este bloco antes de rodar.
insert into public.subscriptions (user_id, plan_key, status, current_period_end)
select u.id, 'intelligent', 'trialing', now() + interval '7 days'
  from auth.users u
 where not exists (select 1 from public.subscriptions s where s.user_id = u.id);
