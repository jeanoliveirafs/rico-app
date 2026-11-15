-- rollback T31 trial: restaura trialing/current_period_end pelo backup (subscriptions-pre.csv) se precisar
begin;
drop function if exists public.get_access_status();
drop trigger if exists on_auth_user_created_subscription on auth.users;
create or replace function public.handle_new_subscription() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  insert into public.subscriptions (user_id, plan_key, status, current_period_end)
  select new.id, 'intelligent', 'trialing', now() + interval '7 days'
  where not exists (select 1 from public.subscriptions where user_id = new.id);
  return new;
end; $$;
alter table public.subscriptions drop column if exists trial_ends_at;
commit;
notify pgrst, 'reload schema';
