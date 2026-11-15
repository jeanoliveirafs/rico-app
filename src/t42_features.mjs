// T42 — funções puras (sem DOM) para: lançamento rápido por texto, importação de extrato
// (OFX/CSV) e comparativo mensal. Testes em src/t42_features.test.mjs (node --test src/t42_features.test.mjs).

const semAcento = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Palavras-chave → ids de categoria que existem no app (TXC em main.js).
const REGRAS_CATEGORIA = [
  ['alimentacao', ['mercado', 'supermercado', 'ifood', 'lanche', 'restaurante', 'pizza', 'padaria', 'acougue', 'hamburguer', 'burger', 'cafe', 'almoco', 'jantar', 'comida', 'feira', 'rappi', 'atacadao', 'carrefour', 'assai']],
  ['transporte', ['uber', '99', 'gasolina', 'combustivel', 'onibus', 'metro', 'estacionamento', 'pedagio', 'posto', 'shell', 'ipiranga', 'taxi', 'passagem']],
  ['moradia', ['aluguel', 'condominio', 'luz', 'energia', 'agua', 'internet', 'gas', 'iptu', 'celular', 'telefone', 'vivo', 'claro', 'tim']],
  ['saude', ['farmacia', 'remedio', 'medico', 'consulta', 'dentista', 'exame', 'hospital', 'academia', 'drogaria', 'plano de saude']],
  ['lazer', ['netflix', 'spotify', 'cinema', 'show', 'bar', 'cerveja', 'viagem', 'jogo', 'steam', 'disney', 'hbo', 'prime video', 'youtube']],
  ['educacao', ['curso', 'escola', 'faculdade', 'livro', 'mensalidade', 'udemy', 'alura']],
  ['compras', ['roupa', 'sapato', 'tenis', 'shopee', 'amazon', 'mercado livre', 'magalu', 'shein', 'presente', 'loja']],
];

const PALAVRAS_RECEITA = ['recebi', 'ganhei', 'salario', 'pix recebido', 'entrou', 'freela', 'venda', 'vendi', 'reembolso', 'rendimento', 'deposito'];

/** Categoria de despesa pela descrição (id existente; 'outros' se não reconhecer). */
export function categorizar(desc) {
  const t = ' ' + semAcento(desc).replace(/[^a-z0-9 ]/g, ' ') + ' ';
  for (const [cat, palavras] of REGRAS_CATEGORIA) {
    if (palavras.some((p) => t.includes(' ' + p + ' ') || (p.length > 4 && t.includes(p)))) return cat;
  }
  return 'outros';
}

/** "1.234,56" | "32,50" | "32.5" | "R$ 32" -> número (ou NaN). */
export function lerValor(bruto) {
  let s = String(bruto || '').replace(/[R$\s]/g, '');
  const neg = /^-/.test(s) || /^\(.*\)$/.test(s);
  s = s.replace(/[()+-]/g, '');
  if (/,\d{1,2}$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else if (/\.\d{3}(\.|$)/.test(s) && !/\.\d{1,2}$/.test(s)) s = s.replace(/\./g, '');
  else s = s.replace(/,/g, '');
  const n = parseFloat(s);
  return neg ? -n : n;
}

const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Lançamento por texto livre: "gastei 32,50 no ifood ontem", "recebi 2500 salário dia 5".
 * Retorna {type, amount, desc, category, date(ISO ao meio-dia local)} ou null se não houver valor.
 */
export function parseLancamento(texto, hoje = new Date()) {
  const original = String(texto || '').trim();
  if (!original) return null;
  const m = original.match(/(?:r\$\s*)?(\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?)/i);
  if (!m) return null;
  const amount = Math.abs(lerValor(m[1]));
  if (!amount || !isFinite(amount)) return null;

  const t = semAcento(original);
  const type = PALAVRAS_RECEITA.some((p) => t.includes(p)) ? 'income' : 'expense';

  const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 12, 0, 0);
  let semData = original;
  if (/\banteontem\b/i.test(t)) { d.setDate(d.getDate() - 2); semData = semData.replace(/anteontem/i, ''); }
  else if (/\bontem\b/i.test(t)) { d.setDate(d.getDate() - 1); semData = semData.replace(/ontem/i, ''); }
  else if (/\bhoje\b/i.test(t)) { semData = semData.replace(/hoje/i, ''); }
  const dia = t.match(/\bdia\s+(\d{1,2})\b/);
  if (dia) {
    const n = Math.min(28 + 3, Math.max(1, parseInt(dia[1], 10)));
    d.setDate(n);
    semData = semData.replace(/\bdia\s+\d{1,2}\b/i, '');
  }

  let desc = semData
    .replace(m[0], ' ')
    .replace(/\b(gastei|paguei|comprei|recebi|ganhei|entrou|reais|real|no|na|nos|nas|em|de|do|da|com|pra|para|um|uma)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!desc) desc = type === 'income' ? 'Receita' : 'Despesa';
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);

  const category = type === 'income' ? 'outros' : categorizar(original);
  return { type, amount: Math.round(amount * 100) / 100, desc: desc.slice(0, 80), category, date: d.toISOString(), dia: ymd(d) };
}

// ───────────────────────── extrato ─────────────────────────

