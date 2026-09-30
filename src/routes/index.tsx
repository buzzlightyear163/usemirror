import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import Home from '../pages/Home'
import Leaderboard from '../pages/Leaderboard'
import AgentPage from '../pages/Agent'
import Feed from '../pages/Feed'
import Docs from '../pages/Docs'
import LinkWallet from '../pages/LinkWallet'
import Status from '../pages/Status'
import Terms from '../pages/Terms'
import Privacy from '../pages/Privacy'
import NotFound from '../pages/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="agents/:id" element={<AgentPage />} />
        <Route path="feed" element={<Feed />} />
        <Route path="docs" element={<Docs />} />
        <Route path="link" element={<LinkWallet />} />
        <Route path="status" element={<Status />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
