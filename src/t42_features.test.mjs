import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLancamento, lerExtrato, ehDuplicada, comparativoMensal, alertaOrcamento, lerValor, categorizar } from './t42_features.mjs';
const hoje = new Date(2026, 10, 15, 10, 0, 0);
test('valores', () => { assert.equal(lerValor('1.234,56'), 1234.56); assert.equal(lerValor('32,50'), 32.5); assert.equal(lerValor('-45.90'), -45.9); assert.equal(lerValor('R$ 32'), 32); });
test('gastei no ifood ontem', () => { const r = parseLancamento('gastei 32,50 no ifood ontem', hoje); assert.equal(r.type, 'expense'); assert.equal(r.amount, 32.5); assert.equal(r.category, 'alimentacao'); assert.equal(r.dia, '2026-11-14'); assert.equal(r.desc, 'Ifood'); });
test('recebi salário dia 5', () => { const r = parseLancamento('recebi 2.500 salário dia 5', hoje); assert.equal(r.type, 'income'); assert.equal(r.amount, 2500); assert.equal(r.dia, '2026-11-05'); });
test('uber', () => { const r = parseLancamento('uber 18', hoje); assert.equal(r.category, 'transporte'); assert.equal(r.dia, '2026-11-15'); });
test('sem valor', () => assert.equal(parseLancamento('mercado', hoje), null));
test('categorias', () => { assert.equal(categorizar('NETFLIX.COM'), 'lazer'); assert.equal(categorizar('Drogaria São Paulo'), 'saude'); assert.equal(categorizar('xyz'), 'outros'); });
test('OFX', () => {
  const ofx = '<OFX><BANKTRANLIST><STMTTRN><TRNTYPE>DEBIT<DTPOSTED>20261110120000[-3:BRT]<TRNAMT>-45.90<MEMO>UBER *TRIP</STMTTRN><STMTTRN><TRNTYPE>CREDIT<DTPOSTED>20261105<TRNAMT>2500.00<MEMO>SALARIO</STMTTRN></BANKTRANLIST></OFX>';
  const r = lerExtrato(ofx, 'extrato.ofx'); assert.equal(r.length, 2); assert.deepEqual(r[0], { dia: '2026-11-10', type: 'expense', amount: 45.9, desc: 'UBER *TRIP', category: 'transporte' }); assert.equal(r[1].type, 'income');
});
test('CSV ; BR', () => { const r = lerExtrato('Data;Descrição;Valor\n10/11/2026;Supermercado Zaffari;-123,45\n11/11/2026;"Pix recebido; João";200,00\n', 'x.csv'); assert.equal(r.length, 2); assert.equal(r[0].category, 'alimentacao'); assert.equal(r[0].amount, 123.45); assert.equal(r[1].desc, 'Pix recebido; João'); });
test('CSV , ISO (Nubank)', () => { const r = lerExtrato('date,title,amount\n2026-11-12,Netflix,55.90\n', 'nu.csv'); assert.equal(r.length, 1); assert.equal(r[0].amount, 55.9); });
test('duplicada', () => { assert.ok(ehDuplicada({ dia: '2026-11-10', type: 'expense', amount: 45.9 }, [{ type: 'expense', amount: 45.9, date: '2026-11-10T15:00:00.000Z' }])); });
test('comparativo', () => { const tx = [{ type: 'expense', amount: 150, category: 'alimentacao', date: '2026-11-02' }, { type: 'expense', amount: 100, category: 'alimentacao', date: '2026-10-02' }]; const r = comparativoMensal(tx, '2026-11'); assert.equal(r[0].variacao, 50); });
test('alerta', () => { const tx = [{ type: 'expense', amount: 85, category: 'lazer', date: '2026-11-02' }]; assert.deepEqual(alertaOrcamento(tx, { lazer: 100 }, 'lazer', '2026-11'), { nivel: 'aviso', pct: 85 }); assert.equal(alertaOrcamento(tx, {}, 'lazer', '2026-11'), null); });
