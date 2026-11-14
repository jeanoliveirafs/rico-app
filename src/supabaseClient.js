// Cliente Supabase do app RICO.
// Aponta para o Supabase self-hosted compartilhado e usa o schema `financas`
// (o schema `public` pertence ao CRM em produção — nunca usar).
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env?.VITE_SUPABASE_URL || 'https://crm.inovaautomatetech.online';
const key =
  import.meta.env?.VITE_SUPABASE_KEY ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  '';

if (!key) {
  console.warn('[rico] VITE_SUPABASE_KEY/VITE_SUPABASE_ANON_KEY não definidos no build.');
}

export const SUPABASE_URL = url;
export const SUPABASE_KEY = key;

export const supabaseClient = createClient(url, key, {
  db: { schema: 'public' },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabaseClient;
