-- T19 (14/11/2026): correções de RLS/permissões aplicadas no banco durante o teste dos projetos.
-- Versionado a pedido do GROK-CEO (ordem T-016) para o que foi rodado na VPS ficar registrado no repositório.
-- Rollback em: 20261114_t19_fix_financas_rollback.sql

begin;
-- políticas por dono (do repo supabase_schema.sql / financas_missing.sql), com WITH CHECK explícito
do $$ declare t text; begin
  foreach t in array array['transactions','bills','debts','shopping_list','investments','balance_history'] loop
    execute format('drop policy if exists t19_dono on public.%I', t);
    execute format('create policy t19_dono on public.%I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;
drop policy if exists t19_dono on public.profiles;
create policy t19_dono on public.profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists t19_leitura_dono on public.subscriptions;
create policy t19_leitura_dono on public.subscriptions for select to authenticated using (auth.uid() = user_id);
drop policy if exists t19_leitura_dono on public.ai_usage;
create policy t19_leitura_dono on public.ai_usage for select to authenticated using (auth.uid() = user_id);
-- anon sem acesso a nada; authenticated só o necessário
revoke all on all tables in schema public from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;
revoke insert, update, delete on public.subscriptions, public.ai_usage, public.asaas_webhook_events from authenticated;
revoke select on public.asaas_webhook_events from authenticated;
revoke execute on function public.consume_ai_quota(uuid,integer,integer) from anon, authenticated, public;
-- perfil automático no cadastro (repo: on_auth_user_created)
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $f$
begin insert into public.profiles (id) values (new.id) on conflict (id) do nothing; return new; end; $f$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
commit;
