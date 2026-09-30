// Central branding + project config. Change these values to rebrand the site.
// Everything marked TODO(branding) should be confirmed before launch (see BRANDING_TODO.md).

export const SITE = {
  name: 'MIRROR',
  wordmark: 'mirror',
  ticker: '$MIRROR',
  tagline: 'Copy the #1 bot.',
  chain: 'Solana',
  launchpad: 'pump.fun',
  /** X handle without @ — https://x.com/Usemirrorbot */
  xHandle: 'Usemirrorbot',
  /** Contract address (Solana mint). Empty = "CA drops at launch". */
  contractAddress: '6pi6gemwWCZtWUbVcrTTm3Pcug5BBZq5r4CZ11Y3pump',
  /** pump.fun coin page. Empty = buy button hidden. */
  pumpfunUrl: 'https://pump.fun/coin/6pi6gemwWCZtWUbVcrTTm3Pcug5BBZq5r4CZ11Y3pump',
  /** Chart link. Empty = hidden. */
  chartUrl: 'https://dexscreener.com/solana/6pi6gemwWCZtWUbVcrTTm3Pcug5BBZq5r4CZ11Y3pump',
  /** TODO(branding): Telegram invite. Empty = hidden. */
  telegramUrl: '',
  /** Hour (UTC) when the leaderboard resets and the mirror flips to the new #1. */
  resetHourUtc: 0,
  /** TODO(branding): mirror fee per copied trade, in percent. */
  mirrorFeePct: 1,
  /** Target copy latency shown on the site (a design goal, not a measurement). */
  targetLatency: '< 2s',
  /** true = leaderboard, feed, rotation and status use simulated data and show a "simulated" badge. */
  demo: true,
} as const

export const X_URL = `https://x.com/${SITE.xHandle}`
export const RESET_LABEL = `${String(SITE.resetHourUtc).padStart(2, '0')}:00 UTC`
