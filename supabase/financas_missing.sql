-- RICO / FINANCAS — tabelas faltantes no schema `financas`
-- NUNCA tocar no schema public (CRM em produção).
set search_path to financas, public;

-- ============ TRANSACTIONS ============
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_id text unique not null,
  type text not null,
  amount numeric not null,
  description text,
  category text,
  date timestamptz,
  recurring boolean default false,
  recurring_from text,
  created_at timestamptz not null default now()
);
alter table transactions enable row level security;
drop policy if exists "Users fully manage own transactions" on transactions;
create policy "Users fully manage own transactions" on transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ BILLS ============
create table if not exists bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_id text unique not null,
  name text not null,
  amount numeric not null,
  category text,
  due_day integer,
  month text,
  paid boolean default false,
  created_at timestamptz not null default now()
);
alter table bills enable row level security;
drop policy if exists "Users fully manage own bills" on bills;
create policy "Users fully manage own bills" on bills
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ DEBTS ============
create table if not exists debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_id text unique not null,
  creditor text not null,
  amount numeric not null,
  due_date date,
  note text,
  paid boolean default false,
  created_at timestamptz not null default now()
);
alter table debts enable row level security;
drop policy if exists "Users fully manage own debts" on debts;
create policy "Users fully manage own debts" on debts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ SHOPPING_LIST ============
create table if not exists shopping_list (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_id text unique not null,
  name text not null,
  estimated_price numeric,
  reason text,
  priority text,
  ai_justification text,
  bought boolean default false,
  bought_at timestamptz,
  created_at timestamptz not null default now()
);
alter table shopping_list enable row level security;
drop policy if exists "Users fully manage own shopping list" on shopping_list;
create policy "Users fully manage own shopping list" on shopping_list
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ INVESTMENTS ============
create table if not exists investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_id text unique not null,
  type text not null,
  name text not null,
  amount numeric not null,
  return_rate numeric,
  note text,
  date timestamptz,
  created_at timestamptz not null default now()
);
alter table investments enable row level security;
drop policy if exists "Users fully manage own investments" on investments;
create policy "Users fully manage own investments" on investments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ BALANCE_HISTORY ============
create table if not exists balance_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date text not null,
  value numeric not null,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);
alter table balance_history enable row level security;
drop policy if exists "Users fully manage own balance history" on balance_history;
create policy "Users fully manage own balance history" on balance_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ GRANTS (schema + tabelas) ============
grant usage on schema financas to anon, authenticated, service_role;
grant all on all tables in schema financas to anon, authenticated, service_role;
grant all on all routines in schema financas to anon, authenticated, service_role;
grant all on all sequences in schema financas to anon, authenticated, service_role;
alter default privileges in schema financas grant all on tables to anon, authenticated, service_role;
alter default privileges in schema financas grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema financas grant all on routines to anon, authenticated, service_role;
