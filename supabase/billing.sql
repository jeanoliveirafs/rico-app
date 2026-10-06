-- Billing do RICO com Asaas
-- Execute depois de supabase_schema.sql no SQL Editor do Supabase.

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_key text NOT NULL CHECK (plan_key IN ('essential', 'intelligent')),
  status text NOT NULL DEFAULT 'inactive' CHECK (status IN ('pending','trialing','active','past_due','canceled','expired','inactive')),
  asaas_customer_id text,
  asaas_checkout_id text,
  asaas_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_active_user_idx
  ON public.subscriptions(user_id)
  WHERE status IN ('pending','trialing','active','past_due');
CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_asaas_subscription_idx
  ON public.subscriptions(asaas_subscription_id)
  WHERE asaas_subscription_id IS NOT NULL;

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can read own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- INSERT/UPDATE/DELETE ficam reservados ao service_role usado pela Edge Function.

CREATE TABLE IF NOT EXISTS public.asaas_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text UNIQUE NOT NULL,
  event_name text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.asaas_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.touch_subscription_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS subscriptions_touch_updated_at ON public.subscriptions;
CREATE TRIGGER subscriptions_touch_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE PROCEDURE public.touch_subscription_updated_at();
