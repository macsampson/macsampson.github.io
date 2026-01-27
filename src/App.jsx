import React, { Suspense } from 'react'
import ThreeBackground from './components/Three/ThreeBackground'
import HeroSection from './components/UI/HeroSection'
import ExperienceSection from './components/UI/ExperienceSection'
import ProjectsSection from './components/UI/ProjectsSection'
import ArtisticFoundationsSection from './components/UI/ArtisticFoundationsSection'
import Footer from './components/UI/Footer'

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen text-primary font-merriweather bg-[#f5f2ed]">
    Loading...
  </div>
)

function App() {
  return (
    <div className="relative min-h-screen font-spectral text-primary selection:bg-primary selection:text-white">
      <Suspense fallback={<LoadingScreen />}>
        <ThreeBackground />
      </Suspense>

      <main className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl pt-12 sm:pt-16 pb-12">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ArtisticFoundationsSection />
        {/* <Footer /> */}
      </main>
    </div>
  )
}

export default App
