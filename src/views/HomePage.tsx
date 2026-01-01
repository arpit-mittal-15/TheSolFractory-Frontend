import React from 'react'
import HeroSection from '@/src/components/homepage/HeroSection'
import SolFactoryAdvantage from '@/src/components/homepage/SolFactoryAdvantage'
import MergedCards from '@/src/components/homepage/ConeShowCase'
import TrustConesSection from '@/src/components/homepage/TrustConesSection'
import Carousel from '@/src/components/homepage/Carousel'
import BlenderAnimation from "@/components/BlenderAnimation"
// import dynamic from 'next/dynamic';
import SmokeSection from '../../src/SmokeSection'
import { MergeAnimationViewer } from '../components/build/ConeMergeAnimtaion'
import FullScreenSmoke from '../FullScreenSmoke'
import SmokeOverlayText from '../SmokeOverlayText'
import { Mac3D } from '../Mac3D'
import Scene from '../Spline'

export default function HomePage() {
  return (
    <div>
        {/* Hero Section */}
        <HeroSection />
        <Carousel />
        <Scene />
        {/* <BlenderAnimation /> */}
        <SolFactoryAdvantage />
        <Mac3D />
        <MergedCards />
        <TrustConesSection />
        {/* <SmokeOverlayText
          heading="Enter the Unknown"
          paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
        /> */}
        <SmokeSection />
        <FullScreenSmoke
        heading="Enter the Unknown"
        paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
      />
    </div>
  )
}
