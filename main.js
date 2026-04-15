// ═══════ CONSTANTS ═══════
const GOAL=100000;
const MO=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const TXC=[{id:'alimentacao',label:'Alimentação',emoji:'🍔',color:'#f97316'},{id:'transporte',label:'Transporte',emoji:'🚗',color:'#3b82f6'},{id:'lazer',label:'Lazer',emoji:'🎮',color:'#a855f7'},{id:'compras',label:'Compras',emoji:'🛍️',color:'#ec4899'},{id:'saude',label:'Saúde',emoji:'💊',color:'#10b981'},{id:'moradia',label:'Moradia',emoji:'🏠',color:'#6366f1'},{id:'educacao',label:'Educação',emoji:'📚',color:'#0ea5e9'},{id:'outros',label:'Outros',emoji:'📦',color:'#64748b'}];
const BLC=[{id:'moradia',label:'Moradia',emoji:'🏠'},{id:'energia',label:'Energia',emoji:'⚡'},{id:'agua',label:'Água',emoji:'💧'},{id:'internet',label:'Internet',emoji:'📡'},{id:'cartao',label:'Cartão',emoji:'💳'},{id:'streaming',label:'Streaming',emoji:'📺'},{id:'celular',label:'Celular',emoji:'📱'},{id:'outros',label:'Outros',emoji:'📦'}];
const PC={essencial:{label:'Essencial',color:'#4ade80',bg:'rgba(74,222,128,.12)',border:'rgba(74,222,128,.3)',icon:'🟢'},importante:{label:'Importante',color:'#facc15',bg:'rgba(250,204,21,.12)',border:'rgba(250,204,21,.3)',icon:'🟡'},desejo:{label:'Desejo',color:'#f97316',bg:'rgba(249,115,22,.12)',border:'rgba(249,115,22,.3)',icon:'🟠'},'supérfluo':{label:'Supérfluo',color:'#f87171',bg:'rgba(248,113,113,.12)',border:'rgba(248,113,113,.3)',icon:'🔴'}};
const IVT=[{id:'reserva',label:'Reserva Emergência',emoji:'🛡️',color:'#06b6d4',r:0},{id:'rendafixa',label:'Renda Fixa',emoji:'🏦',color:'#4ade80',r:1},{id:'tesouro',label:'Tesouro Direto',emoji:'🇧🇷',color:'#22d3ee',r:1},{id:'fii',label:'FIIs',emoji:'🏢',color:'#818cf8',r:2},{id:'fundos',label:'Fundos',emoji:'📊',color:'#a78bfa',r:2},{id:'acoes',label:'Ações',emoji:'📈',color:'#fb923c',r:3},{id:'cripto',label:'Cripto',emoji:'₿',color:'#f59e0b',r:4},{id:'outro',label:'Outro',emoji:'💡',color:'#94a3b8',r:2}];
const LV=`LIVRO: "Do Mil ao Milhão" - Thiago Nigro\n3 PILARES: Gastar Bem, Investir Melhor, Ganhar Mais\nREGRA 50-30-10-10: 50% essenciais, 30% investimentos, 10% outros, 10% livre\nFUNDO EMERGÊNCIA: CLT=6x renda, Autônomo=12x. Tesouro Selic ou CDB liquidez diária. PRIORIDADE #1.\nTRIÂNGULO NIGRO: Risco x Liquidez x Rendimento. Tesouro Selic = benchmark.\nHIERARQUIA: Fundo emergência > CDB/LCI/LCA > Tesouro IPCA+ > FIIs > Ações > Cripto\nTABELA MILHÃO: R$1k/mês a 12%aa = R$1M em ~20 anos\nQUITE DÍVIDAS ANTES DE INVESTIR. Pobre paga juros, rico recebe.\nVendas ações <R$20k/mês = isentas IR. Máx 10 ativos. NÃO day trade.\nLCI/LCA isenta IR. FII: dividendos mensais isentos IR.\nGANHAR MAIS: mérito>esforço, escala, personal branding, múltiplas fontes renda.`;

// ═══════ STATE ═══════
let ST={
  balance:0,transactions:[],bills:[],debts:[],
  shoppingList:[],investments:[],aiChat:[],invChat:[],
  budgetLimits:{},streak:0,lastNoSpurfluous:null,
  balanceHistory:[],theme:'dark'
};
let cv='dashboard',it='portfolio';
let ci='',ce='',cg='100000',compInitial='',compMonthly='',compRate='12',compYears='20';
let al=false,ial=false,ap=false,ia=false,invA=null;
let ach=[],ich=[];
// filtros/paginação transações
let txPage=0,txPerPage=15,txFilterMonth='',txFilterCat='',txFilterType='';

// ═══════ SUPABASE INITIALIZATION ═══════
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://vizsvjysklidnkzqxltn.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpenN2anlza2xpZG5renF4bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTMyOTEsImV4cCI6MjA5MTAyOTI5MX0.PDuihuZjEUyTwPIXSsXagKA5H0L7Cd0aATnZjUAbtLg';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
let currentUser = null;

// ═══════ OFFLINE SYNC QUEUE ═══════
let isOnline = navigator.onLine;
let syncQueue = JSON.parse(localStorage.getItem('rico_sync_queue')||'[]');

function saveQueue(){ localStorage.setItem('rico_sync_queue', JSON.stringify(syncQueue)); }

function queueOp(op){ syncQueue.push(op); saveQueue(); }

async function flushQueue(){
  if(!isOnline || !currentUser || syncQueue.length===0) return;
  const q=[...syncQueue];
  for(const op of q){
    try{
      op.retries = (op.retries || 0) + 1;
      let res;
      if(op.type==='upsert') res = await supabaseClient.from(op.table).upsert(op.data);
      else if(op.type==='delete') res = await supabaseClient.from(op.table).delete().eq(op.col, op.val);
      
      if(res && res.error && res.error.message.includes('fetch') && op.retries < 5) break; 
      syncQueue=syncQueue.filter(x=>x!==op);
    }catch(e){ 
      if((op.retries || 0) >= 5) syncQueue=syncQueue.filter(x=>x!==op);
      else break; 
    }
  }
  saveQueue();
  if(syncQueue.length===0) showToast('Dados sincronizados com a nuvem ✓','var(--green)');
}

function showToast(msg, color='var(--green)'){
  let t=document.getElementById('rico-toast');
  if(!t){t=document.createElement('div');t.id='rico-toast';t.style.cssText='position:fixed;top:calc(env(safe-area-inset-top,0px)+12px);left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;transition:opacity .4s';document.body.appendChild(t);}
  t.textContent=msg;t.style.background=color==='var(--green)'?'rgba(74,222,128,.9)':'rgba(248,113,113,.9)';t.style.color='#06060f';t.style.opacity='1';
  clearTimeout(t._to);t._to=setTimeout(()=>t.style.opacity='0',2500);
}

window.addEventListener('online',  ()=>{ isOnline=true;  showToast('Online — sincronizando...'); flushQueue(); });
window.addEventListener('offline', ()=>{ isOnline=false; showToast('Offline — dados salvos localmente','var(--red)'); });

// ═══════ NOTIFICAÇÕES DE CONTAS A VENCER ═══════
function checkBillNotifications(){
  if(!('Notification' in window)) return;
  const today=new Date().getDate();
  const month=nm();
  const urgent=ST.bills.filter(b=>!b.paid && b.month===month && b.dueDay && b.dueDay<=today+3 && b.dueDay>=today);
  if(urgent.length===0) return;

  // Show in-app banner even without permission
  const existing=document.getElementById('bill-notif-bar');
  if(existing) existing.remove();
  const bar=document.createElement('div');
  bar.id='bill-notif-bar';
  bar.style.cssText='position:fixed;top:calc(env(safe-area-inset-top,0px)+56px);left:0;right:0;background:rgba(250,204,21,.95);color:#06060f;padding:8px 16px;font-size:12px;font-weight:700;z-index:100;display:flex;justify-content:space-between;align-items:center;cursor:pointer';
  const names=urgent.slice(0,2).map(b=>b.name).join(', ')+(urgent.length>2?` +${urgent.length-2}`:'');
  bar.innerHTML=`<span>⚠️ ${urgent.length} conta${urgent.length>1?'s':''} vencendo: ${names}</span><button style="background:transparent;border:none;font-size:16px;padding:0 4px;cursor:pointer" onclick="document.getElementById('bill-notif-bar').remove()">✕</button>`;
  bar.onclick=(e)=>{ if(e.target.tagName!=='BUTTON'){sv('bills');bar.remove();} };
  document.body.appendChild(bar);
  setTimeout(()=>{ const b=document.getElementById('bill-notif-bar'); if(b) b.remove(); },8000);

  // Push notification if permission granted
  if(Notification.permission==='granted'){
    urgent.forEach(b=>{
      new Notification(`💳 Conta vencendo: ${b.name}`,{body:`${fB(b.amount)} — vence dia ${b.dueDay}`,icon:'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%22 height=%2232%22 rx=%228%22 fill=%22%2306060f%22/%3E%3Ctext y=%2224%22 x=%2216%22 text-anchor=%22middle%22 font-size=%2220%22%3E💎%3C/text%3E%3C/svg%3E'});
    });
  } else if(Notification.permission!=='denied'){
    Notification.requestPermission().then(p=>{ if(p==='granted') checkBillNotifications(); });
  }
}

function showOfflineBadge(){
  let b=document.getElementById('offline-badge');
  if(!isOnline && !b){
    b=document.createElement('div');b.id='offline-badge';
    b.style.cssText='position:fixed;bottom:calc(68px + env(safe-area-inset-bottom,0px));right:10px;background:rgba(248,113,113,.9);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:10px;z-index:50';
    b.textContent='OFFLINE';document.body.appendChild(b);
  } else if(isOnline && b){ b.remove(); }
}


async function doLogin() {
  const btn = document.querySelector('#auth-overlay .sb');
  const errEl = document.getElementById('auth-error');
  btn.disabled = true; btn.textContent = 'Entrando...';
  errEl.style.display = 'none';
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-pass').value;
  if (!email || !password) {
    errEl.textContent = 'Preencha e-mail e senha.';
    errEl.style.color = 'var(--red)'; errEl.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Entrar'; return;
  }
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    errEl.textContent = error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message;
    errEl.style.color = 'var(--red)'; errEl.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Entrar';
  }
  // Sucesso → onAuthStateChange cuida do resto
}

async function doRegister() {
  const btn = document.querySelector('#auth-overlay .cb');
  const errEl = document.getElementById('auth-error');
  btn.disabled = true; btn.textContent = 'Criando conta...';
  errEl.style.display = 'none';
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-pass').value;
  if (!email || !password) {
    errEl.textContent = 'Preencha e-mail e senha.';
    errEl.style.color = 'var(--red)'; errEl.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Criar Conta Gratuita'; return;
  }
  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    errEl.textContent = error.message;
    errEl.style.color = 'var(--red)';
  } else {
    errEl.textContent = '✅ Conta criada! Verifique seu e-mail para confirmar e depois entre.';
    errEl.style.color = 'var(--green)';
  }
  errEl.style.display = 'block';
  btn.disabled = false; btn.textContent = 'Criar Conta Gratuita';
}

async function doLogout() {
  const btn = document.querySelector('#header button[onclick="doLogout()"], #header .ib');
  if(btn){ btn.disabled=true; btn.textContent='Saindo...'; }
  try {
    // Timeout de 3s: se o Supabase travar por Lock, força logout manual
    await Promise.race([
      supabaseClient.auth.signOut(),
      new Promise((_,rej) => setTimeout(() => rej(new Error('timeout')), 3000))
    ]);
  } catch(e) {
    // Fallback: limpa sessão manualmente e recarrega
    Object.keys(localStorage).filter(k => k.startsWith('sb-')).forEach(k => localStorage.removeItem(k));
    window.location.reload();
    return;
  }
}

