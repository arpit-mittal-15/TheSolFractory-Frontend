import React from 'react'
import HeroSection from '@/src/components/homepage/desktop/HeroSection'
import SolFactoryAdvantage from '@/src/components/homepage/desktop/SolFactoryAdvantage'
import MergedCards from '@/src/components/homepage/desktop/ConeShowCase'
import TrustConesSection from '@/src/components/homepage/desktop/TrustConesSection'
import Carousel from '@/src/components/homepage/desktop/Carousel'
// import BlenderAnimation from "@/components/BlenderAnimation"
// import dynamic from 'next/dynamic';
// import SmokeSection from '../testcomponents/SmokeSection'
// import { MergeAnimationViewer } from '../components/build/ConeMergeAnimtaion'
// import FullScreenSmoke from '../testcomponents/FullScreenSmoke'
// import SmokeOverlayText from '../testcomponents/SmokeOverlayText'

export default function HomePage() {
  return (
    <div>
        {/* Hero Section */}
        <HeroSection />
        <Carousel />
        {/* <BlenderAnimation /> */}
        <SolFactoryAdvantage />
        <MergedCards />
        <TrustConesSection />
        {/* <SmokeOverlayText
          heading="Enter the Unknown"
          paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
        /> */}
        {/* <SmokeSection />
        <FullScreenSmoke
        heading="Enter the Unknown"
        paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
      /> */}
    </div>
  )
}
