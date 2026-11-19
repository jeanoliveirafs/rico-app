// Markup do modal "Perfil e configurações".
// Fica em módulo separado para poder ser testado sem DOM.
export function profileModalHTML({
  email = '',
  planKey = 'essential',
  status = '',
  theme = 'dark',
  version = '1.1.0',
  brand = 'Graniva',
} = {}) {
  const seguro = (v) => String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const plano = planKey === 'intelligent' ? `${brand} Inteligente` : `${brand} Essencial`;
  const inicial = (email || '?').trim().charAt(0).toUpperCase() || '?';
  const claro = theme === 'light';

  return `<p class="mt">Perfil e configurações</p>
  <div class="lc" style="padding:14px;margin-bottom:16px">
    <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--green2),var(--green));display:flex;align-items:center;justify-content:center;font-size:20px;color:#06060f;font-weight:900;flex-shrink:0">${seguro(inicial)}</div>
    <div style="min-width:0">
      <p style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis">${seguro(email || 'Conta sem e-mail')}</p>
      <p class="ti">${seguro(plano)}${status ? ` · ${seguro(status)}` : ''}</p>
    </div>
  </div>

  <p class="lb">Aparência</p>
  <button class="cb" type="button" onclick="toggleTheme();om('profile')">${claro ? '🌙 Usar tema escuro' : '☀️ Usar tema claro'}</button>

  <p class="lb" style="margin-top:16px">Plano</p>
  <button class="cb" type="button" onclick="openPricing('${planKey === 'intelligent' ? 'intelligent' : 'essential'}')">Ver ou trocar de plano</button>

  <p class="lb" style="margin-top:16px">Segurança</p>
  <input class="ip" id="pf-pass" type="password" placeholder="Nova senha (mínimo 6 caracteres)" autocomplete="new-password"/>
  <input class="ip" id="pf-pass2" type="password" placeholder="Repita a nova senha" autocomplete="new-password"/>
  <div id="pf-msg" role="status" aria-live="polite" style="display:none;font-size:12px;margin-bottom:10px;padding:9px 12px;border-radius:9px"></div>
  <button class="sb" id="pf-save" type="button" onclick="salvarSenha()">Salvar nova senha</button>

  <button class="cb" type="button" style="margin-top:16px;color:var(--red);border-color:rgba(248,113,113,.35)" onclick="doLogout()">Sair da conta</button>
  <p class="mu" style="text-align:center;margin-top:14px;font-size:11px">${seguro(brand)} v${seguro(version)} · Desenvolvido por Jean Oliveira</p>`;
}