// ═══════ PERSIST (SUPABASE) ═══════
const KEY='rico_v5';

async function loadData(){
  const [p,tx,b,d,sh,i,bh] = await Promise.all([
    supabaseClient.from('profiles').select('*').eq('id', currentUser.id).maybeSingle(),
    supabaseClient.from('transactions').select('*').eq('user_id', currentUser.id),
    supabaseClient.from('bills').select('*').eq('user_id', currentUser.id),
    supabaseClient.from('debts').select('*').eq('user_id', currentUser.id),
    supabaseClient.from('shopping_list').select('*').eq('user_id', currentUser.id),
    supabaseClient.from('investments').select('*').eq('user_id', currentUser.id),
    supabaseClient.from('balance_history').select('*').eq('user_id', currentUser.id)
  ]);
  if(p.data){
    ST.balance = Number(p.data.balance) || 0;
    ST.streak = p.data.streak || 0;
    ST.lastNoSpurfluous = p.data.last_no_spurfluous;
    ST.theme = p.data.theme || 'dark';
    ST.budgetLimits = p.data.budget_limits || {};
  }
  if(tx.data) ST.transactions = tx.data.map(t=>({id: parseFloat(t.created_id), type: t.type, amount: Number(t.amount), desc: t.description, category: t.category, date: t.date, recurring: t.recurring, recurringFrom: t.recurring_from})).sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(b.data) ST.bills = b.data.map(x=>({id: parseFloat(x.created_id), name: x.name, amount: Number(x.amount), category: x.category, dueDay: x.due_day, month: x.month, paid: x.paid}));
  if(d.data) ST.debts = d.data.map(x=>({id: parseFloat(x.created_id), creditor: x.creditor, amount: Number(x.amount), dueDate: x.due_date, note: x.note, paid: x.paid}));
  if(sh.data) ST.shoppingList = sh.data.map(x=>({id: parseFloat(x.created_id), name: x.name, estimatedPrice: Number(x.estimated_price), reason: x.reason, priority: x.priority, aiJustification: x.ai_justification, bought: x.bought, boughtAt: x.bought_at}));
  if(i.data) ST.investments = i.data.map(x=>({id: parseFloat(x.created_id), type: x.type, name: x.name, amount: Number(x.amount), returnRate: Number(x.return_rate), note: x.note, date: x.date})).sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(bh.data) ST.balanceHistory = bh.data.map(x=>({date: x.date, value: Number(x.value)})).sort((a,b)=>new Date(a.date)-new Date(b.date));
}

async function ld(){
  const s=localStorage.getItem(KEY);
  if(s){try{const d=JSON.parse(s);ach=d.aiChat||[];ich=d.invChat||[];}catch(e){}}

  // Auth state change listener — handles login/logout reactively
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if(event==='SIGNED_IN' && session){
      currentUser = session.user;
      // Resetar botão de login (pode ter ficado "Entrando..." de tentativa anterior)
      const loginBtn = document.querySelector('#auth-overlay .sb');
      if(loginBtn){ loginBtn.disabled=false; loginBtn.textContent='Entrar'; }
      document.getElementById('auth-overlay').style.display='none';
      document.getElementById('app').style.display='flex';
      await loadData();
      applyTheme(); processRecurring(); updateStreak(); recordBalance();
      injectManifest(); registerSW(); showIOSHint(); render();
    } else if(event==='SIGNED_OUT'){
      currentUser = null;
      ST = {balance:0,transactions:[],bills:[],debts:[],shoppingList:[],investments:[],aiChat:[],invChat:[],budgetLimits:{},streak:0,lastNoSpurfluous:null,balanceHistory:[],theme:'dark'};
      // Garantir que botões de auth estão no estado correto
      const loginBtn = document.querySelector('#auth-overlay .sb');
      const regBtn   = document.querySelector('#auth-overlay .cb');
      if(loginBtn){ loginBtn.disabled=false; loginBtn.textContent='Entrar'; }
      if(regBtn)  { regBtn.disabled=false;   regBtn.textContent='Criar Conta Gratuita'; }
      document.getElementById('auth-overlay').style.display='flex';
      document.getElementById('app').style.display='none';
    }
  });

  const { data: { session } } = await supabaseClient.auth.getSession();
  if(!session){
    document.getElementById('auth-overlay').style.display='flex';
    document.getElementById('app').style.display='none';
    return false;
  }
  currentUser = session.user;
  document.getElementById('auth-overlay').style.display='none';
  document.getElementById('app').style.display='flex';
  await loadData();
  return true;
}

// Helper: salva uma linha imediatamente (sem esperar debounce)
function saveRow(table, row, onConflict='created_id'){
  if(!currentUser) return;
  supabaseClient.from(table).upsert(row, {onConflict})
    .then(({error}) => { if(error) console.error(`[save:${table}]`, error.message); });
}

async function pushToSupabase() {
  if (!currentUser) return;
  // profiles usa id (PK) como conflict — funciona direto
  const {error:pe} = await supabaseClient.from('profiles').upsert({id: currentUser.id, balance: ST.balance, streak: ST.streak, last_no_spurfluous: ST.lastNoSpurfluous, theme: ST.theme, budget_limits: ST.budgetLimits});
  if(pe) console.error('[sync] profiles:', pe.message);

  // Todas as demais tabelas usam created_id UNIQUE como conflict target
  const upsertTable = async (table, rows) => {
    if(!rows.length) return;
    const {error} = await supabaseClient.from(table).upsert(rows, {onConflict: 'created_id'});
    if(error) console.error(`[sync] ${table}:`, error.message);
  };

  await upsertTable('transactions', ST.transactions.map(t=>({user_id: currentUser.id, created_id: String(t.id), type: t.type, amount: t.amount, description: t.desc, category: t.category, date: t.date, recurring: t.recurring||false, recurring_from: t.recurringFrom||null})));
  await upsertTable('bills', ST.bills.map(b=>({user_id: currentUser.id, created_id: String(b.id), name: b.name, amount: b.amount, category: b.category, due_day: parseInt(b.dueDay)||null, month: b.month, paid: b.paid||false})));
  await upsertTable('debts', ST.debts.map(d=>({user_id: currentUser.id, created_id: String(d.id), creditor: d.creditor, amount: d.amount, due_date: d.dueDate||null, note: d.note||null, paid: d.paid||false})));
  await upsertTable('shopping_list', ST.shoppingList.map(s=>({user_id: currentUser.id, created_id: String(s.id), name: s.name, estimated_price: s.estimatedPrice||0, reason: s.reason||null, priority: s.priority||null, ai_justification: s.aiJustification||null, bought: s.bought||false, bought_at: s.boughtAt||null})));
  await upsertTable('investments', ST.investments.map(i=>({user_id: currentUser.id, created_id: String(i.id), type: i.type, name: i.name, amount: i.amount, return_rate: i.returnRate||0, note: i.note||null, date: i.date})));

  // balance_history usa UNIQUE(user_id, date)
  if(ST.balanceHistory.length){
    const {error} = await supabaseClient.from('balance_history').upsert(ST.balanceHistory.map(h=>({user_id: currentUser.id, date: h.date, value: h.value})), {onConflict: 'user_id,date'});
    if(error) console.error('[sync] balance_history:', error.message);
  }
}

let syncTimer = null;
function sv_(){
  try{localStorage.setItem(KEY,JSON.stringify({aiChat:ach,invChat:ich}));}catch(e){}
  if(!isOnline){
    // Queue all tables for sync when back online
    if(currentUser){
      queueOp({type:'upsert',table:'profiles',data:{id:currentUser.id,balance:ST.balance,streak:ST.streak,last_no_spurfluous:ST.lastNoSpurfluous,theme:ST.theme,budget_limits:ST.budgetLimits}});
    }
    return;
  }
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(pushToSupabase, 1500);
}