function dataOFX(s) {
  const m = String(s || '').match(/^(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

/** OFX (bancos brasileiros): blocos <STMTTRN> com TRNAMT, DTPOSTED, MEMO/NAME. */
export function parseOFX(texto) {
  const out = [];
  const blocos = String(texto || '').split(/<STMTTRN>/i).slice(1);
  for (const b of blocos) {
    const tag = (n) => {
      const m = b.match(new RegExp('<' + n + '>([^<\\r\\n]*)', 'i'));
      return m ? m[1].trim() : '';
    };
    const valor = parseFloat(tag('TRNAMT').replace(',', '.'));
    const dia = dataOFX(tag('DTPOSTED'));
    const desc = tag('MEMO') || tag('NAME') || 'Lançamento';
    if (!isFinite(valor) || !dia || valor === 0) continue;
    out.push({ dia, valor, desc });
  }
  return out;
}

function dataCSV(s) {
  const t = String(s || '').trim();
  let m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (m) {
    const y = m[3].length === 2 ? '20' + m[3] : m[3];
    return `${y}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  }
  m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function dividirLinhaCSV(linha, sep) {
  const cel = []; let atual = ''; let aspas = false;
  for (let i = 0; i < linha.length; i++) {
    const c = linha[i];
    if (c === '"') { if (aspas && linha[i + 1] === '"') { atual += '"'; i++; } else aspas = !aspas; }
    else if (c === sep && !aspas) { cel.push(atual); atual = ''; }
    else atual += c;
  }
  cel.push(atual);
  return cel.map((x) => x.trim());
}

/** CSV com cabeçalho (data / descrição / valor), separador ; ou , */
export function parseCSV(texto) {
  const linhas = String(texto || '').replace(/^\uFEFF/, '').split(/\r?\n/).filter((l) => l.trim());
  if (linhas.length < 2) return [];
  const sep = (linhas[0].match(/;/g) || []).length >= (linhas[0].match(/,/g) || []).length ? ';' : ',';
  const cab = dividirLinhaCSV(linhas[0], sep).map(semAcento);
  const iData = cab.findIndex((c) => /data|date/.test(c));
  const iDesc = cab.findIndex((c) => /descri|historico|memo|lancamento|estabelecimento|title/.test(c));
  const iValor = cab.findIndex((c) => /valor|amount|quantia/.test(c));
  if (iData < 0 || iValor < 0) return [];
  const out = [];
  for (const l of linhas.slice(1)) {
    const c = dividirLinhaCSV(l, sep);
    const dia = dataCSV(c[iData]);
    const valor = lerValor(c[iValor]);
    if (!dia || !isFinite(valor) || valor === 0) continue;
    out.push({ dia, valor, desc: (iDesc >= 0 ? c[iDesc] : '') || 'Lançamento' });
  }
  return out;
}

/** Detecta o formato e devolve linhas prontas para prévia (máx. 2000). */
export function lerExtrato(texto, nomeArquivo = '') {
  const ehOFX = /\.ofx$/i.test(nomeArquivo) || /<OFX>|<STMTTRN>/i.test(texto);
  const linhas = (ehOFX ? parseOFX(texto) : parseCSV(texto)).slice(0, 2000);
  return linhas.map((l) => ({
    dia: l.dia,
    type: l.valor < 0 ? 'expense' : 'income',
    amount: Math.round(Math.abs(l.valor) * 100) / 100,
    desc: String(l.desc).slice(0, 80),
    category: l.valor < 0 ? categorizar(l.desc) : 'outros',
  }));
}

/** true se já existe transação com mesmo dia, valor e tipo. */
export function ehDuplicada(linha, transacoes) {
  return (transacoes || []).some(
    (t) => t.type === linha.type && Math.abs(Number(t.amount) - linha.amount) < 0.005 && String(t.date || '').slice(0, 10) === linha.dia,
  );
}

// ───────────────────────── relatório ─────────────────────────

/** Top categorias de despesa do mês vs mês anterior. mes = "YYYY-MM". */
export function comparativoMensal(transacoes, mes, top = 5) {
  const [y, m] = mes.split('-').map(Number);
  const ant = new Date(y, m - 2, 1);
  const mesAnt = `${ant.getFullYear()}-${String(ant.getMonth() + 1).padStart(2, '0')}`;
  const soma = (mm) => {
    const r = {};
    for (const t of transacoes || []) {
      if (t.type === 'expense' && String(t.date || '').startsWith(mm)) r[t.category || 'outros'] = (r[t.category || 'outros'] || 0) + Number(t.amount || 0);
    }
    return r;
  };
  const atual = soma(mes); const anterior = soma(mesAnt);
  return Object.entries(atual)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([cat, valor]) => {
      const antes = anterior[cat] || 0;
      return { cat, valor, antes, variacao: antes > 0 ? Math.round(((valor - antes) / antes) * 100) : null };
    });
}

/** Alerta de orçamento depois de uma despesa: null | {nivel:'aviso'|'estourou', pct}. */
export function alertaOrcamento(transacoes, limites, categoria, mes) {
  const limite = Number((limites || {})[categoria] || 0);
  if (!limite) return null;
  const gasto = (transacoes || [])
    .filter((t) => t.type === 'expense' && t.category === categoria && String(t.date || '').startsWith(mes))
    .reduce((a, t) => a + Number(t.amount || 0), 0);
  const pct = Math.round((gasto / limite) * 100);
  if (pct >= 100) return { nivel: 'estourou', pct };
  if (pct >= 80) return { nivel: 'aviso', pct };
  return null;
}
