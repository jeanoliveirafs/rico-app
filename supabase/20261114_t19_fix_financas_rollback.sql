-- Rollback de 20261114_t19_fix_financas.sql
-- ATENÇÃO: devolve o estado anterior das policies/grants.

begin;
do $$ declare t text; begin foreach t in array array['transactions','bills','debts','shopping_list','investments','balance_history','profiles'] loop execute format('drop policy if exists t19_dono on public.%I', t); end loop; end $$;
drop policy if exists t19_leitura_dono on public.subscriptions; drop policy if exists t19_leitura_dono on public.ai_usage;
drop trigger if exists on_auth_user_created on auth.users;
commit;
-- depois: psql -d financas -f financas-grants-before-213124.sql (devolve os grants antigos, inclusive do anon)
