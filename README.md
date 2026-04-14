# 💎 RICO — Do Mil ao Milhão

Aplicativo de controle financeiro pessoal baseado na metodologia do livro **"Do Mil ao Milhão"** de Thiago Nigro.

## Funcionalidades

- **Dashboard** — Saldo, histórico e metas financeiras
- **Transações** — Controle de receitas e despesas com categorias
- **Contas** — Gerenciar contas a pagar com notificações de vencimento
- **Dívidas** — Rastrear e quitar dívidas
- **Lista de Compras** — Avaliação inteligente com IA (prioridade: essencial → supérfluo)
- **Investimentos** — Portfólio, análise IA e simulador de juros compostos
- **IA Financeira** — Assistente baseado nos princípios do livro
- **PWA** — Funciona como app no celular, com suporte offline
- **Tema** — Dark/Light mode

## Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript vanilla (ES6+)
- **Build:** Vite 8
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **IA:** GPT-4o-mini via Supabase Edge Function

## Configuração Local

### 1. Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### 2. Clonar e instalar

```bash
git clone https://github.com/seu-usuario/rico-financas.git
cd rico-financas
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` e preencha:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-anon-key
```

### 4. Configurar banco de dados

Execute o arquivo `supabase_schema.sql` no SQL Editor do seu projeto Supabase.

### 5. Configurar Edge Function (IA)

No painel do Supabase, crie uma Edge Function chamada `openai_chat` com acesso à API do OpenAI (modelo `gpt-4o-mini`).

### 6. Rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:3000`

## Deploy no GitHub Pages

### 1. Fazer push para o GitHub

```bash
git init
git add .
git commit -m "feat: initial commit"
git remote add origin https://github.com/seu-usuario/rico-financas.git
git push -u origin main
```

### 2. Ativar GitHub Pages

1. Vá em **Settings → Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**

### 3. Configurar Secrets (opcional)

Se quiser usar um Supabase diferente do padrão:

1. Vá em **Settings → Secrets and variables → Actions**
2. Adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`

O deploy acontece automaticamente a cada push na branch `main`.

## Estrutura do Projeto

```
rico-financas/
├── index.html          # HTML principal + PWA meta tags
├── main.js             # Toda a lógica da aplicação (~1100 linhas)
├── style.css           # Design system + componentes
├── vite.config.js      # Configuração do Vite
├── supabase_schema.sql # Schema do banco PostgreSQL
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD para GitHub Pages
```

## Regra 50-30-10-10 (Thiago Nigro)

| Porcentagem | Destino |
|-------------|---------|
| 50% | Gastos essenciais |
| 30% | Investimentos |
| 10% | Outros gastos |
| 10% | Livre |

## Licença

ISC