// ═══════ UTILS ═══════
const fB=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
const fD=d=>new Date(d).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
const fP=v=>`${(v||0).toFixed(1)}%`;
const nm=()=>{const n=new Date();return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}`;};
const gc=(arr,id)=>arr.find(c=>c.id===id)||arr[arr.length-1];
const es=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ═══════ THEME ═══════
function toggleTheme(){
  ST.theme=ST.theme==='dark'?'light':'dark';
  applyTheme();sv_();
}
function applyTheme(){
  document.documentElement.setAttribute('data-theme',ST.theme||'dark');
  const btn=document.getElementById('theme-toggle');
  if(btn)btn.className='theme-btn'+(ST.theme==='light'?' light':'');
}

// ═══════ HEADER ═══════
function uh(){
  const b=document.getElementById('hb');
  if(!b)return;
  b.textContent=fB(ST.balance);
  b.style.color=ST.balance>=0?'var(--green)':'var(--red)';
  // bills notification dot
  const dot=document.getElementById('bills-dot');
  if(dot){const ov=ST.bills.filter(b=>b.month===nm()&&!b.paid);dot.style.display=ov.length?'block':'none';}
}

// ═══════ STREAK ═══════
function updateStreak(){
  const today=new Date().toDateString();
  const hasSup=ST.shoppingList.some(i=>i.bought&&i.priority==='supérfluo'&&new Date(i.boughtAt||0).toDateString()===today);
  if(!hasSup){
    const last=ST.lastNoSpurfluous;
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    if(last===yesterday.toDateString()||last===today){
      if(last!==today){ST.streak=(ST.streak||0)+1;ST.lastNoSpurfluous=today;}
    } else {
      ST.streak=1;ST.lastNoSpurfluous=today;
    }
  }
}

// ═══════ BALANCE HISTORY ═══════
function recordBalance(){
  const today=new Date().toISOString().split('T')[0];
  const h=ST.balanceHistory||[];
  const last=h[h.length-1];
  if(!last||last.date!==today){h.push({date:today,value:ST.balance});}
  else{h[h.length-1].value=ST.balance;}
  ST.balanceHistory=h.slice(-90);
}

// ═══════ RECURRING ═══════
function processRecurring(){
  const today=new Date();
  const curM=nm();
  ST.transactions.filter(t=>t.recurring).forEach(t=>{
    const lastDate=new Date(t.date);
    const monthsDiff=(today.getFullYear()-lastDate.getFullYear())*12+(today.getMonth()-lastDate.getMonth());
    if(monthsDiff>=1){
      const already=ST.transactions.some(tx=>tx.recurringFrom===t.id&&tx.date.startsWith(curM));
      if(!already){
        const newTx={id:Date.now()+Math.random(),type:t.type,amount:t.amount,desc:t.desc+'(recorrente)',category:t.category,date:new Date().toISOString(),recurringFrom:t.id};
        ST.transactions.unshift(newTx);
        ST.balance+=t.type==='income'?t.amount:-t.amount;
      }
    }
  });
}

// ═══════ NAV ═══════
function sv(v){
  cv=v;
  document.querySelectorAll('.nb').forEach(b=>b.classList.toggle('act',b.dataset.v===v));
  document.getElementById('fab').style.display=v==='dashboard'?'flex':'none';
  render();
}

// ═══════ RENDER ═══════
function render(){
  const m=document.getElementById('main');
  m.className='fade';
  if(cv==='dashboard')m.innerHTML=rDash();
  else if(cv==='bills')m.innerHTML=rBills();
  else if(cv==='debts')m.innerHTML=rDebts();
  else if(cv==='shopping')m.innerHTML=rShop();
  else if(cv==='invest')m.innerHTML=rInvest();
  else if(cv==='ai')m.innerHTML=rAI();
  else if(cv==='history')m.innerHTML=rHistory();
  uh();
  showOfflineBadge();
  setTimeout(()=>{['acb','icb'].forEach(id=>{const e=document.getElementById(id);if(e)e.scrollTop=e.scrollHeight;});},60);
}

// ═══════ DASHBOARD ═══════
function rDash(){
  const tIn=ST.transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const tOut=ST.transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  const tInv=ST.investments.reduce((a,b)=>a+b.amount,0);
  const res=ST.investments.filter(i=>i.type==='reserva').reduce((a,b)=>a+b.amount,0);
  const prog=Math.min((ST.balance/GOAL)*100,100);
  const cB=ST.bills.filter(b=>b.month===nm());
  const bS=cB.reduce((a,b)=>a+b.amount,0);
  const bP=cB.filter(b=>b.paid).length;
  const dO=ST.debts.filter(d=>!d.paid);
  const dS=dO.reduce((a,b)=>a+b.amount,0);
  const sup=ST.shoppingList.filter(i=>!i.bought&&i.priority==='supérfluo');

  // Alerts
  let alHTML='';
  const ov=cB.filter(b=>!b.paid);
  if(dO.length||res<tIn*3&&tIn>0||ov.length||sup.length){
    let r='';
    if(dO.length)r+=`<div class="ar">🚫 <span>Nigro: quite dívidas ANTES de investir — ${fB(dS)}</span></div>`;
    if(res<tIn*3&&tIn>0)r+=`<div class="ar">🛡️ <span>Reserva insuficiente. Ideal: ${fB(tIn*6)}</span></div>`;
    if(ov.length)r+=`<div class="ar">⚠️ <span>${ov.length} conta(s) pendente — ${fB(ov.reduce((a,b)=>a+b.amount,0))}</span></div>`;
    if(sup.length)r+=`<div class="ar">🚨 <span>${sup.length} item supérfluo na lista!</span></div>`;
    alHTML=`<div class="ab">${r}</div>`;
  }

  // Streak
  const streakHTML=ST.streak>0?`<div class="streak-card">
    <span class="streak-fire">🔥</span>
    <div class="f1">
      <p style="font-size:11px;color:var(--muted2);margin-bottom:2px">Dias sem compra supérflua</p>
      <p class="streak-num">${ST.streak} dias</p>
    </div>
    <div style="text-align:right">
      <p style="font-size:10px;color:var(--yellow)">Continue assim!</p>
      ${ST.streak>=7?'<p style="font-size:18px">🏆</p>':''}
    </div>
  </div>`:'';

  // Balance history chart
  const hist=ST.balanceHistory||[];
  let chartHTML='';
  if(hist.length>1){
    const last14=hist.slice(-14);
    const maxV=Math.max(...last14.map(h=>Math.abs(h.value)),1);
    const bars=last14.map(h=>{
      const pct=Math.min((Math.abs(h.value)/maxV)*80,80);
      const color=h.value>=0?'var(--green)':'var(--red)';
      const lbl=new Date(h.value>=0?h.date:h.date).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'}).slice(0,5);
      return `<div class="chart-bar-group"><div class="chart-bars"><div class="chart-bar" style="height:${pct}px;background:${color}"></div></div><span class="chart-lbl">${lbl}</span></div>`;
    }).join('');
    chartHTML=`<div class="card"><p class="sl">Evolução do saldo</p><div class="chart-wrap">${bars}</div></div>`;
  }

  // Category spending this month
  const curMTx=ST.transactions.filter(t=>{const d=new Date(t.date);return t.type==='expense'&&`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`===nm();});
  const catSpend={};
  curMTx.forEach(t=>{catSpend[t.category]=(catSpend[t.category]||0)+t.amount;});
  const totalMthExp=Object.values(catSpend).reduce((a,b)=>a+b,0);
  let budgetHTML='';
  if(totalMthExp>0&&Object.keys(ST.budgetLimits||{}).length>0){
    const rows=Object.entries(ST.budgetLimits).filter(([,v])=>v>0).map(([catId,limit])=>{
      const spent=catSpend[catId]||0;
      const pct=Math.min((spent/limit)*100,100);
      const cat=gc(TXC,catId);
      const over=spent>limit;
      return `<div style="margin-bottom:10px">
        <div class="rb"><span style="font-size:12px;font-weight:600">${cat.emoji} ${cat.label}</span>
          <span class="ti" style="color:${over?'var(--red)':'var(--muted)'}">${fB(spent)} / ${fB(limit)}</span>
        </div>
        <div class="budget-bar"><div class="budget-fill ${over?'over':''}" style="width:${pct}%;background:${over?'var(--red)':cat.color}"></div></div>
        ${over?`<span class="ti" style="color:var(--red)">⚠️ Estourou ${fB(spent-limit)}</span>`:`<span class="ti" style="color:var(--muted2)">${fP(100-pct)} disponível</span>`}
      </div>`;
    }).join('');
    if(rows)budgetHTML=`<div class="card"><div class="rb"><p class="sl">Limites por categoria</p><button class="gb" onclick="om('budget')">⚙️ Editar</button></div>${rows}</div>`;
  } else if(!budgetHTML){
    budgetHTML=`<div class="card" style="border-style:dashed;opacity:.6"><div class="rb"><p class="sl">Limites por categoria</p><button class="gb" onclick="om('budget')">+ Configurar</button></div><p class="mu" style="font-size:11px">Defina limites mensais para controlar gastos</p></div>`;
  }

  // Recent transactions (last 6)
  const txR=ST.transactions.slice(0,6).map(tx=>txRow(tx)).join('');

  return `
  <div class="card" style="animation:glow 3s infinite">
    <div class="rb"><span class="sl">META R$ 100.000</span><span class="bg2" style="color:var(--green);background:rgba(74,222,128,.1)">${fP(prog)}</span></div>
    <div class="tr"><div class="tf" style="width:${prog}%"></div></div>
    <div class="rb"><span class="mu">${fB(ST.balance)} guardado</span><span class="mu">${fB(Math.max(GOAL-ST.balance,0))} restante</span></div>
  </div>
  <div class="g2">
    <div class="sc" style="border-color:rgba(74,222,128,.3)"><span>📈</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--green)">${fB(tIn)}</span><span class="ti">Entradas</span></div>
    <div class="sc" style="border-color:rgba(248,113,113,.3)"><span>📉</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--red)">${fB(tOut)}</span><span class="ti">Saídas</span></div>
    <div class="sc" style="border-color:rgba(250,204,21,.3)"><span>📋</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--yellow)">${fB(bS)}</span><span class="ti">Contas/mês</span><span class="ti" style="color:var(--muted2)">${bP}/${cB.length} pagas</span></div>
    <div class="sc" style="border-color:rgba(167,139,250,.3)"><span>📈</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--purple)">${fB(tInv)}</span><span class="ti">Investido</span><span class="ti" style="color:var(--muted2)">🛡️ ${fB(res)}</span></div>
  </div>
  ${alHTML}${streakHTML}${chartHTML}${budgetHTML}
  <div class="card">
    <div class="rb"><span class="sl">Transações recentes</span>
      <div class="rw" style="gap:6px">
        <button class="export-btn" onclick="exportCSV()">📥 CSV</button>
        <button class="export-btn" onclick="exportPDF()" style="background:rgba(248,113,113,.15);color:var(--red)">📄 PDF</button>
        <button class="gb" onclick="om('tx')">+ Adicionar</button>
      </div>
    </div>
    ${ST.transactions.length===0?'<p style="color:var(--muted);font-size:12px;text-align:center;padding:18px 0">Nenhuma transação ainda</p>':txR}
    ${ST.transactions.length>6?`<button class="gb" style="width:100%;margin-top:8px;padding:8px" onclick="sv('history')">Ver todas (${ST.transactions.length})</button>`:''}
  </div>`;
}

// ═══════ TRANSACTION ROW (shared) ═══════
function txRow(tx){
  const cat=gc(TXC,tx.category);
  const bg=tx.type==='income'?'var(--green)':cat.color;
  const ic=tx.type==='income'?'↑':cat.emoji;
  const col=tx.type==='income'?'var(--green)':'var(--red)';
  const rec=tx.recurring?'<span class="rec-badge">↻</span>':'';
  return `<div class="trow"><div class="dot" style="background:${bg};font-size:14px">${ic}</div><div class="f1"><span class="td">${es(tx.desc)}${rec}</span><span class="ti">${fD(tx.date)}</span></div><span class="ta mo" style="color:${col}">${tx.type==='income'?'+':'-'}${fB(tx.amount)}</span><button class="ib" style="color:var(--red);margin-left:6px;flex-shrink:0" onclick="dtx(${tx.id})">✕</button></div>`;
}

// ═══════ HISTORY (full transaction list with filters + pagination) ═══════
function rHistory(){
  // build month options from data
  const months=[...new Set(ST.transactions.map(t=>t.date?.substring(0,7)))].sort().reverse();
  const monthOpts=months.map(m=>`<option value="${m}" ${txFilterMonth===m?'selected':''}>${m}</option>`).join('');

  // apply filters
  let list=ST.transactions.slice();
  if(txFilterMonth) list=list.filter(t=>t.date?.startsWith(txFilterMonth));
  if(txFilterCat)   list=list.filter(t=>t.category===txFilterCat);
  if(txFilterType)  list=list.filter(t=>t.type===txFilterType);

  // stats for filtered set
  const fIn=list.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const fOut=list.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);

  // pagination
  const total=list.length;
  const pages=Math.ceil(total/txPerPage)||1;
  const page=Math.min(txPage,pages-1);
  const slice=list.slice(page*txPerPage,(page+1)*txPerPage);

  const catOpts=TXC.map(c=>`<option value="${c.id}" ${txFilterCat===c.id?'selected':''}>${c.emoji} ${c.label}</option>`).join('');
  const hasFilters=txFilterMonth||txFilterCat||txFilterType;

  return `
  <div class="card" style="padding:12px">
    <div class="rb" style="margin-bottom:10px">
      <p class="sl" style="margin:0">Todas as Transações</p>
      <div class="rw" style="gap:6px">
        <button class="export-btn" onclick="exportCSV()">📥 CSV</button>
        <button class="export-btn" onclick="exportPDF()" style="background:rgba(248,113,113,.15);color:var(--red)">📄 PDF</button>
        <button class="gb" onclick="om('tx')">+ Nova</button>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
      <select class="ip" style="flex:1;min-width:100px;padding:6px 8px;font-size:11px" onchange="setTxFilterMonth(this.value)">
        <option value="">Todos os meses</option>${monthOpts}
      </select>
      <select class="ip" style="flex:1;min-width:100px;padding:6px 8px;font-size:11px" onchange="setTxFilterCat(this.value)">
        <option value="">Todas categorias</option>${catOpts}
      </select>
      <select class="ip" style="flex:1;min-width:80px;padding:6px 8px;font-size:11px" onchange="setTxFilterType(this.value)">
        <option value="" ${!txFilterType?'selected':''}>Todos</option>
        <option value="income" ${txFilterType==='income'?'selected':''}>Entradas</option>
        <option value="expense" ${txFilterType==='expense'?'selected':''}>Saídas</option>
      </select>
      ${hasFilters?`<button class="ib" style="padding:6px 8px;font-size:11px;color:var(--muted)" onclick="clearTxFilters()">✕ Limpar</button>`:''}
    </div>
    ${total>0?`<div class="rw" style="gap:8px;margin-bottom:8px;font-size:11px;color:var(--muted2)">
      <span style="color:var(--green)">+${fB(fIn)}</span>
      <span style="color:var(--red)">-${fB(fOut)}</span>
      <span style="color:${fIn-fOut>=0?'var(--green)':'var(--red)'}">=  ${fB(fIn-fOut)}</span>
      <span style="margin-left:auto">${total} transaç${total===1?'ão':'ões'}</span>
    </div>`:''}
    ${slice.length===0?'<p style="color:var(--muted);font-size:12px;text-align:center;padding:18px 0">Nenhuma transação encontrada</p>':slice.map(tx=>txRow(tx)).join('')}
    ${pages>1?`<div class="rw" style="justify-content:center;gap:8px;margin-top:10px">
      <button class="ib" style="padding:4px 10px" ${page===0?'disabled':''} onclick="setTxPage(${page-1})">‹</button>
      <span style="font-size:12px;color:var(--muted2)">${page+1} / ${pages}</span>
      <button class="ib" style="padding:4px 10px" ${page>=pages-1?'disabled':''} onclick="setTxPage(${page+1})">›</button>
    </div>`:''}
  </div>`;
}

// ═══════ BILLS ═══════
function rBills(){
  const cB=ST.bills.filter(b=>b.month===nm());
  const bS=cB.reduce((a,b)=>a+b.amount,0);
  const bP=cB.filter(b=>b.paid).reduce((a,b)=>a+b.amount,0);
  const pct=bS>0?(bP/bS)*100:0;
  const rows=cB.length===0?`<div class="es"><span style="font-size:40px">📋</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Nenhuma conta este mês</p><button class="pb" onclick="om('bill')">Adicionar conta</button></div>`:
    cB.sort((a,b)=>(a.dueDay||0)-(b.dueDay||0)).map(b=>{
      const cat=gc(BLC,b.category);
      const isUrgent=!b.paid&&b.dueDay&&b.dueDay<=new Date().getDate()+2;
      return `<div class="lc" style="opacity:${b.paid?.6:1};border-color:${isUrgent?'rgba(248,113,113,.3)':''}">`+
        `<div class="dot" style="background:${b.paid?'var(--green)':isUrgent?'var(--red)':'var(--yellow)'}">${cat.emoji}</div>`+
        `<div class="f1"><div class="rb"><span class="td" style="text-decoration:${b.paid?'line-through':'none'}">${es(b.name)}</span><span class="ta mo" style="color:${b.paid?'var(--green)':isUrgent?'var(--red)':'var(--yellow)'}">${fB(b.amount)}</span></div>`+
        `<span class="ti">${cat.label}${b.dueDay?` · dia ${b.dueDay}`:''}${b.paid?' · ✓':isUrgent?' · ⚠️ urgente':''}</span></div>`+
        `<div class="ac"><button class="ib" style="color:var(--muted)" onclick="ebill(${b.id})">✏️</button><button class="ib" onclick="tbp(${b.id})">${b.paid?'↩':'✓'}</button><button class="ib" style="color:var(--red)" onclick="db(${b.id})">✕</button></div></div>`;
    }).join('');
  const hist=ST.bills.filter(b=>b.month!==nm()).slice(0,4).map(b=>{
    const[y,m]=b.month.split('-');
    return `<div class="lc" style="opacity:.4"><div class="dot" style="background:#334155">${gc(BLC,b.category).emoji}</div><div class="f1"><span class="td">${es(b.name)}</span><span class="ti">${MO[parseInt(m)-1]}/${y}</span></div><span class="ta mo">${fB(b.amount)}</span></div>`;
  }).join('');
  return `<div class="card"><div class="rb"><div><p class="sl">Contas do Mês</p><p class="mu">${MO[new Date().getMonth()]} ${new Date().getFullYear()}</p></div><button class="pb" onclick="om('bill')">+ Nova</button></div>
    <div class="pm" style="margin-top:12px"><div class="pf" style="width:${pct}%;background:var(--green)"></div></div>
    <div class="rb"><span class="mu" style="color:var(--green)">✓ ${fB(bP)} pago</span><span class="mu" style="color:var(--red)">✗ ${fB(bS-bP)} pendente</span></div>
  </div>${rows}${hist?`<p class="sl" style="margin-top:16px;margin-bottom:8px">Histórico</p>${hist}`:''}`;
}

// ═══════ DEBTS ═══════
function rDebts(){
  const dO=ST.debts.filter(d=>!d.paid);
  const dP=ST.debts.filter(d=>d.paid);
  const dS=dO.reduce((a,b)=>a+b.amount,0);
  const ban=dS>0?`<div class="card" style="border-color:rgba(248,113,113,.25);background:rgba(248,113,113,.04)"><p style="font-size:10px;color:var(--red);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">⚠️ PRINCÍPIO DO LIVRO</p><p style="font-size:12px;color:#fca5a5;line-height:1.5">"Quite suas dívidas ANTES de investir. O pobre paga juros para sempre. O rico os recebe." — Thiago Nigro</p></div>`:'';
  if(!dO.length&&!dP.length)return `${ban}<div class="card"><div class="rb"><div><p class="sl">O que você deve</p><p class="mo" style="font-size:22px;font-weight:800;color:var(--green)">${fB(0)}</p></div><button class="pb" onclick="om('debt')">+ Nova</button></div></div><div class="es"><span style="font-size:40px">🎉</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Nenhuma dívida! Continue assim.</p></div>`;
  const or=dO.sort((a,b)=>new Date(a.dueDate||'9999')-new Date(b.dueDate||'9999')).map(d=>{
    const isUrgent=d.dueDate&&new Date(d.dueDate)<new Date(Date.now()+7*86400000);
    return `<div class="lc" style="border-color:${isUrgent?'rgba(248,113,113,.3)':''}"><div class="dot" style="background:var(--red)">💳</div><div class="f1"><div class="rb"><span class="td">${es(d.creditor)}</span><span class="ta mo" style="color:var(--red)">${fB(d.amount)}</span></div><div class="rw">${d.dueDate?`<span class="ti" style="color:${isUrgent?'var(--red)':'var(--muted)'}">Vence: ${new Date(d.dueDate+'T00:00:00').toLocaleDateString('pt-BR')}${isUrgent?' ⚠️':''}</span>`:''}${d.note?`<span class="ti" style="margin-left:4px">· ${es(d.note)}</span>`:''}</div></div><div class="ac"><button class="ib" style="color:var(--yellow);font-size:15px" onclick="pdp(${d.id})" title="Pagar parcela">💰</button><button class="ib" style="color:var(--green)" onclick="tdp(${d.id})" title="Quitar tudo">✓</button><button class="ib" style="color:var(--red)" onclick="dd(${d.id})">✕</button></div></div>`;
  }).join('');
  const pr=dP.map(d=>`<div class="lc" style="opacity:.45"><div class="dot" style="background:var(--green)">✓</div><div class="f1"><span class="td" style="text-decoration:line-through">${es(d.creditor)}</span><span class="ti">${fB(d.amount)}</span></div><button class="ib" style="color:var(--red)" onclick="dd(${d.id})">✕</button></div>`).join('');
  return `${ban}<div class="card"><div class="rb"><div><p class="sl">O que você deve</p><p class="mo" style="font-size:22px;font-weight:800;color:${dS>0?'var(--red)':'var(--green)'}">${fB(dS)}</p></div><button class="pb" onclick="om('debt')">+ Nova</button></div></div>${or?`<p class="sl" style="margin-bottom:8px">Em aberto</p>${or}`:''}${pr?`<p class="sl" style="margin-top:16px;margin-bottom:8px">Quitadas ✓</p>${pr}`:''}`;
}

// ═══════ SHOPPING ═══════
function rShop(){
  const pend=ST.shoppingList.filter(i=>!i.bought);
  const bght=ST.shoppingList.filter(i=>i.bought);
  const byP={essencial:[],importante:[],desejo:[],'supérfluo':[],sem:[]};
  pend.forEach(i=>{const k=i.priority||'sem';byP[k].push(i);});
  const si=(i,ib=false)=>{
    const cfg=i.priority?PC[i.priority]:null;
    const di=ib?'✓':(cfg?cfg.icon:'⚪');
    return `<div class="lc" style="opacity:${ib?.5:1}"><div class="dot" style="background:${cfg?cfg.color:'#475569'};font-size:14px">${di}</div><div class="f1"><div class="rb"><span class="td" style="text-decoration:${ib?'line-through':'none'}">${es(i.name)}</span>${i.estimatedPrice>0?`<span class="ta mo" style="color:${cfg?cfg.color:'var(--muted)'}">${fB(i.estimatedPrice)}</span>`:''}</div>${i.aiJustification?`<p style="font-size:11px;color:${cfg?cfg.color:'var(--muted)'};margin-top:2px;line-height:1.4">📖 ${es(i.aiJustification)}</p>`:''}</div><div class="ac">${!ib?`<button class="ib" style="color:var(--green)" onclick="tb(${i.id})">✓</button>`:''}<button class="ib" style="color:var(--red)" onclick="dsi(${i.id})">✕</button></div></div>`;
  };
  let secs='';
  ['essencial','importante','desejo','supérfluo'].forEach(p=>{if(!byP[p].length)return;const cfg=PC[p];const tot=byP[p].reduce((a,b)=>a+(b.estimatedPrice||0),0);secs+=`<div style="margin-bottom:14px"><div class="ph" style="border-color:${cfg.border};background:${cfg.bg}"><span>${cfg.icon} ${cfg.label}</span><span class="mo" style="font-size:12px">${fB(tot)}</span></div>${byP[p].map(i=>si(i)).join('')}</div>`;});
  if(byP.sem.length)secs+=`<div style="margin-bottom:14px"><div class="ph" style="border-color:rgba(100,116,139,.3);background:rgba(100,116,139,.08)"><span>⚪ Aguardando análise</span></div>${byP.sem.map(i=>si(i)).join('')}</div>`;
  if(bght.length)secs+=`<div style="margin-bottom:14px"><p class="sl" style="margin-bottom:8px">Comprados ✓</p>${bght.slice(0,5).map(i=>si(i,true)).join('')}</div>`;
  const totalPend=pend.reduce((a,b)=>a+(b.estimatedPrice||0),0);
  const empty=!pend.length&&!bght.length?`<div class="es"><span style="font-size:40px">🛒</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Lista vazia.</p><button class="pb" onclick="om('shop')">Adicionar item</button></div>`:'';
  return `<div class="card"><div class="rb"><div><p class="sl">Lista de Compras</p><p class="mu">${pend.length} itens · ${fB(totalPend)}</p></div><div class="rw"><button class="gb" style="margin-right:6px" onclick="aip()" ${ap?'disabled':''}>🤖 ${ap?'...':'Priorizar'}</button><button class="pb" onclick="om('shop')">+ Item</button></div></div>${byP.sem.length?`<div class="tb" style="margin-top:8px">📖 "Antes de comprar, pense no custo de oportunidade." Use <b>Priorizar</b>.</div>`:''}</div>${empty}${secs}`;
}

// ═══════ INVEST ═══════
function rInvest(){
  const tI=ST.investments.reduce((a,b)=>a+b.amount,0);
  const res=ST.investments.filter(i=>i.type==='reserva').reduce((a,b)=>a+b.amount,0);
  const inc=parseFloat(ci)||0;
  const snav=`<div class="sn">${[{id:'portfolio',l:'💼 Carteira'},{id:'calculadora',l:'🧮 Calc'},{id:'juros',l:'📐 Juros'},{id:'ia',l:'🤖 IA'}].map(t=>`<button class="snb ${it===t.id?'act':''}" onclick="sit('${t.id}')">${t.l}</button>`).join('')}</div>`;
  if(it==='portfolio'){
    const mc=IVT.filter(t=>t.id!=='outro').map(t=>{const v=ST.investments.filter(i=>i.type===t.id).reduce((a,b)=>a+b.amount,0);if(!v)return '';return `<div class="sc" style="border-color:${t.color}33"><span style="font-size:16px">${t.emoji}</span><span class="mo" style="font-size:12px;font-weight:700;color:${t.color}">${fB(v)}</span><span class="ti">${t.label}</span></div>`;}).join('');
    const rc=['#4ade80','#06b6d4','#facc15','#f97316','#f87171'];
    const ir=ST.investments.length===0?`<div class="es"><span style="font-size:40px">📈</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Comece pelo fundo de emergência.</p><button class="pb" onclick="om('inv')">Adicionar investimento</button></div>`:
      ST.investments.map(inv=>{const t=gc(IVT,inv.type);const projV=inv.returnRate>0?inv.amount*Math.pow(1+inv.returnRate/100,1):0;return `<div class="lc"><div class="dot" style="background:${t.color};font-size:18px">${t.emoji}</div><div class="f1"><div class="rb"><span class="td">${es(inv.name)}</span><span class="ta mo" style="color:${t.color}">${fB(inv.amount)}</span></div><div class="rw"><span class="ti" style="color:${t.color}">${t.label}</span>${inv.returnRate>0?`<span class="ti" style="color:var(--green);margin-left:8px">+${inv.returnRate}%aa · proj.${fB(projV)}</span>`:''}<div class="rd" style="background:${rc[t.r]}"></div></div>${inv.note?`<span class="ti" style="color:var(--muted)">${es(inv.note)}</span>`:''}</div><button class="ib" style="color:var(--red)" onclick="di(${inv.id})">✕</button></div>`;}).join('');
    const rp=inc>0?Math.min((res/(inc*6))*100,100):0;
    return `${snav}<div class="card" style="background:linear-gradient(135deg,rgba(167,139,250,.08),rgba(74,222,128,.08));border-color:rgba(167,139,250,.2)"><p class="sl">Total Investido</p><p class="mo" style="font-size:28px;font-weight:800;color:var(--purple)">${fB(tI)}</p><div class="g3">${mc}</div></div>
    <div class="card" style="border-color:rgba(6,182,212,.25)"><div class="rb"><div><p class="sl">🛡️ Reserva de Emergência</p><p style="font-size:11px;color:var(--muted2);margin-top:2px">6x renda (CLT) · 12x (autônomo)</p></div><span class="mo" style="font-size:18px;font-weight:800;color:var(--cyan)">${fB(res)}</span></div>${inc>0?`<div class="pm" style="margin-top:10px"><div class="pf" style="width:${rp}%;background:var(--cyan)"></div></div><span class="ti" style="color:var(--cyan)">${fP(rp)} da ideal</span>`:''}</div>
    <div class="rb" style="margin-bottom:10px"><p class="sl" style="margin-bottom:0">Seus investimentos</p><button class="pb" onclick="om('inv')">+ Aportar</button></div>${ir}`;
  }
  if(it==='calculadora'){
    const cs=(parseFloat(ci)||0)-(parseFloat(ce)||0);
    const gn=parseFloat(cg)||GOAL;
    const rem=Math.max(gn-ST.balance,0);
    const mn=cs>0?Math.ceil(rem/cs):0;
    const ds=cs>0?(cs/30).toFixed(2):0;
    const sp=Math.min((ST.balance/gn)*100,100);
    const r50=inc*.5,r30=inc*.3,r10a=inc*.1,r10b=inc*.1;
    const rh=inc>0?`<div class="card"><p class="sl">Distribuição 50-30-10-10</p>${[{l:'50% Essenciais',v:r50,c:'var(--green)',d:'Moradia, alimentação, transporte'},{l:'30% Investimentos',v:r30,c:'var(--purple)',d:'OBRIGATÓRIO'},{l:'10% Outros',v:r10a,c:'var(--yellow)',d:'Extras controlados'},{l:'10% Liberdade',v:r10b,c:'var(--orange)',d:'Torrar sem culpa 🎉'}].map(d=>`<div style="margin-bottom:12px"><div class="rb"><span style="font-size:13px;font-weight:600">${d.l}</span><span class="ta mo" style="color:${d.c}">${fB(d.v)}/mês</span></div><p class="ti" style="color:var(--muted2);margin-bottom:4px">${d.d}</p><div class="pm"><div class="pf" style="width:100%;background:${d.c}"></div></div></div>`).join('')}</div>`:'';
    const sh=cs>0?`<div class="card" style="border-color:rgba(74,222,128,.2)"><p class="sl">Simulação</p><div class="g2"><div class="sc" style="border-color:rgba(74,222,128,.3)"><span>💰</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--green)">${fB(cs)}</span><span class="ti">Sobra/mês</span></div><div class="sc" style="border-color:rgba(6,182,212,.3)"><span>📅</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--cyan)">${fB(parseFloat(ds))}</span><span class="ti">Guardar/dia</span></div><div class="sc" style="border-color:rgba(167,139,250,.3)"><span>📆</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--purple)">${mn} meses</span><span class="ti">Para meta</span></div><div class="sc" style="border-color:rgba(250,204,21,.3)"><span>🏦</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--yellow)">${fB(ST.balance)}</span><span class="ti">Já guardado</span></div></div><div class="pm" style="margin-top:12px"><div class="pf" style="width:${sp}%;background:linear-gradient(90deg,var(--green2),var(--green))"></div></div><div class="rb"><span class="ti" style="color:var(--green)">${fP(sp)} da meta</span><span class="ti" style="color:var(--muted2)">${fB(rem)} restante</span></div><div class="tb" style="margin-top:10px">📖 "Não existe momento ideal para guardar. Quanto mais cedo, melhor." — Nigro</div></div>
    <div class="card"><p class="sl">Distribuição dos 30%</p>${[{l:'Reserva',p:40,c:'var(--cyan)',e:'🛡️',d:'Tesouro Selic ou CDB liq. diária'},{l:'Renda Fixa',p:30,c:'var(--green)',e:'🏦',d:'CDB >100% CDI ou LCI/LCA'},{l:'FIIs',p:20,c:'#818cf8',e:'🏢',d:'Dividendos mensais isentos'},{l:'Ações LP',p:10,c:'var(--orange)',e:'📈',d:'Fundamentos — NÃO day trade'}].map(d=>`<div style="margin-bottom:14px"><div class="rb"><span style="font-size:13px;font-weight:600">${d.e} ${d.l}</span><span class="ta mo" style="color:${d.c}">${fB(cs*.3*d.p/100)}/mês</span></div><div class="pm" style="margin-top:4px"><div class="pf" style="width:${d.p}%;background:${d.c}"></div></div><span class="ti" style="color:var(--muted2)">${d.p}% · ${d.d}</span></div>`).join('')}</div>`:'';
    return `${snav}<div class="card"><p class="sl">🧮 Regra 50-30-10-10</p><p class="lb">Renda mensal (R$)</p><input class="ip" type="number" placeholder="Ex: 3000" value="${ci}" oninput="ci=this.value;sit('calculadora')"/><p class="lb">Gastos mensais (R$)</p><input class="ip" type="number" placeholder="Ex: 2000" value="${ce}" oninput="ce=this.value;sit('calculadora')"/><p class="lb">Meta (R$)</p><input class="ip" type="number" placeholder="100000" value="${cg}" oninput="cg=this.value;sit('calculadora')"/></div>${rh}${sh}`;
  }
  if(it==='juros'){
    // Compound interest calculator
    const P=parseFloat(compInitial)||0;
    const pmt=parseFloat(compMonthly)||0;
    const r=parseFloat(compRate)||12;
    const n=parseFloat(compYears)||20;
    const rm=r/100/12;
    let total=P;
    const points=[];
    for(let m=1;m<=n*12;m++){total=total*(1+rm)+pmt;if(m%12===0)points.push({y:m/12,v:total});}
    const maxV=Math.max(...points.map(p=>p.v),1);
    const totalInvested=P+pmt*n*12;
    const bars=points.map((p,i)=>{
      const ht=Math.min((p.v/maxV)*80,80);
      const isM=p.y===1||p.y===5||p.y===10||p.y===n;
      return `<div class="chart-bar-group"><div class="chart-bars"><div class="chart-bar" style="height:${ht}px;background:linear-gradient(180deg,var(--purple),var(--green));width:12px"></div></div>${isM?`<span class="chart-lbl">${p.y}a</span>`:'<span class="chart-lbl"></span>'}</div>`;
    }).join('');
    return `${snav}<div class="card"><p class="sl">📐 Simulador de Juros Compostos</p>
    <p class="lb">Capital inicial (R$)</p><input class="ip" type="number" placeholder="Ex: 1000" value="${compInitial}" oninput="setComp('initial',this.value)"/>
    <p class="lb">Aporte mensal (R$)</p><input class="ip" type="number" placeholder="Ex: 500" value="${compMonthly}" oninput="setComp('monthly',this.value)"/>
    <div style="display:flex;gap:10px"><div style="flex:1"><p class="lb">Taxa anual (%)</p><input class="ip" type="number" placeholder="12" value="${compRate}" oninput="setComp('rate',this.value)"/></div><div style="flex:1"><p class="lb">Prazo (anos)</p><input class="ip" type="number" placeholder="20" value="${compYears}" oninput="setComp('years',this.value)"/></div></div></div>
    ${P||pmt?`<div class="compound-result"><p class="sl">Resultado após ${n} anos</p>
      <p class="mo" style="font-size:26px;font-weight:800;color:var(--green)">${fB(total)}</p>
      <div class="g2" style="margin-top:10px">
        <div class="sc" style="border-color:rgba(74,222,128,.3)"><span>💸</span><span class="mo" style="font-size:12px;color:var(--green)">${fB(totalInvested)}</span><span class="ti">Total investido</span></div>
        <div class="sc" style="border-color:rgba(167,139,250,.3)"><span>📈</span><span class="mo" style="font-size:12px;color:var(--purple)">${fB(total-totalInvested)}</span><span class="ti">Juros ganhos</span></div>
      </div>
      ${points.length>0?`<div style="margin-top:12px"><p class="sl">Evolução</p><div class="chart-wrap">${bars}</div></div>`:''}
      <div class="tb" style="margin-top:10px">📖 Tabela do Milhão: R$1k/mês a 12%aa = R$1M em ~20 anos</div>
    </div>`:''}`;
  }
  if(it==='ia'){
    const ah=invA?`${invA.citacaoLivro?`<div class="tb" style="border-color:rgba(167,139,250,.3);background:rgba(167,139,250,.08)">📖 <i>"${es(invA.citacaoLivro)}"</i></div>`:''}
    <div class="card" style="border-color:rgba(167,139,250,.2)"><div class="rb"><p class="sl">Diagnóstico</p>${invA.fase?`<span class="bg2" style="color:var(--purple);background:rgba(167,139,250,.1);font-size:10px">${invA.fase==='aspirante'?'🌱 Aspirante':invA.fase==='poupador'?'🏦 Poupador':'💼 Investidor'}</span>`:''}</div><p style="font-size:13px;line-height:1.6">${es(invA.diagnostico||'')}</p>${invA.proximoPasso?`<div class="tb" style="margin-top:10px;border-color:rgba(74,222,128,.3);background:rgba(74,222,128,.06)">✅ ${es(invA.proximoPasso)}</div>`:''}</div>
    ${invA.alertasPrioritarios?.length?`<div class="ab">${invA.alertasPrioritarios.map(a=>`<div class="ar">⚠️ <span>${es(a)}</span></div>`).join('')}</div>`:''}
    ${invA.recomendacoes?.length?`<p class="sl" style="margin-bottom:10px">🎯 Onde Investir</p>${invA.recomendacoes.map(r=>{const rc={baixo:'var(--green)',médio:'var(--yellow)',alto:'var(--red)'}[r.risco]||'var(--muted)';return `<div class="lc" style="flex-direction:column;align-items:flex-start;gap:8px"><div class="rb" style="width:100%"><div class="rw"><span style="font-size:22px">${r.emoji||'📊'}</span><div><p style="font-size:13px;font-weight:700">${es(r.titulo)}</p><p class="ti" style="color:var(--green)">${es(r.instrumento||'')}${r.ondeInvestir?' · '+es(r.ondeInvestir):''}</p></div></div><div style="text-align:right"><p class="mo" style="font-size:14px;font-weight:700;color:var(--purple)">${r.percentual}%</p><p class="ti" style="color:var(--green)">${es(r.rendimentoEstimado||'')}</p></div></div><p style="font-size:12px;color:var(--muted);line-height:1.5">${es(r.descricao||'')}</p><span class="bg2" style="color:${rc};background:${rc}18;font-size:10px">Risco ${r.risco}</span></div>`;}).join('')}`:''}`:
    '';
    const ch=ich.map(m=>`<div class="bub ${m.role==='user'?'usr':''}"><${m.role==='assistant'?'span style="font-size:18px;flex-shrink:0">📖</span>':''}<div class="bt">${es(m.content)}</div></div>`).join('');
    return `${snav}<div class="card" style="border-color:rgba(167,139,250,.2);background:rgba(167,139,250,.04)"><p class="sl">🤖 IA — Do Mil ao Milhão</p><p style="font-size:11px;color:var(--muted2);margin-bottom:10px">Preencha renda/gastos na Calculadora para análise precisa.</p><button class="pb" style="width:100%;padding:12px" onclick="anv()" ${ia?'disabled':''}>${ia?'🔄 Analisando...':'⚡ Gerar Análise Completa'}</button></div>
    ${ah}
    <div class="card" style="margin-top:8px"><p class="sl">💬 Perguntas sobre investimentos</p></div>
    <div class="cb2" id="icb">${ich.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:20px 0"><span style="font-size:36px">📖</span><p style="color:var(--muted2);font-size:12px;text-align:center;margin-top:8px">Baseado em <b style="color:var(--purple)">"Do Mil ao Milhão"</b></p><div class="sr">${['Como funciona o CDB?','Triângulo de Nigro?','Regra 50-30-10-10?','FII vs Imóvel?','Como chegar ao R$1M?'].map(s=>`<button class="sgb" onclick="sii('${s}')">${s}</button>`).join('')}</div></div>`:ch}${ial?`<div class="bub"><span style="font-size:18px">📖</span><div class="bt" style="animation:pulse 1s infinite">Consultando o livro...</div></div>`:''}</div>
    <div class="cr"><input class="ci" id="iai" placeholder="Pergunta sobre investimento..." onkeydown="if(event.key==='Enter')aia()"/><button class="snd" onclick="aia()" ${ial?'disabled':''}>➤</button></div>`;
  }
  return snav;
}

// ═══════ AI ═══════
function rAI(){
  const ch=ach.map(m=>`<div class="bub ${m.role==='user'?'usr':''}"><${m.role==='assistant'?'span style="font-size:18px;flex-shrink:0">💎</span>':''}<div class="bt">${es(m.content)}</div></div>`).join('');
  return `<div class="card"><p class="sl">🤖 RICO — Do Mil ao Milhão</p><p class="mu">Aplico os 3 pilares do Thiago Nigro: Gastar Bem, Investir Melhor e Ganhar Mais.</p></div>
  <div class="cb2" id="acb">${ach.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:24px 0"><span style="font-size:48px">💎</span><p style="color:var(--muted2);margin-top:12px;font-size:13px;text-align:center">Baseado em <b style="color:var(--green)">"Do Mil ao Milhão"</b></p><div class="sr">${['Analisa minha situação','Regra 50-30-10-10?','Plano para R$100k','Pilar 3: ganhar mais?','Gastos compulsivos?'].map(s=>`<button class="sgb" onclick="sai('${s}')">${s}</button>`).join('')}</div></div>`:ch}${al?`<div class="bub"><span style="font-size:18px">💎</span><div class="bt" style="animation:pulse 1s infinite">Aplicando princípios do livro...</div></div>`:''}</div>
  <div class="cr"><input class="ci" id="aii" placeholder="Escreva sua pergunta..." onkeydown="if(event.key==='Enter')aa()"/><button class="snd" onclick="aa()" ${al?'disabled':''}>➤</button></div>`;
}

// ═══════ AUX ═══════
function sit(t){it=t;render();}
function sai(s){const e=document.getElementById('aii');if(e)e.value=s;}
function sii(s){const e=document.getElementById('iai');if(e)e.value=s;}

// ═══════ MODALS ═══════
function om(type){
  const mc=document.getElementById('mc');
  if(type==='tx')mc.innerHTML=mTx();
  else if(type==='bill')mc.innerHTML=mBill();
  else if(type==='debt')mc.innerHTML=mDebt();
  else if(type==='shop')mc.innerHTML=mShop();
  else if(type==='inv')mc.innerHTML=mInv();
  else if(type==='budget')mc.innerHTML=mBudget();
  document.getElementById('mov').style.display='flex';
  setTimeout(()=>{const f=document.querySelector('.sh input');if(f)f.focus();},100);
}
function cm(){document.getElementById('mov').style.display='none';}

function mTx(){return `<p class="mt">Nova Transação</p>
  <div class="tt"><button class="tb2 exp" id="be" onclick="stt('expense')">💸 Gasto</button><button class="tb2" id="bi" onclick="stt('income')">💰 Entrada</button></div>
  <input type="hidden" id="tt" value="expense"/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ta" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Descrição</p><input class="ip" id="td" placeholder="Ex: iFood, salário..."/>
  <div id="tcw"><p class="lb">Categoria</p><select class="ip" id="tc">${TXC.map(c=>`<option value="${c.id}">${c.emoji} ${c.label}</option>`).join('')}</select></div>
  <div class="rw" style="margin-bottom:14px"><input type="checkbox" id="trec" style="margin-right:8px"/><label for="trec" style="font-size:12px;color:var(--muted)">↻ Transação recorrente (repete todo mês)</label></div>
  <button class="sb" onclick="stx()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`;}

function stt(t){
  document.getElementById('tt').value=t;
  document.getElementById('be').className='tb2'+(t==='expense'?' exp':'');
  document.getElementById('bi').className='tb2'+(t==='income'?' inc':'');
  document.getElementById('tcw').style.display=t==='expense'?'block':'none';
}

function stx(){
  const type=document.getElementById('tt').value;
  const amount=parseFloat(document.getElementById('ta').value.replace(',','.'));
  const desc=document.getElementById('td').value.trim();
  if(!amount||!desc)return;
  const category=type==='expense'?document.getElementById('tc').value:'outros';
  const recurring=document.getElementById('trec')?.checked||false;
  const newTx={id:Date.now(),type,amount,desc,category,date:new Date().toISOString(),recurring,recurringFrom:null};
  ST.transactions.unshift(newTx);
  ST.balance+=type==='income'?amount:-amount;
  recordBalance();
  saveRow('transactions',{user_id:currentUser?.id,created_id:String(newTx.id),type,amount,description:desc,category,date:newTx.date,recurring,recurring_from:null});
  sv_();cm();render();
}

function mBill(){const mo=nm();return `<p class="mt">Nova Conta</p>
  <p class="lb">Nome</p><input class="ip" id="bn" placeholder="Aluguel, Netflix..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Categoria</p><select class="ip" id="bc">${BLC.map(c=>`<option value="${c.id}">${c.emoji} ${c.label}</option>`).join('')}</select>
  <div style="display:flex;gap:10px"><div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" placeholder="15" inputmode="numeric"/></div><div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${mo}"/></div></div>
  <button class="sb" onclick="sbill()">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`;}

function sbill(){
  const name=document.getElementById('bn').value.trim();
  const amount=parseFloat(document.getElementById('ba').value.replace(',','.'));
  if(!name||!amount)return;
  const newBill={id:Date.now(),name,amount,category:document.getElementById('bc').value,dueDay:parseInt(document.getElementById('bd').value)||null,month:document.getElementById('bm').value,paid:false};
  ST.bills.push(newBill);
  saveRow('bills',{user_id:currentUser?.id,created_id:String(newBill.id),name,amount,category:newBill.category,due_day:newBill.dueDay,month:newBill.month,paid:false});
  sv_();cm();render();
}

function mDebt(){return `<p class="mt">Registrar Dívida</p>
  <div class="tb" style="margin-bottom:14px">📖 "Quite dívidas PRIMEIRO. O pobre paga juros para sempre."</div>
  <p class="lb">Para quem devo</p><input class="ip" id="dc" placeholder="Nubank, João..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="da" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Data vencimento</p><input class="ip" type="date" id="dd2"/>
  <p class="lb">Obs.</p><input class="ip" id="dn" placeholder="Juros, parcela..."/>
  <button class="sb" onclick="sdebt()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`;}

function sdebt(){
  const creditor=document.getElementById('dc').value.trim();
  const amount=parseFloat(document.getElementById('da').value.replace(',','.'));
  if(!creditor||!amount)return;
  const newDebt={id:Date.now(),creditor,amount,dueDate:document.getElementById('dd2').value,note:document.getElementById('dn').value,paid:false};
  ST.debts.push(newDebt);
  saveRow('debts',{user_id:currentUser?.id,created_id:String(newDebt.id),creditor,amount,due_date:newDebt.dueDate||null,note:newDebt.note||null,paid:false});
  sv_();cm();render();
}

function mShop(){return `<p class="mt">Adicionar Item</p>
  <div class="tb" style="margin-bottom:14px">📖 "Pense no custo de oportunidade antes de comprar."</div>
  <p class="lb">Nome do item</p><input class="ip" id="sn" placeholder="Tênis, fone, notebook..."/>
  <p class="lb">Preço estimado (R$)</p><input class="ip" type="number" id="sp" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Por que quer comprar?</p><input class="ip" id="sr2" placeholder="Preciso pro trabalho..."/>
  <button class="sb" onclick="sshop()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`;}

function sshop(){
  const name=document.getElementById('sn').value.trim();
  if(!name)return;
  const newShop={id:Date.now(),name,estimatedPrice:parseFloat(document.getElementById('sp').value||'0'),reason:document.getElementById('sr2').value||null,priority:null,aiJustification:null,bought:false,boughtAt:null};
  ST.shoppingList.push(newShop);
  saveRow('shopping_list',{user_id:currentUser?.id,created_id:String(newShop.id),name,estimated_price:newShop.estimatedPrice,reason:newShop.reason,priority:null,ai_justification:null,bought:false,bought_at:null});
  sv_();cm();render();
}

function mInv(){const opts=IVT.map(t=>`<option value="${t.id}">${t.emoji} ${t.label}</option>`).join('');
  return `<p class="mt">Novo Aporte</p>
  <div class="tb" style="margin-bottom:14px">📖 Triângulo de Nigro: <b>Risco × Liquidez × Rendimento</b></div>
  <p class="lb">Tipo</p><select class="ip" id="it2">${opts}</select>
  <p class="lb">Nome / onde está</p><input class="ip" id="in2" placeholder="CDB Nubank, Tesouro Selic..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ia2" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Rentabilidade (% a.a.)</p><input class="ip" type="number" id="ir2" placeholder="Ex: 13.5" inputmode="decimal"/>
  <p class="lb">Obs.</p><input class="ip" id="io2" placeholder="Vence em, plataforma..."/>
  <button class="sb" onclick="sinv()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`;}

function sinv(){
  const name=document.getElementById('in2').value.trim();
  const amount=parseFloat(document.getElementById('ia2').value.replace(',','.'));
  if(!name||!amount)return;
  const newInv={id:Date.now(),type:document.getElementById('it2').value,name,amount,returnRate:parseFloat(document.getElementById('ir2').value||'0'),note:document.getElementById('io2').value,date:new Date().toISOString()};
  ST.investments.unshift(newInv);
  saveRow('investments',{user_id:currentUser?.id,created_id:String(newInv.id),type:newInv.type,name,amount,return_rate:newInv.returnRate,note:newInv.note||null,date:newInv.date});
  sv_();cm();render();
}

function mBudget(){
  const rows=TXC.map(cat=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span style="font-size:18px;width:30px;text-align:center">${cat.emoji}</span>
    <div class="f1"><p style="font-size:12px;font-weight:600;margin-bottom:4px">${cat.label}</p>
      <input class="ip" type="number" style="margin-bottom:0" placeholder="0 = sem limite" inputmode="decimal"
        value="${ST.budgetLimits?.[cat.id]||''}" oninput="setBudget('${cat.id}',this.value)"/>
    </div>
  </div>`).join('');
  return `<p class="mt">⚙️ Limites por Categoria</p>
  <div class="tb" style="margin-bottom:14px">📖 Regra 50-30-10-10: essenciais devem usar no máx. 50% da sua renda.</div>
  ${rows}
  <button class="sb" onclick="cm();render()">✅ Salvar Limites</button><button class="cb" onclick="cm()">Cancelar</button>`;
}

function setBudget(catId,val){
  if(!ST.budgetLimits)ST.budgetLimits={};
  const v=parseFloat(val)||0;
  if(v>0)ST.budgetLimits[catId]=v;
  else delete ST.budgetLimits[catId];
  sv_();
}

// ═══════ EDIT BILL ═══════
function ebill(id){
  const b=ST.bills.find(b=>b.id===id);if(!b)return;
  const mc=document.getElementById('mc');
  mc.innerHTML=`<p class="mt">✏️ Editar Conta</p>
    <p class="lb">Nome</p><input class="ip" id="bn" value="${es(b.name)}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" value="${b.amount}" inputmode="decimal"/>
    <p class="lb">Categoria</p><select class="ip" id="bc">${BLC.map(c=>`<option value="${c.id}"${c.id===b.category?' selected':''}>${c.emoji} ${c.label}</option>`).join('')}</select>
    <div style="display:flex;gap:10px"><div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" value="${b.dueDay||''}" placeholder="15" inputmode="numeric"/></div><div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${b.month}"/></div></div>
    <button class="sb" onclick="uebill(${id})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`;
  document.getElementById('mov').style.display='flex';
}
function uebill(id){
  const b=ST.bills.find(b=>b.id===id);if(!b)return;
  const name=document.getElementById('bn').value.trim();
  const amount=parseFloat(document.getElementById('ba').value.replace(',','.'));
  if(!name||!amount)return;
  b.name=name; b.amount=amount;
  b.category=document.getElementById('bc').value;
  b.dueDay=parseInt(document.getElementById('bd').value)||null;
  b.month=document.getElementById('bm').value;
  saveRow('bills',{user_id:currentUser?.id,created_id:String(b.id),name,amount,category:b.category,due_day:b.dueDay,month:b.month,paid:b.paid});
  sv_();cm();render();
}

// ═══════ PARTIAL DEBT PAYMENT ═══════
function pdp(id){
  const d=ST.debts.find(d=>d.id===id);if(!d)return;
  const mc=document.getElementById('mc');
  mc.innerHTML=`<p class="mt">💰 Pagar Parcela</p>
    <div class="tb" style="margin-bottom:14px">Dívida com <strong>${es(d.creditor)}</strong><br><span style="color:var(--red)">Saldo restante: ${fB(d.amount)}</span></div>
    <p class="lb">Quanto você está pagando agora? (R$)</p>
    <input class="ip" type="number" id="pval" placeholder="0,00" inputmode="decimal"/>
    <p class="lb" style="margin-top:8px">Registrar como saída no saldo?</p>
    <div class="rw" style="margin-bottom:14px"><input type="checkbox" id="pdesc" checked style="margin-right:8px"/><label for="pdesc" style="font-size:12px;color:var(--muted)">Sim — descontar do saldo e criar transação</label></div>
    <button class="sb" onclick="appdp(${id})">✅ Registrar Pagamento</button><button class="cb" onclick="cm()">Cancelar</button>`;
  document.getElementById('mov').style.display='flex';
  setTimeout(()=>{const f=document.getElementById('pval');if(f)f.focus();},100);
}
function appdp(id){
  const d=ST.debts.find(d=>d.id===id);if(!d)return;
  const val=parseFloat(document.getElementById('pval').value.replace(',','.'));
  if(!val||val<=0)return;
  const descSaldo=document.getElementById('pdesc')?.checked!==false;
  d.amount=Math.max(0, +(d.amount-val).toFixed(2));
  if(d.amount===0) d.paid=true;
  if(descSaldo){
    const newTx={id:Date.now(),type:'expense',amount:val,desc:`Pagamento: ${d.creditor}`,category:'outros',date:new Date().toISOString(),recurring:false,recurringFrom:null};
    ST.transactions.unshift(newTx);
    ST.balance=+(ST.balance-val).toFixed(2);
    recordBalance();
    saveRow('transactions',{user_id:currentUser?.id,created_id:String(newTx.id),type:'expense',amount:val,description:newTx.desc,category:'outros',date:newTx.date,recurring:false,recurring_from:null});
  }
  saveRow('debts',{user_id:currentUser?.id,created_id:String(d.id),creditor:d.creditor,amount:d.amount,due_date:d.dueDate||null,note:d.note||null,paid:d.paid});
  sv_();cm();render();
}

// ═══════ ACTIONS ═══════
function tbp(id){
  const b=ST.bills.find(b=>b.id===id);
  if(b){
    b.paid=!b.paid;
    saveRow('bills',{user_id:currentUser?.id,created_id:String(b.id),name:b.name,amount:b.amount,category:b.category,due_day:b.dueDay,month:b.month,paid:b.paid});
    sv_();render();
  }
}
async function db(id){
  if(window.confirm('Excluir esta conta?')){
    await supabaseClient.from('bills').delete().eq('created_id', String(id));
    ST.bills=ST.bills.filter(b=>b.id!==id);sv_();render();
  }
}
function tdp(id){
  const d=ST.debts.find(d=>d.id===id);
  if(d){
    d.paid=!d.paid;
    saveRow('debts',{user_id:currentUser?.id,created_id:String(d.id),creditor:d.creditor,amount:d.amount,due_date:d.dueDate||null,note:d.note||null,paid:d.paid});
    sv_();render();
  }
}
async function dd(id){
  if(window.confirm('Excluir esta dívida?')){
    await supabaseClient.from('debts').delete().eq('created_id', String(id));
    ST.debts=ST.debts.filter(d=>d.id!==id);sv_();render();
  }
}
function tb(id){
  const i=ST.shoppingList.find(i=>i.id===id);
  if(i){i.bought=!i.bought;i.boughtAt=i.bought?new Date().toISOString():null;sv_();updateStreak();sv_();render();}
}
async function dsi(id){
  if(window.confirm('Excluir este item?')){
    await supabaseClient.from('shopping_list').delete().eq('created_id', String(id));
    ST.shoppingList=ST.shoppingList.filter(i=>i.id!==id);sv_();render();
  }
}
async function di(id){
  if(window.confirm('Excluir este investimento?')){
    await supabaseClient.from('investments').delete().eq('created_id', String(id));
    ST.investments=ST.investments.filter(i=>i.id!==id);sv_();render();
  }
}
async function dtx(id){
  if(window.confirm('Adverte! Deseja realmente apagar esta transação? A ação é irreversível.')){
    await supabaseClient.from('transactions').delete().eq('created_id', String(id));
    const tx=ST.transactions.find(t=>t.id===id);
    if(tx) ST.balance -= tx.type==='income'?tx.amount:-tx.amount;
    ST.transactions=ST.transactions.filter(t=>t.id!==id);
    recordBalance();sv_();render();
  }
}

// ═══════ EXPORT CSV ═══════
function exportCSV(){
  const rows=[['Data','Tipo','Descrição','Categoria','Valor']];
  ST.transactions.forEach(t=>{
    rows.push([fD(t.date),t.type==='income'?'Entrada':'Saída',t.desc,gc(TXC,t.category).label,t.amount.toFixed(2).replace('.',',')]);
  });
  const csv=rows.map(r=>r.map(v=>`"${v}"`).join(';')).join('\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`rico-${nm()}.csv`;a.click();
  URL.revokeObjectURL(url);
}

// ═══════ EXPORT PDF ═══════
function exportPDF(){
  // Apply current filters (same as history view)
  let list=ST.transactions.slice();
  if(txFilterMonth) list=list.filter(t=>t.date?.startsWith(txFilterMonth));
  if(txFilterCat)   list=list.filter(t=>t.category===txFilterCat);
  if(txFilterType)  list=list.filter(t=>t.type===txFilterType);

  const fIn=list.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const fOut=list.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  const label=txFilterMonth?` — ${txFilterMonth}`:'';
  const dateStr=new Date().toLocaleDateString('pt-BR');

  const rows=list.map(t=>{
    const cat=gc(TXC,t.category);
    const col=t.type==='income'?'#16a34a':'#dc2626';
    const sign=t.type==='income'?'+':'-';
    return `<tr><td>${fD(t.date)}</td><td>${t.type==='income'?'Entrada':'Saída'}</td><td>${es(t.desc)}</td><td>${cat.emoji} ${cat.label}</td><td style="text-align:right;color:${col};font-weight:600">${sign}${fB(t.amount)}</td></tr>`;
  }).join('');

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>RICO — Relatório${label}</title>
  <link rel="stylesheet" href="/style.css" /></head><body>
  <h1>💎 RICO — Relatório Financeiro${label}</h1>
  <p class="sub">Gerado em ${dateStr} · ${list.length} transaç${list.length===1?'ão':'ões'}</p>
  <div class="summary">
    <div class="scard"><div class="label">Entradas</div><div class="val" style="color:#16a34a">+${fB(fIn)}</div></div>
    <div class="scard"><div class="label">Saídas</div><div class="val" style="color:#dc2626">-${fB(fOut)}</div></div>
    <div class="scard"><div class="label">Resultado</div><div class="val" style="color:${fIn-fOut>=0?'#16a34a':'#dc2626'}">${fIn-fOut>=0?'+':''}${fB(fIn-fOut)}</div></div>
    <div class="scard"><div class="label">Saldo atual</div><div class="val" style="color:#4f46e5">${fB(ST.balance)}</div></div>
  </div>
  <table><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Categoria</th><th style="text-align:right">Valor</th></tr></thead>
  <tbody>${rows}</tbody>
  <tfoot><tr class="total-row"><td colspan="4">Total líquido${label}</td><td style="text-align:right;color:${fIn-fOut>=0?'#16a34a':'#dc2626'}">${fIn-fOut>=0?'+':''}${fB(fIn-fOut)}</td></tr></tfoot>
  </table>
  <script>window.onload=()=>window.print();<\/script>
  </body></html>`;

  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  window.open(url,'_blank');
  setTimeout(()=>URL.revokeObjectURL(url),10000);
}

// ═══════ AI CALLS ═══════
async function callAI(messages,system){
  const r=await fetch('https://vizsvjysklidnkzqxltn.supabase.co/functions/v1/openai_chat',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+supabaseKey},
    body:JSON.stringify({model:'gpt-4o-mini',max_tokens:1000,messages:[{role:'system',content:system},...messages]})
  });
  const d=await r.json();return d.choices?.[0]?.message?.content||'Erro ao conectar.';
}

async function aa(){
  const inp=document.getElementById('aii');if(!inp||!inp.value.trim()||al)return;
  const msg=inp.value.trim();inp.value='';al=true;
  ach.push({role:'user',content:msg});render();
  const tIn=ST.transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const tOut=ST.transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  const tInv=ST.investments.reduce((a,b)=>a+b.amount,0);
  const dS=ST.debts.filter(d=>!d.paid).reduce((a,b)=>a+b.amount,0);
  const sup=ST.shoppingList.filter(i=>!i.bought&&i.priority==='supérfluo');
  const sys=`${LV}\nVocê é RICO, assistente baseado em "Do Mil ao Milhão" de Thiago Nigro. Direto, empático, motivador.\nSaldo ${fB(ST.balance)} | Meta R$100k | ${fP(Math.min((ST.balance/GOAL)*100,100))} | Entradas ${fB(tIn)} | Saídas ${fB(tOut)} | Investido ${fB(tInv)} | Dívidas ${fB(dS)} | Supérfluos: ${sup.length} | Streak: ${ST.streak||0} dias\nMáx 3 parágrafos. Princípios do livro. Detecte compulsões. Meta R$100k→R$1M.`;
  try{const reply=await callAI(ach.map(m=>({role:m.role,content:m.content})),sys);ach.push({role:'assistant',content:reply});}
  catch(e){ach.push({role:'assistant',content:'❌ Erro de conexão. Verifique sua internet.'});}
  al=false;sv_();render();
}

async function aia(){
  const inp=document.getElementById('iai');if(!inp||!inp.value.trim()||ial)return;
  const msg=inp.value.trim();inp.value='';ial=true;
  ich.push({role:'user',content:msg});render();
  const tI=ST.investments.reduce((a,b)=>a+b.amount,0);
  const sys=`${LV}\nVocê é RICO, consultor de investimentos baseado em "Do Mil ao Milhão".\n${fB(tI)} investidos | Saldo: ${fB(ST.balance)} | Meta: R$100k\nMáx 3 parágrafos. Exemplos em R$. Cite corretoras reais. Princípios do livro.`;
  try{const reply=await callAI(ich.map(m=>({role:m.role,content:m.content})),sys);ich.push({role:'assistant',content:reply});}
  catch(e){ich.push({role:'assistant',content:'❌ Erro.'});}
  ial=false;sv_();render();
}

async function aip(){
  const pend=ST.shoppingList.filter(i=>!i.bought);
  if(!pend.length||ap)return;ap=true;render();
  const prompt=`${LV}\nClassifique usando custo de oportunidade:\n"essencial","importante","desejo","supérfluo"\nSaldo: ${fB(ST.balance)} | Meta: R$100k\n${pend.map((i,n)=>`${n+1}. id:${i.id} | ${i.name} | R$${i.estimatedPrice||'?'} | motivo: ${i.reason||'?'}`).join('\n')}\nJSON SOMENTE: {"items":[{"id":NUMERO,"priority":"valor","justification":"1 frase"}]}`;
  try{
    const raw=await callAI([{role:'user',content:prompt}],'Responda apenas JSON válido sem markdown.');
    const parsed=JSON.parse(raw.replace(/```json|```/g,'').trim());
    const map={};(parsed.items||[]).forEach(x=>{map[x.id]={priority:x.priority,aiJustification:x.justification};});
    ST.shoppingList=ST.shoppingList.map(i=>map[i.id]?{...i,...map[i.id]}:i);sv_();
  }catch(e){console.error(e);}ap=false;render();
}

async function anv(){
  if(ia)return;ia=true;render();
  const tI=ST.investments.reduce((a,b)=>a+b.amount,0);
  const res=ST.investments.filter(i=>i.type==='reserva').reduce((a,b)=>a+b.amount,0);
  const inc=parseFloat(ci)||0;const exp=parseFloat(ce)||0;const sur=inc-exp;
  const dT=ST.debts.filter(d=>!d.paid).reduce((a,b)=>a+b.amount,0);
  const prompt=`${LV}\nAnalisar com princípios do livro:\nSaldo: ${fB(ST.balance)} | Meta: R$100k | ${fP(Math.min((ST.balance/GOAL)*100,100))}\nRenda: ${fB(inc)} | Gastos: ${fB(exp)} | Sobra: ${fB(sur)}\nInvestido: ${fB(tI)} | Reserva: ${fB(res)} | Dívidas: ${fB(dT)}\nInvestimentos: ${ST.investments.map(i=>`${i.name}(${gc(IVT,i.type).label}):${fB(i.amount)}`).join(', ')||'nenhum'}\nJSON SOMENTE:\n{"diagnostico":"...","fase":"aspirante|poupador|investidor","reservaIdeal":N,"aporteMensalIdeal":N,"mesesParaMeta":N,"recomendacoes":[{"titulo":"...","instrumento":"...","descricao":"...","percentual":N,"risco":"baixo|médio|alto","rendimentoEstimado":"...","emoji":"...","ondeInvestir":"..."}],"alertasPrioritarios":["..."],"proximoPasso":"...","citacaoLivro":"..."}`;
  try{
    const raw=await callAI([{role:'user',content:prompt}],'Responda apenas JSON válido sem markdown.');
    invA=JSON.parse(raw.replace(/```json|```/g,'').trim());
  }catch(e){invA={diagnostico:'Erro ao conectar.',recomendacoes:[],alertasPrioritarios:[]};}
  ia=false;sv_();render();
}

// ═══════ PWA ═══════
function injectManifest(){
  const m={
    name:'RICO — Do Mil ao Milhão',short_name:'RICO',
    description:'Controle financeiro baseado no livro Do Mil ao Milhão — Thiago Nigro',
    start_url:'.',display:'standalone',background_color:'#06060f',
    theme_color:'#06060f',orientation:'portrait-primary',
    categories:['finance','productivity'],
    icons:[
      {src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' rx='40' fill='%2306060f'/%3E%3Ctext y='130' x='96' text-anchor='middle' font-size='110'%3E%F0%9F%92%8E%3C/text%3E%3C/svg%3E",sizes:'192x192',type:'image/svg+xml',purpose:'any maskable'},
      {src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='80' fill='%2306060f'/%3E%3Ctext y='360' x='256' text-anchor='middle' font-size='300'%3E%F0%9F%92%8E%3C/text%3E%3C/svg%3E",sizes:'512x512',type:'image/svg+xml',purpose:'any maskable'}
    ],
    shortcuts:[
      {name:'Nova Transação',short_name:'+ Tx',description:'Adicionar transação rapidamente',url:'./?action=tx'},
      {name:'Dashboard',short_name:'Início',description:'Ver dashboard',url:'.'}
    ]
  };
  const blob=new Blob([JSON.stringify(m)],{type:'application/manifest+json'});
  document.getElementById('mph').href=URL.createObjectURL(blob);
}

// Service Worker para cache offline
function registerSW(){
  if(!('serviceWorker' in navigator))return;
  const sw=`
const C='rico-app-v2';
const STATIC=['./'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(STATIC).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.url.includes('api.anthropic.com'))return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const fetchPromise=fetch(e.request).then(r=>{
        if(r.ok){const c=r.clone();caches.open(C).then(cache=>cache.put(e.request,c));}
        return r;
      }).catch(()=>cached);
      return cached||fetchPromise;
    })
  );
});`;
  const blob=new Blob([sw],{type:'application/javascript'});
  navigator.serviceWorker.register(URL.createObjectURL(blob))
    .then(()=>console.log('SW registered'))
    .catch(()=>{});
}

// Install prompt
let dp=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();dp=e;
  setTimeout(showInstallBanner,1500);
});
function showInstallBanner(){
  if(window.matchMedia('(display-mode: standalone)').matches)return;
  const b=document.createElement('div');
  b.id='ibanner';
  b.style.cssText='position:fixed;bottom:calc(80px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid rgba(74,222,128,.35);border-radius:14px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px;z-index:50;max-width:440px;width:calc(100% - 32px);box-shadow:0 8px 32px rgba(0,0,0,.4)';
  b.innerHTML=`<div><p style="font-size:12px;font-weight:700;color:var(--green)">📲 Instalar RICO como App</p><p style="font-size:11px;color:var(--muted2);margin-top:2px">Funciona offline · Dados salvos no dispositivo</p></div><div style="display:flex;gap:8px"><button onclick="document.getElementById('ibanner').remove()" style="background:transparent;border:1px solid var(--border);border-radius:8px;padding:6px 10px;color:var(--muted);font-size:11px">✕</button><button onclick="iapp()" style="background:linear-gradient(135deg,#16a34a,#4ade80);border:none;border-radius:8px;padding:7px 14px;color:#06060f;font-size:11px;font-weight:800;cursor:pointer">Instalar</button></div>`;
  document.body.appendChild(b);
}
async function iapp(){
  if(!dp)return;dp.prompt();
  const r=await dp.userChoice;dp=null;
  const b=document.getElementById('ibanner');if(b)b.remove();
}

// iOS hint
function showIOSHint(){
  if(window.navigator.standalone)return;
  if(!(/iPhone|iPad|iPod/.test(navigator.userAgent)))return;
  if(localStorage.getItem('ios-hint-shown'))return;
  localStorage.setItem('ios-hint-shown','1');
  setTimeout(()=>{
    const d=document.createElement('div');
    d.style.cssText='position:fixed;bottom:calc(90px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:#1e293b;border:1px solid rgba(74,222,128,.3);border-radius:14px;padding:14px 18px;font-size:12px;color:#e2e8f0;z-index:50;max-width:300px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.6)';
    d.innerHTML='📲 <b>Instalar no iPhone:</b><br/>Toque em <b>Compartilhar</b> (⬆️)<br/>depois <b>"Adicionar à Tela Inicial"</b><br/><span style="font-size:10px;color:#475569;margin-top:6px;display:block">Toque para fechar</span>';
    d.onclick=()=>d.remove();
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),8000);
  },2000);
}

// ═══════ GLOBAL SCOPE EXPORTS (Vite module → window) ═══════
// Vite compila main.js como ES module — funções ficam em escopo de módulo.
// Os inline handlers do HTML (onclick, oninput) precisam de acesso global via window.

// Setters para variáveis de módulo usadas em inline handlers
function setTxFilterMonth(v){ txFilterMonth=v; txPage=0; render(); }
function setTxFilterCat(v)  { txFilterCat=v;   txPage=0; render(); }
function setTxFilterType(v) { txFilterType=v;  txPage=0; render(); }
function clearTxFilters()   { txFilterMonth=''; txFilterCat=''; txFilterType=''; txPage=0; render(); }
function setTxPage(v)       { txPage=v; render(); }
function setComp(field, v)  {
  if(field==='initial') compInitial=v;
  else if(field==='monthly') compMonthly=v;
  else if(field==='rate') compRate=v;
  else if(field==='years') compYears=v;
  sit('juros');
}

Object.assign(window, {
  // Auth
  doLogin, doLogout, doRegister,
  // UI
  toggleTheme, sv, om, cm, render,
  // Export
  exportCSV, exportPDF,
  // Transactions
  dtx,
  // Bills
  tbp, db,
  // Debts
  tdp, dd,
  // Shopping
  tb, dsi,
  // Investments
  di,
  // Forms
  sit, stt, stx, sbill, sdebt, sshop, sinv,
  // Bill edit
  ebill, uebill,
  // Debt partial payment
  pdp, appdp,
  // Budget
  setBudget,
  // AI
  aa, aia, anv,
  // Setters para variáveis de módulo
  setTxFilterMonth, setTxFilterCat, setTxFilterType,
  clearTxFilters, setTxPage, setComp
});

// ═══════ INIT ═══════
async function initApp() {
  const isLogged = await ld();
  if(!isLogged) return;
  applyTheme();
  processRecurring();
  updateStreak();
  recordBalance();
  flushQueue();
  checkBillNotifications();
  injectManifest();
  registerSW();
  showIOSHint();
  render();
}
initApp();

// Shortcut handler
const urlParams=new URLSearchParams(window.location.search);
if(urlParams.get('action')==='tx'){setTimeout(()=>om('tx'),500);}

// ═══════ AUTH BUTTON LISTENERS ═══════
document.getElementById('btn-login').addEventListener('click', doLogin);
document.getElementById('btn-register').addEventListener('click', doRegister);
document.getElementById('auth-pass').addEventListener('keydown', function(e){if(e.key==='Enter')doLogin();});
document.getElementById('auth-email').addEventListener('keydown', function(e){if(e.key==='Enter')doLogin();});

// Flush pending sync before page unload (evita perda de dados na recarga)
window.addEventListener('beforeunload', () => {
  if(currentUser && syncTimer){
    clearTimeout(syncTimer);
    pushToSupabase();
  }
});