import React from 'react'
import HeroSection from '../components/HeroSection'
import SolFactoryAdvantage from '../components/SolFactoryAdvantage'
import MergedCards from '../components/ConeShowCase'
import TrustConesSection from '../components/TrustConesSection'
import Carousel from '../components/Carousel'

export default function HomePage() {
  return (
    <div>

        {/* Hero Section */}

        <HeroSection />
        <Carousel />
        <SolFactoryAdvantage />
        <MergedCards />
        <TrustConesSection />
    </div>
  )
}
