import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { profileModalHTML } from './profile_view.mjs';

const ler = (nome) => readFileSync(new URL(`../${nome}`, import.meta.url), 'utf8');

const perfil = profileModalHTML({
  email: 'jean@exemplo.com',
  planKey: 'intelligent',
  status: 'Teste grátis · 5 dias restantes',
  theme: 'dark',
  version: '1.1.0',
  brand: 'Graniva',
});

test('perfil mostra conta, plano e status', () => {
  assert.match(perfil, /jean@exemplo\.com/);
  assert.match(perfil, /Graniva Inteligente/);
  assert.match(perfil, /Teste grátis · 5 dias restantes/);
});

test('perfil tem as ações de configuração', () => {
  assert.match(perfil, /id="pf-pass"/);
  assert.match(perfil, /id="pf-pass2"/);
  assert.match(perfil, /salvarSenha\(\)/);
  assert.match(perfil, /toggleTheme\(\);om\('profile'\)/);
  assert.match(perfil, /openPricing\('intelligent'\)/);
  assert.match(perfil, /doLogout\(\)/);
});

test('perfil alterna o rótulo do tema', () => {
  const claro = profileModalHTML({ email: 'a@b.com', theme: 'light', brand: 'Graniva' });
  assert.match(claro, /🌙 Usar tema escuro/);
  assert.match(perfil, /☀️ Usar tema claro/);
});

test('perfil escapa o e-mail', () => {
  const perigoso = profileModalHTML({ email: '<img src=x onerror=alert(1)>', brand: 'Graniva' });
  assert.doesNotMatch(perigoso, /<img src=x/);
  assert.match(perigoso, /&lt;img src=x/);
});

test('a engrenagem abre o modal de perfil e tipo desconhecido não abre vazio', () => {
  const main = ler('main.js');
  assert.match(main, /type==='profile'\)mc\.innerHTML=mProfile\(\)/);
  assert.match(main, /else return; \/\/ tipo desconhecido/);
  assert.match(main, /async function salvarSenha\(\)/);
});

test('a marca antiga saiu das telas e do manifest', () => {
  for (const arquivo of ['index.html', 'manifest.json']) {
    const texto = ler(arquivo);
    assert.doesNotMatch(texto, /\bRICO\b|\bRico\b/, `marca antiga em ${arquivo}`);
    assert.match(texto, /GRANIVA|Graniva/);
  }
  const main = ler('main.js');
  assert.doesNotMatch(main, /Você é RICO|RICO —|Rico Essencial|Rico Inteligente/);
});

test('as chaves locais antigas continuam migrando para as novas', () => {
  const main = ler('main.js');
  for (const chave of ['rico_v5', 'rico_saved_email', 'rico_sync_queue', 'rico_pending_plan']) {
    assert.ok(main.includes(chave), `migração ausente para ${chave}`);
  }
  for (const chave of ['graniva_v5', 'graniva_saved_email', 'graniva_sync_queue', 'graniva_pending_plan']) {
    assert.ok(main.includes(chave), `chave nova ausente: ${chave}`);
  }
});
