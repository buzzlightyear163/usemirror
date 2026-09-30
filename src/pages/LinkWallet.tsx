import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAgents } from '../hooks/useAgents'
import { fakeAddress } from '../lib/sim'
import { shortAddr } from '../lib/format'
import { PageHead } from '../components/Heads'
import { Countdown } from '../components/Countdown'

type WalletState = 'idle' | 'connecting' | 'connected' | 'error'

function Step({ n, state, title, desc, children }: { n: number; state: 'done' | 'active' | 'todo'; title: string; desc: string; children?: ReactNode }) {
  return (
    <li className={`step-v ${state}`}>
      <span className="step-v-n">{state === 'done' ? '✓' : String(n).padStart(2, '0')}</span>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
        {children ? <div className="step-v-do">{children}</div> : null}
      </div>
    </li>
  )
}

/**
 * Wallet link flow — demo state only.
 * TODO(backend): replace the simulated connect/approve with a real Solana wallet adapter + delegate program.
 */
export default function LinkWallet() {
  const [params] = useSearchParams()
  const { agents } = useAgents()
  const [wallet, setWallet] = useState<WalletState>('idle')
  const [address, setAddress] = useState('')
  const [ratio, setRatio] = useState(params.get('ratio') ?? '10')
  const [max, setMax] = useState(params.get('max') ?? '1')
  const [stop, setStop] = useState(params.get('stop') ?? '15')
  const [saved, setSaved] = useState(false)
  const [approved, setApproved] = useState<'no' | 'pending' | 'yes'>('no')

  useEffect(() => {
    if (wallet !== 'connecting') return
    const t = window.setTimeout(() => {
      setAddress(fakeAddress(`demo-wallet-${Date.now()}`))
      setWallet('connected')
    }, 1100)
    return () => window.clearTimeout(t)
  }, [wallet])

  useEffect(() => {
    if (approved !== 'pending') return
    const t = window.setTimeout(() => setApproved('yes'), 1100)
    return () => window.clearTimeout(t)
  }, [approved])

  const valid = Number(ratio) >= 1 && Number(ratio) <= 100 && Number(max) > 0 && Number(stop) >= 1 && Number(stop) <= 100
  const connected = wallet === 'connected'
  const live = connected && saved && approved === 'yes'
  const top = agents?.[0]

  return (
    <div className="wrap narrow">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Start mirroring' }]}
        title="Start mirroring"
        lede="Three steps. Your keys stay in your wallet, your limits stay in force, and you can stop at any time."
      />
      <div className="notice demo-note">
        <b>Demo mode.</b> Nothing below touches a real wallet yet — the flow is simulated until launch.
      </div>
      <ol className="steps-v">
        <Step
          n={1}
          state={connected ? 'done' : 'active'}
          title="Connect your wallet"
          desc="Any Solana wallet. MIRROR only reads your address and requests a limited trading permission in step 3."
        >
          {connected ? (
            <span className="row-flex">
              <span className="badge">{shortAddr(address)}</span>
              <button type="button" className="btn sm ghost" onClick={() => { setWallet('idle'); setSaved(false); setApproved('no') }}>
                Disconnect
              </button>
            </span>
          ) : (
            <span className="row-flex">
              <button type="button" className="btn primary" disabled={wallet === 'connecting'} onClick={() => setWallet('connecting')}>
                {wallet === 'connecting' ? 'Waiting for wallet…' : 'Connect wallet'}
              </button>
              <button type="button" className="btn ghost sm" onClick={() => setWallet('error')}>
                Simulate rejection
              </button>
              {wallet === 'error' ? <span className="down small">Request rejected in wallet. Try again.</span> : null}
            </span>
          )}
        </Step>

        <Step
          n={2}
          state={!connected ? 'todo' : saved ? 'done' : 'active'}
          title="Set your limits"
          desc="Mirror ratio, max per trade and daily stop. You can change these later."
        >
          {connected ? (
            <>
              <div className="fields fields-3">
                <label className="field">
                  <span className="field-l">Ratio (%)</span>
                  <input className="input" inputMode="decimal" value={ratio} onChange={(e) => { setRatio(e.target.value); setSaved(false) }} />
                </label>
                <label className="field">
                  <span className="field-l">Max per trade (SOL)</span>
                  <input className="input" inputMode="decimal" value={max} onChange={(e) => { setMax(e.target.value); setSaved(false) }} />
                </label>
                <label className="field">
                  <span className="field-l">Daily stop (%)</span>
                  <input className="input" inputMode="decimal" value={stop} onChange={(e) => { setStop(e.target.value); setSaved(false) }} />
                </label>
              </div>
              <div className="actions">
                <button type="button" className="btn" disabled={!valid || saved} onClick={() => setSaved(true)}>
                  {saved ? 'Saved ✓' : 'Save limits'}
                </button>
                {!valid ? <span className="down small">Ratio and stop: 1–100%. Max: above 0.</span> : null}
              </div>
            </>
          ) : null}
        </Step>

        <Step
          n={3}
          state={!saved ? 'todo' : approved === 'yes' ? 'done' : 'active'}
          title="Approve the mirror"
          desc="Your wallet asks you to approve a trading permission bounded by your limits. No withdrawal rights."
        >
          {saved && approved !== 'yes' ? (
            <button type="button" className="btn primary" disabled={approved === 'pending'} onClick={() => setApproved('pending')}>
              {approved === 'pending' ? 'Confirm in wallet…' : 'Approve'}
            </button>
          ) : null}
        </Step>

        <Step
          n={4}
          state={live ? 'done' : 'todo'}
          title="You're live"
          desc={live ? `Your mirror now follows ${top?.name ?? 'the #1 agent'}. It switches automatically at every reset.` : 'Finish the steps above.'}
        >
          {live ? (
            <span className="row-flex">
              <Countdown />
              <Link to="/feed" className="btn">
                Watch the live feed →
              </Link>
            </span>
          ) : null}
        </Step>
      </ol>
    </div>
  )
}
