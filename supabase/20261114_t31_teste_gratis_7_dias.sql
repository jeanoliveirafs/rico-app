-- T31 (pedido do Jean 14/11): teste grátis de 7 dias no Finanças, guardado no servidor
begin;
alter table public.subscriptions add column if not exists trial_ends_at timestamptz;

create or replace function public.handle_new_subscription() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.subscriptions (user_id, plan_key, status, trial_ends_at, current_period_end)
  select new.id, 'intelligent', 'trialing', now() + interval '7 days', now() + interval '7 days'
  where not exists (select 1 from public.subscriptions where user_id = new.id);
  return new;
end $$;
drop trigger if exists on_auth_user_created_subscription on auth.users;
create trigger on_auth_user_created_subscription after insert on auth.users
  for each row execute function public.handle_new_subscription();

-- usuários existentes: 7 dias a partir de agora (quem já paga, status active, não muda)
update public.subscriptions
   set status = 'trialing', trial_ends_at = now() + interval '7 days', current_period_end = now() + interval '7 days', updated_at = now()
 where status <> 'active';
insert into public.subscriptions (user_id, plan_key, status, trial_ends_at, current_period_end)
select u.id, 'intelligent', 'trialing', now() + interval '7 days', now() + interval '7 days'
  from auth.users u where not exists (select 1 from public.subscriptions s where s.user_id = u.id);

-- status de acesso calculado no servidor (relógio do servidor, não do navegador)
create or replace function public.get_access_status()
returns table (status text, plan_key text, trial_ends_at timestamptz, days_left integer, has_access boolean, server_now timestamptz)
language sql stable security definer set search_path = public as $$
  select s.status, s.plan_key, s.trial_ends_at,
         case when s.status = 'trialing' and s.trial_ends_at is not null
              then greatest(0, ceil(extract(epoch from (s.trial_ends_at - now())) / 86400.0))::int end,
         (s.status = 'active') or (s.status = 'trialing' and s.trial_ends_at > now()),
         now()
    from public.subscriptions s
   where s.user_id = auth.uid()
   order by s.updated_at desc limit 1;
$$;
revoke all on function public.get_access_status() from public, anon;
grant execute on function public.get_access_status() to authenticated;
commit;
notify pgrst, 'reload schema';
