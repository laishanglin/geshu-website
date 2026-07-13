import { BrowserRouter } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import CompanyOverview from '@/components/sections/CompanyOverview'
import BusinessAreas from '@/components/sections/BusinessAreas'
import MissionVision from '@/components/sections/MissionVision'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#060B14] text-[#F1F5F9]">
        <Navbar />
        <main>
          <HeroSection />
          <CompanyOverview />
          <BusinessAreas />
          <MissionVision />
          <NewsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
