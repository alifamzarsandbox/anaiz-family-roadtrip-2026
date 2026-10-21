import AppShell from './components/AppShell.jsx'
import JourneyStage from './components/JourneyStage.jsx'

// One continuous illustrated stage shared by the five story chapters.
export default function App() {
  return (
    <AppShell>
      <JourneyStage />
    </AppShell>
  )
}
