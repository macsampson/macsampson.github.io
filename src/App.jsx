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
      <main className="relative z-10 mx-auto w-full max-w-measure px-6 py-6 sm:py-16">
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
