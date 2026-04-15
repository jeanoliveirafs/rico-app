# 💰 RICO — Personal Finance App with AI Advisor

> **EN** | [🇧🇷 Versão em Português abaixo](#-sobre-o-projeto-português)

A personal finance web app inspired by the "Do Mil ao Milhão" methodology by Thiago Nigro. RICO helps users take control of their finances through expense tracking, investment simulation, and an AI financial advisor powered by GPT-4o.

---

## ✨ Features

- 📊 **Dashboard** — Balance overview, history, and financial goals
- 💸 **Transactions** — Track income and expenses with categories
- 🏦 **Accounts Payable** — Manage bills with due date notifications
- 💳 **Debt Tracker** — Track and pay off debts systematically
- 🛒 **Smart Shopping List** — AI evaluates purchases (essential vs. superfluous)
- 📈 **Investments** — Portfolio management, AI analysis & compound interest simulator
- 🤖 **AI Financial Advisor** — Assistant based on the "Do Mil ao Milhão" principles
- 📱 **PWA** — Works as a mobile app with offline support
- 🌙 **Dark/Light Mode** — Theme switching

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES6+), Vite |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| AI | GPT-4o-mini via Supabase Edge Function |
| Deploy | GitHub Pages (CI/CD) |

---

## 🚀 Getting Started

```bash
git clone https://github.com/jeanoliveirafs/rico-app.git
cd rico-app
npm install
cp .env.example .env
# Add your Supabase URL and anon key
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

---

## 💡 The 50-30-10-10 Rule (Thiago Nigro)

| % | Destination |
|---|-------------|
| 50% | Essential expenses |
| 30% | Investments |
| 10% | Other expenses |
| 10% | Free spending |

---

## 🇧🇷 Sobre o Projeto (Português)

**RICO** é um app de controle financeiro pessoal baseado na metodologia do livro "Do Mil ao Milhão" de Thiago Nigro. Ajuda os usuários a controlarem suas finanças com rastreamento de gastos, simulação de investimentos e um assistente de IA financeiro.

### Funcionalidades

- 📊 **Dashboard** — Saldo, histórico e metas financeiras
- 💸 **Transações** — Controle de receitas e despesas com categorias
- 🤖 **IA Financeira** — Assistente baseado nos princípios do livro
- 📈 **Investimentos** — Portfólio, análise IA e simulador de juros compostos
- 📱 **PWA** — Funciona como app no celular com suporte offline

### Como Executar

```bash
git clone https://github.com/jeanoliveirafs/rico-app.git
cd rico-app && npm install && cp .env.example .env && npm run dev
```

---

<p align="center">Made with ❤️ by <a href="https://github.com/jeanoliveirafs">Jean Oliveira</a></p>
