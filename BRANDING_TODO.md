# BRANDING_TODO — fyll i före launch

Allt nedan styrs från `src/data/site.ts` om inget annat anges.

## Måste

- [x] **Contract address** — `6pi6gemwWCZtWUbVcrTTm3Pcug5BBZq5r4CZ11Y3pump`.
- [x] **X-handle** — `@Usemirrorbot` (https://x.com/Usemirrorbot).
- [x] **Länkar i heron** — pump.fun och DexScreener är ifyllda från CA:n. `telegramUrl` är tom (knappen döljs) tills ni har en grupp.
- [ ] **Avgift** — `mirrorFeePct` (1 %) är ett förslag. Bekräfta eller ändra; texten i FAQ, docs och kalkylatorn följer med.
- [ ] **Demo-läge** — sätt `demo: false` först när riktig data kopplats in, annars ser besökare påhittade siffror utan etikett.
- [ ] **Terms / Privacy** — `src/pages/Terms.tsx`, `src/pages/Privacy.tsx` är utkast. Låt någon granska.

## Bör

- [ ] **Rankningsregler** i `src/pages/Docs.tsx` (#ranking): 14 dagars historik / 5 trades per dag är förslag.
- [ ] **Rotation vid reset** (#rotation): "close" vs "ride" — bekräfta hur ni vill att det fungerar.
- [ ] **Reset-tid** — `resetHourUtc` (00:00 UTC).
- [ ] **Agentnamnen** i `public/api/leaderboard.json` är fiktiva exempel. Ersätt med riktiga agenter när indexern finns.
- [ ] **Delningsbild** — `public/assets/og.png` (1200×630) är klar. Efter deploy: gör `og:image` och `twitter:image` i `index.html` till full URL (`https://din-domän/assets/og.png`), annars visar X ingen bild. Gamla `public/assets/og.svg` används inte längre och kan raderas.
- [ ] **Exempelveckan** (sektionen "A new #1 every day") är simulerad och märkt så. Byt mot riktig historik när den finns, eller ta bort sektionen innan `demo: false`.

## Kan

- [ ] Logga/maskot: `src/components/Logo.tsx`, `src/components/MirrorBot.tsx`, `public/favicon.svg` (egna original, byt om ni har en logga).
- [ ] Accentfärg: `--accent` i `src/styles/global.css`.
- [ ] Typsnitt: länken i `index.html` + `--font` i CSS.

## Medvetet utelämnat

Pitchen nämner att MIRROR kopplar ihop Foma och WallStreetBots. De namnen står inte på sajten — sajten beskriver metan (copy trading × AI-agenter) utan att antyda samarbete med andra projekt. Lägg till dem själva om ni vill.

## Backend (TODO(backend))

- Indexer för agent-PnL → `/api/leaderboard.json`, `/api/stats.json`
- Event-stream för live-feed och terminal
- Solana wallet adapter + delegat med gränser (ratio, max, daily stop) för `/link`
- Riktig statusdata
