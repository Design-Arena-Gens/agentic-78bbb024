## Mission Prosperous India – Farmer Advisory Command Centre

This project delivers a web-based call agent console to support the Mission Prosperous India helpline. Agents can capture farmer queries, access curated agronomy knowledge capsules, and issue bilingual (English/Hindi) responses within minutes.

### ✨ Feature Snapshot

- **Agent Console:** Collect caller information, capture farming questions, and generate rapid action plans.
- **Knowledge Capsules:** Embedded soil health, IPM, irrigation, and market linkage playbooks with context-aware matching.
- **Bilingual Output:** Toggle between English and Hindi to support diverse farmers.
- **Escalation Playbook:** Built-in reminders for field visits, finance escalations, and case logging.

### 🛠️ Tech Stack

- [Next.js App Router](https://nextjs.org/docs/app) with TypeScript
- Tailwind CSS (via the new `@import "tailwindcss"` pipeline)
- Custom knowledge-matching utility for offline recommendations

### 🚀 Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to interact with the console.

### 📁 Key Files

- `src/app/page.tsx` – Landing page layout and mission narrative
- `src/components/AgentConsole.tsx` – Interactive console and conversation log
- `src/lib/agent.ts` – Matching logic and bilingual response generator
- `src/lib/knowledgeBase.ts` – Domain knowledge capsules for the agent

### 📦 Production Build

```bash
npm run build
npm start
```

Deployments are optimized for Vercel. Update environment-specific configuration (if any) before publishing.
