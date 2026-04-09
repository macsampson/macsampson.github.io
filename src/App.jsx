import HeroSection from './components/UI/HeroSection'
import ExperienceSection from './components/UI/ExperienceSection'
import ProjectsSection from './components/UI/ProjectsSection'
import ArtisticFoundationsSection from './components/UI/ArtisticFoundationsSection'

function App() {
  return (
    <div className="min-h-screen bg-background font-spectral text-primary selection:bg-primary selection:text-white">
      <main className="mx-auto px-4 sm:px-6 md:px-8 max-w-5xl pt-16 pb-20">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ArtisticFoundationsSection />
      </main>
    </div>
  )
}

export default App
