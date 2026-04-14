-- Esquema SQL para o Aplicativo RICO
-- Execute este script no SQL Editor do seu painel do Supabase.

-- Tabela Profiles (Configurações Gerais do Usuário)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  balance numeric DEFAULT 0,
  streak integer DEFAULT 0,
  last_no_spurfluous text,
  theme text DEFAULT 'dark',
  budget_limits jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can fully manage their own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Trigger para criar profile automático ao registrar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tabela Transactions
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_id text UNIQUE NOT NULL, -- O 'id' utilizado pelo app frontend em string "Date.now()"
  type text NOT NULL, -- 'income' ou 'expense'
  amount numeric NOT NULL,
  description text,
  category text,
  date timestamp with time zone,
  recurring boolean DEFAULT false,
  recurring_from text -- id originario, se houver
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own transactions" ON transactions
  FOR ALL USING (auth.uid() = user_id);

-- Tabela Bills (Contas)
CREATE TABLE bills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_id text UNIQUE NOT NULL,
  name text NOT NULL,
  amount numeric NOT NULL,
  category text,
  due_day integer,
  month text,
  paid boolean DEFAULT false
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own bills" ON bills
  FOR ALL USING (auth.uid() = user_id);

-- Tabela Debts (Dívidas)
CREATE TABLE debts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_id text UNIQUE NOT NULL,
  creditor text NOT NULL,
  amount numeric NOT NULL,
  due_date date,
  note text,
  paid boolean DEFAULT false
);

ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own debts" ON debts
  FOR ALL USING (auth.uid() = user_id);

-- Tabela Shopping List (Compras)
CREATE TABLE shopping_list (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_id text UNIQUE NOT NULL,
  name text NOT NULL,
  estimated_price numeric,
  reason text,
  priority text,
  ai_justification text,
  bought boolean DEFAULT false,
  bought_at timestamp with time zone
);

ALTER TABLE shopping_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own shopping list" ON shopping_list
  FOR ALL USING (auth.uid() = user_id);

-- Tabela Investments
CREATE TABLE investments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_id text UNIQUE NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  amount numeric NOT NULL,
  return_rate numeric,
  note text,
  date timestamp with time zone
);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own investments" ON investments
  FOR ALL USING (auth.uid() = user_id);

-- Tabela Balance History (Histórico do Saldo)
CREATE TABLE balance_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  date text NOT NULL, -- 'YYYY-MM-DD'
  value numeric NOT NULL,
  UNIQUE(user_id, date)
);

ALTER TABLE balance_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users fully manage own balance history" ON balance_history
  FOR ALL USING (auth.uid() = user_id);
