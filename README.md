# MIRROR — "Copy the #1 bot."

Landningssida + app-skal för MIRROR ($MIRROR på Solana/pump.fun): varje dag rankas AI-tradingagenter efter 24h PnL, och MIRROR kopierar automatiskt alla trades som dagens #1 gör in i användarens egen wallet. Copy trading × AI-agenter i en mening.

Referens för stil och sidtyp: https://blinkrbot.vercel.app/ (mörk, monospace, "terminal/tradingbot"-känsla). Allt innehåll, all copy, maskoten, loggan, färgpaletten och all CSS är nyskrivet för MIRROR — inga texter, bilder eller stilmallar från referensen används.

## Starta

**Windows:** dubbelklicka `start.bat` (installerar dependencies första gången och startar dev-servern).

**Manuellt:**

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck (tsc -b) + produktionsbygge till dist/
npm run preview    # förhandsvisa dist/
```

Kräver Node.js 18+ (20+ rekommenderas).

## Routes

| Route | Innehåll |
|---|---|
| `/` | Hero med delad "mirror.log"-terminal (#1 tradar till vänster, din kopia dyker upp till höger) + CA/köp/X-rad · ticker · live-stats · How it works (4 steg med mini-UI) · "A new #1 every day" (exempelvecka) · "Copy trading × AI agents" · kalkylator · topp-6 leaderboard med 14d-sparklines · FAQ · CTA |
| `/leaderboard` | Alla agenter, sök, 24h/7d/30d-växlare, klickbara rader |
| `/agents/:id` | Agentsida (dynamisk): 30d PnL-graf med hover/piltangenter, senaste trades, nyckeltal |
| `/feed` | Live-flöde av speglade trades, filter köp/sälj, paus |
| `/docs` | Dokumentation med sticky innehållsförteckning (`/docs#risk`, `#sizing`, `#custody` …) |
| `/link` | "Start mirroring"-flöde i 4 steg (wallet → gränser → godkänn → live), tar emot värden från kalkylatorn via query |
| `/status` | Systemstatus + 60 dagars uptime-staplar |
| `/terms`, `/privacy` | Utkast |
| `*` | 404 med maskoten |

## Projektstruktur

```
src/
  components/   Header, Footer, Logo, MirrorBot (maskot), Terminal, Ticker, StatsRow,
                LeaderboardTable, PnlChart, AgentAvatar, Faq, Heads, Countdown, CopyButton, SimBadge
  layouts/      RootLayout (header/footer, scroll-till-#hash, fade-in vid scroll)
  pages/        en fil per route
  routes/       route-definitioner
  hooks/        useFixture, useAgents, useCountdown, useInterval, useTheme
  lib/          types, format, rng (deterministisk slump), sim (simulerad data)
  data/         site.ts (ALL branding/config), faq.tsx
  styles/       global.css (designtokens + alla komponenter)
public/
  api/          leaderboard.json, stats.json (fixtures)
  assets/       og.svg (delningsbild)
  favicon.svg
```

## Dependencies

Endast `react`, `react-dom`, `react-router-dom` (+ Vite, TypeScript, typer). Typsnittet JetBrains Mono laddas från Google Fonts med systemets monospace som fallback.

## Responsivt

Brytpunkter 1080px (hamburgarmeny, hero staplas, 2 kolumner), 760px och 640px (1 kolumn, stats 2×2, tabeller blir staplade rader). Verifierat på 1280, 768 och 390 px utan horisontell scroll. `prefers-reduced-motion` stänger av alla animationer.

Ljust tema ("Chrome") finns i footern och sparas i `localStorage`.

## Mock-data och TODO(backend)

`SITE.demo = true` i `src/data/site.ts` visar en "simulated preview"-etikett överallt där data är påhittad:

- **Leaderboard** – `public/api/leaderboard.json` (12 fiktiva agenter). TODO(backend): indexer som räknar PnL från agenternas wallets.
- **Stats-raden** – räknas fram från leaderboarden + nedräkningen; latens är ett mål (`targetLatency`), inte en mätning.
- **Exempelveckan** – `rotationWeek()` i `src/lib/sim.ts`, alltid med röda dagar, märkt "simulated".
- **Terminal, live feed, agentgrafer, trades, status** – genereras deterministiskt i `src/lib/sim.ts`. TODO(backend): event-stream från mirror-motorn.
- **Wallet-flödet** (`/link`) – demo-state: idle → connecting → connected / error, godkännande simuleras. TODO(backend): Solana wallet adapter + delegat-program med gränser.

Sök på `TODO(backend)` i koden för alla ställen.

## Rebranding

Allt varumärkesspecifikt ligger i `src/data/site.ts`: namn, ticker, tagline, X-handle, contract address, pump.fun-/chart-/Telegram-länkar, reset-tid (UTC), avgift, latensmål och demo-flagga. Färger ändras i toppen av `src/styles/global.css` (`--accent` m.fl.). Se `BRANDING_TODO.md` för vad som måste fyllas i före launch.

## Deploy

Statisk sajt: `npm run build` → `dist/`. `vercel.json` skickar alla djuplänkar (t.ex. `/agents/vega`) till `index.html`. På Netlify: lägg till `/* /index.html 200` i `public/_redirects`.
