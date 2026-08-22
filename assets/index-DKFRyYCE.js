(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=window.supabase.createClient(`https://vizsvjysklidnkzqxltn.supabase.co`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpenN2anlza2xpZG5renF4bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTMyOTEsImV4cCI6MjA5MTAyOTI5MX0.PDuihuZjEUyTwPIXSsXagKA5H0L7Cd0aATnZjUAbtLg`),t=1e5,n=[`Jan`,`Fev`,`Mar`,`Abr`,`Mai`,`Jun`,`Jul`,`Ago`,`Set`,`Out`,`Nov`,`Dez`],r=[{id:`alimentacao`,label:`Alimentação`,emoji:`🍔`,color:`#f97316`},{id:`transporte`,label:`Transporte`,emoji:`🚗`,color:`#3b82f6`},{id:`lazer`,label:`Lazer`,emoji:`🎮`,color:`#a855f7`},{id:`compras`,label:`Compras`,emoji:`🛍️`,color:`#ec4899`},{id:`saude`,label:`Saúde`,emoji:`💊`,color:`#10b981`},{id:`moradia`,label:`Moradia`,emoji:`🏠`,color:`#6366f1`},{id:`educacao`,label:`Educação`,emoji:`📚`,color:`#0ea5e9`},{id:`outros`,label:`Outros`,emoji:`📦`,color:`#64748b`}],i=[{id:`moradia`,label:`Moradia`,emoji:`🏠`},{id:`energia`,label:`Energia`,emoji:`⚡`},{id:`agua`,label:`Água`,emoji:`💧`},{id:`internet`,label:`Internet`,emoji:`📡`},{id:`cartao`,label:`Cartão`,emoji:`💳`},{id:`streaming`,label:`Streaming`,emoji:`📺`},{id:`celular`,label:`Celular`,emoji:`📱`},{id:`outros`,label:`Outros`,emoji:`📦`}],a={essencial:{label:`Essencial`,color:`#4ade80`,bg:`rgba(74,222,128,.12)`,border:`rgba(74,222,128,.3)`,icon:`🟢`},importante:{label:`Importante`,color:`#facc15`,bg:`rgba(250,204,21,.12)`,border:`rgba(250,204,21,.3)`,icon:`🟡`},desejo:{label:`Desejo`,color:`#f97316`,bg:`rgba(249,115,22,.12)`,border:`rgba(249,115,22,.3)`,icon:`🟠`},supérfluo:{label:`Supérfluo`,color:`#f87171`,bg:`rgba(248,113,113,.12)`,border:`rgba(248,113,113,.3)`,icon:`🔴`}},o=[{id:`reserva`,label:`Reserva Emergência`,emoji:`🛡️`,color:`#06b6d4`,r:0},{id:`rendafixa`,label:`Renda Fixa`,emoji:`🏦`,color:`#4ade80`,r:1},{id:`tesouro`,label:`Tesouro Direto`,emoji:`🇧🇷`,color:`#22d3ee`,r:1},{id:`fii`,label:`FIIs`,emoji:`🏢`,color:`#818cf8`,r:2},{id:`fundos`,label:`Fundos`,emoji:`📊`,color:`#a78bfa`,r:2},{id:`acoes`,label:`Ações`,emoji:`📈`,color:`#fb923c`,r:3},{id:`cripto`,label:`Cripto`,emoji:`₿`,color:`#f59e0b`,r:4},{id:`outro`,label:`Outro`,emoji:`💡`,color:`#94a3b8`,r:2}],s={balance:0,transactions:[],bills:[],debts:[],shoppingList:[],investments:[],aiChat:[],invChat:[],budgetLimits:{},streak:0,lastNoSpurfluous:null,balanceHistory:[],theme:`dark`},c={currentUser:null,currentView:`dashboard`,investTab:`portfolio`,isLoggingOut:!1,ci:``,ce:``,cg:`100000`,compInitial:``,compMonthly:``,compRate:`12`,compYears:`20`,al:!1,ial:!1,ap:!1,ia:!1,invA:null,txPage:0,txPerPage:15,txFilterMonth:``,txFilterCat:``,txFilterType:``,txSearch:``,billFilter:`all`,debtFilter:`all`,shopFilter:`all`,isOnline:navigator.onLine},l=`rico_v5`,u=JSON.parse(localStorage.getItem(`rico_sync_queue`)||`[]`);function d(){localStorage.setItem(`rico_sync_queue`,JSON.stringify(u))}function f(e){u.push(e),d()}var p=()=>{};function m(e){p=e}function h(){p()}function g(e,t=`var(--green)`){let n=document.getElementById(`rico-toast`);n||(n=document.createElement(`div`),n.id=`rico-toast`,n.style.cssText=`position:fixed;top:calc(env(safe-area-inset-top,0px)+12px);left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:20px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;transition:opacity .4s`,document.body.appendChild(n)),n.textContent=e,n.style.background=t===`var(--green)`?`rgba(74,222,128,.9)`:`rgba(248,113,113,.9)`,n.style.color=`#06060f`,n.style.opacity=`1`,clearTimeout(n._to),n._to=setTimeout(()=>n.style.opacity=`0`,2500)}async function _(){if(!c.isOnline||!c.currentUser||u.length===0)return;let t=[...u];for(let n of t)try{n.retries=(n.retries||0)+1;let t;if(n.type===`upsert`?t=await e.from(n.table).upsert(n.data):n.type===`delete`&&(t=await e.from(n.table).delete().eq(n.col,n.val)),t&&t.error&&t.error.message.includes(`fetch`)&&n.retries<5)break;u=u.filter(e=>e!==n)}catch{if((n.retries||0)>=5)u=u.filter(e=>e!==n);else break}d(),u.length===0&&g(`Dados sincronizados com a nuvem ✓`,`var(--green)`)}window.addEventListener(`online`,()=>{c.isOnline=!0,g(`Online — sincronizando...`),_(),h()}),window.addEventListener(`offline`,()=>{c.isOnline=!1,g(`Offline — dados salvos localmente`,`var(--red)`),h()});function v(t,n,r=`created_id`){c.currentUser&&e.from(t).upsert(n,{onConflict:r}).then(({error:e})=>{e&&console.error(`[save:${t}]`,e.message)})}function y(){c.currentUser&&v(`profiles`,{id:c.currentUser.id,balance:s.balance,streak:s.streak,last_no_spurfluous:s.lastNoSpurfluous,theme:s.theme,budget_limits:s.budgetLimits},`id`)}async function b(){if(!c.currentUser)return;let{error:t}=await e.from(`profiles`).upsert({id:c.currentUser.id,balance:s.balance,streak:s.streak,last_no_spurfluous:s.lastNoSpurfluous,theme:s.theme,budget_limits:s.budgetLimits});t&&console.error(`[sync] profiles:`,t.message);let n=async(t,n)=>{if(!n.length)return;let{error:r}=await e.from(t).upsert(n,{onConflict:`created_id`});r&&console.error(`[sync] ${t}:`,r.message)};if(await n(`transactions`,s.transactions.map(e=>({user_id:c.currentUser.id,created_id:String(e.id),type:e.type,amount:e.amount,description:e.desc,category:e.category,date:e.date,recurring:e.recurring||!1,recurring_from:e.recurringFrom||null}))),await n(`bills`,s.bills.map(e=>({user_id:c.currentUser.id,created_id:String(e.id),name:e.name,amount:e.amount,category:e.category,due_day:parseInt(e.dueDay)||null,month:e.month,paid:e.paid||!1}))),await n(`debts`,s.debts.map(e=>({user_id:c.currentUser.id,created_id:String(e.id),creditor:e.creditor,amount:e.amount,due_date:e.dueDate||null,note:e.note||null,paid:e.paid||!1}))),await n(`shopping_list`,s.shoppingList.map(e=>({user_id:c.currentUser.id,created_id:String(e.id),name:e.name,estimated_price:e.estimatedPrice||0,reason:e.reason||null,priority:e.priority||null,ai_justification:e.aiJustification||null,bought:e.bought||!1,bought_at:e.boughtAt||null}))),await n(`investments`,s.investments.map(e=>({user_id:c.currentUser.id,created_id:String(e.id),type:e.type,name:e.name,amount:e.amount,return_rate:e.returnRate||0,note:e.note||null,date:e.date}))),s.balanceHistory.length){let{error:t}=await e.from(`balance_history`).upsert(s.balanceHistory.map(e=>({user_id:c.currentUser.id,date:e.date,value:e.value})),{onConflict:`user_id,date`});t&&console.error(`[sync] balance_history:`,t.message)}}var x=null;function S(){try{localStorage.setItem(l,JSON.stringify({aiChat:s.aiChat,invChat:s.invChat,cache:{uid:c.currentUser?.id,email:c.currentUser?.email,balance:s.balance,transactions:s.transactions,bills:s.bills,debts:s.debts,shoppingList:s.shoppingList,investments:s.investments,budgetLimits:s.budgetLimits,streak:s.streak,lastNoSpurfluous:s.lastNoSpurfluous,balanceHistory:s.balanceHistory,theme:s.theme}}))}catch{}if(!c.isOnline){c.currentUser&&f({type:`upsert`,table:`profiles`,data:{id:c.currentUser.id,balance:s.balance,streak:s.streak,last_no_spurfluous:s.lastNoSpurfluous,theme:s.theme,budget_limits:s.budgetLimits}});return}x&&clearTimeout(x),x=setTimeout(b,1500)}async function C(){if(!c.currentUser)return;let[t,n,r,i,a,o,l]=await Promise.all([e.from(`profiles`).select(`*`).eq(`id`,c.currentUser.id).maybeSingle(),e.from(`transactions`).select(`*`).eq(`user_id`,c.currentUser.id),e.from(`bills`).select(`*`).eq(`user_id`,c.currentUser.id),e.from(`debts`).select(`*`).eq(`user_id`,c.currentUser.id),e.from(`shopping_list`).select(`*`).eq(`user_id`,c.currentUser.id),e.from(`investments`).select(`*`).eq(`user_id`,c.currentUser.id),e.from(`balance_history`).select(`*`).eq(`user_id`,c.currentUser.id)]);t.data&&(s.balance=Number(t.data.balance)||0,s.streak=t.data.streak||0,s.lastNoSpurfluous=t.data.last_no_spurfluous,s.theme=t.data.theme||`dark`,s.budgetLimits=t.data.budget_limits||{}),n.data&&(s.transactions=n.data.map(e=>({id:parseFloat(e.created_id),type:e.type,amount:Number(e.amount),desc:e.description,category:e.category,date:e.date,recurring:e.recurring,recurringFrom:e.recurring_from})).sort((e,t)=>new Date(t.date)-new Date(e.date))),r.data&&(s.bills=r.data.map(e=>({id:parseFloat(e.created_id),name:e.name,amount:Number(e.amount),category:e.category,dueDay:e.due_day,month:e.month,paid:e.paid}))),i.data&&(s.debts=i.data.map(e=>({id:parseFloat(e.created_id),creditor:e.creditor,amount:Number(e.amount),dueDate:e.due_date,note:e.note,paid:e.paid}))),a.data&&(s.shoppingList=a.data.map(e=>({id:parseFloat(e.created_id),name:e.name,estimatedPrice:Number(e.estimated_price),reason:e.reason,priority:e.priority,aiJustification:e.ai_justification,bought:e.bought,boughtAt:e.bought_at}))),o.data&&(s.investments=o.data.map(e=>({id:parseFloat(e.created_id),type:e.type,name:e.name,amount:Number(e.amount),returnRate:Number(e.return_rate),note:e.note,date:e.date})).sort((e,t)=>new Date(t.date)-new Date(e.date))),l.data&&(s.balanceHistory=l.data.map(e=>({date:e.date,value:Number(e.value)})).sort((e,t)=>new Date(e.date)-new Date(t.date)))}async function ee(){let e=null,t=localStorage.getItem(l);if(t)try{let n=JSON.parse(t);s.aiChat=n.aiChat||[],s.invChat=n.invChat||[],n.cache&&(e=n.cache.uid,n.cache.email&&(c.currentUser={id:n.cache.uid,email:n.cache.email}),s.balance=n.cache.balance??0,s.transactions=n.cache.transactions??[],s.bills=n.cache.bills??[],s.debts=n.cache.debts??[],s.shoppingList=n.cache.shoppingList??[],s.investments=n.cache.investments??[],s.budgetLimits=n.cache.budgetLimits??{},s.streak=n.cache.streak??0,s.lastNoSpurfluous=n.cache.lastNoSpurfluous??null,s.balanceHistory=n.cache.balanceHistory??[],s.theme=n.cache.theme??`dark`)}catch{}let n=localStorage.getItem(`rico_saved_email`);if(n){let e=document.getElementById(`auth-email`),t=document.getElementById(`auth-remember`);e&&(e.value=n),t&&(t.checked=!0)}return e&&(document.getElementById(`auth-overlay`).style.display=`none`,document.getElementById(`app`).style.display=`flex`,h()),e}window.addEventListener(`beforeunload`,()=>{c.currentUser&&x&&(clearTimeout(x),b())});var w=e=>new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(e||0),T=e=>new Date(e).toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`short`}),E=e=>`${(e||0).toFixed(1)}%`,D=()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`},O=(e,t)=>e.find(e=>e.id===t)||e[e.length-1],k=e=>String(e||``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`);function te(){let e=new Date;e.setMonth(e.getMonth()-1);let t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,n=D(),r=s.bills.filter(e=>e.month===t);if(!r.length){g(`Nenhuma conta no mês anterior`,`var(--red)`);return}let i=new Set(s.bills.filter(e=>e.month===n).map(e=>e.name.toLowerCase())),a=0;r.forEach(e=>{if(i.has(e.name.toLowerCase()))return;let t={id:Date.now()+Math.random(),name:e.name,amount:e.amount,category:e.category,dueDay:e.dueDay,month:n,paid:!1};s.bills.push(t),v(`bills`,{user_id:ne(),created_id:String(t.id),name:e.name,amount:e.amount,category:e.category,due_day:e.dueDay,month:n,paid:!1}),a++}),a>0?(S(),h(),g(`${a} conta${a>1?`s`:``} copiada${a>1?`s`:``} ✓`)):g(`Todas as contas já existem neste mês`,`var(--red)`)}function ne(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function re(){let e=[[`Data`,`Tipo`,`Descrição`,`Categoria`,`Valor`]];s.transactions.forEach(t=>{e.push([T(t.date),t.type===`income`?`Entrada`:`Saída`,t.desc,O(r,t.category).label,t.amount.toFixed(2).replace(`.`,`,`)])});let t=e.map(e=>e.map(e=>`"${e}"`).join(`;`)).join(`
`),n=new Blob([`﻿`+t],{type:`text/csv;charset=utf-8`}),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`rico-${D()}.csv`,a.click(),URL.revokeObjectURL(i)}function ie(){let e=s.transactions.slice();c.txFilterMonth&&(e=e.filter(e=>e.date?.startsWith(c.txFilterMonth))),c.txFilterCat&&(e=e.filter(e=>e.category===c.txFilterCat)),c.txFilterType&&(e=e.filter(e=>e.type===c.txFilterType));let t=e.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0),n=e.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0),i=c.txFilterMonth?` — ${c.txFilterMonth}`:``,a=new Date().toLocaleDateString(`pt-BR`),o=e.map(e=>{let t=O(r,e.category),n=e.type===`income`?`#16a34a`:`#dc2626`,i=e.type===`income`?`+`:`-`;return`<tr><td>${T(e.date)}</td><td>${e.type===`income`?`Entrada`:`Saída`}</td><td>${k(e.desc)}</td><td>${t.emoji} ${t.label}</td><td style="text-align:right;color:${n};font-weight:600">${i}${w(e.amount)}</td></tr>`}).join(``),l=`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>RICO — Relatório${i}</title>
  <link rel="stylesheet" href="/style.css" /></head><body>
  <h1>💎 RICO — Relatório Financeiro${i}</h1>
  <p class="sub">Gerado em ${a} · ${e.length} transaç${e.length===1?`ão`:`ões`}</p>
  <div class="summary">
    <div class="scard"><div class="label">Entradas</div><div class="val" style="color:#16a34a">+${w(t)}</div></div>
    <div class="scard"><div class="label">Saídas</div><div class="val" style="color:#dc2626">-${w(n)}</div></div>
    <div class="scard"><div class="label">Resultado</div><div class="val" style="color:${t-n>=0?`#16a34a`:`#dc2626`}">${t-n>=0?`+`:``}${w(t-n)}</div></div>
    <div class="scard"><div class="label">Saldo atual</div><div class="val" style="color:#4f46e5">${w(s.balance)}</div></div>
  </div>
  <table><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Categoria</th><th style="text-align:right">Valor</th></tr></thead>
  <tbody>${o}</tbody>
  <tfoot><tr class="total-row"><td colspan="4">Total líquido${i}</td><td style="text-align:right;color:${t-n>=0?`#16a34a`:`#dc2626`}">${t-n>=0?`+`:``}${w(t-n)}</td></tr></tfoot>
  </table>
  <script>window.onload=()=>window.print();<\/script>
  </body></html>`,u=new Blob([l],{type:`text/html;charset=utf-8`}),d=URL.createObjectURL(u);window.open(d,`_blank`),setTimeout(()=>URL.revokeObjectURL(d),1e4)}function ae(){let e={version:`1.4.0`,exportDate:new Date().toISOString(),balance:s.balance,transactions:s.transactions,bills:s.bills,debts:s.debts,shoppingList:s.shoppingList,investments:s.investments,budgetLimits:s.budgetLimits},t=JSON.stringify(e,null,2),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`rico_backup_${new Date().toISOString().split(`T`)[0]}.json`,i.click(),URL.revokeObjectURL(r)}function oe(e){let t=e.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);typeof t.balance==`number`&&(s.balance=t.balance),Array.isArray(t.transactions)&&(s.transactions=t.transactions),Array.isArray(t.bills)&&(s.bills=t.bills),Array.isArray(t.debts)&&(s.debts=t.debts),Array.isArray(t.shoppingList)&&(s.shoppingList=t.shoppingList),Array.isArray(t.investments)&&(s.investments=t.investments),t.budgetLimits&&(s.budgetLimits=t.budgetLimits),S(),h(),g(`Backup importado com sucesso! 🎉`)}catch{alert(`Erro ao importar backup: arquivo JSON inválido.`)}},n.readAsText(t)}function se(){let e=new Date,t=D();s.transactions.filter(e=>e.recurring).forEach(n=>{let r=new Date(n.date);if((e.getFullYear()-r.getFullYear())*12+(e.getMonth()-r.getMonth())>=1&&!s.transactions.some(e=>e.recurringFrom===n.id&&e.date.startsWith(t))){let e={id:Date.now()+Math.random(),type:n.type,amount:n.amount,desc:n.desc+`(recorrente)`,category:n.category,date:new Date().toISOString(),recurringFrom:n.id};s.transactions.unshift(e),s.balance+=n.type===`income`?n.amount:-n.amount}})}function A(){let e=new Date().toDateString();if(!s.shoppingList.some(t=>t.bought&&t.priority===`supérfluo`&&new Date(t.boughtAt||0).toDateString()===e)){let t=s.lastNoSpurfluous,n=new Date;n.setDate(n.getDate()-1),t===n.toDateString()||t===e?t!==e&&(s.streak=(s.streak||0)+1,s.lastNoSpurfluous=e):(s.streak=1,s.lastNoSpurfluous=e)}}function j(){let e=new Date().toISOString().split(`T`)[0],t=s.balanceHistory||[],n=t[t.length-1];!n||n.date!==e?t.push({date:e,value:s.balance}):t[t.length-1].value=s.balance,s.balanceHistory=t.slice(-90)}function M(e){let t=O(r,e.category),n=e.type===`income`,i=n?``:`exp-border`,a=n?`↑`:t.emoji,o=n?`var(--green)`:`var(--red)`,s=e.recurring?`<span class="rec-badge">↻</span>`:``;return`
  <div class="lc ${i}">
    <div class="dot" style="background:${n?`rgba(16,185,129,0.15)`:`rgba(248,113,113,0.15)`}; color:${o}; font-size:16px; font-weight:800">${a}</div>
    <div class="f1">
      <div class="rb">
        <span class="td" style="font-size:14px; font-weight:700">${k(e.desc)}${s}</span>
        <span class="ta mo" style="color:${o}; font-size:14px; font-weight:800">${n?`+`:`-`}${w(e.amount)}</span>
      </div>
      <span class="ti" style="color:var(--muted2); font-size:11px">${t.label} • ${T(e.date)}</span>
    </div>
    <div class="ac">
      <button class="ib" style="color:var(--muted)" onclick="etx(${e.id})">✏️</button>
      <button class="ib" style="color:var(--red)" onclick="dtx(${e.id})">✕</button>
    </div>
  </div>`}function ce(){let e=s.transactions.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0);s.transactions.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0);let n=s.investments.reduce((e,t)=>e+t.amount,0),r=s.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),i=Math.min(s.balance/t*100,100),a=s.bills.filter(e=>e.month===D());a.reduce((e,t)=>e+t.amount,0),a.filter(e=>e.paid).length;let o=s.debts.filter(e=>!e.paid),l=o.reduce((e,t)=>e+t.amount,0),u=s.shoppingList.filter(e=>!e.bought&&e.priority===`supérfluo`),d=s.balance+n-l,f=new Date;f.setMonth(f.getMonth()-1);let p=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,`0`)}`,m=s.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(D())).reduce((e,t)=>e+t.amount,0),h=s.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(D())).reduce((e,t)=>e+t.amount,0);s.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(p)).reduce((e,t)=>e+t.amount,0),s.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(p)).reduce((e,t)=>e+t.amount,0),m>0&&(m-h)/m*100;let g=c.currentUser?.email?.split(`@`)[0]||`Motorista`,_=new Date().getHours(),v=`
  <div style="margin-bottom:16px; padding: 4px 2px">
    <h1 style="font-size:26px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">${_<12?`Bom dia`:_<18?`Boa tarde`:`Boa noite`}, <span style="color:var(--text)">${g}</span></h1>
    <p style="font-size:12px; color:var(--muted2); margin-top:2px; font-weight:500">${new Date().toLocaleDateString(`pt-BR`,{weekday:`short`,month:`short`,day:`numeric`})} • Sistema Ativo</p>
  </div>`,y=`
  <div class="card" style="padding:20px; background:var(--bg2)">
    <div class="rb">
      <span class="sl" style="font-size:11px; font-weight:800; letter-spacing:0.08em; color:var(--muted2)">LUCRO LÍQUIDO MÊS</span>
      <span style="font-size:18px">💳</span>
    </div>
    <div style="margin:8px 0 12px">
      <span class="mo" style="font-size:32px; font-weight:900; color:var(--green); letter-spacing:-0.02em">${w(s.balance)}</span>
    </div>
    <div class="rw" style="gap:8px">
      <span class="bg2" style="background:var(--green-bg); color:var(--green); font-size:11px; font-weight:700">📈 +12% vs mês anterior</span>
    </div>
  </div>`,b=`
  <div class="card" style="padding:18px">
    <div class="rb" style="margin-bottom:8px">
      <span style="font-size:16px; font-weight:800; color:var(--text)">Meta Financeira</span>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--green)">${Math.round(i)}%</span>
    </div>
    <div class="tr" style="height:10px; margin:10px 0">
      <div class="tf" style="width:${i}%"></div>
    </div>
    <div class="rb">
      <span class="ti" style="color:var(--text); font-weight:700">${w(s.balance)}</span>
      <span class="ti" style="color:var(--muted2)">Alvo: ${w(t)}</span>
    </div>
  </div>`,x=`
  <div class="g2">
    <div class="sc">
      <span class="sl" style="font-size:10px">ENTRADAS</span>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--green)">${w(m)}</span>
    </div>
    <div class="sc">
      <span class="sl" style="font-size:10px">SAÍDAS</span>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--red)">${w(h)}</span>
    </div>
    <div class="sc">
      <span class="sl" style="font-size:10px">PATRIMÔNIO</span>
      <span class="mo" style="font-size:18px; font-weight:800; color:${d>=0?`var(--green)`:`var(--red)`}">${w(d)}</span>
    </div>
    <div class="sc">
      <span class="sl" style="font-size:10px">INVESTIDO</span>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--purple)">${w(n)}</span>
    </div>
  </div>`,S=``;if(o.length||r<e*3&&e>0||u.length){let t=``;o.length&&(t+=`<div class="ar">🚫 <span>Quite dívidas ANTES de investir — ${w(l)} em aberto</span></div>`),r<e*3&&e>0&&(t+=`<div class="ar">🛡️ <span>Reserva insuficiente. Ideal: ${w(e*6)}</span></div>`),u.length&&(t+=`<div class="ar">🚨 <span>${u.length} item supérfluo na lista!</span></div>`),S=`<div class="ab">${t}</div>`}let C=s.transactions.slice(0,6).map(e=>M(e)).join(``);return`
  ${v}
  ${y}
  ${b}
  ${x}
  ${S}
  
  <div class="card" style="margin-top:4px">
    <div class="rb" style="margin-bottom:12px">
      <span class="sl" style="margin:0; font-size:14px; color:var(--text)">Últimas Movimentações</span>
      <div class="rw" style="gap:6px">
        <button class="gb" onclick="om('tx')">+ Nova</button>
      </div>
    </div>
    ${s.transactions.length===0?`<p style="color:var(--muted);font-size:13px;text-align:center;padding:24px 0">Nenhuma transação registrada</p>`:C}
    ${s.transactions.length>6?`<button class="cb" style="margin-top:10px" onclick="sv('history')">Ver histórico completo (${s.transactions.length})</button>`:``}
  </div>`}function le(){let e=[...new Set(s.transactions.map(e=>e.date?.substring(0,7)))].sort().reverse().map(e=>`<option value="${e}" ${c.txFilterMonth===e?`selected`:``}>${e}</option>`).join(``),t=s.transactions.slice();c.txFilterMonth&&(t=t.filter(e=>e.date?.startsWith(c.txFilterMonth))),c.txFilterCat&&(t=t.filter(e=>e.category===c.txFilterCat)),c.txFilterType&&(t=t.filter(e=>e.type===c.txFilterType)),c.txSearch&&(t=t.filter(e=>e.desc?.toLowerCase().includes(c.txSearch.toLowerCase())));let n=t.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0),i=t.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0);n-i;let a=t.length,o=Math.ceil(a/c.txPerPage)||1,l=Math.min(c.txPage,o-1),u=t.slice(l*c.txPerPage,(l+1)*c.txPerPage),d=r.map(e=>`<option value="${e.id}" ${c.txFilterCat===e.id?`selected`:``}>${e.emoji} ${e.label}</option>`).join(``),f=c.txFilterMonth||c.txFilterCat||c.txFilterType||c.txSearch,p=i||1,m=t.filter(e=>e.category===`transporte`&&e.type===`expense`).reduce((e,t)=>e+t.amount,0),h=Math.round(m/p*100),g=Math.max(0,i-m),_=Math.round(g/p*100);return`
  <div style="margin-bottom:16px">
    <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Histórico & Relatórios</h1>
  </div>

  <!-- FILTROS DE PERÍODO (ESTILO TABS DA IMAGEM 2) -->
  <div class="sn" style="margin-bottom:16px">
    <button class="snb ${c.txFilterType?``:`act`}" onclick="setTxFilterType('')">Todos</button>
    <button class="snb ${c.txFilterType===`income`?`act`:``}" onclick="setTxFilterType('income')">Entradas</button>
    <button class="snb ${c.txFilterType===`expense`?`act`:``}" onclick="setTxFilterType('expense')">Saídas</button>
  </div>

  <!-- CARD PRINCIPAL DE GANHOS DO PERÍODO (IMAGEM 2) -->
  <div class="card" style="padding:20px">
    <div class="rb">
      <div>
        <span class="sl" style="font-size:11px">TOTAL NO PERÍODO</span>
        <p class="ti" style="color:var(--muted2)">${c.txFilterMonth||`Todo o histórico`}</p>
      </div>
      <span class="mo" style="font-size:28px; font-weight:900; color:var(--green)">${w(n)}</span>
    </div>
  </div>

  <!-- CARDS SUB-CATEGORIAS (IMAGEM 2: FUEL & OTHERS) -->
  <div class="g2">
    <div class="sc" style="border-left:4px solid var(--red)">
      <div class="rw" style="gap:6px"><span style="font-size:14px">⛽</span> <span style="font-size:12px; font-weight:700; color:var(--text)">Combustível</span></div>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--text); margin-top:4px">${w(m)}</span>
      <div class="pm" style="margin-top:6px; background:var(--bg3)"><div class="pf" style="width:${h}%; background:var(--red)"></div></div>
      <span class="ti" style="font-size:10px; color:var(--muted2)">${h}% das despesas</span>
    </div>

    <div class="sc" style="border-left:4px solid var(--yellow)">
      <div class="rw" style="gap:6px"><span style="font-size:14px">🔧</span> <span style="font-size:12px; font-weight:700; color:var(--text)">Outros Gastos</span></div>
      <span class="mo" style="font-size:18px; font-weight:800; color:var(--text); margin-top:4px">${w(g)}</span>
      <div class="pm" style="margin-top:6px; background:var(--bg3)"><div class="pf" style="width:${_}%; background:var(--yellow)"></div></div>
      <span class="ti" style="font-size:10px; color:var(--muted2)">${_}% das despesas</span>
    </div>
  </div>

  <!-- LISTA DE TRANSAÇÕES RECENTES (IMAGEM 2) -->
  <div class="card" style="padding:16px">
    <div class="rb" style="margin-bottom:12px">
      <span class="sl" style="margin:0; font-size:14px; color:var(--text)">Movimentações (${a})</span>
      <div class="rw" style="gap:6px">
        <button class="export-btn" onclick="exportCSV()">📥 CSV</button>
        <button class="gb" onclick="om('tx')">+ Nova</button>
      </div>
    </div>

    <input class="ip" style="height:44px; font-size:13px; margin-bottom:10px" placeholder="🔍 Buscar transação..." value="${k(c.txSearch)}" oninput="setTxSearch(this.value)"/>

    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px">
      <select class="ip" style="flex:1; height:42px; font-size:12px; margin-bottom:0" onchange="setTxFilterMonth(this.value)">
        <option value="">Todos os meses</option>${e}
      </select>
      <select class="ip" style="flex:1; height:42px; font-size:12px; margin-bottom:0" onchange="setTxFilterCat(this.value)">
        <option value="">Todas categorias</option>${d}
      </select>
      ${f?`<button class="ib" style="height:42px; padding:0 12px; color:var(--muted)" onclick="clearTxFilters()">✕ Limpar</button>`:``}
    </div>

    ${u.length===0?`<p style="color:var(--muted);font-size:13px;text-align:center;padding:24px 0">Nenhuma movimentação encontrada</p>`:u.map(e=>M(e)).join(``)}

    ${o>1?`<div class="rw" style="justify-content:center; gap:8px; margin-top:14px">
      <button class="ib" style="padding:6px 14px" ${l===0?`disabled`:``} onclick="setTxPage(${l-1})">‹ Anterior</button>
      <span style="font-size:12px; color:var(--muted2)">${l+1} / ${o}</span>
      <button class="ib" style="padding:6px 14px" ${l>=o-1?`disabled`:``} onclick="setTxPage(${l+1})">Próxima ›</button>
    </div>`:``}
  </div>`}function ue(e){c.billFilter=e,h()}function de(){let e=s.bills.filter(e=>e.month===D()),t=e.reduce((e,t)=>e+t.amount,0),r=e.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),a=t>0?r/t*100:0,o=c.billFilter||`all`,l=e;o===`pending`?l=e.filter(e=>!e.paid):o===`paid`&&(l=e.filter(e=>e.paid));let u=l.length===0?`<div class="es"><span style="font-size:40px">📋</span><p style="color:var(--muted);margin:12px 0 16px;font-size:13px">Nenhuma conta encontrada</p><button class="pb" onclick="om('bill')">Adicionar conta</button></div>`:l.sort((e,t)=>(e.dueDay||0)-(t.dueDay||0)).map(e=>{let t=O(i,e.category),n=!e.paid&&e.dueDay&&e.dueDay<=new Date().getDate()+2;return`
      <div class="lc ${e.paid?``:n?`exp-border`:`warn-border`}" style="opacity:${e.paid?.6:1}">
        <div class="dot" style="background:${e.paid?`rgba(16,185,129,0.15)`:n?`rgba(248,113,113,0.15)`:`rgba(255,185,95,0.15)`}; color:${e.paid?`var(--green)`:n?`var(--red)`:`var(--yellow)`}">${t.emoji}</div>
        <div class="f1">
          <div class="rb">
            <span class="td" style="font-size:14px; font-weight:700; text-decoration:${e.paid?`line-through`:`none`}">${k(e.name)}</span>
            <span class="ta mo" style="color:${e.paid?`var(--green)`:n?`var(--red)`:`var(--yellow)`}">${w(e.amount)}</span>
          </div>
          <span class="ti">${t.label}${e.dueDay?` · dia ${e.dueDay}`:``}${e.paid?` · ✓ Pago`:n?` · ⚠️ urgente`:``}</span>
        </div>
        <div class="ac">
          <button class="ib" style="color:var(--muted)" onclick="ebill(${e.id})">✏️</button>
          <button class="ib" style="color:var(--green); font-weight:700" onclick="tbp(${e.id})">${e.paid?`↩`:`✓`}</button>
          <button class="ib" style="color:var(--red)" onclick="db(${e.id})">✕</button>
        </div>
      </div>`}).join(``),d=s.bills.filter(e=>e.month!==D()).slice(0,4).map(e=>{let[t,r]=e.month.split(`-`);return`<div class="lc" style="opacity:.45"><div class="dot" style="background:var(--bg3)">${O(i,e.category).emoji}</div><div class="f1"><span class="td">${k(e.name)}</span><span class="ti">${n[parseInt(r)-1]}/${t}</span></div><span class="ta mo">${w(e.amount)}</span></div>`}).join(``),f=e.filter(e=>!e.paid).length,p=e.filter(e=>e.paid).length;return`
  <div style="margin-bottom:16px">
    <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Contas & Fixos</h1>
  </div>

  <div class="card">
    <div class="rb">
      <div>
        <span class="sl">TOTAL EM CONTAS</span>
        <p class="mo" style="font-size:24px; font-weight:800; color:var(--text)">${w(t)}</p>
      </div>
      <div class="rw" style="gap:6px">
        <button class="gb" onclick="copyPrevBills()" title="Copiar contas do mês anterior">📋 Copiar</button>
        <button class="pb" onclick="om('bill')">+ Nova</button>
      </div>
    </div>
    <div class="pm" style="margin-top:14px; height:8px"><div class="pf" style="width:${a}%;background:var(--green)"></div></div>
    <div class="rb" style="margin-top:6px">
      <span class="ti" style="color:var(--green); font-weight:700">✓ ${w(r)} pago</span>
      <span class="ti" style="color:var(--red); font-weight:700">✗ ${w(t-r)} pendente</span>
    </div>
  </div>

  <div class="sn" style="margin-bottom:14px">
    <button class="snb ${o===`all`?`act`:``}" onclick="setBillFilter('all')">Todas (${e.length})</button>
    <button class="snb ${o===`pending`?`act`:``}" onclick="setBillFilter('pending')">Pendentes (${f})</button>
    <button class="snb ${o===`paid`?`act`:``}" onclick="setBillFilter('paid')">Pagas (${p})</button>
  </div>
  ${u}
  ${d?`<p class="sl" style="margin-top:20px;margin-bottom:10px">Histórico Anterior</p>${d}`:``}`}function fe(e){let t=s.bills.find(t=>t.id===e);t&&(t.paid=!t.paid,v(`bills`,{user_id:me(),created_id:String(t.id),name:t.name,amount:t.amount,category:t.category,due_day:t.dueDay,month:t.month,paid:t.paid}),S(),h())}function pe(t){let n=s.bills.find(e=>e.id===t);n&&window.confirmDelete(`Deseja excluir a conta <strong>"${n.name}"</strong> de <strong>R$ ${n.amount.toFixed(2)}</strong>?`,async()=>{await e.from(`bills`).delete().eq(`created_id`,String(t)),s.bills=s.bills.filter(e=>e.id!==t),S(),h()})}function me(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function he(e){c.debtFilter=e,h()}function ge(){let e=s.debts.filter(e=>!e.paid),t=s.debts.filter(e=>e.paid),n=e.reduce((e,t)=>e+t.amount,0),r=c.debtFilter||`all`,i=n>0?`<div class="card exp-border" style="border-left-width:4px; background:rgba(248,113,113,.05)">
    <p style="font-size:11px;color:var(--red);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;font-weight:800">⚠️ ALERTA FINANCEIRO</p>
    <p style="font-size:13px;color:#fca5a5;line-height:1.5">Quite suas dívidas prioritariamente. Os juros tendem a superar qualquer rendimento.</p>
  </div>`:``,a=r===`all`||r===`open`,o=r===`all`||r===`paid`,l=e.sort((e,t)=>new Date(e.dueDate||`9999`)-new Date(t.dueDate||`9999`)).map(e=>{let t=e.dueDate&&new Date(e.dueDate)<new Date(Date.now()+7*864e5);return`
    <div class="lc exp-border">
      <div class="dot" style="background:rgba(248,113,113,0.15); color:var(--red)">💳</div>
      <div class="f1">
        <div class="rb">
          <span class="td" style="font-size:14px; font-weight:700">${k(e.creditor)}</span>
          <span class="ta mo" style="color:var(--red); font-size:14px; font-weight:800">${w(e.amount)}</span>
        </div>
        <div class="rw">
          ${e.dueDate?`<span class="ti" style="color:${t?`var(--red)`:`var(--muted2)`}">Vence: ${new Date(e.dueDate+`T00:00:00`).toLocaleDateString(`pt-BR`)}${t?` ⚠️`:``}</span>`:``}
          ${e.note?`<span class="ti" style="margin-left:6px; color:var(--muted)">• ${k(e.note)}</span>`:``}
        </div>
      </div>
      <div class="ac">
        <button class="ib" style="color:var(--muted)" onclick="edebt(${e.id})">✏️</button>
        <button class="ib" style="color:var(--yellow);font-size:14px" onclick="pdp(${e.id})" title="Pagar parcela">💰</button>
        <button class="ib" style="color:var(--green);font-weight:700" onclick="tdp(${e.id})" title="Quitar tudo">✓</button>
        <button class="ib" style="color:var(--red)" onclick="dd(${e.id})">✕</button>
      </div>
    </div>`}).join(``),u=t.map(e=>`
  <div class="lc" style="opacity:.5; border-left-color:var(--green2)">
    <div class="dot" style="background:rgba(16,185,129,0.15); color:var(--green)">✓</div>
    <div class="f1">
      <span class="td" style="text-decoration:line-through">${k(e.creditor)}</span>
      <span class="ti">${w(e.amount)}</span>
    </div>
    <button class="ib" style="color:var(--red)" onclick="dd(${e.id})">✕</button>
  </div>`).join(``);return`
  <div style="margin-bottom:16px">
    <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Dívidas & Compromissos</h1>
  </div>

  ${i}
  ${`
  <div class="card" style="padding:18px">
    <span class="sl" style="font-size:14px; color:var(--text); font-weight:800">Resultado Geral</span>
    <div class="g3" style="margin-top:14px">
      <div class="sc" style="align-items:center; text-align:center">
        <span class="ti">Em Aberto</span>
        <span class="mo" style="font-size:15px; font-weight:800; color:${e.length?`var(--red)`:`var(--green)`}">${e.length}</span>
      </div>
      <div class="sc" style="border:1px solid var(--green2); align-items:center; text-align:center; background:rgba(16,185,129,0.06)">
        <span class="ti" style="color:var(--green)">Total Dívidas</span>
        <span class="mo" style="font-size:15px; font-weight:800; color:var(--green)">${w(n)}</span>
      </div>
      <div class="sc" style="align-items:center; text-align:center">
        <span class="ti">Quitadas</span>
        <span class="mo" style="font-size:15px; font-weight:800; color:var(--text)">${t.length}</span>
      </div>
    </div>
  </div>`}

  <div class="sn" style="margin-bottom:14px">
    <button class="snb ${r===`all`?`act`:``}" onclick="setDebtFilter('all')">Todas (${s.debts.length})</button>
    <button class="snb ${r===`open`?`act`:``}" onclick="setDebtFilter('open')">Em Aberto (${e.length})</button>
    <button class="snb ${r===`paid`?`act`:``}" onclick="setDebtFilter('paid')">Quitadas (${t.length})</button>
  </div>

  <div class="rb" style="margin-bottom:10px">
    <span class="sl" style="margin:0; font-size:13px; color:var(--text)">Lista de Dívidas</span>
    <button class="pb" onclick="om('debt')">+ Registrar</button>
  </div>

  ${a&&l?`<div style="margin-bottom:16px">${l}</div>`:``}
  ${o&&u?`<div><p class="sl" style="margin-bottom:10px">Quitadas</p>${u}</div>`:``}
  ${!e.length&&!t.length?`<div class="es"><span style="font-size:40px">🎉</span><p style="color:var(--muted);margin:12px 0 16px;font-size:13px">Nenhuma dívida! Excelente gestão.</p></div>`:``}`}function _e(e){let t=s.debts.find(t=>t.id===e);t&&(t.paid=!t.paid,v(`debts`,{user_id:ye(),created_id:String(t.id),creditor:t.creditor,amount:t.amount,due_date:t.dueDate||null,note:t.note||null,paid:t.paid}),S(),h())}function ve(t){let n=s.debts.find(e=>e.id===t);n&&window.confirmDelete(`Deseja excluir a dívida com <strong>"${n.creditor}"</strong> de <strong>R$ ${n.amount.toFixed(2)}</strong>?`,async()=>{await e.from(`debts`).delete().eq(`created_id`,String(t)),s.debts=s.debts.filter(e=>e.id!==t),S(),h()})}function ye(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function be(e){c.shopFilter=e,h()}function xe(){let e=s.shoppingList.filter(e=>!e.bought),t=s.shoppingList.filter(e=>e.bought),n=c.shopFilter||`all`,r={essencial:[],importante:[],desejo:[],supérfluo:[],sem:[]};e.forEach(e=>{let t=e.priority||`sem`;r[t]?r[t].push(e):r.sem.push(e)});let i=(e,t=!1)=>{let n=e.priority?a[e.priority]:null,r=t?`✓`:n?n.icon:`⚪`;return`
    <div class="lc ${t?``:n&&n.color===`#f87171`?`exp-border`:`warn-border`}" style="opacity:${t?.5:1}">
      <div class="dot" style="background:var(--bg3); color:${n?n.color:`var(--muted)`}; font-size:16px">${r}</div>
      <div class="f1">
        <div class="rb">
          <span class="td" style="font-size:14px; font-weight:700; text-decoration:${t?`line-through`:`none`}">${k(e.name)}</span>
          ${e.estimatedPrice>0?`<span class="ta mo" style="color:${n?n.color:`var(--muted)`}; font-size:14px; font-weight:800">${w(e.estimatedPrice)}</span>`:``}
        </div>
        ${e.aiJustification?`<p style="font-size:11px;color:${n?n.color:`var(--muted2)`};margin-top:2px;line-height:1.4">💡 ${k(e.aiJustification)}</p>`:``}
      </div>
      <div class="ac">
        ${t?``:`<button class="ib" style="color:var(--muted)" onclick="eshop(${e.id})">✏️</button><button class="ib" style="color:var(--green); font-weight:700" onclick="tb(${e.id})">✓</button>`}
        <button class="ib" style="color:var(--red)" onclick="dsi(${e.id})">✕</button>
      </div>
    </div>`},o=``;(n===`all`||n===`pending`)&&([`essencial`,`importante`,`desejo`,`supérfluo`].forEach(e=>{if(!r[e].length)return;let t=a[e],n=r[e].reduce((e,t)=>e+(t.estimatedPrice||0),0);o+=`
      <div style="margin-bottom:16px">
        <div class="ph" style="background:var(--bg2); border-color:var(--border)">
          <span style="color:var(--text); font-weight:800">${t.icon} ${t.label}</span>
          <span class="mo" style="font-size:13px; color:var(--text)">${w(n)}</span>
        </div>
        ${r[e].map(e=>i(e)).join(``)}
      </div>`}),r.sem.length&&(o+=`
      <div style="margin-bottom:16px">
        <div class="ph" style="background:var(--bg2); border-color:var(--border)">
          <span>⚪ Aguardando análise</span>
        </div>
        ${r.sem.map(e=>i(e)).join(``)}
      </div>`)),(n===`all`||n===`bought`)&&t.length&&(o+=`
    <div style="margin-bottom:16px">
      <span class="sl" style="margin-bottom:10px">Comprados ✓</span>
      ${t.slice(0,10).map(e=>i(e,!0)).join(``)}
    </div>`);let l=e.reduce((e,t)=>e+(t.estimatedPrice||0),0),u=!e.length&&!t.length?`<div class="es"><span style="font-size:40px">🛒</span><p style="color:var(--muted);margin:12px 0 16px;font-size:13px">Sua lista de compras está vazia.</p><button class="pb" onclick="om('shop')">Adicionar item</button></div>`:``;return`
  <div style="margin-bottom:16px">
    <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Lista de Compras</h1>
  </div>

  <div class="card">
    <div class="rb">
      <div>
        <span class="sl">TOTAL ESTIMADO</span>
        <p class="mo" style="font-size:24px; font-weight:800; color:var(--text)">${w(l)}</p>
        <p class="ti" style="color:var(--muted2)">${e.length} itens pendentes</p>
      </div>
      <div class="rw">
        <button class="gb" style="margin-right:6px" onclick="aip()" ${c.ap?`disabled`:``}>🤖 ${c.ap?`...`:`Priorizar`}</button>
        <button class="pb" onclick="om('shop')">+ Item</button>
      </div>
    </div>
  </div>

  <div class="sn" style="margin-bottom:14px">
    <button class="snb ${n===`all`?`act`:``}" onclick="setShopFilter('all')">Todos (${s.shoppingList.length})</button>
    <button class="snb ${n===`pending`?`act`:``}" onclick="setShopFilter('pending')">Pendentes (${e.length})</button>
    <button class="snb ${n===`bought`?`act`:``}" onclick="setShopFilter('bought')">Comprados (${t.length})</button>
  </div>

  ${u||o}`}function Se(e){let t=s.shoppingList.find(t=>t.id===e);t&&(t.bought=!t.bought,t.boughtAt=t.bought?new Date().toISOString():null,saveRow(`shopping_list`,{user_id:we(),created_id:String(t.id),name:t.name,estimated_price:t.estimatedPrice,reason:t.reason,priority:t.priority,ai_justification:t.aiJustification,bought:t.bought,bought_at:t.boughtAt}),S(),A(),S(),h())}function Ce(t){let n=s.shoppingList.find(e=>e.id===t);n&&window.confirmDelete(`Deseja excluir o item <strong>"${n.name}"</strong>?`,async()=>{await e.from(`shopping_list`).delete().eq(`created_id`,String(t)),s.shoppingList=s.shoppingList.filter(e=>e.id!==t),S(),h()})}function we(){let e=localStorage.getItem(`rico_v5`);if(e)try{return JSON.parse(e).cache?.uid||null}catch{}return null}function N(e){c.currentView=e,document.querySelectorAll(`.nb`).forEach(t=>t.classList.toggle(`act`,t.dataset.v===e));let t=document.getElementById(`fab`);t&&(t.style.display=e===`dashboard`||e===`history`?`flex`:`none`),h()}function Te(e){c.investTab=e,h()}function Ee(){s.theme=s.theme===`dark`?`light`:`dark`,P(),S()}function P(){document.documentElement.setAttribute(`data-theme`,s.theme||`dark`);let e=document.getElementById(`theme-toggle`);e&&(e.className=`theme-btn`+(s.theme===`light`?` light`:``))}function De(){let e=s.investments.reduce((e,t)=>e+t.amount,0),t=s.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),n=parseFloat(c.ci)||0,r=`<div class="sn" style="margin-bottom:16px">${[{id:`portfolio`,l:`💼 Carteira`},{id:`calculadora`,l:`🧮 Calc`},{id:`juros`,l:`📐 Juros`},{id:`ia`,l:`🤖 IA`}].map(e=>`<button class="snb ${c.investTab===e.id?`act`:``}" onclick="sit('${e.id}')">${e.l}</button>`).join(``)}</div>`;if(c.investTab===`portfolio`){let i=o.filter(e=>e.id!==`outro`).map(e=>{let t=s.investments.filter(t=>t.type===e.id).reduce((e,t)=>e+t.amount,0);return t?`<div class="sc" style="border-left: 3px solid ${e.color}">
        <span style="font-size:16px">${e.emoji}</span>
        <span class="mo" style="font-size:14px;font-weight:800;color:${e.color}">${w(t)}</span>
        <span class="ti">${e.label}</span>
      </div>`:``}).join(``),a=s.investments.length===0?`<div class="es"><span style="font-size:40px">📈</span><p style="color:var(--muted);margin:12px 0 16px;font-size:13px">Comece construindo sua reserva de emergência.</p><button class="pb" onclick="om('inv')">Adicionar investimento</button></div>`:s.investments.map(e=>{let t=O(o,e.type);return e.returnRate>0&&e.amount*(1+e.returnRate/100)**1,`
        <div class="lc" style="border-left-color:${t.color}">
          <div class="dot" style="background:var(--bg3); color:${t.color}; font-size:18px">${t.emoji}</div>
          <div class="f1">
            <div class="rb">
              <span class="td" style="font-size:14px; font-weight:700">${k(e.name)}</span>
              <span class="ta mo" style="color:${t.color}; font-size:14px; font-weight:800">${w(e.amount)}</span>
            </div>
            <div class="rw">
              <span class="ti" style="color:${t.color}">${t.label}</span>
              ${e.returnRate>0?`<span class="ti" style="color:var(--green);margin-left:8px">+${e.returnRate}% aa</span>`:``}
            </div>
            ${e.note?`<span class="ti" style="color:var(--muted2)">${k(e.note)}</span>`:``}
          </div>
          <button class="ib" style="color:var(--muted)" onclick="einv(${e.id})">✏️</button>
          <button class="ib" style="color:var(--red)" onclick="di(${e.id})">✕</button>
        </div>`}).join(``),c=n>0?Math.min(t/(n*6)*100,100):0;return`
    <div style="margin-bottom:16px">
      <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Investimentos & Patrimônio</h1>
    </div>
    ${r}
    <div class="card" style="padding:20px">
      <span class="sl">TOTAL INVESTIDO</span>
      <p class="mo" style="font-size:32px;font-weight:900;color:var(--purple);margin-top:4px">${w(e)}</p>
      <div class="g2" style="margin-top:14px">${i}</div>
    </div>

    <div class="card">
      <div class="rb">
        <div>
          <span class="sl">🛡️ Reserva de Emergência</span>
          <p style="font-size:11px;color:var(--muted2);margin-top:2px">Alvo: 6x renda mensal</p>
        </div>
        <span class="mo" style="font-size:20px;font-weight:800;color:var(--cyan)">${w(t)}</span>
      </div>
      ${n>0?`<div class="pm" style="margin-top:12px; height:8px"><div class="pf" style="width:${c}%;background:var(--cyan)"></div></div><span class="ti" style="color:var(--cyan); font-weight:700">${E(c)} da meta ideal</span>`:``}
    </div>

    <div class="rb" style="margin-bottom:12px">
      <span class="sl" style="margin:0; font-size:14px; color:var(--text)">Carteira de Ativos</span>
      <button class="pb" onclick="om('inv')">+ Aportar</button>
    </div>
    ${a}`}if(c.investTab===`calculadora`){let e=parseFloat(c.ce)||0,t=parseFloat(c.cg)||1e5,i=n-e,a=Math.max(t-s.balance,0),o=i>0?Math.ceil(a/i):0;return i>0&&(i/30).toFixed(2),Math.min(s.balance/t*100,100),`
    <div style="margin-bottom:16px">
      <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Calculadora Financeira</h1>
    </div>
    ${r}
    <div class="card">
      <span class="sl">🧮 Simulação de Orçamento</span>
      <p class="lb" style="margin-top:10px">Renda mensal (R$)</p>
      <input class="ip" type="number" placeholder="Ex: 5000" value="${c.ci}" oninput="setComp('ci',this.value)"/>
      <p class="lb">Gastos mensais (R$)</p>
      <input class="ip" type="number" placeholder="Ex: 3000" value="${c.ce}" oninput="setComp('ce',this.value)"/>
      <p class="lb">Meta de Sobra (R$)</p>
      <input class="ip" type="number" placeholder="100000" value="${c.cg}" oninput="setComp('cg',this.value)"/>
    </div>
    
    ${i>0?`<div class="card">
      <span class="sl">Resultado do Planejamento</span>
      <div class="g2" style="margin-top:10px">
        <div class="sc"><span class="ti">Sobra/mês</span><span class="mo" style="font-size:16px;font-weight:800;color:var(--green)">${w(i)}</span></div>
        <div class="sc"><span class="ti">Meta em</span><span class="mo" style="font-size:16px;font-weight:800;color:var(--purple)">${o} meses</span></div>
      </div>
    </div>`:``}`}if(c.investTab===`juros`){let e=parseFloat(c.compInitial)||0,t=parseFloat(c.compMonthly)||0,n=parseFloat(c.compRate)||12,i=parseFloat(c.compYears)||20,a=n/100/12,o=e;for(let e=1;e<=i*12;e++)o=o*(1+a)+t;let s=e+t*i*12;return`
    <div style="margin-bottom:16px">
      <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Simulador de Juros Compostos</h1>
    </div>
    ${r}
    <div class="card">
      <p class="lb">Capital inicial (R$)</p><input class="ip" type="number" placeholder="Ex: 1000" value="${c.compInitial}" oninput="setComp('initial',this.value)"/>
      <p class="lb">Aporte mensal (R$)</p><input class="ip" type="number" placeholder="Ex: 500" value="${c.compMonthly}" oninput="setComp('monthly',this.value)"/>
      <div style="display:flex;gap:10px">
        <div style="flex:1"><p class="lb">Taxa anual (%)</p><input class="ip" type="number" placeholder="12" value="${c.compRate}" oninput="setComp('rate',this.value)"/></div>
        <div style="flex:1"><p class="lb">Prazo (anos)</p><input class="ip" type="number" placeholder="20" value="${c.compYears}" oninput="setComp('years',this.value)"/></div>
      </div>
    </div>
    
    ${e||t?`<div class="compound-result">
      <span class="sl">Total após ${i} anos</span>
      <p class="mo" style="font-size:32px;font-weight:900;color:var(--green);margin:6px 0">${w(o)}</p>
      <div class="g2">
        <div class="sc"><span class="ti">Total Aportado</span><span class="mo" style="font-size:14px;color:var(--green);font-weight:700">${w(s)}</span></div>
        <div class="sc"><span class="ti">Juros Ganhos</span><span class="mo" style="font-size:14px;color:var(--purple);font-weight:700">${w(o-s)}</span></div>
      </div>
    </div>`:``}`}if(c.investTab===`ia`){let e=s.invChat.map(e=>`<div class="bub ${e.role===`user`?`usr`:``}">
      ${e.role===`assistant`?`<span style="font-size:18px;flex-shrink:0">📈</span>`:``}
      <div class="bt">${k(e.content)}</div>
    </div>`).join(``);return`
    <div style="margin-bottom:16px">
      <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">IA Consultor de Investimentos</h1>
    </div>
    ${r}
    <div class="card">
      <button class="sb" onclick="anv()" ${c.ia?`disabled`:``}>${c.ia?`🔄 Analisando...`:`⚡ Gerar Análise de Carteira`}</button>
    </div>
    <div class="cb2" id="icb">
      ${s.invChat.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:24px 0">
        <span style="font-size:40px">📈</span>
        <p style="color:var(--muted2);font-size:13px;text-align:center;margin-top:10px">Pergunte qualquer dúvida sobre investimentos</p>
      </div>`:e}
    </div>
    <div class="cr">
      <input class="ci" id="iai" placeholder="Pergunta sobre investimento..." onkeydown="if(event.key==='Enter')aia()"/>
      <button class="snd" onclick="aia()">➤</button>
    </div>`}return r}function Oe(t){let n=s.investments.find(e=>e.id===t);n&&window.confirmDelete(`Deseja excluir o investimento <strong>"${n.name}"</strong> de <strong>R$ ${n.amount.toFixed(2)}</strong>?`,async()=>{await e.from(`investments`).delete().eq(`created_id`,String(t)),s.investments=s.investments.filter(e=>e.id!==t),S(),h()})}function ke(e,t){e===`ci`?c.ci=t:e===`ce`?c.ce=t:e===`cg`?c.cg=t:e===`initial`?c.compInitial=t:e===`monthly`?c.compMonthly=t:e===`rate`?c.compRate=t:e===`years`&&(c.compYears=t),h()}function Ae(e){let t=document.getElementById(`iai`);t&&(t.value=e)}function je(){let e=s.aiChat.map(e=>`<div class="bub ${e.role===`user`?`usr`:``}">
    ${e.role===`assistant`?`<span style="font-size:18px;flex-shrink:0">💎</span>`:``}
    <div class="bt">${k(e.content)}</div>
  </div>`).join(``);return`
  <div style="margin-bottom:16px">
    <h1 style="font-size:24px; font-weight:900; letter-spacing:-0.02em; color:var(--text)">Assistente IA DriverFlow</h1>
  </div>

  <div class="card">
    <span class="sl">🤖 RICO — Copiloto Financeiro</span>
    <p class="mu" style="margin-top:4px">Seu assistente inteligente. Analise gastos, receba dicas de economia e planeje suas finanças.</p>
  </div>
  
  <div class="cb2" id="acb">
    ${s.aiChat.length===0?`<div style="display:flex;flex-direction:column;align-items:center;padding:32px 0">
      <span style="font-size:44px">💎</span>
      <p style="color:var(--muted2);margin-top:12px;font-size:14px;text-align:center;font-weight:600">Como posso ajudar suas finanças hoje?</p>
      <div class="sr">${[`Analise minha situação`,`Regra 50-30-20?`,`Plano de Economia`,`Como ganhar mais?`,`Dicas de rendimento`].map(e=>`<button class="sgb" onclick="sai('${e}')">${e}</button>`).join(``)}</div>
    </div>`:e}
    ${c.al?`<div class="bub"><span style="font-size:18px">💎</span><div class="bt" style="animation:pulse 1s infinite">Analisando suas finanças...</div></div>`:``}
  </div>

  <div class="cr">
    <input class="ci" id="aii" placeholder="Digite sua dúvida financeira..." onkeydown="if(event.key==='Enter')aa()"/>
    <button class="snd" onclick="aa()" ${c.al?`disabled`:``}>➤</button>
  </div>`}function Me(e){let t=document.getElementById(`aii`);t&&(t.value=e)}function Ne(){let e=document.getElementById(`mph`);e&&!e.getAttribute(`href`)&&(e.href=`/manifest.json`)}function Pe(){if(!(`serviceWorker`in navigator))return;let e=new Blob([`
const C='rico-app-v4';
const STATIC=['/','/manifest.json','/icons/icon-192.png','/icons/icon-512.png','/icons/apple-touch-icon.png','/icons/favicon.png'];
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
});`],{type:`application/javascript`});navigator.serviceWorker.register(URL.createObjectURL(e)).then(()=>console.log(`SW registered`)).catch(()=>{})}var F=null;function Fe(){window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),F=e,setTimeout(Ie,1500)})}function Ie(){if(window.matchMedia(`(display-mode: standalone)`).matches||window.navigator.standalone||document.getElementById(`ibanner`))return;let e=document.createElement(`div`);e.id=`ibanner`,e.style.cssText=`position:fixed;bottom:calc(80px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid rgba(16,185,129,.35);border-radius:14px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px;z-index:50;max-width:440px;width:calc(100% - 32px);box-shadow:0 8px 32px rgba(0,0,0,.4)`,e.innerHTML=`<div><p style="font-size:12px;font-weight:700;color:var(--green)">📲 Instalar RICO como App</p><p style="font-size:11px;color:var(--muted2);margin-top:2px">Funciona offline · Dados salvos no dispositivo</p></div><div style="display:flex;gap:8px"><button onclick="document.getElementById('ibanner').remove()" style="background:transparent;border:1px solid var(--border);border-radius:8px;padding:6px 10px;color:var(--muted);font-size:11px">✕</button><button id="btn-install-pwa" style="background:linear-gradient(135deg,#10b981,#4edea3);border:none;border-radius:8px;padding:7px 14px;color:#003824;font-size:11px;font-weight:800;cursor:pointer">Instalar</button></div>`,document.body.appendChild(e),document.getElementById(`btn-install-pwa`).onclick=I}async function I(){if(F){F.prompt(),await F.userChoice,F=null;let e=document.getElementById(`ibanner`);e&&e.remove()}else /iPhone|iPad|iPod/.test(navigator.userAgent)?alert(`📲 Como instalar no iPhone / iPad:

1. Toque no botão Compartilhar (⬆️) no navegador.
2. Role para baixo e selecione "Adicionar à Tela Inicial".`):alert(`📲 Como instalar no Android / Navegador:

1. Toque no menu do navegador (três pontinhos ⋮ no canto superior direito).
2. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial".`)}function Le(){window.navigator.standalone||/iPhone|iPad|iPod/.test(navigator.userAgent)&&(localStorage.getItem(`ios-hint-shown`)||(localStorage.setItem(`ios-hint-shown`,`1`),setTimeout(()=>{let e=document.createElement(`div`);e.style.cssText=`position:fixed;bottom:calc(90px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:#1e1e1e;border:1px solid rgba(16,185,129,.3);border-radius:14px;padding:14px 18px;font-size:12px;color:#e5e2e1;z-index:50;max-width:300px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.6)`,e.innerHTML=`📲 <b>Instalar no iPhone:</b><br/>Toque em <b>Compartilhar</b> (⬆️)<br/>depois <b>"Adicionar à Tela Inicial"</b><br/><span style="font-size:10px;color:#86948a;margin-top:6px;display:block">Toque para fechar</span>`,e.onclick=()=>e.remove(),document.body.appendChild(e),setTimeout(()=>e.remove(),8e3)},2e3)))}async function Re(){if(!(`Notification`in window)){alert(`Seu navegador não suporta notificações de área de trabalho.`);return}if(Notification.permission===`granted`){new Notification(`💎 RICO Finanças`,{body:`As notificações já estão ativadas! Avisaremos quando houver contas a vencer.`,icon:`data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%22 height=%2232%22 rx=%228%22 fill=%22%2306060f%22/%3E%3Ctext y=%2224%22 x=%2216%22 text-anchor=%22middle%22 font-size=%2220%22%3E💎%3C/text%3E%3C/svg%3E`});return}await Notification.requestPermission()===`granted`?new Notification(`💎 RICO Finanças`,{body:`Notificações ativadas com sucesso! Você receberá alertas de contas a vencer.`,icon:`data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%22 height=%2232%22 rx=%228%22 fill=%22%2306060f%22/%3E%3Ctext y=%2224%22 x=%2216%22 text-anchor=%22middle%22 font-size=%2220%22%3E💎%3C/text%3E%3C/svg%3E`}):alert(`Permissão de notificação foi negada no navegador.`)}function L(){if(!(`Notification`in window))return;let e=new Date().getDate(),t=D(),n=s.bills.filter(n=>!n.paid&&n.month===t&&n.dueDay&&n.dueDay<=e+3);if(n.length===0)return;if(!document.getElementById(`bill-notif-bar`)){let e=document.createElement(`div`);e.id=`bill-notif-bar`,e.style.cssText=`position:fixed;top:calc(env(safe-area-inset-top,0px)+56px);left:0;right:0;background:rgba(250,204,21,.95);color:#06060f;padding:8px 16px;font-size:12px;font-weight:700;z-index:100;display:flex;justify-content:space-between;align-items:center;cursor:pointer`;let t=n.slice(0,2).map(e=>e.name).join(`, `)+(n.length>2?` +${n.length-2}`:``);e.innerHTML=`<span>⚠️ ${n.length} conta${n.length>1?`s`:``} pendente${n.length>1?`s`:``}: ${t}</span><button style="background:transparent;border:none;font-size:16px;padding:0 4px;cursor:pointer" id="btn-close-bill-notif">✕</button>`,e.onclick=t=>{t.target.id!==`btn-close-bill-notif`&&(N(`bills`),e.remove())},document.body.appendChild(e);let r=document.getElementById(`btn-close-bill-notif`);r&&(r.onclick=t=>{t.stopPropagation(),e.remove()}),setTimeout(()=>{let e=document.getElementById(`bill-notif-bar`);e&&e.remove()},8e3)}let r=localStorage.getItem(`rico_last_notif_date`),i=new Date().toISOString().split(`T`)[0];r!==i&&Notification.permission===`granted`&&(n.forEach(e=>{new Notification(`💳 Conta pendente: ${e.name}`,{body:`${w(e.amount)} — vence dia ${e.dueDay}`,icon:`data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%22 height=%2232%22 rx=%228%22 fill=%22%2306060f%22/%3E%3Ctext y=%2224%22 x=%2216%22 text-anchor=%22middle%22 font-size=%2220%22%3E💎%3C/text%3E%3C/svg%3E`})}),localStorage.setItem(`rico_last_notif_date`,i))}function ze(){let e=document.getElementById(`offline-badge`);!c.isOnline&&!e?(e=document.createElement(`div`),e.id=`offline-badge`,e.style.cssText=`position:fixed;bottom:calc(68px + env(safe-area-inset-bottom,0px));right:10px;background:rgba(248,113,113,.9);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:10px;z-index:50`,e.textContent=`OFFLINE`,document.body.appendChild(e)):c.isOnline&&e&&e.remove()}function R(e){let t=document.getElementById(`mc`);e===`tx`?t.innerHTML=Be():e===`bill`?t.innerHTML=Ue():e===`debt`?t.innerHTML=Ge():e===`shop`?t.innerHTML=qe():e===`inv`?t.innerHTML=Ye():e===`budget`?t.innerHTML=Qe():e===`profile`&&(t.innerHTML=Ze()),document.getElementById(`mov`).style.display=`flex`,setTimeout(()=>{let e=document.querySelector(`.sh input`);e&&e.focus()},100)}function z(){document.getElementById(`mov`).style.display=`none`}function Be(){return`<p class="mt">Nova Transação</p>
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
  <button class="sb" onclick="stx()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Ve(e){document.getElementById(`tt`).value=e,document.getElementById(`be`).className=`tb2`+(e===`expense`?` exp`:``),document.getElementById(`bi`).className=`tb2`+(e===`income`?` inc`:``),document.getElementById(`tcw`).style.display=e===`expense`?`block`:`none`}function He(){let e=document.getElementById(`tt`).value,t=parseFloat(document.getElementById(`ta`).value.replace(`,`,`.`)),n=document.getElementById(`td`).value.trim();if(!t||!n)return;let r=e===`expense`?document.getElementById(`tc`).value:`outros`,i=document.getElementById(`trec`)?.checked||!1,a={id:Date.now(),type:e,amount:t,desc:n,category:r,date:new Date().toISOString(),recurring:i,recurringFrom:null};s.transactions.unshift(a),s.balance+=e===`income`?t:-t,j(),v(`transactions`,{user_id:c.currentUser?.id,created_id:String(a.id),type:e,amount:t,description:n,category:r,date:a.date,recurring:i,recurring_from:null}),y(),S(),z(),h()}function Ue(){let e=D();return`<p class="mt">Nova Conta</p>
  <p class="lb">Nome</p><input class="ip" id="bn" placeholder="Aluguel, Netflix..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Categoria</p><select class="ip" id="bc">${i.map(e=>`<option value="${e.id}">${e.emoji} ${e.label}</option>`).join(``)}</select>
  <div style="display:flex;gap:10px">
    <div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" placeholder="15" inputmode="numeric"/></div>
    <div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${e}"/></div>
  </div>
  <button class="sb" onclick="sbill()">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`}function We(){let e=document.getElementById(`bn`).value.trim(),t=parseFloat(document.getElementById(`ba`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),name:e,amount:t,category:document.getElementById(`bc`).value,dueDay:parseInt(document.getElementById(`bd`).value)||null,month:document.getElementById(`bm`).value,paid:!1};s.bills.push(n),v(`bills`,{user_id:c.currentUser?.id,created_id:String(n.id),name:e,amount:t,category:n.category,due_day:n.dueDay,month:n.month,paid:!1}),S(),z(),h()}function Ge(){return`<p class="mt">Registrar Dívida</p>
  <div class="tb" style="margin-bottom:14px">💡 Quite dívidas antes de investir — os juros cobrados superam qualquer rendimento.</div>
  <p class="lb">Para quem devo</p><input class="ip" id="dc" placeholder="Nubank, João..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="da" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Data vencimento</p><input class="ip" type="date" id="dd2"/>
  <p class="lb">Obs.</p><input class="ip" id="dn" placeholder="Juros, parcela..."/>
  <button class="sb" onclick="sdebt()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Ke(){let e=document.getElementById(`dc`).value.trim(),t=parseFloat(document.getElementById(`da`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),creditor:e,amount:t,dueDate:document.getElementById(`dd2`).value,note:document.getElementById(`dn`).value,paid:!1};s.debts.push(n),v(`debts`,{user_id:c.currentUser?.id,created_id:String(n.id),creditor:e,amount:t,due_date:n.dueDate||null,note:n.note||null,paid:!1}),S(),z(),h()}function qe(){return`<p class="mt">Adicionar Item</p>
  <div class="tb" style="margin-bottom:14px">💡 Pense no custo de oportunidade antes de comprar — vale o seu dinheiro?</div>
  <p class="lb">Nome do item</p><input class="ip" id="sn" placeholder="Tênis, fone, notebook..."/>
  <p class="lb">Preço estimado (R$)</p><input class="ip" type="number" id="sp" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Por que quer comprar?</p><input class="ip" id="sr2" placeholder="Preciso pro trabalho..."/>
  <button class="sb" onclick="sshop()">✅ Adicionar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Je(){let e=document.getElementById(`sn`).value.trim();if(!e)return;let t={id:Date.now(),name:e,estimatedPrice:parseFloat(document.getElementById(`sp`).value||`0`),reason:document.getElementById(`sr2`).value||null,priority:null,aiJustification:null,bought:!1,boughtAt:null};s.shoppingList.push(t),v(`shopping_list`,{user_id:c.currentUser?.id,created_id:String(t.id),name:e,estimated_price:t.estimatedPrice,reason:t.reason,priority:null,ai_justification:null,bought:!1,bought_at:null}),S(),z(),h()}function Ye(){return`<p class="mt">Novo Aporte</p>
  <div class="tb" style="margin-bottom:14px">💡 Triângulo do investidor: <b>Risco × Liquidez × Rendimento</b></div>
  <p class="lb">Tipo</p><select class="ip" id="it2">${o.map(e=>`<option value="${e.id}">${e.emoji} ${e.label}</option>`).join(``)}</select>
  <p class="lb">Nome / onde está</p><input class="ip" id="in2" placeholder="CDB Nubank, Tesouro Selic..."/>
  <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ia2" placeholder="0,00" inputmode="decimal"/>
  <p class="lb">Rentabilidade (% a.a.)</p><input class="ip" type="number" id="ir2" placeholder="Ex: 13.5" inputmode="decimal"/>
  <p class="lb">Obs.</p><input class="ip" id="io2" placeholder="Vence em, plataforma..."/>
  <button class="sb" onclick="sinv()">✅ Registrar</button><button class="cb" onclick="cm()">Cancelar</button>`}function Xe(){let e=document.getElementById(`in2`).value.trim(),t=parseFloat(document.getElementById(`ia2`).value.replace(`,`,`.`));if(!e||!t)return;let n={id:Date.now(),type:document.getElementById(`it2`).value,name:e,amount:t,returnRate:parseFloat(document.getElementById(`ir2`).value||`0`),note:document.getElementById(`io2`).value,date:new Date().toISOString()};s.investments.unshift(n),v(`investments`,{user_id:c.currentUser?.id,created_id:String(n.id),type:n.type,name:e,amount:t,return_rate:n.returnRate,note:n.note||null,date:n.date}),S(),z(),h()}function Ze(){return`<p class="mt">👤 Perfil & Configurações</p>
  <div class="tb" style="margin-bottom:14px">
    <strong>Conta ativa:</strong> ${k(c.currentUser?.email||`Usuário`)}
  </div>
  
  <p class="sl" style="margin-top:12px;margin-bottom:6px">🔐 Alterar Senha</p>
  <input class="ip" type="password" id="npass" placeholder="Nova senha (mínimo 6 caracteres)"/>
  <button class="sb" style="margin-bottom:14px;background:var(--blue,#3b82f6)" onclick="const p=document.getElementById('npass').value;if(p)updateUserPassword(p)">✅ Atualizar Senha</button>

  <p class="sl" style="margin-top:12px;margin-bottom:6px">📦 Backup de Dados (JSON)</p>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <button class="gb" style="flex:1" onclick="exportJSON()">📥 Exportar JSON</button>
    <label class="gb" style="flex:1;text-align:center;cursor:pointer">
      📤 Importar JSON
      <input type="file" accept=".json" style="display:none" onchange="importJSON(this)"/>
    </label>
  </div>

  <p class="sl" style="margin-top:12px;margin-bottom:6px">⚙️ Preferências</p>
  <button class="gb" style="width:100%;margin-bottom:14px" onclick="om('budget')">📊 Ajustar Limites por Categoria</button>
  
  <button class="cb" onclick="cm()">Fechar</button>`}function Qe(){return`<p class="mt">⚙️ Limites por Categoria</p>
  <div class="tb" style="margin-bottom:14px">💡 Regra 50-30-20: essenciais ≤50%, qualidade de vida ≤30%, investimentos ≥20%.</div>
  ${r.map(e=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span style="font-size:18px;width:30px;text-align:center">${e.emoji}</span>
    <div class="f1"><p style="font-size:12px;font-weight:600;margin-bottom:4px">${e.label}</p>
      <input class="ip" type="number" style="margin-bottom:0" placeholder="0 = sem limite" inputmode="decimal"
        value="${s.budgetLimits?.[e.id]||``}" oninput="setBudget('${e.id}',this.value)"/>
    </div>
  </div>`).join(``)}
  <button class="sb" onclick="cm();render()">✅ Salvar Limites</button><button class="cb" onclick="cm()">Cancelar</button>`}function $e(e,t){s.budgetLimits||={};let n=parseFloat(t)||0;n>0?s.budgetLimits[e]=n:delete s.budgetLimits[e],S()}function et(e){let t=s.bills.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">✏️ Editar Conta</p>
    <p class="lb">Nome</p><input class="ip" id="bn" value="${k(t.name)}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ba" value="${t.amount}" inputmode="decimal"/>
    <p class="lb">Categoria</p><select class="ip" id="bc">${i.map(e=>`<option value="${e.id}"${e.id===t.category?` selected`:``}>${e.emoji} ${e.label}</option>`).join(``)}</select>
    <div style="display:flex;gap:10px">
      <div style="flex:1"><p class="lb">Dia venc.</p><input class="ip" type="number" id="bd" value="${t.dueDay||``}" placeholder="15" inputmode="numeric"/></div>
      <div style="flex:1"><p class="lb">Mês</p><input class="ip" type="month" id="bm" value="${t.month}"/></div>
    </div>
    <button class="sb" onclick="uebill(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function tt(e){let t=s.bills.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`bn`).value.trim(),r=parseFloat(document.getElementById(`ba`).value.replace(`,`,`.`));!n||!r||(t.name=n,t.amount=r,t.category=document.getElementById(`bc`).value,t.dueDay=parseInt(document.getElementById(`bd`).value)||null,t.month=document.getElementById(`bm`).value,v(`bills`,{user_id:c.currentUser?.id,created_id:String(t.id),name:n,amount:r,category:t.category,due_day:t.dueDay,month:t.month,paid:t.paid}),S(),z(),h())}function nt(e){let t=s.debts.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">💰 Pagar Parcela</p>
    <div class="tb" style="margin-bottom:14px">Dívida com <strong>${k(t.creditor)}</strong><br><span style="color:var(--red)">Saldo restante: ${w(t.amount)}</span></div>
    <p class="lb">Quanto você está pagando agora? (R$)</p>
    <input class="ip" type="number" id="pval" placeholder="0,00" inputmode="decimal"/>
    <p class="lb" style="margin-top:8px">Registrar como saída no saldo?</p>
    <div class="rw" style="margin-bottom:14px">
      <input type="checkbox" id="pdesc" checked style="margin-right:8px"/>
      <label for="pdesc" style="font-size:12px;color:var(--muted)">Sim — descontar do saldo e criar transação</label>
    </div>
    <button class="sb" onclick="appdp(${e})">✅ Registrar Pagamento</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`,setTimeout(()=>{let e=document.getElementById(`pval`);e&&e.focus()},100)}function rt(e){let t=s.debts.find(t=>t.id===e);if(!t)return;let n=parseFloat(document.getElementById(`pval`).value.replace(`,`,`.`));if(!n||n<=0)return;let r=document.getElementById(`pdesc`)?.checked!==!1;if(t.amount=Math.max(0,+(t.amount-n).toFixed(2)),t.amount===0&&(t.paid=!0),r){let e={id:Date.now(),type:`expense`,amount:n,desc:`Pagamento: ${t.creditor}`,category:`outros`,date:new Date().toISOString(),recurring:!1,recurringFrom:null};s.transactions.unshift(e),s.balance=+(s.balance-n).toFixed(2),j(),v(`transactions`,{user_id:c.currentUser?.id,created_id:String(e.id),type:`expense`,amount:n,description:e.desc,category:`outros`,date:e.date,recurring:!1,recurring_from:null}),y()}v(`debts`,{user_id:c.currentUser?.id,created_id:String(t.id),creditor:t.creditor,amount:t.amount,due_date:t.dueDate||null,note:t.note||null,paid:t.paid}),S(),z(),h()}function it(e){let t=s.transactions.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`),i=t.type===`expense`;n.innerHTML=`<p class="mt">✏️ Editar Transação</p>
    <div class="tt">
      <button class="tb2${i?` exp`:``}" id="ebe" onclick="stt('expense')">💸 Gasto</button>
      <button class="tb2${i?``:` inc`}" id="ebi" onclick="stt('income')">💰 Entrada</button>
    </div>
    <input type="hidden" id="tt" value="${t.type}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ta" value="${t.amount}" inputmode="decimal"/>
    <p class="lb">Descrição</p><input class="ip" id="td" value="${k(t.desc)}"/>
    <div id="tcw" style="display:${i?`block`:`none`}">
      <p class="lb">Categoria</p>
      <select class="ip" id="tc">${r.map(e=>`<option value="${e.id}"${e.id===t.category?` selected`:``}>${e.emoji} ${e.label}</option>`).join(``)}</select>
    </div>
    <button class="sb" onclick="utx(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function at(e){let t=s.transactions.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`tt`).value,r=parseFloat(document.getElementById(`ta`).value.replace(`,`,`.`)),i=document.getElementById(`td`).value.trim();!r||!i||(s.balance+=t.type===`income`?-t.amount:t.amount,t.type=n,t.amount=r,t.desc=i,t.category=n===`expense`?document.getElementById(`tc`).value:`outros`,s.balance+=n===`income`?r:-r,s.balance=+s.balance.toFixed(2),v(`transactions`,{user_id:c.currentUser?.id,created_id:String(t.id),type:n,amount:r,description:i,category:t.category,date:t.date,recurring:t.recurring||!1,recurring_from:t.recurringFrom||null}),y(),S(),z(),h())}function ot(e){let t=s.debts.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">✏️ Editar Dívida</p>
    <p class="lb">Para quem devo</p><input class="ip" id="dc" value="${k(t.creditor)}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="da" value="${t.amount}" inputmode="decimal"/>
    <p class="lb">Data vencimento</p><input class="ip" type="date" id="dd2" value="${t.dueDate||``}"/>
    <p class="lb">Obs.</p><input class="ip" id="dn" value="${k(t.note||``)}"/>
    <button class="sb" onclick="udebt(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function st(e){let t=s.debts.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`dc`).value.trim(),r=parseFloat(document.getElementById(`da`).value.replace(`,`,`.`));!n||!r||(t.creditor=n,t.amount=r,t.dueDate=document.getElementById(`dd2`).value,t.note=document.getElementById(`dn`).value,t.amount===0&&(t.paid=!0),v(`debts`,{user_id:c.currentUser?.id,created_id:String(t.id),creditor:n,amount:r,due_date:t.dueDate||null,note:t.note||null,paid:t.paid}),S(),z(),h())}function ct(e){let t=s.shoppingList.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">✏️ Editar Item</p>
    <p class="lb">Nome do item</p><input class="ip" id="sn" value="${k(t.name)}"/>
    <p class="lb">Preço estimado (R$)</p><input class="ip" type="number" id="sp" value="${t.estimatedPrice||``}" inputmode="decimal"/>
    <p class="lb">Por que quer comprar?</p><input class="ip" id="sr2" value="${k(t.reason||``)}"/>
    <button class="sb" onclick="ushop(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function lt(e){let t=s.shoppingList.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`sn`).value.trim();n&&(t.name=n,t.estimatedPrice=parseFloat(document.getElementById(`sp`).value||`0`),t.reason=document.getElementById(`sr2`).value||null,v(`shopping_list`,{user_id:c.currentUser?.id,created_id:String(t.id),name:n,estimated_price:t.estimatedPrice,reason:t.reason,priority:t.priority||null,ai_justification:t.aiJustification||null,bought:t.bought||!1,bought_at:t.boughtAt||null}),S(),z(),h())}function ut(e){let t=s.investments.find(t=>t.id===e);if(!t)return;let n=o.map(e=>`<option value="${e.id}"${e.id===t.type?` selected`:``}>${e.emoji} ${e.label}</option>`).join(``),r=document.getElementById(`mc`);r.innerHTML=`<p class="mt">✏️ Editar Investimento</p>
    <p class="lb">Tipo</p><select class="ip" id="it2">${n}</select>
    <p class="lb">Nome / onde está</p><input class="ip" id="in2" value="${k(t.name)}"/>
    <p class="lb">Valor (R$)</p><input class="ip" type="number" id="ia2" value="${t.amount}" inputmode="decimal"/>
    <p class="lb">Rentabilidade (% a.a.)</p><input class="ip" type="number" id="ir2" value="${t.returnRate||``}" inputmode="decimal"/>
    <p class="lb">Obs.</p><input class="ip" id="io2" value="${k(t.note||``)}"/>
    <button class="sb" onclick="uinv(${e})">✅ Salvar</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function dt(e){let t=s.investments.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`in2`).value.trim(),r=parseFloat(document.getElementById(`ia2`).value.replace(`,`,`.`));!n||!r||(t.type=document.getElementById(`it2`).value,t.name=n,t.amount=r,t.returnRate=parseFloat(document.getElementById(`ir2`).value||`0`),t.note=document.getElementById(`io2`).value,v(`investments`,{user_id:c.currentUser?.id,created_id:String(t.id),type:t.type,name:n,amount:r,return_rate:t.returnRate,note:t.note||null,date:t.date}),S(),z(),h())}var B=null;function V(e,t){B=t;let n=document.getElementById(`mc`);n.innerHTML=`<p class="mt">⚠️ Confirmar Exclusão</p>
    <div class="tb" style="margin-bottom:14px;color:var(--red)">${e}</div>
    <button class="sb" style="background:linear-gradient(135deg,#dc2626,#f87171)" onclick="execDelete()">🗑️ Excluir</button><button class="cb" onclick="cm()">Cancelar</button>`,document.getElementById(`mov`).style.display=`flex`}function ft(){B&&=(B(),null),z()}function H(e){let t=document.getElementById(`auth-login`),n=document.getElementById(`auth-register`),r=document.getElementById(`auth-error`),i=document.getElementById(`auth-error-reg`);if(e===`register`){let e=document.getElementById(`auth-email`)?.value;if(e){let t=document.getElementById(`auth-email-reg`);t&&(t.value=e)}t&&(t.style.display=`none`),n&&(n.style.display=`block`),i&&(i.style.display=`none`),setTimeout(()=>{let e=document.getElementById(`auth-email-reg`);e&&!e.value&&e.focus()},50)}else{let e=document.getElementById(`auth-email-reg`)?.value;if(e){let t=document.getElementById(`auth-email`);t&&(t.value=e)}n&&(n.style.display=`none`),t&&(t.style.display=`block`),r&&(r.style.display=`none`),setTimeout(()=>{let e=document.getElementById(`auth-pass`);e&&e.focus()},50)}}async function U(){let t=document.getElementById(`btn-login`),n=document.getElementById(`auth-error`);t.disabled=!0,t.textContent=`Entrando...`,n.style.display=`none`;let r=document.getElementById(`auth-email`).value.trim(),i=document.getElementById(`auth-pass`).value;if(!r||!i){n.textContent=`Preencha e-mail e senha.`,n.style.color=`var(--red)`,n.style.display=`block`,t.disabled=!1,t.textContent=`Entrar`;return}document.getElementById(`auth-remember`)?.checked?localStorage.setItem(`rico_saved_email`,r):localStorage.removeItem(`rico_saved_email`);let{error:a}=await e.auth.signInWithPassword({email:r,password:i});a&&(n.textContent=a.message===`Invalid login credentials`?`E-mail ou senha incorretos.`:a.message,n.style.color=`var(--red)`,n.style.display=`block`,t.disabled=!1,t.textContent=`Entrar`)}async function W(){let t=document.getElementById(`btn-register`),n=document.getElementById(`auth-error-reg`);t.disabled=!0,t.textContent=`Criando conta...`,n.style.display=`none`;let r=document.getElementById(`auth-email-reg`).value.trim(),i=document.getElementById(`auth-pass-reg`).value;if(!r||!i){n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.3);color:var(--red)`,n.textContent=`Preencha e-mail e senha.`,t.disabled=!1,t.textContent=`Criar Conta Gratuita`;return}let{error:a}=await e.auth.signUp({email:r,password:i});a?(n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.3);color:var(--red)`,n.textContent=a.message):(n.style.cssText=`font-size:12px;margin-bottom:10px;display:block;padding:8px 12px;border-radius:8px;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.3);color:var(--green)`,n.textContent=`✅ Conta criada! Verifique seu e-mail para confirmar e depois entre.`,setTimeout(()=>{let e=document.getElementById(`auth-email`);e&&(e.value=r),H(`login`)},2500)),t.disabled=!1,t.textContent=`Criar Conta Gratuita`}function G(){return document.getElementById(`btn-logout`)}async function pt(){let t=G();t&&(t.disabled=!0,t.textContent=`Saindo...`),c.isLoggingOut=!0;try{await Promise.race([e.auth.signOut(),new Promise((e,t)=>setTimeout(()=>t(Error(`timeout`)),3e3))]),t&&(t.disabled=!1,t.textContent=`Sair`)}catch{Object.keys(localStorage).filter(e=>e.startsWith(`sb-`)).forEach(e=>localStorage.removeItem(e));try{localStorage.removeItem(`rico_v5`)}catch{}window.location.reload()}}var K=!1;function q(){let e=document.getElementById(`btn-login`),t=document.getElementById(`btn-register`),n=G();e&&(e.disabled=!1,e.textContent=`Entrar`),t&&(t.disabled=!1,t.textContent=`Criar Conta Gratuita`),n&&(n.disabled=!1,n.textContent=`Sair`)}async function J(e){K||(K=!0,c.currentUser=e,q(),document.getElementById(`auth-overlay`).style.display=`none`,document.getElementById(`app`).style.display=`flex`,await C(),P(),se(),A(),j(),_(),L(),Ne(),Pe(),Le(),h(),S())}function mt(){K=!1,c.currentUser=null,s.balance=0,s.transactions=[],s.bills=[],s.debts=[],s.shoppingList=[],s.investments=[],s.aiChat=[],s.invChat=[],s.budgetLimits={},s.streak=0,s.lastNoSpurfluous=null,s.balanceHistory=[],s.theme=`dark`;try{localStorage.removeItem(`rico_v5`)}catch{}q(),document.getElementById(`auth-overlay`).style.display=`flex`,document.getElementById(`app`).style.display=`none`}function ht(){e.auth.onAuthStateChange(async(e,t)=>{t&&(e===`SIGNED_IN`||e===`INITIAL_SESSION`||e===`TOKEN_REFRESHED`)?(c.isLoggingOut=!1,await J(t.user)):e===`SIGNED_OUT`&&(c.isLoggingOut||!localStorage.getItem(`rico_v5`)?mt():console.warn(`[auth] Recebido SIGNED_OUT sem solicitação de logout do usuário. Mantendo cache offline.`))}),e.auth.getSession().then(async({data:{session:e}})=>{e&&(c.isLoggingOut=!1,await J(e.user))})}async function gt(t){if(!t||t.length<6)return alert(`A nova senha deve ter no mínimo 6 caracteres.`),!1;let{error:n}=await e.auth.updateUser({password:t});return n?(alert(`Erro ao alterar senha: `+n.message),!1):(alert(`Senha alterada com sucesso!`),!0)}var _t=`https://vizsvjysklidnkzqxltn.supabase.co/functions/v1/openai_chat`;async function Y(e,t){try{let n=await fetch(_t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`gpt-4o-mini`,max_tokens:1500,temperature:.7,messages:[{role:`system`,content:t},...e]})}),r=await n.json();if(r.error)throw r.error.code===`credit_balance_exhausted`||r.error.type===`insufficient_quota`?Error(`⚠️ Seus créditos da API OpenAI acabaram. Adicione créditos em platform.openai.com para continuar usando.`):Error(r.error.message||`Erro na API da OpenAI`);if(!n.ok)throw Error(`Erro de conexão HTTP ${n.status}`);return r.choices?.[0]?.message?.content||`Não consegui gerar uma resposta. Tente novamente.`}catch(e){throw console.error(`Erro na chamada da IA:`,e),e}}function X(e){let t=String(e||``).trim();t.startsWith("```")&&(t=t.replace(/^```[a-zA-Z]*\n/,``).replace(/\n```$/,``)),t=t.trim();try{return JSON.parse(t)}catch(e){let n=t.indexOf(`{`),r=t.lastIndexOf(`}`);if(n!==-1&&r!==-1&&r>n)try{return JSON.parse(t.substring(n,r+1))}catch(e){console.error(`Erro ao parsear JSON da IA:`,e)}throw e}}function Z(){let e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,n=s.transactions.filter(e=>e.type===`income`&&e.date?.startsWith(t)),i=s.transactions.filter(e=>e.type===`expense`&&e.date?.startsWith(t)),a=n.reduce((e,t)=>e+t.amount,0),o=i.reduce((e,t)=>e+t.amount,0),l={};i.forEach(e=>{l[e.category]=(l[e.category]||0)+e.amount});let u=Object.entries(l).sort((e,t)=>t[1]-e[1]).map(([e,t])=>{let n=O(r,e);return`${n.emoji} ${n.label}: ${w(t)}`}).slice(0,5).join(`, `)||`Nenhum gasto registrado`,d=parseFloat(c.ci)||a||0,f=parseFloat(c.ce)||o||0;return{income:d,expense:f,sobra:d-f,realIncome:a,realExpense:o,topCategories:u}}var Q=`Você é o RICO, um educador e consultor financeiro de elite baseado na metodologia e visão de Thiago Nigro (O Primo Rico).
Você domina finanças pessoais, investimentos, economia brasileira, mentalidade de riqueza e multiplicação de patrimônio.

══════ SEUS PRINCÍPIOS FUNDAMENTAIS ══════

1. OS 3 PILARES DA RIQUEZA:
   • GASTAR BEM — Não é viver na miséria, é ter consciência do custo de oportunidade. Cada real mal gasto é patrimônio que deixou de render.
   • INVESTIR MELHOR — Dinheiro parado na conta é corroído pela inflação. Consistência e juros compostos ao longo do tempo batem qualquer atalho.
   • GANHAR MAIS — Você não fica rico só cortando o cafezinho; você precisa aumentar seu valor de mercado, ter novas fontes de renda e empreender.

2. REGRAS DE OURO INEGOCIÁVEIS:
   • Regra 50-30-20: 50% necessidades básicas, 30% estilo de vida, 20% investimentos no mínimo.
   • QUITE DÍVIDAS PRIMEIRO: Os juros das dívidas (cartão, cheque especial, empréstimos) destroem patrimônio muito mais rápido do que qualquer investimento pode render. Recomende o método Bola de Neve (quitar menores primeiro) ou Avalanche (quitar maiores juros).
   • RESERVA DE EMERGÊNCIA: 6 a 12 meses de custo de vida em ativos com liquidez diária e risco zero (Tesouro Selic ou CDB 100%+ CDI). Nunca pule esta etapa!
   • NÃO FAÇA DAY TRADE nem apostas. Foque em aportes mensais consistentes e longo prazo.

3. HIERARQUIA DE ALOCAÇÃO DE CAPITAL:
   1º) Reserva de Emergência (Tesouro Selic, CDB Liquidez Diária de banco sólido)
   2º) Renda Fixa para Médio Prazo (LCI, LCA isentas de IR, CDBs prefixados/IPCA+)
   3º) Proteção contra Inflação (Tesouro IPCA+ com foco em aposentadoria)
   4º) Fundos Imobiliários (FIIs) (Renda passiva mensal isenta de IR na conta)
   5º) Ações Brasileiras de Valor e Dividendos (Empresas perenes, lucrativas e boas pagadoras)
   6º) Diversificação Global (ETFs de S&P500 como IVVB11 ou WRLD11)
   7º) Criptoativos (Máximo 2% a 5% em Bitcoin e Ethereum como reserva de valor digital)

4. CONHECIMENTOS TÉCNICOS:
   • CDI, taxa Selic, IPCA e inflação real.
   • Tabela regressiva de IR para renda fixa (22,5% até 15% após 2 anos).
   • Isenção de IR em dividendos de FIIs e vendas de ações até R$ 20.000/mês.
   • Tabela do Milhão: R$ 1.000/mês a 1% ao mês gera R$ 1.000.000 em aproximadamente 20 anos.
   • Corretoras e plataformas brasileiras confiáveis (XP, Rico, BTG Pactual, Nubank/NuInvest, Inter).

══════ ESTILO DE COMUNICAÇÃO ══════
• Seja DIRETO, PRÁTICO e ENCORAJADOR.
• Explique conceitos de forma simples e visual, como se estivesse orientando um mentorado.
• Dê NÚMEROS E SIMULAÇÕES CONCRETAS sempre que relevante.
• Cuidado especial: se o usuário tiver dívidas, seja firme em alertar para quitá-las antes de comprar supérfluos ou investir em renda variável.
• Máximo de 3 a 4 parágrafos bem estruturados e pontuados.
• Use emojis adequados para enriquecer a experiência (💰📈🎯🔥💡🛡️).`;async function vt(){let e=document.getElementById(`aii`);if(!e||!e.value.trim()||c.al)return;let n=e.value.trim();e.value=``,c.al=!0,s.aiChat.push({role:`user`,content:n}),h();let{income:r,expense:i,sobra:a,realIncome:o,realExpense:l,topCategories:u}=Z(),d=s.investments.reduce((e,t)=>e+t.amount,0),f=s.debts.filter(e=>!e.paid).reduce((e,t)=>e+t.amount,0),p=s.shoppingList.filter(e=>!e.bought&&e.priority===`supérfluo`),m=`${Q}

══════ DADOS FINANCEIROS EM TEMPO REAL DO USUÁRIO ══════
- 💰 Saldo em Conta: ${w(s.balance)}
- 📊 Renda Mensal: ${w(r)} (Entradas no mês: ${w(o)})
- 📉 Despesas Mensais: ${w(i)} (Saídas no mês: ${w(l)})
- 💵 Sobra Mensal Estimada: ${w(a)}
- 📈 Total Investido: ${w(d)}
- 💳 Dívidas em Aberto: ${w(f)}
- 🛒 Itens Supérfluos na Lista: ${p.length}
- 🏷️ Maiores Gastos do Mês: ${u}
- 🎯 Progresso rumo à meta de R$100k: ${E(Math.min(s.balance/t*100,100))}
- 🔥 Dias seguidos sem compras supérfluas: ${s.streak||0} dias

Oriente o usuário considerando a realidade dos números dele.`;try{let e=await Y(s.aiChat.map(e=>({role:e.role,content:e.content})),m);s.aiChat.push({role:`assistant`,content:e})}catch(e){s.aiChat.push({role:`assistant`,content:`❌ ${e.message||`Erro de conexão com a IA. Tente novamente.`}`})}c.al=!1,S(),h()}async function yt(){let e=document.getElementById(`iai`);if(!e||!e.value.trim()||c.ial)return;let t=e.value.trim();e.value=``,c.ial=!0,s.invChat.push({role:`user`,content:t}),h();let n=s.investments.reduce((e,t)=>e+t.amount,0),r=s.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),{income:i,expense:a,sobra:l}=Z(),u=s.debts.filter(e=>!e.paid).reduce((e,t)=>e+t.amount,0),d=`${Q}

══════ CONTEXTO DE CARTEIRA E INVESTIMENTOS ══════
- Saldo: ${w(s.balance)} | Investido: ${w(n)} | Reserva: ${w(r)}
- Renda: ${w(i)} | Gastos: ${w(a)} | Sobra: ${w(l)}
- Dívidas: ${w(u)} | Meta: R$100.000,00
- Carteira Atual: ${s.investments.map(e=>`${e.name} (${O(o,e.type).label}): ${w(e.amount)}`).join(`, `)||`nenhum ativo cadastrado`}

Foque em estratégias de investimentos, alocação de ativos e multiplicação de patrimônio. Cite produtos reais do mercado financeiro brasileiro.`;try{let e=await Y(s.invChat.map(e=>({role:e.role,content:e.content})),d);s.invChat.push({role:`assistant`,content:e})}catch(e){s.invChat.push({role:`assistant`,content:`❌ ${e.message||`Erro ao conectar. Tente novamente.`}`})}c.ial=!1,S(),h()}async function bt(){let e=s.shoppingList.filter(e=>!e.bought);if(!e.length||c.ap)return;c.ap=!0,h();let t=`Classifique cada item por custo de oportunidade financeiro:
Categorias: "essencial","importante","desejo","supérfluo"
Saldo atual: ${w(s.balance)} | Meta: R$100k
${e.map((e,t)=>`${t+1}. id:${e.id} | ${e.name} | R$${e.estimatedPrice||`?`} | motivo: ${e.reason||`?`}`).join(`
`)}

Responda SOMENTE JSON no formato:
{"items":[{"id":NUMERO,"priority":"essencial|importante|desejo|supérfluo","justification":"1 frase curta e direta"}]}`;try{let e=X(await Y([{role:`user`,content:t}],`Responda APENAS JSON válido sem blocos markdown.`)),n={};(e.items||[]).forEach(e=>{n[e.id]={priority:e.priority,aiJustification:e.justification}}),s.shoppingList=s.shoppingList.map(e=>n[e.id]?{...e,...n[e.id]}:e),S()}catch(e){console.error(`Erro ao priorizar:`,e)}c.ap=!1,h()}async function xt(){if(c.ia)return;c.ia=!0,h();let e=s.investments.reduce((e,t)=>e+t.amount,0),t=s.investments.filter(e=>e.type===`reserva`).reduce((e,t)=>e+t.amount,0),{income:n,expense:r,sobra:i,realIncome:a,realExpense:l}=Z(),u=s.debts.filter(e=>!e.paid).reduce((e,t)=>e+t.amount,0),d=`Analise detalhadamente a situação financeira e gere recomendações de alocação de carteira estilo Primo Rico.
Saldo: ${w(s.balance)} | Renda: ${w(n)} (real do mês: ${w(a)}) | Gastos: ${w(r)} (real do mês: ${w(l)})
Sobra mensal: ${w(i)} | Investido: ${w(e)} | Reserva: ${w(t)} | Dívidas: ${w(u)}
Carteira: ${s.investments.map(e=>`${e.name}(${O(o,e.type).label}):${w(e.amount)}`).join(`, `)||`vazia`}

Regras da análise:
- Os percentuais em "recomendacoes" DEVEM SOMAR EXATAMENTE 100%.
- Se o usuário tiver dívidas, direcione a prioridade para quitar antes de aportar.
- Se não tiver reserva de emergência completa (6x despesas), foque em Tesouro Selic / CDB Liquidez Diária.
- Classifique a fase: "aspirante" (se tem dívidas ou não poupa), "poupador" (poupa mas sem reserva/investe pouco), "investidor" (tem reserva e carteira diversificada).

Responda ESTRITAMENTE em formato JSON (sem markdown):
{
  "diagnostico": "Resumo de 2 a 3 frases objetivas e motivadoras.",
  "fase": "aspirante|poupador|investidor",
  "reservaIdeal": 0,
  "aporteMensalIdeal": 0,
  "mesesParaMeta": 0,
  "recomendacoes": [
    {
      "titulo": "Classe do ativo",
      "instrumento": "Ex: Tesouro Selic 2029",
      "descricao": "Por que investir aqui",
      "percentual": 0,
      "risco": "baixo|médio|alto",
      "rendimentoEstimado": "Ex: 11,75% a.a.",
      "emoji": "🛡️",
      "ondeInvestir": "XP, NuInvest, Inter, Rico"
    }
  ],
  "alertasPrioritarios": ["Frase de alerta importante"],
  "proximoPasso": "Ação prática imediata",
  "citacaoLivro": "Princípio inspirador de finanças"
}`;try{c.invA=X(await Y([{role:`user`,content:d}],`Responda APENAS JSON válido sem marcações markdown.`))}catch(e){console.error(`Erro no diagnóstico:`,e),c.invA={diagnostico:`❌ ${e.message||`Erro ao gerar análise. Tente novamente.`}`,recomendacoes:[],alertasPrioritarios:[]}}c.ia=!1,S(),h()}function St(){let e=document.getElementById(`hb`);if(!e)return;e.textContent=w(s.balance),e.style.color=s.balance>=0?`var(--green)`:`var(--red)`;let t=document.getElementById(`huser`);t&&c.currentUser&&(t.textContent=c.currentUser.email?.split(`@`)[0]||``);let n=document.getElementById(`bills-dot`);if(n){let e=s.bills.filter(e=>e.month===D()&&!e.paid);n.style.display=e.length?`block`:`none`}}function $(){let e=document.getElementById(`main`);if(!e)return;e.className=`fade`;let t=c.currentView;t===`dashboard`?e.innerHTML=ce():t===`bills`?e.innerHTML=de():t===`debts`?e.innerHTML=ge():t===`shopping`?e.innerHTML=xe():t===`invest`?e.innerHTML=De():t===`ai`?e.innerHTML=je():t===`history`&&(e.innerHTML=le()),St(),L(),ze(),setTimeout(()=>{[`acb`,`icb`].forEach(e=>{let t=document.getElementById(e);t&&(t.scrollTop=t.scrollHeight)})},60)}function Ct(t){let n=s.transactions.find(e=>e.id===t);n&&V(`Deseja excluir a transação <strong>"${n.desc}"</strong> de <strong>${w(n.amount)}</strong>?`,async()=>{await e.from(`transactions`).delete().eq(`created_id`,String(t)),s.balance-=n.type===`income`?n.amount:-n.amount,s.transactions=s.transactions.filter(e=>e.id!==t),j(),y(),S(),$()})}function wt(e){c.txFilterMonth=e,c.txPage=0,$()}function Tt(e){c.txFilterCat=e,c.txPage=0,$()}function Et(e){c.txFilterType=e,c.txPage=0,$()}function Dt(e){c.txPage=e,$()}function Ot(e){c.txSearch=e,c.txPage=0,$()}function kt(){c.txFilterMonth=``,c.txFilterCat=``,c.txFilterType=``,c.txSearch=``,c.txPage=0,$()}Object.assign(window,{doLogin:U,doLogout:pt,doRegister:W,switchAuth:H,toggleTheme:Ee,sv:N,om:R,cm:z,render:$,sit:Te,exportCSV:re,exportPDF:ie,exportJSON:ae,importJSON:oe,dtx:Ct,setTxFilterMonth:wt,setTxFilterCat:Tt,setTxFilterType:Et,clearTxFilters:kt,setTxPage:Dt,setTxSearch:Ot,etx:it,utx:at,tbp:fe,db:pe,copyPrevBills:te,ebill:et,uebill:tt,setBillFilter:ue,tdp:_e,dd:ve,pdp:nt,appdp:rt,edebt:ot,udebt:st,setDebtFilter:he,tb:Se,dsi:Ce,eshop:ct,ushop:lt,setShopFilter:be,di:Oe,setComp:ke,sii:Ae,einv:ut,uinv:dt,stt:Ve,stx:He,sbill:We,sdebt:Ke,sshop:Je,sinv:Xe,setBudget:$e,aa:vt,aia:yt,anv:xt,aip:bt,sai:Me,confirmDelete:V,execDelete:ft,requestNotificationPermission:Re,updateUserPassword:gt,iapp:I});async function At(){m($);let e=await ee();ht(),Fe(),e&&(P(),$())}At(),new URLSearchParams(window.location.search).get(`action`)===`tx`&&setTimeout(()=>R(`tx`),500);var jt=document.getElementById(`btn-login`);jt&&jt.addEventListener(`click`,U);var Mt=document.getElementById(`btn-register`);Mt&&Mt.addEventListener(`click`,W);var Nt=document.getElementById(`auth-pass`);Nt&&Nt.addEventListener(`keydown`,function(e){e.key===`Enter`&&U()});var Pt=document.getElementById(`auth-email`);Pt&&Pt.addEventListener(`keydown`,function(e){e.key===`Enter`&&U()});var Ft=document.getElementById(`auth-pass-reg`);Ft&&Ft.addEventListener(`keydown`,function(e){e.key===`Enter`&&W()});var It=document.getElementById(`auth-email-reg`);It&&It.addEventListener(`keydown`,function(e){e.key===`Enter`&&W()});