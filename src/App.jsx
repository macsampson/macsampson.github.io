import { useTab } from './router'
import LeniaBackground from './components/UI/LeniaBackground'
import Header from './components/UI/Header'
import AboutSection from './components/UI/AboutSection'
import ProjectsSection from './components/UI/ProjectsSection'
import ExperienceSection from './components/UI/ExperienceSection'
import LinksSection from './components/UI/LinksSection'
import Footer from './components/UI/Footer'

const pages = {
  '': (
    <>
      <AboutSection />
      <LinksSection />
    </>
  ),
  projects: <ProjectsSection />,
  work: <ExperienceSection />,
}

function App() {
  const tab = useTab()

  return (
    <>
      <LeniaBackground />
      <main className="page-shell">
        <Header tab={tab} />
        {/* Keyed so the fade replays on every tab change. */}
        <div key={tab} className="page-fade-in">
          {pages[tab]}
        </div>
        <Footer />
      </main>
    </>
  )
}

export default App
