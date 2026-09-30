# Referensanalys — blinkrbot.vercel.app

Referensen användes som **stil- och strukturreferens** (sidtyp: mörk tech/tradingbot-landningssida). MIRROR har eget innehåll, egen copy, egen maskot, egen logga, egen palett och egen CSS.

## Vad referensen är

Vite/React-SPA, en enda stylesheet med CSS-variabler, mörkt tema + ljust tema, monospace-typsnitt genomgående, skarpa hörn, tunna linjer, inga skuggor. Sticky header med blur. Max-bredd ca 1120px, gutter 24px, header 60px.

## Layoutmönster som togs som inspiration (generiska)

| Mönster i referensen | Motsvarighet i MIRROR |
|---|---|
| Hero: rubrik + lede + 2 knappar + fakta-rad, höger: maskot ovanpå en "chatt"-panel | Hero med spegel-reflekterad rubrik; höger: egen spegel-maskot (#1 ↔ you) ovanpå en animerad "mirror.log"-terminal |
| Stats-rad med 4 värden ("—" före data) | Samma idé: Agents tracked / Mirrors active / Volume mirrored / Today's #1 |
| "How it works" i 4 kort | 4 steg: Link wallet → Set size → Leaderboard picks → Every trade mirrored |
| 2 kort med fördelningsstaplar | "Copy trading × AI agents": storleksexempel + topp-3 staplar |
| Interaktiv post-byggare | "Build your mirror": kalkylator med kommando, resultat och validering |
| Senaste-lista + FAQ + footer i 4 kolumner | Leaderboard-tabell med nedräkning, FAQ, CTA-band, footer |

Tillägg som inte finns i referensen: ticker-tejp, dagsnedräkning till reset, PnL-graf med hover, live-feed med paus/filter, statussida med uptime-staplar, spegelreflektion i rubriken och ordmärket.

## Routes

Referens: `/`, `/feed`, `/stocks`, `/charities`, `/docs`, `/status`, `/link`, `/terms`, `/privacy`.
MIRROR (anpassat till narrativet): `/`, `/leaderboard`, `/agents/:id`, `/feed`, `/docs`, `/link`, `/status`, `/terms`, `/privacy`, `*`. `/stocks` och `/charities` ersattes av leaderboard + agentsidor eftersom MIRROR inte parar mynt med aktier/välgörenhet.

## Designsystem (MIRROR)

- Typsnitt: JetBrains Mono (referensen använder ett annat monospace).
- Palett: kall "chrome" — bg `#0a0c0f`, paneler `#0f1217`, linjer `#28303b`, text `#d3d9e2`, accent cyan `#62f0ff`, upp `#3ddc97`, ned `#ff5d73`. Ljust tema i borstad metall.
- Radius 2px, rubriker 600–700 vikt med tight spacing, hero-rubrik 60/38px.
- Brytpunkter: 1080 / 760 / 640 px.

## Komponenter

Header (desktop-nav + mobilmeny), Logo, MirrorBot, Terminal, Ticker, StatsRow, SectionHead/PageHead, kort, segmentknappar, inputs, kv-listor, tabeller (staplade rader på mobil), badges, FAQ (details/summary), PnlChart, statusstaplar, stegflöde, footer.

## Animationer

Terminalrader glider in var 1,9 s · blinkande live-punkter · maskotens ögon blinkar och armen "tradar", spegelboten följer med 0,22 s fördröjning · rörlig streckad spegellinje · ticker 48 s loop (pausar vid hover) · fade-up vid scroll · FAQ-plus roterar. Allt av med `prefers-reduced-motion`.

## Externa integrationer

Inga i referensen som behövdes. MIRROR: Google Fonts. Allt annat mockat (se README).
