(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=window.supabase.createClient(`https://vizsvjysklidnkzqxltn.supabase.co`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpenN2anlza2xpZG5renF4bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTMyOTEsImV4cCI6MjA5MTAyOTI5MX0.PDuihuZjEUyTwPIXSsXagKA5H0L7Cd0aATnZjUAbtLg`),t=1e5,n=[`Jan`,`Fev`,`Mar`,`Abr`,`Mai`,`Jun`,`Jul`,`Ago`,`Set`,`Out`,`Nov`,`Dez`],r=[{id:`alimentacao`,label:`Alimentação`,emoji:`🍔`,color:`#f97316`},{id:`transporte`,label:`Transporte`,emoji:`🚗`,color:`#3b82f6`},{id:`lazer`,label:`Lazer`,emoji:`🎮`,color:`#a855f7`},{id:`compras`,label:`Compras`,emoji:`🛍️`,color:`#ec4899`},{id:`saude`,label:`Saúde`,emoji:`💊`,color:`#10b981`},{id:`moradia`,label:`Moradia`,emoji:`🏠`,color:`#6366f1`},{id:`educacao`,label:`Educação`,emoji:`📚`,color:`#0ea5e9`},{id:`outros`,label:`Outros`,emoji:`📦`,color:`#64748b`}],i=[{id:`moradia`,label:`Moradia`,emoji:`🏠`},{id:`energia`,label:`Energia`,emoji:`⚡`},{id:`agua`,label:`Água`,emoji:`💧`},{id:`internet`,label:`Internet`,emoji:`📡`},{id:`cartao`,label:`Cartão`,emoji:`💳`},{id:`streaming`,label:`Streaming`,emoji:`📺`},{id:`celular`,label:`Celular`,emoji:`📱`},{id:`outros`,label:`Outros`,emoji:`📦`}],a={essencial:{label:`Essencial`,color:`#4ade80`,bg:`rgba(74,222,128,.12)`,border:`rgba(74,222,128,.3)`,icon:`🟢`},importante:{label:`Importante`,color:`#facc15`,bg:`rgba(250,204,21,.12)`,border:`rgba(250,204,21,.3)`,icon:`🟡`},desejo:{label:`Desejo`,color:`#f97316`,bg:`rgba(249,115,22,.12)`,border:`rgba(249,115,22,.3)`,icon:`🟠`},supérfluo:{label:`Supérfluo`,color:`#f87171`,bg:`rgba(248,113,113,.12)`,border:`rgba(248,113,113,.3)`,icon:`🔴`}},o=[{id:`reserva`,label:`Reserva Emergência`,emoji:`🛡️`,color:`#06b6d4`,r:0},{id:`rendafixa`,label:`Renda Fixa`,emoji:`🏦`,color:`#4ade80`,r:1},{id:`tesouro`,label:`Tesouro Direto`,emoji:`🇧🇷`,color:`#22d3ee`,r:1},{id:`fii`,label:`FIIs`,emoji:`🏢`,color:`#818cf8`,r:2},{id:`fundos`,label:`Fundos`,emoji:`📊`,color:`#a78bfa`,r:2},{id:`acoes`,label:`Ações`,emoji:`📈`,color:`#fb923c`,r:3},{id:`cripto`,label:`Cripto`,emoji:`₿`,color:`#f59e0b`,r:4},{id:`outro`,label:`Outro`,emoji:`💡`,color:`#94a3b8`,r:2}],s=`PRINCÍPIOS DE FINANÇAS PESSOAIS:
3 PILARES: Gastar Bem, Investir Melhor, Ganhar Mais
REGRA 50-30-20: 50% essenciais, 30% qualidade de vida, 20% investimentos
FUNDO EMERGÊNCIA: 6-12x renda mensal. Tesouro Selic ou CDB liquidez diária. PRIORIDADE #1.
TRIÂNGULO DO INVESTIDOR: Risco x Liquidez x Rendimento. Tesouro Selic = benchmark.
HIERARQUIA: Fundo emergência > CDB/LCI/LCA > Tesouro IPCA+ > FIIs > Ações > Cripto
TABELA DO MILHÃO: R$1k/mês a 12%aa = R$1M em ~20 anos
QUITE DÍVIDAS ANTES DE INVESTIR. Juros de dívidas superam qualquer investimento.
Vendas ações <R$20k/mês = isentas IR. Máx 10 ativos. NÃO day trade.
LCI/LCA isenta IR. FII: dividendos mensais isentos IR.
GANHAR MAIS: mérito, escala, múltiplas fontes de renda.`,c={balance:0,transactions:[],bills:[],debts:[],shoppingList:[],investments:[],aiChat:[],invChat:[],budgetLimits:{},streak:0,lastNoSpurfluous:null,balanceHistory:[],theme:`dark`},l={currentUser:null,currentView:`dashboard`,investTab:`portfolio`,isLoggingOut:!1,ci:``,ce:``,cg:`100000`,compInitial:``,compMonthly:``,compRate:`12`,compYears:`20`,al:!1,ial:!1,ap:!1,ia:!1,invA:null,txPage:0,txPerPage:15,txFilterMonth:``,txFilterCat:``,txFilterType:``,txSearch:``,isOnline:navigator.onLine},u=`rico_v5`,d=JSON.parse(localStorage.getItem(`rico_sync_queue`)||`[]`);function f(){localStorage.setItem(`rico_sync_queue`,JSON.stringify(d))}function p(e){d.push(e),f()}var m=()=>{};function h(e){m=e}function g(){m()}function _(e,t=`var(--green)`){let n=document.getElementById(`rico-toast`);n||(n=document.createElement(`div`),n.id=`rico-toast`,n.style.cssText=`position:fixed;top:calc(env(safe-area-inset-top,0px)+12px);left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;transition:opacity .4s`,document.body.appendChild(n)),n.textContent=e,n.style.background=t===`var(--green)`?`rgba(74,222,128,.9)`:`rgba(248,113,113,.9)`,n.style.color=`#06060f`,n.style.opacity=`1`,clearTimeout(n._to),n._to=setTimeout(()=>n.style.opacity=`0`,2500)}async function v(){if(!l.isOnline||!l.currentUser||d.length===0)return;let t=[...d];for(let n of t)try{n.retries=(n.retries||0)+1;let t;if(n.type===`upsert`?t=await e.from(n.table).upsert(n.data):n.type===`delete`&&(t=await e.from(n.table).delete().eq(n.col,n.val)),t&&t.error&&t.error.message.includes(`fetch`)&&n.retries<5)break;d=d.filter(e=>e!==n)}catch{if((n.retries||0)>=5)d=d.filter(e=>e!==n);else break}f(),d.length===0&&_(`Dados sincronizados com a nuvem ✓`,`var(--green)`)}window.addEventListener(`online`,()=>{l.isOnline=!0,_(`Online — sincronizando...`),v(),g()}),window.addEventListener(`offline`,()=>{l.isOnline=!1,_(`Offline — dados salvos localmente`,`var(--red)`),g()});function y(t,n,r=`created_id`){l.currentUser&&e.from(t).upsert(n,{onConflict:r}).then(({error:e})=>{e&&console.error(`[save:${t}]`,e.message)})}function b(){l.currentUser&&y(`profiles`,{id:l.currentUser.id,balance:c.balance,streak:c.streak,last_no_spurfluous:c.lastNoSpurfluous,theme:c.theme,budget_limits:c.budgetLimits},`id`)}async function x(){if(!l.currentUser)return;let{error:t}=await e.from(`profiles`).upsert({id:l.currentUser.id,balance:c.balance,streak:c.streak,last_no_spurfluous:c.lastNoSpurfluous,theme:c.theme,budget_limits:c.budgetLimits});t&&console.error(`[sync] profiles:`,t.message);let n=async(t,n)=>{if(!n.length)return;let{error:r}=await e.from(t).upsert(n,{onConflict:`created_id`});r&&console.error(`[sync] ${t}:`,r.message)};if(await n(`transactions`,c.transactions.map(e=>({user_id:l.currentUser.id,created_id:String(e.id),type:e.type,amount:e.amount,description:e.desc,category:e.category,date:e.date,recurring:e.recurring||!1,recurring_from:e.recurringFrom||null}))),await n(`bills`,c.bills.map(e=>({user_id:l.currentUser.id,created_id:String(e.id),name:e.name,amount:e.amount,category:e.category,due_day:parseInt(e.dueDay)||null,month:e.month,paid:e.paid||!1}))),await n(`debts`,c.debts.map(e=>({user_id:l.currentUser.id,created_id:String(e.id),creditor:e.creditor,amount:e.amount,due_date:e.dueDate||null,note:e.note||null,paid:e.paid||!1}))),await n(`shopping_list`,c.shoppingList.map(e=>({user_id:l.currentUser.id,created_id:String(e.id),name:e.name,estimated_price:e.estimatedPrice||0,reason:e.reason||null,priority:e.priority||null,ai_justification:e.aiJustification||null,bought:e.bought||!1,bought_at:e.boughtAt||null}))),await n(`investments`,c.investments.map(e=>({user_id:l.currentUser.id,created_id:String(e.id),type:e.type,name:e.name,amount:e.amount,return_rate:e.returnRate||0,note:e.note||null,date:e.date}))),c.balanceHistory.length){let{error:t}=await e.from(`balance_history`).upsert(c.balanceHistory.map(e=>({user_id:l.currentUser.id,date:e.date,value:e.value})),{onConflict:`user_id,date`});t&&console.error(`[sync] balance_history:`,t.message)}}var S=null;function C(){try{localStorage.setItem(u,JSON.stringify({aiChat:c.aiChat,invChat:c.invChat,cache:{uid:l.currentUser?.id,balance:c.balance,transactions:c.transactions,bills:c.bills,debts:c.debts,shoppingList:c.shoppingList,investments:c.investments,budgetLimits:c.budgetLimits,streak:c.streak,lastNoSpurfluous:c.lastNoSpurfluous,balanceHistory:c.balanceHistory,theme:c.theme}}))}catch{}if(!l.isOnline){l.currentUser&&p({type:`upsert`,table:`profiles`,data:{id:l.currentUser.id,balance:c.balance,streak:c.streak,last_no_spurfluous:c.lastNoSpurfluous,theme:c.theme,budget_limits:c.budgetLimits}});return}S&&clearTimeout(S),S=setTimeout(x,1500)}async function ee(){if(!l.currentUser)return;let[t,n,r,i,a,o,s]=await Promise.all([e.from(`profiles`).select(`*`).eq(`id`,l.currentUser.id).maybeSingle(),e.from(`transactions`).select(`*`).eq(`user_id`,l.currentUser.id),e.from(`bills`).select(`*`).eq(`user_id`,l.currentUser.id),e.from(`debts`).select(`*`).eq(`user_id`,l.currentUser.id),e.from(`shopping_list`).select(`*`).eq(`user_id`,l.currentUser.id),e.from(`investments`).select(`*`).eq(`user_id`,l.currentUser.id),e.from(`balance_history`).select(`*`).eq(`user_id`,l.currentUser.id)]);t.data&&(c.balance=Number(t.data.balance)||0,c.streak=t.data.streak||0,c.lastNoSpurfluous=t.data.last_no_spurfluous,c.theme=t.data.theme||`dark`,c.budgetLimits=t.data.budget_limits||{}),n.data&&(c.transactions=n.data.map(e=>({id:parseFloat(e.created_id),type:e.type,amount:Number(e.amount),desc:e.description,category:e.category,date:e.date,recurring:e.recurring,recurringFrom:e.recurring_from})).sort((e,t)=>new Date(t.date)-new Date(e.date))),r.data&&(c.bills=r.data.map(e=>({id:parseFloat(e.created_id),name:e.name,amount:Number(e.amount),category:e.category,dueDay:e.due_day,month:e.month,paid:e.paid}))),i.data&&(c.debts=i.data.map(e=>({id:parseFloat(e.created_id),creditor:e.creditor,amount:Number(e.amount),dueDate:e.due_date,note:e.note,paid:e.paid}))),a.data&&(c.shoppingList=a.data.map(e=>({id:parseFloat(e.created_id),name:e.name,estimatedPrice:Number(e.estimated_price),reason:e.reason,priority:e.priority,aiJustification:e.ai_justification,bought:e.bought,boughtAt:e.bought_at}))),o.data&&(c.investments=o.data.map(e=>({id:parseFloat(e.created_id),type:e.type,name:e.name,amount:Number(e.amount),returnRate:Number(e.return_rate),note:e.note,date:e.date})).sort((e,t)=>new Date(t.date)-new Date(e.date))),s.data&&(c.balanceHistory=s.data.map(e=>({date:e.date,value:Number(e.value)})).sort((e,t)=>new Date(e.date)-new Date(t.date)))}async function te(){let e=null,t=localStorage.getItem(u);if(t)try{let n=JSON.parse(t);c.aiChat=n.aiChat||[],c.invChat=n.invChat||[],n.cache&&(e=n.cache.uid,c.balance=n.cache.balance??0,c.transactions=n.cache.transactions??[],c.bills=n.cache.bills??[],c.debts=n.cache.debts??[],c.shoppingList=n.cache.shoppingList??[],c.investments=n.cache.investments??[],c.budgetLimits=n.cache.budgetLimits??{},c.streak=n.cache.streak??0,c.lastNoSpurfluous=n.cache.lastNoSpurfluous??null,c.balanceHistory=n.cache.balanceHistory??[],c.theme=n.cache.theme??`dark`)}catch{}let n=localStorage.getItem(`rico_saved_email`);if(n){let e=document.getElementById(`auth-email`),t=document.getElementById(`auth-remember`);e&&(e.value=n),t&&(t.checked=!0)}return e&&(document.getElementById(`auth-overlay`).style.display=`none`,document.getElementById(`app`).style.display=`flex`,g()),e}window.addEventListener(`beforeunload`,()=>{l.currentUser&&S&&(clearTimeout(S),x())});var w=e=>new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(e||0),T=e=>new Date(e).toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`short`}),E=e=>`${(e||0).toFixed(1)}%`,D=()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`},O=(e,t)=>e.find(e=>e.id===t)||e[e.length-1],k=e=>String(e||``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`);function A(){let e=new Date;e.setMonth(e.getMonth()-1);let t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,n=D(),r=c.bills.filter(e=>e.month===t);if(!r.length){_(`Nenhuma conta no mês anterior`,`var(--red)`);return}let i=new Set(c.bills.filter(e=>e.month===n).map(e=>e.name.toLowerCase())),a=0;r.forEach(e=>{if(i.has(e.name.toLowerCase()))return;let t={id:Date.now()+Math.random(),name:e.name,amount:e.amount,category:e.category,dueDay:e.dueDay,month:n,paid:!1};c.bills.push(t),y(`bills`,{user_id:ne(),created_id:String(t.id),name:e.name,amount:e.amount,category:e.category,due_day:e.dueDay,month:n,paid:!1}),a++}),a>0?(C(),g(),_(`${a} conta${a>1?`s`:``} copiada${a>1?`s`:``} ✓`)):_(`Todas as contas já existem neste mês`,`var(--red)`)}function ne(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function j(){let e=[[`Data`,`Tipo`,`Descrição`,`Categoria`,`Valor`]];c.transactions.forEach(t=>{e.push([T(t.date),t.type===`income`?`Entrada`:`Saída`,t.desc,O(r,t.category).label,t.amount.toFixed(2).replace(`.`,`,`)])});let t=e.map(e=>e.map(e=>`"${e}"`).join(`;`)).join(`
`),n=new Blob([`﻿`+t],{type:`text/csv;charset=utf-8`}),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`rico-${D()}.csv`,a.click(),URL.revokeObjectURL(i)}function M(){let e=c.transactions.slice();l.txFilterMonth&&(e=e.filter(e=>e.date?.startsWith(l.txFilterMonth))),l.txFilterCat&&(e=e.filter(e=>e.category===l.txFilterCat)),l.txFilterType&&(e=e.filter(e=>e.type===l.txFilterType));let t=e.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0),n=e.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0),i=l.txFilterMonth?` — ${l.txFilterMonth}`:``,a=new Date().toLocaleDateString(`pt-BR`),o=e.map(e=>{let t=O(r,e.category),n=e.type===`income`?`#16a34a`:`#dc2626`,i=e.type===`income`?`+`:`-`;return`<tr><td>${T(e.date)}</td><td>${e.type===`income`?`Entrada`:`Saída`}</td><td>${k(e.desc)}</td><td>${t.emoji} ${t.label}</td><td style="text-align:right;color:${n};font-weight:600">${i}${w(e.amount)}</td></tr>`}).join(``),s=`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>RICO — Relatório${i}</title>
  <link rel="stylesheet" href="/style.css" /></head><body>
  <h1>💎 RICO — Relatório Financeiro${i}</h1>
  <p class="sub">Gerado em ${a} · ${e.length} transaç${e.length===1?`ão`:`ões`}</p>
  <div class="summary">
    <div class="scard"><div class="label">Entradas</div><div class="val" style="color:#16a34a">+${w(t)}</div></div>
    <div class="scard"><div class="label">Saídas</div><div class="val" style="color:#dc2626">-${w(n)}</div></div>
    <div class="scard"><div class="label">Resultado</div><div class="val" style="color:${t-n>=0?`#16a34a`:`#dc2626`}">${t-n>=0?`+`:``}${w(t-n)}</div></div>
    <div class="scard"><div class="label">Saldo atual</div><div class="val" style="color:#4f46e5">${w(c.balance)}</div></div>
  </div>
  <table><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Categoria</th><th style="text-align:right">Valor</th></tr></thead>
  <tbody>${o}</tbody>
  <tfoot><tr class="total-row"><td colspan="4">Total líquido${i}</td><td style="text-align:right;color:${t-n>=0?`#16a34a`:`#dc2626`}">${t-n>=0?`+`:``}${w(t-n)}</td></tr></tfoot>
  </table>
  <script>window.onload=()=>window.print();<\/script>
  </body></html>`,u=new Blob([s],{type:`text/html;charset=utf-8`}),d=URL.createObjectURL(u);window.open(d,`_blank`),setTimeout(()=>URL.revokeObjectURL(d),1e4)}function N(){let e=new Date,t=D();c.transactions.filter(e=>e.recurring).forEach(n=>{let r=new Date(n.date);if((e.getFullYear()-r.getFullYear())*12+(e.getMonth()-r.getMonth())>=1&&!c.transactions.some(e=>e.recurringFrom===n.id&&e.date.startsWith(t))){let e={id:Date.now()+Math.random(),type:n.type,amount:n.amount,desc:n.desc+`(recorrente)`,category:n.category,date:new Date().toISOString(),recurringFrom:n.id};c.transactions.unshift(e),c.balance+=n.type===`income`?n.amount:-n.amount}})}function P(){let e=new Date().toDateString();if(!c.shoppingList.some(t=>t.bought&&t.priority===`supérfluo`&&new Date(t.boughtAt||0).toDateString()===e)){let t=c.lastNoSpurfluous,n=new Date;n.setDate(n.getDate()-1),t===n.toDateString()||t===e?t!==e&&(c.streak=(c.streak||0)+1,c.lastNoSpurfluous=e):(c.streak=1,c.lastNoSpurfluous=e)}}function F(){let e=new Date().toISOString().split(`T`)[0],t=c.balanceHistory||[],n=t[t.length-1];!n||n.date!==e?t.push({date:e,value:c.balance}):t[t.length-1].value=c.balance,c.balanceHistory=t.slice(-90)}function re(e){let t=O(r,e.category),n=e.type===`income`?`var(--green)`:t.color,i=e.type===`income`?`↑`:t.emoji,a=e.type===`income`?`var(--green)`:`var(--red)`,o=e.recurring?`<span class="rec-badge">↻</span>`:``;return`<div class="trow"><div class="dot" style="background:${n};font-size:14px">${i}</div><div class="f1"><span class="td">${k(e.desc)}${o}</span><span class="ti">${T(e.date)}</span></div><span class="ta mo" style="color:${a}">${e.type===`income`?`+`:`-`}${w(e.amount)}</span><button class="ib" style="color:var(--red);margin-left:6px;flex-shrink:0" onclick="dtx(${e.id})">✕</button></div>`}function I(){let e=c.transactions.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0);c.transactions.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0);let i=c.investments.reduce((e,t)=>e+t.amount,0),a=c.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),o=Math.min(c.balance/t*100,100),s=c.bills.filter(e=>e.month===D()),u=s.reduce((e,t)=>e+t.amount,0),d=s.filter(e=>e.paid).length,f=c.debts.filter(e=>!e.paid),p=f.reduce((e,t)=>e+t.amount,0),m=c.shoppingList.filter(e=>!e.bought&&e.priority===`supérfluo`),h=c.balance+i-p,g=new Date;g.setMonth(g.getMonth()-1);let _=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,`0`)}`,v=c.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(D())).reduce((e,t)=>e+t.amount,0),y=c.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(D())).reduce((e,t)=>e+t.amount,0),b=c.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(_)).reduce((e,t)=>e+t.amount,0),x=c.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(_)).reduce((e,t)=>e+t.amount,0),S=v>0?(v-y)/v*100:0,C=S>=20?`var(--green)`:S>=10?`var(--yellow)`:`var(--red)`,ee=b>0?v>=b?`<span style="color:var(--green);font-size:9px">↑${Math.round((v-b)/b*100)}%</span>`:`<span style="color:var(--red);font-size:9px">↓${Math.round((b-v)/b*100)}%</span>`:``,te=x>0?y<=x?`<span style="color:var(--green);font-size:9px">↓${Math.round((x-y)/x*100)}%</span>`:`<span style="color:var(--red);font-size:9px">↑${Math.round((y-x)/x*100)}%</span>`:``,T=`<div class="g2" style="margin-bottom:0">
    <div class="sc" style="border-color:${h>=0?`rgba(74,222,128,.3)`:`rgba(248,113,113,.3)`}">
      <span>💰</span>
      <span class="mo" style="font-size:14px;font-weight:800;color:${h>=0?`var(--green)`:`var(--red)`}">${w(h)}</span>
      <span class="ti">Patrimônio Líquido</span>
    </div>
    <div class="sc" style="border-color:${C}33">
      <span>🏦</span>
      <span class="mo" style="font-size:14px;font-weight:800;color:${C}">${E(S)}</span>
      <span class="ti">Taxa de Poupança</span>
      <span class="ti" style="font-size:9px;color:var(--muted2)">ideal ≥ 20%</span>
    </div>
  </div>`,k=``,A=s.filter(e=>!e.paid);if(f.length||a<e*3&&e>0||A.length||m.length){let t=``;f.length&&(t+=`<div class="ar">🚫 <span>Quite dívidas ANTES de investir — ${w(p)} em aberto</span></div>`),a<e*3&&e>0&&(t+=`<div class="ar">🛡️ <span>Reserva insuficiente. Ideal: ${w(e*6)}</span></div>`),A.length&&(t+=`<div class="ar">⚠️ <span>${A.length} conta(s) pendente — ${w(A.reduce((e,t)=>e+t.amount,0))}</span></div>`),m.length&&(t+=`<div class="ar">🚨 <span>${m.length} item supérfluo na lista!</span></div>`),k=`<div class="ab">${t}</div>`}let ne=c.streak>0?`<div class="streak-card">
    <span class="streak-fire">🔥</span>
    <div class="f1">
      <p style="font-size:11px;color:var(--muted2);margin-bottom:2px">Dias sem compra supérflua</p>
      <p class="streak-num">${c.streak} dias</p>
    </div>
    <div style="text-align:right">
      <p style="font-size:10px;color:var(--yellow)">Continue assim!</p>
      ${c.streak>=7?`<p style="font-size:18px">🏆</p>`:``}
    </div>
  </div>`:``,j=c.balanceHistory||[],M=``;if(j.length>1){let e=j.slice(-14),t=e.map(e=>e.value),n=Math.max(...t),r=Math.min(...t),i=n-r||1,a=e.map((t,n)=>({x:10+n/Math.max(e.length-1,1)*320,y:75-(t.value-r)/i*65,val:t.value,date:t.date})),o=`M `+a.map(e=>`${e.x.toFixed(1)} ${e.y.toFixed(1)}`).join(` L `),s=`${o} L ${a[a.length-1].x.toFixed(1)} 80 L ${a[0].x.toFixed(1)} 80 Z`,c=e[e.length-1].value>=e[0].value,l=c?`var(--green)`:`var(--red)`,u=c?`url(#chart-area-green)`:`url(#chart-area-red)`,d=a[a.length-1],f=new Date(e[0].date+`T00:00:00`).toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`2-digit`}),p=new Date(e[e.length-1].date+`T00:00:00`).toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`2-digit`}),m=t.reduce((e,t)=>e+t,0)/t.length,h=75-(m-r)/i*65;M=`
    <div class="card" style="padding-bottom: 8px;">
      <p class="sl" style="margin-bottom: 8px;">Evolução do saldo</p>
      <div style="position: relative; width: 100%; height: 110px;">
        <svg viewBox="0 0 340 100" style="width: 100%; height: 100%; overflow: visible; display: block;">
          <defs>
            <linearGradient id="chart-area-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--green)" stop-opacity="0.15"></stop>
              <stop offset="100%" stop-color="var(--green)" stop-opacity="0.0"></stop>
            </linearGradient>
            <linearGradient id="chart-area-red" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--red)" stop-opacity="0.15"></stop>
              <stop offset="100%" stop-color="var(--red)" stop-opacity="0.0"></stop>
            </linearGradient>
          </defs>
          
          <!-- Linha de Média -->
          <line x1="10" y1="${h.toFixed(1)}" x2="330" y2="${h.toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
          <text x="330" y="${(h-4).toFixed(1)}" fill="var(--muted2)" font-size="7" font-family="'DM Mono', monospace" text-anchor="end">média ${w(m)}</text>
          
          <!-- Área do Gráfico -->
          <path d="${s}" fill="${u}" />
          
          <!-- Linha do Gráfico -->
          <path d="${o}" fill="none" stroke="${l}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          
          <!-- Círculos de Destaque no Último Ponto -->
          <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="3.5" fill="${l}" />
          <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="10" fill="${l}" opacity="0.3">
            <animate attributeName="r" values="3.5;10;3.5" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          
          <!-- Rótulos de Data -->
          <text x="10" y="94" fill="var(--muted)" font-size="8" font-family="'DM Mono', monospace">${f}</text>
          <text x="330" y="94" fill="var(--muted)" font-size="8" font-family="'DM Mono', monospace" text-anchor="end">${p}</text>
        </svg>
      </div>
    </div>`}let N=c.transactions.filter(e=>{let t=new Date(e.date);return e.type===`expense`&&`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`===D()}),P={};N.forEach(e=>{P[e.category]=(P[e.category]||0)+e.amount});let F=Object.values(P).reduce((e,t)=>e+t,0),I=``;if(F>0){let e=Object.entries(P).sort((e,t)=>t[1]-e[1]),t=0,i=`conic-gradient(${e.map(([e,n])=>{let i=n/F*360,a=O(r,e).color,o=t;return t+=i,`${a} ${o.toFixed(1)}deg ${t.toFixed(1)}deg`}).join(`,`)})`,a=e.slice(0,5).map(([e,t])=>{let n=O(r,e),i=(t/F*100).toFixed(0);return`<div class="rw" style="gap:6px;margin-bottom:5px;align-items:center">
        <div style="width:9px;height:9px;border-radius:50%;background:${n.color};flex-shrink:0"></div>
        <span style="font-size:11px;color:var(--muted2);flex:1">${n.emoji} ${n.label}</span>
        <span style="font-size:11px;font-weight:600">${i}% · ${w(t)}</span>
      </div>`}).join(``);I=`<div class="card"><p class="sl" style="margin-bottom:12px">Gastos por categoria · ${n[new Date().getMonth()]}</p><div style="display:flex;align-items:center;gap:18px"><div class="donut-anim" style="width:84px;height:84px;border-radius:50%;background:${i};flex-shrink:0;position:relative"><div style="position:absolute;inset:16px;border-radius:50%;background:var(--bg2);display:flex;align-items:center;justify-content:center"><span style="font-size:9px;font-weight:700;color:var(--muted2)">${w(F)}</span></div></div><div style="flex:1">${a}</div></div></div>`}let L=``;if(F>0&&Object.keys(c.budgetLimits||{}).length>0){let e=Object.entries(c.budgetLimits).filter(([,e])=>e>0).map(([e,t])=>{let n=P[e]||0,i=Math.min(n/t*100,100),a=O(r,e),o=n>t;return`<div style="margin-bottom:10px">
        <div class="rb"><span style="font-size:12px;font-weight:600">${a.emoji} ${a.label}</span>
          <span class="ti" style="color:${o?`var(--red)`:`var(--muted)`}">${w(n)} / ${w(t)}</span>
        </div>
        <div class="budget-bar"><div class="budget-fill ${o?`over`:``}" style="width:${i}%;background:${o?`var(--red)`:a.color}"></div></div>
        ${o?`<span class="ti" style="color:var(--red)">⚠️ Estourou ${w(n-t)}</span>`:`<span class="ti" style="color:var(--muted2)">${E(100-i)} disponível</span>`}
      </div>`}).join(``);e&&(L=`<div class="card"><div class="rb"><p class="sl">Limites por categoria</p><button class="gb" onclick="om('budget')">⚙️ Editar</button></div>${e}</div>`)}else L=`<div class="card" style="border-style:dashed;opacity:.6"><div class="rb"><p class="sl">Limites por categoria</p><button class="gb" onclick="om('budget')">+ Configurar</button></div><p class="mu" style="font-size:11px">Defina limites mensais para controlar gastos</p></div>`;let R=c.transactions.slice(0,6).map(e=>re(e)).join(``),z=l.currentUser?.email?.split(`@`)[0]||`usuário`,B=new Date().getHours(),V=B<12?`Bom dia`:B<18?`Boa tarde`:`Boa noite`;return`${`<div class="card" style="background:linear-gradient(135deg,rgba(74,222,128,.07),rgba(99,102,241,.07));border-color:rgba(74,222,128,.2);margin-bottom:0">
    <div class="rw" style="gap:12px;align-items:center">
      <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--purple));display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#06060f;flex-shrink:0;text-transform:uppercase">${z.charAt(0)}</div>
      <div>
        <p style="font-size:15px;font-weight:700;margin-bottom:2px">${V}, <span style="color:var(--green)">${z}</span>! 👋</p>
        <p class="ti" style="color:var(--muted2)">Aqui está seu resumo financeiro</p>
      </div>
    </div>
  </div>`}
  ${T}
  <div class="card" style="animation:glow 3s infinite">
    <div class="rb"><span class="sl">META R$ 100.000</span><span class="bg2" style="color:var(--green);background:rgba(74,222,128,.1)">${E(o)}</span></div>
    <div class="tr"><div class="tf" style="width:${o}%"></div></div>
    <div class="rb"><span class="mu">${w(c.balance)} guardado</span><span class="mu">${w(Math.max(t-c.balance,0))} restante</span></div>
  </div>
  <div class="g2">
    <div class="sc" style="border-color:rgba(74,222,128,.3)"><span>📈</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--green)">${w(v)}</span><span class="ti">Entradas/mês</span>${ee}</div>
    <div class="sc" style="border-color:rgba(248,113,113,.3)"><span>📉</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--red)">${w(y)}</span><span class="ti">Saídas/mês</span>${te}</div>
    <div class="sc" style="border-color:rgba(250,204,21,.3)"><span>📋</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--yellow)">${w(u)}</span><span class="ti">Contas/mês</span><span class="ti" style="color:var(--muted2)">${d}/${s.length} pagas</span></div>
    <div class="sc" style="border-color:rgba(167,139,250,.3)"><span>📈</span><span class="mo" style="font-size:14px;font-weight:700;color:var(--purple)">${w(i)}</span><span class="ti">Investido</span><span class="ti" style="color:var(--muted2)">🛡️ ${w(a)}</span></div>
  </div>
  ${k}${ne}${M}${I}${L}
  <div class="card">
    <div class="rb"><span class="sl">Transações recentes</span>
      <div class="rw" style="gap:6px">
        <button class="export-btn" onclick="exportCSV()">📥 CSV</button>
        <button class="export-btn" onclick="exportPDF()" style="background:rgba(248,113,113,.15);color:var(--red)">📄 PDF</button>
        <button class="gb" onclick="om('tx')">+ Adicionar</button>
      </div>
    </div>
    ${c.transactions.length===0?`<p style="color:var(--muted);font-size:12px;text-align:center;padding:18px 0">Nenhuma transação ainda</p>`:R}
    ${c.transactions.length>6?`<button class="gb" style="width:100%;margin-top:8px;padding:8px" onclick="sv('history')">Ver todas (${c.transactions.length})</button>`:``}
  </div>`}function L(){let e=[...new Set(c.transactions.map(e=>e.date?.substring(0,7)))].sort().reverse().map(e=>`<option value="${e}" ${l.txFilterMonth===e?`selected`:``}>${e}</option>`).join(``),t=c.transactions.slice();l.txFilterMonth&&(t=t.filter(e=>e.date?.startsWith(l.txFilterMonth))),l.txFilterCat&&(t=t.filter(e=>e.category===l.txFilterCat)),l.txFilterType&&(t=t.filter(e=>e.type===l.txFilterType)),l.txSearch&&(t=t.filter(e=>e.desc?.toLowerCase().includes(l.txSearch.toLowerCase())));let n=t.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0),i=t.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0),a=t.length,o=Math.ceil(a/l.txPerPage)||1,s=Math.min(l.txPage,o-1),u=t.slice(s*l.txPerPage,(s+1)*l.txPerPage),d=r.map(e=>`<option value="${e.id}" ${l.txFilterCat===e.id?`selected`:``}>${e.emoji} ${e.label}</option>`).join(``),f=l.txFilterMonth||l.txFilterCat||l.txFilterType||l.txSearch;return`
  <div class="card" style="padding:12px">
    <div class="rb" style="margin-bottom:10px">
      <p class="sl" style="margin:0">Todas as Transações</p>
      <div class="rw" style="gap:6px">
        <button class="export-btn" onclick="exportCSV()">📥 CSV</button>
        <button class="export-btn" onclick="exportPDF()" style="background:rgba(248,113,113,.15);color:var(--red)">📄 PDF</button>
        <button class="gb" onclick="om('tx')">+ Nova</button>
      </div>
    </div>
    <input class="ip" style="padding:7px 10px;font-size:12px;margin-bottom:8px" placeholder="🔍 Buscar por descrição..." value="${k(l.txSearch)}" oninput="setTxSearch(this.value)"/>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
      <select class="ip" style="flex:1;min-width:100px;padding:6px 8px;font-size:11px" onchange="setTxFilterMonth(this.value)">
        <option value="">Todos os meses</option>${e}
      </select>
      <select class="ip" style="flex:1;min-width:100px;padding:6px 8px;font-size:11px" onchange="setTxFilterCat(this.value)">
        <option value="">Todas categorias</option>${d}
      </select>
      <select class="ip" style="flex:1;min-width:80px;padding:6px 8px;font-size:11px" onchange="setTxFilterType(this.value)">
        <option value="" ${l.txFilterType?``:`selected`}>Todos</option>
        <option value="income" ${l.txFilterType===`income`?`selected`:``}>Entradas</option>
        <option value="expense" ${l.txFilterType===`expense`?`selected`:``}>Saídas</option>
      </select>
      ${f?`<button class="ib" style="padding:6px 8px;font-size:11px;color:var(--muted)" onclick="clearTxFilters()">✕ Limpar</button>`:``}
    </div>
    ${a>0?`<div class="rw" style="gap:8px;margin-bottom:8px;font-size:11px;color:var(--muted2)">
      <span style="color:var(--green)">+${w(n)}</span>
      <span style="color:var(--red)">-${w(i)}</span>
      <span style="color:${n-i>=0?`var(--green)`:`var(--red)`}">=  ${w(n-i)}</span>
      <span style="margin-left:auto">${a} transaç${a===1?`ão`:`ões`}</span>
    </div>`:``}
    ${u.length===0?`<p style="color:var(--muted);font-size:12px;text-align:center;padding:18px 0">Nenhuma transação encontrada</p>`:u.map(e=>re(e)).join(``)}
    ${o>1?`<div class="rw" style="justify-content:center;gap:8px;margin-top:10px">
      <button class="ib" style="padding:4px 10px" ${s===0?`disabled`:``} onclick="setTxPage(${s-1})">‹</button>
      <span style="font-size:12px;color:var(--muted2)">${s+1} / ${o}</span>
      <button class="ib" style="padding:4px 10px" ${s>=o-1?`disabled`:``} onclick="setTxPage(${s+1})">›</button>
    </div>`:``}
  </div>`}function R(){let e=c.bills.filter(e=>e.month===D()),t=e.reduce((e,t)=>e+t.amount,0),r=e.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),a=t>0?r/t*100:0,o=e.length===0?`<div class="es"><span style="font-size:40px">📋</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Nenhuma conta este mês</p><button class="pb" onclick="om('bill')">Adicionar conta</button></div>`:e.sort((e,t)=>(e.dueDay||0)-(t.dueDay||0)).map(e=>{let t=O(i,e.category),n=!e.paid&&e.dueDay&&e.dueDay<=new Date().getDate()+2;return`<div class="lc" style="opacity:${e.paid?.6:1};border-color:${n?`rgba(248,113,113,.3)`:``}"><div class="dot" style="background:${e.paid?`var(--green)`:n?`var(--red)`:`var(--yellow)`}">${t.emoji}</div><div class="f1"><div class="rb"><span class="td" style="text-decoration:${e.paid?`line-through`:`none`}">${k(e.name)}</span><span class="ta mo" style="color:${e.paid?`var(--green)`:n?`var(--red)`:`var(--yellow)`}">${w(e.amount)}</span></div><span class="ti">${t.label}${e.dueDay?` · dia ${e.dueDay}`:``}${e.paid?` · ✓`:n?` · ⚠️ urgente`:``}</span></div><div class="ac"><button class="ib" style="color:var(--muted)" onclick="ebill(${e.id})">✏️</button><button class="ib" onclick="tbp(${e.id})">${e.paid?`↩`:`✓`}</button><button class="ib" style="color:var(--red)" onclick="db(${e.id})">✕</button></div></div>`}).join(``),s=c.bills.filter(e=>e.month!==D()).slice(0,4).map(e=>{let[t,r]=e.month.split(`-`);return`<div class="lc" style="opacity:.4"><div class="dot" style="background:#334155">${O(i,e.category).emoji}</div><div class="f1"><span class="td">${k(e.name)}</span><span class="ti">${n[parseInt(r)-1]}/${t}</span></div><span class="ta mo">${w(e.amount)}</span></div>`}).join(``);return`<div class="card"><div class="rb"><div><p class="sl">Contas do Mês</p><p class="mu">${n[new Date().getMonth()]} ${new Date().getFullYear()}</p></div><div class="rw" style="gap:6px"><button class="gb" onclick="copyPrevBills()" title="Copiar contas do mês anterior">📋 Copiar mês ant.</button><button class="pb" onclick="om('bill')">+ Nova</button></div></div>
    <div class="pm" style="margin-top:12px"><div class="pf" style="width:${a}%;background:var(--green)"></div></div>
    <div class="rb"><span class="mu" style="color:var(--green)">✓ ${w(r)} pago</span><span class="mu" style="color:var(--red)">✗ ${w(t-r)} pendente</span></div>
  </div>${o}${s?`<p class="sl" style="margin-top:16px;margin-bottom:8px">Histórico</p>${s}`:``}`}function z(e){let t=c.bills.find(t=>t.id===e);t&&(t.paid=!t.paid,y(`bills`,{user_id:V(),created_id:String(t.id),name:t.name,amount:t.amount,category:t.category,due_day:t.dueDay,month:t.month,paid:t.paid}),C(),g())}async function B(t){window.confirm(`Excluir esta conta?`)&&(await e.from(`bills`).delete().eq(`created_id`,String(t)),c.bills=c.bills.filter(e=>e.id!==t),C(),g())}function V(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function ie(){let e=c.debts.filter(e=>!e.paid),t=c.debts.filter(e=>e.paid),n=e.reduce((e,t)=>e+t.amount,0),r=n>0?`<div class="card" style="border-color:rgba(248,113,113,.25);background:rgba(248,113,113,.04)">
    <p style="font-size:10px;color:var(--red);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">⚠️ DICA FINANCEIRA</p>
    <p style="font-size:12px;color:#fca5a5;line-height:1.5">Quite suas dívidas antes de investir — os juros das dívidas costumam superar qualquer rendimento de investimento.</p>
  </div>`:``;if(!e.length&&!t.length)return`${r}<div class="card"><div class="rb"><div><p class="sl">O que você deve</p><p class="mo" style="font-size:22px;font-weight:800;color:var(--green)">${w(0)}</p></div><button class="pb" onclick="om('debt')">+ Nova</button></div></div>
    <div class="es"><span style="font-size:40px">🎉</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Nenhuma dívida! Continue assim.</p></div>`;let i=e.sort((e,t)=>new Date(e.dueDate||`9999`)-new Date(t.dueDate||`9999`)).map(e=>{let t=e.dueDate&&new Date(e.dueDate)<new Date(Date.now()+7*864e5);return`<div class="lc" style="border-color:${t?`rgba(248,113,113,.3)`:``}">
      <div class="dot" style="background:var(--red)">💳</div>
      <div class="f1">
        <div class="rb"><span class="td">${k(e.creditor)}</span><span class="ta mo" style="color:var(--red)">${w(e.amount)}</span></div>
        <div class="rw">
          ${e.dueDate?`<span class="ti" style="color:${t?`var(--red)`:`var(--muted)`}">Vence: ${new Date(e.dueDate+`T00:00:00`).toLocaleDateString(`pt-BR`)}${t?` ⚠️`:``}</span>`:``}
          ${e.note?`<span class="ti" style="margin-left:4px">· ${k(e.note)}</span>`:``}
        </div>
      </div>
      <div class="ac">
        <button class="ib" style="color:var(--yellow);font-size:15px" onclick="pdp(${e.id})" title="Pagar parcela">💰</button>
        <button class="ib" style="color:var(--green)" onclick="tdp(${e.id})" title="Quitar tudo">✓</button>
        <button class="ib" style="color:var(--red)" onclick="dd(${e.id})">✕</button>
      </div>
    </div>`}).join(``),a=t.map(e=>`<div class="lc" style="opacity:.45">
    <div class="dot" style="background:var(--green)">✓</div>
    <div class="f1"><span class="td" style="text-decoration:line-through">${k(e.creditor)}</span><span class="ti">${w(e.amount)}</span></div>
    <button class="ib" style="color:var(--red)" onclick="dd(${e.id})">✕</button>
  </div>`).join(``);return`${r}
  <div class="card"><div class="rb"><div><p class="sl">O que você deve</p><p class="mo" style="font-size:22px;font-weight:800;color:${n>0?`var(--red)`:`var(--green)`}">${w(n)}</p></div><button class="pb" onclick="om('debt')">+ Nova</button></div></div>
  ${i?`<p class="sl" style="margin-bottom:8px">Em aberto</p>${i}`:``}
  ${a?`<p class="sl" style="margin-top:16px;margin-bottom:8px">Quitadas ✓</p>${a}`:``}`}function ae(e){let t=c.debts.find(t=>t.id===e);t&&(t.paid=!t.paid,y(`debts`,{user_id:se(),created_id:String(t.id),creditor:t.creditor,amount:t.amount,due_date:t.dueDate||null,note:t.note||null,paid:t.paid}),C(),g())}async function oe(t){window.confirm(`Excluir esta dívida?`)&&(await e.from(`debts`).delete().eq(`created_id`,String(t)),c.debts=c.debts.filter(e=>e.id!==t),C(),g())}function se(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function ce(){let e=c.shoppingList.filter(e=>!e.bought),t=c.shoppingList.filter(e=>e.bought),n={essencial:[],importante:[],desejo:[],supérfluo:[],sem:[]};e.forEach(e=>{let t=e.priority||`sem`;n[t]?n[t].push(e):n.sem.push(e)});let r=(e,t=!1)=>{let n=e.priority?a[e.priority]:null,r=t?`✓`:n?n.icon:`⚪`;return`<div class="lc" style="opacity:${t?.5:1}">
      <div class="dot" style="background:${n?n.color:`#475569`};font-size:14px">${r}</div>
      <div class="f1">
        <div class="rb">
          <span class="td" style="text-decoration:${t?`line-through`:`none`}">${k(e.name)}</span>
          ${e.estimatedPrice>0?`<span class="ta mo" style="color:${n?n.color:`var(--muted)`}">${w(e.estimatedPrice)}</span>`:``}
        </div>
        ${e.aiJustification?`<p style="font-size:11px;color:${n?n.color:`var(--muted)`};margin-top:2px;line-height:1.4">💡 ${k(e.aiJustification)}</p>`:``}
      </div>
      <div class="ac">
        ${t?``:`<button class="ib" style="color:var(--green)" onclick="tb(${e.id})">✓</button>`}
        <button class="ib" style="color:var(--red)" onclick="dsi(${e.id})">✕</button>
      </div>
    </div>`},i=``;[`essencial`,`importante`,`desejo`,`supérfluo`].forEach(e=>{if(!n[e].length)return;let t=a[e],o=n[e].reduce((e,t)=>e+(t.estimatedPrice||0),0);i+=`<div style="margin-bottom:14px">
      <div class="ph" style="border-color:${t.border};background:${t.bg}">
        <span>${t.icon} ${t.label}</span>
        <span class="mo" style="font-size:12px">${w(o)}</span>
      </div>
      ${n[e].map(e=>r(e)).join(``)}
    </div>`}),n.sem.length&&(i+=`<div style="margin-bottom:14px">
      <div class="ph" style="border-color:rgba(100,116,139,.3);background:rgba(100,116,139,.08)">
        <span>⚪ Aguardando análise</span>
      </div>
      ${n.sem.map(e=>r(e)).join(``)}
    </div>`),t.length&&(i+=`<div style="margin-bottom:14px">
      <p class="sl" style="margin-bottom:8px">Comprados ✓</p>
      ${t.slice(0,5).map(e=>r(e,!0)).join(``)}
    </div>`);let o=e.reduce((e,t)=>e+(t.estimatedPrice||0),0),s=!e.length&&!t.length?`<div class="es"><span style="font-size:40px">🛒</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Lista vazia.</p><button class="pb" onclick="om('shop')">Adicionar item</button></div>`:``;return`<div class="card">
    <div class="rb">
      <div>
        <p class="sl">Lista de Compras</p>
        <p class="mu">${e.length} itens · ${w(o)}</p>
      </div>
      <div class="rw">
        <button class="gb" style="margin-right:6px" onclick="aip()" ${l.ap?`disabled`:``}>🤖 ${l.ap?`...`:`Priorizar`}</button>
        <button class="pb" onclick="om('shop')">+ Item</button>
      </div>
    </div>
    ${n.sem.length?`<div class="tb" style="margin-top:8px">💡 Antes de comprar, pense no custo de oportunidade. Use <b>Priorizar</b> para classificar seus itens.</div>`:``}
  </div>${s}${i}`}function le(e){let t=c.shoppingList.find(t=>t.id===e);t&&(t.bought=!t.bought,t.boughtAt=t.bought?new Date().toISOString():null,saveRow(`shopping_list`,{user_id:de(),created_id:String(t.id),name:t.name,estimated_price:t.estimatedPrice,reason:t.reason,priority:t.priority,ai_justification:t.aiJustification,bought:t.bought,bought_at:t.boughtAt}),C(),P(),C(),g())}async function ue(t){window.confirm(`Excluir este item?`)&&(await e.from(`shopping_list`).delete().eq(`created_id`,String(t)),c.shoppingList=c.shoppingList.filter(e=>e.id!==t),C(),g())}function de(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function H(e){l.currentView=e,document.querySelectorAll(`.nb`).forEach(t=>t.classList.toggle(`act`,t.dataset.v===e));let t=document.getElementById(`fab`);t&&(t.style.display=e===`dashboard`?`flex`:`none`),g()}function fe(e){l.investTab=e,g()}function pe(){c.theme=c.theme===`dark`?`light`:`dark`,U(),C()}function U(){document.documentElement.setAttribute(`data-theme`,c.theme||`dark`);let e=document.getElementById(`theme-toggle`);e&&(e.className=`theme-btn`+(c.theme===`light`?` light`:``))}function me(){let e=c.investments.reduce((e,t)=>e+t.amount,0),t=c.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),n=parseFloat(l.ci)||0,r=`<div class="sn">${[{id:`portfolio`,l:`💼 Carteira`},{id:`calculadora`,l:`🧮 Calc`},{id:`juros`,l:`📐 Juros`},{id:`ia`,l:`🤖 IA`}].map(e=>`<button class="snb ${l.investTab===e.id?`act`:``}" onclick="sit('${e.id}')">${e.l}</button>`).join(``)}</div>`;if(l.investTab===`portfolio`){let i=o.filter(e=>e.id!==`outro`).map(e=>{let t=c.investments.filter(t=>t.type===e.id).reduce((e,t)=>e+t.amount,0);return t?`<div class="sc" style="border-color:${e.color}33">
        <span style="font-size:16px">${e.emoji}</span>
        <span class="mo" style="font-size:12px;font-weight:700;color:${e.color}">${w(t)}</span>
        <span class="ti">${e.label}</span>
      </div>`:``}).join(``),a=[`#4ade80`,`#06b6d4`,`#facc15`,`#f97316`,`#f87171`],s=c.investments.length===0?`<div class="es"><span style="font-size:40px">📈</span><p style="color:var(--muted);margin:8px 0 16px;font-size:13px">Comece pelo fundo de emergência.</p><button class="pb" onclick="om('inv')">Adicionar investimento</button></div>`:c.investments.map(e=>{let t=O(o,e.type),n=e.returnRate>0?e.amount*(1+e.returnRate/100)**1:0;return`<div class="lc">
          <div class="dot" style="background:${t.color};font-size:18px">${t.emoji}</div>
          <div class="f1">
            <div class="rb"><span class="td">${k(e.name)}</span><span class="ta mo" style="color:${t.color}">${w(e.amount)}</span></div>
            <div class="rw">
              <span class="ti" style="color:${t.color}">${t.label}</span>
              ${e.returnRate>0?`<span class="ti" style="color:var(--green);margin-left:8px">+${e.returnRate}%aa · proj.${w(n)}</span>`:``}
              <div class="rd" style="background:${a[t.r]}"></div>
            </div>
            ${e.note?`<span class="ti" style="color:var(--muted)">${k(e.note)}</span>`:``}
          </div>
          <button class="ib" style="color:var(--red)" onclick="di(${e.id})">✕</button>
        </div>`}).join(``),l=n>0?Math.min(t/(n*6)*100,100):0;return`${r}
    <div class="card" style="background:linear-gradient(135deg,rgba(167,139,250,.08),rgba(74,222,128,.08));border-color:rgba(167,139,250,.2)">
      <p class="sl">Total Investido</p>
      <p class="mo" style="font-size:28px;font-weight:800;color:var(--purple)">${w(e)}</p>
      <div class="g3">${i}</div>
    </div>
    <div class="card" style="border-color:rgba(6,182,212,.25)">
      <div class="rb">
        <div><p class="sl">🛡️ Reserva de Emergência</p><p style="font-size:11px;color:var(--muted2);margin-top:2px">6x renda (CLT) · 12x (autônomo)</p></div>
        <span class="mo" style="font-size:18px;font-weight:800;color:var(--cyan)">${w(t)}</span>
      </div>
      ${n>0?`<div class="pm" style="margin-top:10px"><div class="pf" style="width:${l}%;background:var(--cyan)"></div></div><span class="ti" style="color:var(--cyan)">${E(l)} da ideal</span>`:``}
    </div>
    <div class="rb" style="margin-bottom:10px"><p class="sl" style="margin-bottom:0">Seus investimentos</p><button class="pb" onclick="om('inv')">+ Aportar</button></div>
    ${s}`}if(l.investTab===`calculadora`){let e=parseFloat(l.ce)||0,t=parseFloat(l.cg)||1e5,i=n-e,a=Math.max(t-c.balance,0),o=i>0?Math.ceil(a/i):0,s=i>0?(i/30).toFixed(2):0,u=Math.min(c.balance/t*100,100),d=n*.5,f=n*.3,p=n*.1,m=n*.1,h=n>0?`<div class="card">
      <p class="sl">Distribuição 50-30-10-10</p>
      ${[{l:`50% Essenciais`,v:d,c:`var(--green)`,d:`Moradia, alimentação, transporte`},{l:`30% Investimentos`,v:f,c:`var(--purple)`,d:`OBRIGATÓRIO`},{l:`10% Outros`,v:p,c:`var(--yellow)`,d:`Extras controlados`},{l:`10% Liberdade`,v:m,c:`var(--orange)`,d:`Torrar sem culpa 🎉`}].map(e=>`<div style="margin-bottom:12px">
        <div class="rb"><span style="font-size:13px;font-weight:600">${e.l}</span><span class="ta mo" style="color:${e.c}">${w(e.v)}/mês</span></div>
        <p class="ti" style="color:var(--muted2);margin-bottom:4px">${e.d}</p>
        <div class="pm"><div class="pf" style="width:100%;background:${e.c}"></div></div>
      </div>`).join(``)}
    </div>`:``,g=i>0?`<div class="card" style="border-color:rgba(74,222,128,.2)">
      <p class="sl">Simulação</p>
      <div class="g2">
        <div class="sc" style="border-color:rgba(74,222,128,.3)"><span>💰</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--green)">${w(i)}</span><span class="ti">Sobra/mês</span></div>
        <div class="sc" style="border-color:rgba(6,182,212,.3)"><span>📅</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--cyan)">${w(parseFloat(s))}</span><span class="ti">Guardar/dia</span></div>
        <div class="sc" style="border-color:rgba(167,139,250,.3)"><span>│</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--purple)">${o} meses</span><span class="ti">Para meta</span></div>
        <div class="sc" style="border-color:rgba(250,204,21,.3)"><span>🏦</span><span class="mo" style="font-size:13px;font-weight:700;color:var(--yellow)">${w(c.balance)}</span><span class="ti">Já guardado</span></div>
      </div>
      <div class="pm" style="margin-top:12px"><div class="pf" style="width:${u}%;background:linear-gradient(90deg,var(--green2),var(--green))"></div></div>
      <div class="rb"><span class="ti" style="color:var(--green)">${E(u)} da meta</span><span class="ti" style="color:var(--muted2)">${w(a)} restante</span></div>
      <div class="tb" style="margin-top:10px">💡 Não existe momento ideal para guardar. Quanto mais cedo você começa, melhor.</div>
    </div>
    <div class="card">
      <p class="sl">Distribuição dos 30%</p>
      ${[{l:`Reserva`,p:40,c:`var(--cyan)`,e:`🛡️`,d:`Tesouro Selic ou CDB liq. diária`},{l:`Renda Fixa`,p:30,c:`var(--green)`,e:`🏦`,d:`CDB >100% CDI ou LCI/LCA`},{l:`FIIs`,p:20,c:`#818cf8`,e:`🏢`,d:`Dividendos mensais isentos`},{l:`Ações LP`,p:10,c:`var(--orange)`,e:`📈`,d:`Fundamentos — NÃO day trade`}].map(e=>`<div style="margin-bottom:14px">
        <div class="rb"><span style="font-size:13px;font-weight:600">${e.e} ${e.l}</span><span class="ta mo" style="color:${e.c}">${w(i*.3*e.p/100)}/mês</span></div>
        <div class="pm" style="margin-top:4px"><div class="pf" style="width:${e.p}%;background:${e.c}"></div></div>
        <span class="ti" style="color:var(--muted2)">${e.p}% · ${e.d}</span>
      </div>`).join(``)}
    </div>`:``;return`${r}
    <div class="card">
      <p class="sl">🧮 Calculadora Financeira</p>
      <p class="lb">Renda mensal (R$)</p>
      <input class="ip" type="number" placeholder="Ex: 3000" value="${l.ci}" oninput="setComp('ci',this.value)"/>
      <p class="lb">Gastos mensais (R$)</p>
      <input class="ip" type="number" placeholder="Ex: 2000" value="${l.ce}" oninput="setComp('ce',this.value)"/>
      <p class="lb">Meta (R$)</p>
      <input class="ip" type="number" placeholder="100000" value="${l.cg}" oninput="setComp('cg',this.value)"/>
    </div>
    ${h}${g}`}if(l.investTab===`juros`){let e=parseFloat(l.compInitial)||0,t=parseFloat(l.compMonthly)||0,n=parseFloat(l.compRate)||12,i=parseFloat(l.compYears)||20,a=n/100/12,o=e,s=[];for(let e=1;e<=i*12;e++)o=o*(1+a)+t,e%12==0&&s.push({y:e/12,v:o});let c=Math.max(...s.map(e=>e.v),1),u=e+t*i*12,d=s.map((e,t)=>`<div class="chart-bar-group">
        <div class="chart-bars"><div class="chart-bar" style="height:${Math.min(e.v/c*80,80)}px;background:linear-gradient(180deg,var(--purple),var(--green));width:12px"></div></div>
        ${e.y===1||e.y===5||e.y===10||e.y===i?`<span class="chart-lbl">${e.y}a</span>`:`<span class="chart-lbl"></span>`}
      </div>`).join(``);return`${r}
    <div class="card">
      <p class="sl">📐 Simulador de Juros Compostos</p>
      <p class="lb">Capital inicial (R$)</p><input class="ip" type="number" placeholder="Ex: 1000" value="${l.compInitial}" oninput="setComp('initial',this.value)"/>
      <p class="lb">Aporte mensal (R$)</p><input class="ip" type="number" placeholder="Ex: 500" value="${l.compMonthly}" oninput="setComp('monthly',this.value)"/>
      <div style="display:flex;gap:10px">
        <div style="flex:1"><p class="lb">Taxa anual (%)</p><input class="ip" type="number" placeholder="12" value="${l.compRate}" oninput="setComp('rate',this.value)"/></div>
        <div style="flex:1"><p class="lb">Prazo (anos)</p><input class="ip" type="number" placeholder="20" value="${l.compYears}" oninput="setComp('years',this.value)"/></div>
      </div>
    </div>
    ${e||t?`<div class="compound-result">
      <p class="sl">Resultado após ${i} anos</p>
      <p class="mo" style="font-size:26px;font-weight:800;color:var(--green)">${w(o)}</p>
      <div class="g2" style="margin-top:10px">
        <div class="sc" style="border-color:rgba(74,222,128,.3)"><span>💸</span><span class="mo" style="font-size:12px;color:var(--green)">${w(u)}</span><span class="ti">Total investido</span></div>
        <div class="sc" style="border-color:rgba(167,139,250,.3)"><span>📈</span><span class="mo" style="font-size:12px;color:var(--purple)">${w(o-u)}</span><span class="ti">Juros ganhos</span></div>
      </div>
      ${s.length>0?`<div style="margin-top:12px"><p class="sl">Evolução</p><div class="chart-wrap">${d}</div></div>`:``}
      <div class="tb" style="margin-top:10px">💡 Aportes consistentes a 12%aa: R$1k/mês = R$1M em ~20 anos</div>
    </div>`:``}`}if(l.investTab===`ia`){let e=l.invA?`${l.invA.citacaoLivro?`<div class="tb" style="border-color:rgba(167,139,250,.3);background:rgba(167,139,250,.08)">💡 <i>"${k(l.invA.citacaoLivro)}"</i></div>`:``}
    <div class="card" style="border-color:rgba(167,139,250,.2)">
      <div class="rb">
        <p class="sl">Diagnóstico</p>
        ${l.invA.fase?`<span class="bg2" style="color:var(--purple);background:rgba(167,139,250,.1);font-size:10px">${l.invA.fase===`aspirante`?`🌱 Aspirante`:l.invA.fase===`poupador`?`🏦 Poupador`:`💼 Investidor`}</span>`:``}
      </div>
      <p style="font-size:13px;line-height:1.6">${k(l.invA.diagnostico||``)}</p>
      ${l.invA.proximoPasso?`<div class="tb" style="margin-top:10px;border-color:rgba(74,222,128,.3);background:rgba(74,222,128,.06)">✅ ${k(l.invA.proximoPasso)}</div>`:``}
    </div>
    ${l.invA.alertasPrioritarios?.length?`<div class="ab">${l.invA.alertasPrioritarios.map(e=>`<div class="ar">⚠️ <span>${k(e)}</span></div>`).join(``)}</div>`:``}
    ${l.invA.recomendacoes?.length?`<p class="sl" style="margin-bottom:10px">🎯 Onde Investir</p>${l.invA.recomendacoes.map(e=>{let t={baixo:`var(--green)`,médio:`var(--yellow)`,alto:`var(--red)`}[e.risco]||`var(--muted)`;return`<div class="lc" style="flex-direction:column;align-items:flex-start;gap:8px">
        <div class="rb" style="width:100%">
          <div class="rw">
            <span style="font-size:22px">${e.emoji||`📊`}</span>
            <div>
              <p style="font-size:13px;font-weight:700">${k(e.titulo)}</p>
              <p class="ti" style="color:var(--green)">${k(e.instrumento||``)}${e.ondeInvestir?` · `+k(e.ondeInvestir):``}</p>
            </div>
          </div>
          <div style="text-align:right">
            <p class="mo" style="font-size:14px;font-weight:700;color:var(--purple)">${e.percentual}%</p>
            <p class="ti" style="color:var(--green)">${k(e.rendimentoEstimado||``)}</p>
          </div>
        </div>
        <p style="font-size:12px;color:var(--muted);line-height:1.5">${k(e.descricao||``)}</p>
        <span class="bg2" style="color:${t};background:${t}18;font-size:10px">Risco ${e.risco}</span>
      </div>`}).join(``)}`:``}`:``,t=c.invChat.map(e=>`<div class="bub ${e.role===`user`?`usr`:``}">
      ${e.role===`assistant`?`<span style="font-size:18px;flex-shrink:0">📈</span>`:``}
      <div class="bt">${k(e.content)}</div>
    </div>`).join(``);return`${r}
    <div class="card" style="border-color:rgba(167,139,250,.2);background:rgba(167,139,250,.04)">
      <p class="sl">🤖 IA — Análise de Investimentos</p>
      <p style="font-size:11px;color:var(--muted2);margin-bottom:10px">Preencha renda/gastos na Calculadora para análise precisa.</p>
      <button class="pb" style="width:100%;padding:12px" onclick="anv()" ${l.ia?`disabled`:``}>${l.ia?`🔄 Analisando...`:`⚡ Gerar Análise Completa`}</button>
    </div>
    ${e}
    <div class="card" style="margin-top:8px"><p class="sl">💬 Perguntas sobre investimentos</p></div>
    <div class="cb2" id="icb">
      ${c.invChat.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:20px 0">
        <span style="font-size:36px">📈</span>
        <p style="color:var(--muted2);font-size:12px;text-align:center;margin-top:8px">Seu consultor financeiro com IA</p>
        <div class="sr">${[`Como funciona o CDB?`,`O que é o Tesouro Direto?`,`Regra 50-30-20?`,`FII vs Imóvel?`,`Como chegar ao R$1M?`].map(e=>`<button class="sgb" onclick="sii('${e}')">${e}</button>`).join(``)}</div>
      </div>`:t}
      ${l.ial?`<div class="bub"><span style="font-size:18px">📈</span><div class="bt" style="animation:pulse 1s infinite">Consultando IA...</div></div>`:``}
    </div>
    <div class="cr">
      <input class="ci" id="iai" placeholder="Pergunta sobre investimento..." onkeydown="if(event.key==='Enter')aia()"/>
      <button class="snd" onclick="aia()" ${l.ial?`disabled`:``}>➤</button>
    </div>`}return r}async function he(t){window.confirm(`Excluir este investimento?`)&&(await e.from(`investments`).delete().eq(`created_id`,String(t)),c.investments=c.investments.filter(e=>e.id!==t),C(),g())}function ge(e,t){e===`ci`?l.ci=t:e===`ce`?l.ce=t:e===`cg`?l.cg=t:e===`initial`?l.compInitial=t:e===`monthly`?l.compMonthly=t:e===`rate`?l.compRate=t:e===`years`&&(l.compYears=t),g()}function _e(e){let t=document.getElementById(`iai`);t&&(t.value=e)}function ve(){let e=c.aiChat.map(e=>`<div class="bub ${e.role===`user`?`usr`:``}">
    ${e.role===`assistant`?`<span style="font-size:18px;flex-shrink:0">💎</span>`:``}
    <div class="bt">${k(e.content)}</div>
  </div>`).join(``);return`<div class="card">
    <p class="sl">🤖 RICO — Assistente Financeiro</p>
    <p class="mu">Seu assistente de finanças pessoais com IA. Gastar Bem, Investir Melhor, Ganhar Mais.</p>
  </div>
  <div class="cb2" id="acb">
    ${c.aiChat.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:24px 0">
      <span style="font-size:48px">💎</span>
      <p style="color:var(--muted2);margin-top:12px;font-size:13px;text-align:center">Seu assistente de finanças pessoais com IA</p>
      <div class="sr">${[`Analisa minha situação`,`Regra 50-30-20?`,`Plano para R$100k`,`Como ganhar mais?`,`Gastos compulsivos?`].map(e=>`<button class="sgb" onclick="sai('${e}')">${e}</button>`).join(``)}</div>
    </div>`:e}
    ${l.al?`<div class="bub"><span style="font-size:18px">💎</span><div class="bt" style="animation:pulse 1s infinite">Analisando sua situação...</div></div>`:``}
  </div>
  <div class="cr">
    <input class="ci" id="aii" placeholder="Escreva sua pergunta..." onkeydown="if(event.key==='Enter')aa()"/>
    <button class="snd" onclick="aa()" ${l.al?`disabled`:``}>➤</button>
  </div>`}function ye(e){let t=document.getElementById(`aii`);t&&(t.value=e)}function be(){let e=new Blob([JSON.stringify({name:`RICO — Controle Financeiro`,short_name:`RICO`,description:`Controle financeiro inteligente com IA — gerencie seu dinheiro e conquiste seus objetivos.`,start_url:`.`,display:`standalone`,background_color:`#06060f`,theme_color:`#06060f`,orientation:`portrait-primary`,categories:[`finance`,`productivity`],icons:[{src:`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' rx='40' fill='%2306060f'/%3E%3Ctext y='130' x='96' text-anchor='middle' font-size='110'%3E%F0%9F%92%8E%3C/text%3E%3C/svg%3E`,sizes:`192x192`,type:`image/svg+xml`,purpose:`any maskable`},{src:`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='80' fill='%2306060f'/%3E%3Ctext y='360' x='256' text-anchor='middle' font-size='300'%3E%F0%9F%92%8E%3C/text%3E%3C/svg%3E`,sizes:`512x512`,type:`image/svg+xml`,purpose:`any maskable`}],shortcuts:[{name:`Nova Transação`,short_name:`+ Tx`,description:`Adicionar transação rapidamente`,url:`./?action=tx`},{name:`Dashboard`,short_name:`Início`,description:`Ver dashboard`,url:`.`}]})],{type:`application/manifest+json`}),t=document.getElementById(`mph`);t&&(t.href=URL.createObjectURL(e))}function xe(){if(!(`serviceWorker`in navigator))return;let e=new Blob([`
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
});`],{type:`application/javascript`});navigator.serviceWorker.register(URL.createObjectURL(e)).then(()=>console.log(`SW registered`)).catch(()=>{})}var W=null;function Se(){window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),W=e,setTimeout(Ce,1500)})}function Ce(){if(window.matchMedia(`(display-mode: standalone)`).matches||document.getElementById(`ibanner`))return;let e=document.createElement(`div`);e.id=`ibanner`,e.style.cssText=`position:fixed;bottom:calc(80px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid rgba(74,222,128,.35);border-radius:14px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px;z-index:50;max-width:440px;width:calc(100% - 32px);box-shadow:0 8px 32px rgba(0,0,0,.4)`,e.innerHTML=`<div><p style="font-size:12px;font-weight:700;color:var(--green)">📲 Instalar RICO como App</p><p style="font-size:11px;color:var(--muted2);margin-top:2px">Funciona offline · Dados salvos no dispositivo</p></div><div style="display:flex;gap:8px"><button onclick="document.getElementById('ibanner').remove()" style="background:transparent;border:1px solid var(--border);border-radius:8px;padding:6px 10px;color:var(--muted);font-size:11px">✕</button><button id="btn-install-pwa" style="background:linear-gradient(135deg,#16a34a,#4ade80);border:none;border-radius:8px;padding:7px 14px;color:#06060f;font-size:11px;font-weight:800;cursor:pointer">Instalar</button></div>`,document.body.appendChild(e),document.getElementById(`btn-install-pwa`).onclick=we}async function we(){if(!W)return;W.prompt(),await W.userChoice,W=null;let e=document.getElementById(`ibanner`);e&&e.remove()}function Te(){window.navigator.standalone||/iPhone|iPad|iPod/.test(navigator.userAgent)&&(localStorage.getItem(`ios-hint-shown`)||(localStorage.setItem(`ios-hint-shown`,`1`),setTimeout(()=>{let e=document.createElement(`div`);e.style.cssText=`position:fixed;bottom:calc(90px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:#1e293b;border:1px solid rgba(74,222,128,.3);border-radius:14px;padding:14px 18px;font-size:12px;color:#e2e8f0;z-index:50;max-width:300px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.6)`,e.innerHTML=`📲 <b>Instalar no iPhone:</b><br/>Toque em <b>Compartilhar</b> (⬆️)<br/>depois <b>"Adicionar à Tela Inicial"</b><br/><span style="font-size:10px;color:#475569;margin-top:6px;display:block">Toque para fechar</span>`,e.onclick=()=>e.remove(),document.body.appendChild(e),setTimeout(()=>e.remove(),8e3)},2e3)))}function G(){if(!(`Notification`in window))return;let e=new Date().getDate(),t=D(),n=c.bills.filter(n=>!n.paid&&n.month===t&&n.dueDay&&n.dueDay<=e+3&&n.dueDay>=e);if(n.length===0)return;let r=document.getElementById(`bill-notif-bar`);r&&r.remove();let i=document.createElement(`div`);i.id=`bill-notif-bar`,i.style.cssText=`position:fixed;top:calc(env(safe-area-inset-top,0px)+56px);left:0;right:0;background:rgba(250,204,21,.95);color:#06060f;padding:8px 16px;font-size:12px;font-weight:700;z-index:100;display:flex;justify-content:space-between;align-items:center;cursor:pointer`;let a=n.slice(0,2).map(e=>e.name).join(`, `)+(n.length>2?` +${n.length-2}`:``);i.innerHTML=`<span>⚠️ ${n.length} conta${n.length>1?`s`:``} vencendo: ${a}</span><button style="background:transparent;border:none;font-size:16px;padding:0 4px;cursor:pointer" id="btn-close-bill-notif">✕</button>`,i.onclick=e=>{e.target.id!==`btn-close-bill-notif`&&(H(`bills`),i.remove())},document.body.appendChild(i),document.getElementById(`btn-close-bill-notif`).onclick=e=>{e.stopPropagation(),i.remove()},setTimeout(()=>{let e=document.getElementById(`bill-notif-bar`);e&&e.remove()},8e3),Notification.permission===`granted`?n.forEach(e=>{new Notification(`💳 Conta vencendo: ${e.name}`,{body:`${w(e.amount)} — vence dia ${e.dueDay}`,icon:`data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%22 height=%2232%22 rx=%228%22 fill=%22%2306060f%22/%3E%3Ctext y=%2224%22 x=%2216%22 text-anchor=%22middle%22 font-size=%2220%22%3E💎%3C/text%3E%3C/svg%3E`})}):Notification.permission!==`denied`&&Notification.requestPermission().then(e=>{e===`granted`&&G()})}function Ee(){let e=document.getElementById(`offline-badge`);!l.isOnline&&!e?(e=document.createElement(`div`),e.id=`offline-badge`,e.style.cssText=`position:fixed;bottom:calc(68px + env(safe-area-inset-bottom,0px));right:10px;background:rgba(248,113,113,.9);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:10px;z-index:50`,e.textContent=`OFFLINE`,document.body.appendChild(e)):l.isOnline&&e&&e.remove()}function K(e){let t=document.getElementById(`mc`);e===`tx`?t.innerHTML=De():e===`bill`?t.innerHTML=Ae():e===`debt`?t.innerHTML=Me():e===`shop`?t.innerHTML=Pe():e===`inv`?t.innerHTML=Ie():e===`budget`&&(t.innerHTML=Re()),document.getElementById(`mov`).style.display=`flex`,setTimeout(()=>{let e=document.querySelector(`.sh input`);e&&e.focus()},100)}function q(){document.getElementById(`mov`).style.display=`none`}function De(){return`<p class="mt">Nova Transação</p>
  <div class="tt">
    <button class="tb2 exp" id="be" onclick="stt('expense')">💸 Gasto</button>
    <button class="tb2" id="bi" onclick="stt('income')">💰 Entrada</button>
  </div>
  <input type="hidden" id="tt" value="expense"/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ta" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Descrição</p><input class="ip" id="td" placeholder="Ex: iFood, salário..."/>
  <div id="tcw">
    <p class="lb">Categoria</p>
    <select class="ip" id="tc">${r.map(e=>`<option value="${e.id}">${e.emoji} ${e.label}</option>`).join(``)}</select>
  </div>
  <div class="rw" style="margin-bottom:14px">
    <input type="checkbox" id="trec" style="margin-right:8px"/>
    <label for="trec" style="font-size:12px;color:var(--muted)">↻ Transação recorrente (repete todo mês)</label>
  </div>
  <button class="sb" onclick="stx()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Oe(e){document.getElementById(`tt`).value=e,document.getElementById(`be`).className=`tb2`+(e===`expense`?` exp`:``),document.getElementById(`bi`).className=`tb2`+(e===`income`?` inc`:``),document.getElementById(`tcw`).style.display=e===`expense`?`block`:`none`}function ke(){let e=document.getElementById(`tt`).value,t=parseFloat(document.getElementById(`ta`).value.replace(`,`,`.`)),n=document.getElementById(`td`).value.trim();if(!t||!n)return;let r=e===`expense`?document.getElementById(`tc`).value:`outros`,i=document.getElementById(`trec`)?.checked||!1,a={id:Date.now(),type:e,amount:t,desc:n,category:r,date:new Date().toISOString(),recurring:i,recurringFrom:null};c.transactions.unshift(a),c.balance+=e===`income`?t:-t,F(),y(`transactions`,{user_id:l.currentUser?.id,created_id:String(a.id),type:e,amount:t,description:n,category:r,date:a.date,recurring:i,recurring_from:null}),b(),C(),q(),g()}function Ae(){let e=D();return`<p class="mt">Nova Conta</p>
  <p class="lb">Nome</p><input class="ip" id="bn" placeholder="Aluguel, Netflix..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Categoria</p><select class="ip" id="bc">${i.map(e=>`<option value="${e.id}">${e.emoji} ${e.label}</option>`).join(``)}</select>
  <div style="display:flex;gap:10px">
    <div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" placeholder="15" inputmode="numeric"/></div>
    <div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${e}"/></div>
  </div>
  <button class="sb" onclick="sbill()">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`}function je(){let e=document.getElementById(`bn`).value.trim(),t=parseFloat(document.getElementById(`ba`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),name:e,amount:t,category:document.getElementById(`bc`).value,dueDay:parseInt(document.getElementById(`bd`).value)||null,month:document.getElementById(`bm`).value,paid:!1};c.bills.push(n),y(`bills`,{user_id:l.currentUser?.id,created_id:String(n.id),name:e,amount:t,category:n.category,due_day:n.dueDay,month:n.month,paid:!1}),C(),q(),g()}function Me(){return`<p class="mt">Registrar Dívida</p>
  <div class="tb" style="margin-bottom:14px">💡 Quite dívidas antes de investir — os juros cobrados superam qualquer rendimento.</div>
  <p class="lb">Para quem devo</p><input class="ip" id="dc" placeholder="Nubank, João..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="da" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Data vencimento</p><input class="ip" type="date" id="dd2"/>
  <p class="lb">Obs.</p><input class="ip" id="dn" placeholder="Juros, parcela..."/>
  <button class="sb" onclick="sdebt()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Ne(){let e=document.getElementById(`dc`).value.trim(),t=parseFloat(document.getElementById(`da`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),creditor:e,amount:t,dueDate:document.getElementById(`dd2`).value,note:document.getElementById(`dn`).value,paid:!1};c.debts.push(n),y(`debts`,{user_id:l.currentUser?.id,created_id:String(n.id),creditor:e,amount:t,due_date:n.dueDate||null,note:n.note||null,paid:!1}),C(),q(),g()}function Pe(){return`<p class="mt">Adicionar Item</p>
  <div class="tb" style="margin-bottom:14px">💡 Pense no custo de oportunidade antes de comprar — vale o seu dinheiro?</div>
  <p class="lb">Nome do item</p><input class="ip" id="sn" placeholder="Tênis, fone, notebook..."/>
  <p class="lb">Preço estimado (R$)</p><input class="ip" type="number" id="sp" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Por que quer comprar?</p><input class="ip" id="sr2" placeholder="Preciso pro trabalho..."/>
  <button class="sb" onclick="sshop()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Fe(){let e=document.getElementById(`sn`).value.trim();if(!e)return;let t={id:Date.now(),name:e,estimatedPrice:parseFloat(document.getElementById(`sp`).value||`0`),reason:document.getElementById(`sr2`).value||null,priority:null,aiJustification:null,bought:!1,boughtAt:null};c.shoppingList.push(t),y(`shopping_list`,{user_id:l.currentUser?.id,created_id:String(t.id),name:e,estimated_price:t.estimatedPrice,reason:t.reason,priority:null,ai_justification:null,bought:!1,bought_at:null}),C(),q(),g()}function Ie(){return`<p class="mt">Novo Aporte</p>
  <div class="tb" style="margin-bottom:14px">💡 Triângulo do investidor: <b>Risco × Liquidez × Rendimento</b></div>
  <p class="lb">Tipo</p><select class="ip" id="it2">${o.map(e=>`<option value="${e.id}">${e.emoji} ${e.label}</option>`).join(``)}</select>
  <p class="lb">Nome / onde está</p><input class="ip" id="in2" placeholder="CDB Nubank, Tesouro Selic..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ia2" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Rentabilidade (% a.a.)</p><input class="ip" type="number" id="ir2" placeholder="Ex: 13.5" inputmode="decimal"/>
  <p class="lb">Obs.</p><input class="ip" id="io2" placeholder="Vence em, plataforma..."/>
  <button class="sb" onclick="sinv()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Le(){let e=document.getElementById(`in2`).value.trim(),t=parseFloat(document.getElementById(`ia2`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),type:document.getElementById(`it2`).value,name:e,amount:t,returnRate:parseFloat(document.getElementById(`ir2`).value||`0`),note:document.getElementById(`io2`).value,date:new Date().toISOString()};c.investments.unshift(n),y(`investments`,{user_id:l.currentUser?.id,created_id:String(n.id),type:n.type,name:e,amount:t,return_rate:n.returnRate,note:n.note||null,date:n.date}),C(),q(),g()}function Re(){return`<p class="mt">⚙️ Limites por Categoria</p>
  <div class="tb" style="margin-bottom:14px">💡 Regra 50-30-20: essenciais ≤50%, qualidade de vida ≤30%, investimentos ≥20%.</div>
  ${r.map(e=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span style="font-size:18px;width:30px;text-align:center">${e.emoji}</span>
    <div class="f1"><p style="font-size:12px;font-weight:600;margin-bottom:4px">${e.label}</p>
      <input class="ip" type="number" style="margin-bottom:0" placeholder="0 = sem limite" inputmode="decimal"
        value="${c.budgetLimits?.[e.id]||``}" oninput="setBudget('${e.id}',this.value)"/>
    </div>
  </div>`).join(``)}
  <button class="sb" onclick="cm();render()">✅ Salvar Limites</button><button class="cb" onclick="cm()">Cancelar</button>`}function ze(e,t){c.budgetLimits||={};let n=parseFloat(t)||0;n>0?c.budgetLimits[e]=n:delete c.budgetLimits[e],C()}function Be(e){let t=c.bills.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">✏️ Editar Conta</p>
    <p class="lb">Nome</p><input class="ip" id="bn" value="${k(t.name)}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" value="${t.amount}" inputmode="decimal"/>
    <p class="lb">Categoria</p><select class="ip" id="bc">${i.map(e=>`<option value="${e.id}"${e.id===t.category?` selected`:``}>${e.emoji} ${e.label}</option>`).join(``)}</select>
    <div style="display:flex;gap:10px">
      <div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" value="${t.dueDay||``}" placeholder="15" inputmode="numeric"/></div>
      <div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${t.month}"/></div>
    </div>
    <button class="sb" onclick="uebill(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function Ve(e){let t=c.bills.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`bn`).value.trim(),r=parseFloat(document.getElementById(`ba`).value.replace(`,`,`.`));!n||!r||(t.name=n,t.amount=r,t.category=document.getElementById(`bc`).value,t.dueDay=parseInt(document.getElementById(`bd`).value)||null,t.month=document.getElementById(`bm`).value,y(`bills`,{user_id:l.currentUser?.id,created_id:String(t.id),name:n,amount:r,category:t.category,due_day:t.dueDay,month:t.month,paid:t.paid}),C(),q(),g())}function He(e){let t=c.debts.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">💰 Pagar Parcela</p>
    <div class="tb" style="margin-bottom:14px">Dívida com <strong>${k(t.creditor)}</strong><br><span style="color:var(--red)">Saldo restante: ${w(t.amount)}</span></div>
    <p class="lb">Quanto você está pagando agora? (R$)</p>
    <input class="ip" type="number" id="pval" placeholder="0,00" inputmode="decimal"/>
    <p class="lb" style="margin-top:8px">Registrar como saída no saldo?</p>
    <div class="rw" style="margin-bottom:14px">
      <input type="checkbox" id="pdesc" checked style="margin-right:8px"/>
      <label for="pdesc" style="font-size:12px;color:var(--muted)">Sim — descontar do saldo e criar transação</label>
    </div>
    <button class="sb" onclick="appdp(${e})">✅ Registrar Pagamento</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`,setTimeout(()=>{let e=document.getElementById(`pval`);e&&e.focus()},100)}function Ue(e){let t=c.debts.find(t=>t.id===e);if(!t)return;let n=parseFloat(document.getElementById(`pval`).value.replace(`,`,`.`));if(!n||n<=0)return;let r=document.getElementById(`pdesc`)?.checked!==!1;if(t.amount=Math.max(0,+(t.amount-n).toFixed(2)),t.amount===0&&(t.paid=!0),r){let e={id:Date.now(),type:`expense`,amount:n,desc:`Pagamento: ${t.creditor}`,category:`outros`,date:new Date().toISOString(),recurring:!1,recurringFrom:null};c.transactions.unshift(e),c.balance=+(c.balance-n).toFixed(2),F(),y(`transactions`,{user_id:l.currentUser?.id,created_id:String(e.id),type:`expense`,amount:n,description:e.desc,category:`outros`,date:e.date,recurring:!1,recurring_from:null}),b()}y(`debts`,{user_id:l.currentUser?.id,created_id:String(t.id),creditor:t.creditor,amount:t.amount,due_date:t.dueDate||null,note:t.note||null,paid:t.paid}),C(),q(),g()}function J(e){let t=document.getElementById(`auth-login`),n=document.getElementById(`auth-register`),r=document.getElementById(`auth-error`),i=document.getElementById(`auth-error-reg`);if(e===`register`){let e=document.getElementById(`auth-email`)?.value;if(e){let t=document.getElementById(`auth-email-reg`);t&&(t.value=e)}t&&(t.style.display=`none`),n&&(n.style.display=`block`),i&&(i.style.display=`none`),setTimeout(()=>{let e=document.getElementById(`auth-email-reg`);e&&!e.value&&e.focus()},50)}else{let e=document.getElementById(`auth-email-reg`)?.value;if(e){let t=document.getElementById(`auth-email`);t&&(t.value=e)}n&&(n.style.display=`none`),t&&(t.style.display=`block`),r&&(r.style.display=`none`),setTimeout(()=>{let e=document.getElementById(`auth-pass`);e&&e.focus()},50)}}async function Y(){let t=document.getElementById(`btn-login`),n=document.getElementById(`auth-error`);t.disabled=!0,t.textContent=`Entrando...`,n.style.display=`none`;let r=document.getElementById(`auth-email`).value.trim(),i=document.getElementById(`auth-pass`).value;if(!r||!i){n.textContent=`Preencha e-mail e senha.`,n.style.color=`var(--red)`,n.style.display=`block`,t.disabled=!1,t.textContent=`Entrar`;return}document.getElementById(`auth-remember`)?.checked?localStorage.setItem(`rico_saved_email`,r):localStorage.removeItem(`rico_saved_email`);let{error:a}=await e.auth.signInWithPassword({email:r,password:i});a&&(n.textContent=a.message===`Invalid login credentials`?`E-mail ou senha incorretos.`:a.message,n.style.color=`var(--red)`,n.style.display=`block`,t.disabled=!1,t.textContent=`Entrar`)}async function X(){let t=document.getElementById(`btn-register`),n=document.getElementById(`auth-error-reg`);t.disabled=!0,t.textContent=`Criando conta...`,n.style.display=`none`;let r=document.getElementById(`auth-email-reg`).value.trim(),i=document.getElementById(`auth-pass-reg`).value;if(!r||!i){n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.3);color:var(--red)`,n.textContent=`Preencha e-mail e senha.`,t.disabled=!1,t.textContent=`Criar Conta Gratuita`;return}let{error:a}=await e.auth.signUp({email:r,password:i});a?(n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.3);color:var(--red)`,n.textContent=a.message):(n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.3);color:var(--green)`,n.textContent=`✅ Conta criada! Verifique seu e-mail para confirmar e depois entre.`,setTimeout(()=>{let e=document.getElementById(`auth-email`);e&&(e.value=r),J(`login`)},2500)),t.disabled=!1,t.textContent=`Criar Conta Gratuita`}function We(){return document.getElementById(`btn-logout`)}async function Ge(){let t=We();t&&(t.disabled=!0,t.textContent=`Saindo...`),l.isLoggingOut=!0;try{await Promise.race([e.auth.signOut(),new Promise((e,t)=>setTimeout(()=>t(Error(`timeout`)),3e3))]),t&&(t.disabled=!1,t.textContent=`Sair`)}catch{Object.keys(localStorage).filter(e=>e.startsWith(`sb-`)).forEach(e=>localStorage.removeItem(e));try{localStorage.removeItem(`rico_v5`)}catch{}window.location.reload()}}var Z=!1;function Ke(){let e=document.getElementById(`btn-login`),t=document.getElementById(`btn-register`),n=We();e&&(e.disabled=!1,e.textContent=`Entrar`),t&&(t.disabled=!1,t.textContent=`Criar Conta Gratuita`),n&&(n.disabled=!1,n.textContent=`Sair`)}async function qe(e){Z||(Z=!0,l.currentUser=e,Ke(),document.getElementById(`auth-overlay`).style.display=`none`,document.getElementById(`app`).style.display=`flex`,await ee(),U(),N(),P(),F(),v(),G(),be(),xe(),Te(),g(),C())}function Je(){Z=!1,l.currentUser=null,c.balance=0,c.transactions=[],c.bills=[],c.debts=[],c.shoppingList=[],c.investments=[],c.aiChat=[],c.invChat=[],c.budgetLimits={},c.streak=0,c.lastNoSpurfluous=null,c.balanceHistory=[],c.theme=`dark`;try{localStorage.removeItem(`rico_v5`)}catch{}Ke(),document.getElementById(`auth-overlay`).style.display=`flex`,document.getElementById(`app`).style.display=`none`}function Ye(){e.auth.onAuthStateChange(async(e,t)=>{t&&(e===`SIGNED_IN`||e===`INITIAL_SESSION`||e===`TOKEN_REFRESHED`)?(l.isLoggingOut=!1,await qe(t.user)):e===`SIGNED_OUT`&&(l.isLoggingOut||!localStorage.getItem(`rico_v5`)?Je():console.warn(`[auth] Recebido SIGNED_OUT sem solicitação de logout do usuário. Mantendo cache offline.`))}),e.auth.getSession().then(async({data:{session:e}})=>{e&&(l.isLoggingOut=!1,await qe(e.user))})}async function Q(e,t){return(await(await fetch(`https://vizsvjysklidnkzqxltn.supabase.co/functions/v1/openai_chat`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpenN2anlza2xpZG5renF4bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTMyOTEsImV4cCI6MjA5MTAyOTI5MX0.PDuihuZjEUyTwPIXSsXagKA5H0L7Cd0aATnZjUAbtLg`},body:JSON.stringify({model:`gpt-4o-mini`,max_tokens:1e3,messages:[{role:`system`,content:t},...e]})})).json()).choices?.[0]?.message?.content||`Erro ao conectar.`}function Xe(e){let t=String(e||``).trim();t.startsWith("```")&&(t=t.replace(/^```[a-zA-Z]*\n/,``).replace(/\n```$/,``)),t=t.trim();try{return JSON.parse(t)}catch(e){let n=t.indexOf(`{`),r=t.lastIndexOf(`}`);if(n!==-1&&r!==-1&&r>n)try{return JSON.parse(t.substring(n,r+1))}catch(e){console.error(`Erro interno ao parsear substring JSON da IA:`,e)}throw e}}function Ze(){let e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,n=c.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(t)),i=c.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(t)),a=n.reduce((e,t)=>e+t.amount,0),o=i.reduce((e,t)=>e+t.amount,0),s={};i.forEach(e=>{s[e.category]=(s[e.category]||0)+e.amount});let u=Object.entries(s).map(([e,t])=>{let n=O(r,e);return`${n.emoji} ${n.label}: ${w(t)}`}).slice(0,3).join(`, `)||`Nenhum gasto registrado`,d=parseFloat(l.ci)||a||0,f=parseFloat(l.ce)||o||0;return{income:d,expense:f,sobra:d-f,realIncome:a,realExpense:o,topCategories:u}}async function Qe(){let e=document.getElementById(`aii`);if(!e||!e.value.trim()||l.al)return;let n=e.value.trim();e.value=``,l.al=!0,c.aiChat.push({role:`user`,content:n}),g();let{income:r,expense:i,sobra:a,realIncome:o,realExpense:u,topCategories:d}=Ze(),f=c.investments.reduce((e,t)=>e+t.amount,0),p=c.debts.filter(e=>!e.paid).reduce((e,t)=>e+t.amount,0),m=c.shoppingList.filter(e=>!e.bought&&e.priority===`supérfluo`),h=`${s}
Você é RICO, assistente de finanças pessoais baseado na metodologia de Thiago Nigro. Direto, empático, pragmático e motivador.
---
DADOS FINANCEIROS ATUAIS DO USUÁRIO:
- Saldo em conta: ${w(c.balance)}
- Renda Mensal (Cadastrada ou Real): ${w(r)} (Renda Real deste mês: ${w(o)})
- Gastos Mensais (Cadastrados ou Reais): ${w(i)} (Despesas Reais deste mês: ${w(u)})
- Sobra mensal estimada: ${w(a)}
- Total Investido: ${w(f)}
- Dívidas em aberto: ${w(p)}
- Itens na lista de compras (supérfluos pendentes): ${m.length}
- Três maiores categorias de gastos reais do mês: ${d}
- Progresso rumo à meta de R$100k: ${E(Math.min(c.balance/t*100,100))}
- Streak sem supérfluos: ${c.streak||0} dias em sequência
---
REGRAS DE RESPOSTA:
- Máximo 3 parágrafos.
- Seja direto, empático e focado nos 3 Pilares (Gastar Bem, Investir Melhor, Ganhar Mais).
- Se o usuário perguntar sobre seus gastos, analise e cite as maiores categorias fornecidas.
- Se o usuário possuir dívidas em aberto, lembre-o com prioridade de quitá-las antes de aportar novos investimentos.`;try{let e=await Q(c.aiChat.map(e=>({role:e.role,content:e.content})),h);c.aiChat.push({role:`assistant`,content:e})}catch{c.aiChat.push({role:`assistant`,content:`❌ Erro de conexão. Verifique sua internet.`})}l.al=!1,C(),g()}async function $e(){let e=document.getElementById(`iai`);if(!e||!e.value.trim()||l.ial)return;let t=e.value.trim();e.value=``,l.ial=!0,c.invChat.push({role:`user`,content:t}),g();let n=`${s}
Você é RICO, consultor de investimentos com IA.
${w(c.investments.reduce((e,t)=>e+t.amount,0))} investidos | Saldo: ${w(c.balance)} | Meta: R$100k
Máx 3 parágrafos. Exemplos em R$. Cite corretoras reais. Use princípios sólidos de investimento.`;try{let e=await Q(c.invChat.map(e=>({role:e.role,content:e.content})),n);c.invChat.push({role:`assistant`,content:e})}catch{c.invChat.push({role:`assistant`,content:`❌ Erro.`})}l.ial=!1,C(),g()}async function et(){let e=c.shoppingList.filter(e=>!e.bought);if(!e.length||l.ap)return;l.ap=!0,g();let t=`${s}
Classifique usando custo de oportunidade:
"essencial","importante","desejo","supérfluo"
Saldo: ${w(c.balance)} | Meta: R$100k
${e.map((e,t)=>`${t+1}. id:${e.id} | ${e.name} | R$${e.estimatedPrice||`?`} | motivo: ${e.reason||`?`}`).join(`
`)}
JSON SOMENTE: {"items":[{"id":NUMERO,"priority":"valor","justification":"1 frase"}]}`;try{let e=Xe(await Q([{role:`user`,content:t}],`Responda apenas JSON válido sem markdown.`)),n={};(e.items||[]).forEach(e=>{n[e.id]={priority:e.priority,aiJustification:e.justification}}),c.shoppingList=c.shoppingList.map(e=>n[e.id]?{...e,...n[e.id]}:e),C()}catch(e){console.error(`Erro ao priorizar compras:`,e)}l.ap=!1,g()}async function tt(){if(l.ia)return;l.ia=!0,g();let e=c.investments.reduce((e,t)=>e+t.amount,0),t=c.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),{income:n,expense:r,sobra:i,realIncome:a,realExpense:u}=Ze(),d=c.debts.filter(e=>!e.paid).reduce((e,t)=>e+t.amount,0),f=`${s}
Analisar a situação financeira do usuário e gerar recomendações de carteira em formato JSON.
---
DADOS FINANCEIROS:
- Saldo atual: ${w(c.balance)}
- Renda Mensal: ${w(n)} (Real baseada em transações: ${w(a)})
- Despesas Mensais: ${w(r)} (Real baseada em transações: ${w(u)})
- Sobra disponível: ${w(i)}
- Total Investido: ${w(e)} (Reserva de Emergência atual: ${w(t)})
- Dívidas pendentes: ${w(d)}
- Investimentos cadastrados: ${c.investments.map(e=>`${e.name}(${O(o,e.type).label}):${w(e.amount)}`).join(`, `)||`nenhum`}
---
DIRETRIZES DO JSON:
- Sugira a alocação ideal para novos aportes na chave "recomendacoes". Os percentuais de recomendação devem somar exatamente 100%.
- Se o usuário tiver dívidas, direcione a recomendação de alocação prioritariamente para quitação de dívidas ou alerta prioritário.
- Classifique a fase financeira do usuário em "aspirante" (se tem dívidas ou não poupa), "poupador" (se poupa mas não investe ou tem reserva incompleta) ou "investidor" (se possui reserva de emergência e investe em ativos diversificados).
---
RESPONDA EXCLUSIVAMENTE NO FORMATO JSON (SEM MARCADORES MARKDOWN OU TEXTO EXTRA):
{
  "diagnostico": "Resumo empático e direto da situação em até 3 frases.",
  "fase": "aspirante|poupador|investidor",
  "reservaIdeal": N,
  "aporteMensalIdeal": N,
  "mesesParaMeta": N,
  "recomendacoes": [
    {
      "titulo": "Classe do ativo (ex: Tesouro Selic, FIIs)",
      "instrumento": "Ex: Tesouro Selic 2029, CDB 110% CDI",
      "descricao": "Explicação curta do motivo",
      "percentual": N,
      "risco": "baixo|médio|alto",
      "rendimentoEstimado": "Ex: 11.25% a.a. ou 1.0% ao mês",
      "emoji": "Emoji adequado",
      "ondeInvestir": "Sugestão de corretora/plataforma real"
    }
  ],
  "alertasPrioritarios": ["Frase curta de alerta se aplicável"],
  "proximoPasso": "Ação imediata recomendada",
  "citacaoLivro": "Uma frase inspiradora ou princípio financeiro adequado"
}`;try{l.invA=Xe(await Q([{role:`user`,content:f}],"Responda apenas JSON válido. Não inclua marcas markdown ```json ou texto explicativo fora do JSON."))}catch(e){console.error(`Erro no diagnóstico de IA:`,e),l.invA={diagnostico:`Erro ao conectar ou ler dados da IA.`,recomendacoes:[],alertasPrioritarios:[]}}l.ia=!1,C(),g()}function nt(){let e=document.getElementById(`hb`);if(!e)return;e.textContent=w(c.balance),e.style.color=c.balance>=0?`var(--green)`:`var(--red)`;let t=document.getElementById(`huser`);t&&l.currentUser&&(t.textContent=l.currentUser.email?.split(`@`)[0]||``);let n=document.getElementById(`bills-dot`);if(n){let e=c.bills.filter(e=>e.month===D()&&!e.paid);n.style.display=e.length?`block`:`none`}}function $(){let e=document.getElementById(`main`);if(!e)return;e.className=`fade`;let t=l.currentView;t===`dashboard`?e.innerHTML=I():t===`bills`?e.innerHTML=R():t===`debts`?e.innerHTML=ie():t===`shopping`?e.innerHTML=ce():t===`invest`?e.innerHTML=me():t===`ai`?e.innerHTML=ve():t===`history`&&(e.innerHTML=L()),nt(),Ee(),setTimeout(()=>{[`acb`,`icb`].forEach(e=>{let t=document.getElementById(e);t&&(t.scrollTop=t.scrollHeight)})},60)}async function rt(t){if(window.confirm(`Adverte! Deseja realmente apagar esta transação? A ação é irreversível.`)){await e.from(`transactions`).delete().eq(`created_id`,String(t));let n=c.transactions.find(e=>e.id===t);n&&(c.balance-=n.type===`income`?n.amount:-n.amount),c.transactions=c.transactions.filter(e=>e.id!==t),F(),b(),C(),$()}}function it(e){l.txFilterMonth=e,l.txPage=0,$()}function at(e){l.txFilterCat=e,l.txPage=0,$()}function ot(e){l.txFilterType=e,l.txPage=0,$()}function st(e){l.txPage=e,$()}function ct(e){l.txSearch=e,l.txPage=0,$()}function lt(){l.txFilterMonth=``,l.txFilterCat=``,l.txFilterType=``,l.txSearch=``,l.txPage=0,$()}Object.assign(window,{doLogin:Y,doLogout:Ge,doRegister:X,switchAuth:J,toggleTheme:pe,sv:H,om:K,cm:q,render:$,sit:fe,exportCSV:j,exportPDF:M,dtx:rt,setTxFilterMonth:it,setTxFilterCat:at,setTxFilterType:ot,clearTxFilters:lt,setTxPage:st,setTxSearch:ct,tbp:z,db:B,copyPrevBills:A,ebill:Be,uebill:Ve,tdp:ae,dd:oe,pdp:He,appdp:Ue,tb:le,dsi:ue,di:he,setComp:ge,sii:_e,stt:Oe,stx:ke,sbill:je,sdebt:Ne,sshop:Fe,sinv:Le,setBudget:ze,aa:Qe,aia:$e,anv:tt,aip:et,sai:ye});async function ut(){h($);let e=await te();Ye(),Se(),e&&(U(),$())}ut(),new URLSearchParams(window.location.search).get(`action`)===`tx`&&setTimeout(()=>K(`tx`),500);var dt=document.getElementById(`btn-login`);dt&&dt.addEventListener(`click`,Y);var ft=document.getElementById(`btn-register`);ft&&ft.addEventListener(`click`,X);var pt=document.getElementById(`auth-pass`);pt&&pt.addEventListener(`keydown`,function(e){e.key===`Enter`&&Y()});var mt=document.getElementById(`auth-email`);mt&&mt.addEventListener(`keydown`,function(e){e.key===`Enter`&&Y()});var ht=document.getElementById(`auth-pass-reg`);ht&&ht.addEventListener(`keydown`,function(e){e.key===`Enter`&&X()});var gt=document.getElementById(`auth-email-reg`);gt&&gt.addEventListener(`keydown`,function(e){e.key===`Enter`&&X()});