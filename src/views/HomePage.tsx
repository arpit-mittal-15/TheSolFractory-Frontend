import React from 'react'
import HeroSection from '@/src/components/homepage/desktop/HeroSection'
import SolFactoryAdvantage from '@/src/components/homepage/desktop/SolFactoryAdvantage'
import MergedCards from '@/src/components/homepage/desktop/ConeShowCase'
import TrustConesSection from '@/src/components/homepage/desktop/TrustConesSection'
import Carousel from '@/src/components/homepage/desktop/Carousel'
import VideoHero from '../components/homepage/desktop/VideoHero'
// import BlenderAnimation from "@/components/BlenderAnimation"
// import dynamic from 'next/dynamic';
import SmokeSection from '../testcomponents/SmokeSection'
import ScrollVideo from '../components/homepage/desktop/ScrollVideo'
// import { MergeAnimationViewer } from '../components/build/ConeMergeAnimtaion'
// import FullScreenSmoke from '../testcomponents/FullScreenSmoke'
// import SmokeOverlayText from '../testcomponents/SmokeOverlayText'
// import AnimatedCards from '../components/homepage/desktop/AnimatedCards'
// import SmokeCursor from '../sharedcomponents/SmokeCursor'
// import ConeCursor from '../sharedcomponents/ConeCursor'

export default function HomePage() {
  return (
    <div className=''> {/* cursor-cone */}
        {/* Hero Section */}
        <VideoHero />
        <ScrollVideo videoSrc="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/output-scroll1.mp4" />
        {/* <ScrollVideo videoSrc="/videos/hero-machinery.mp4" /> */}
        {/* <ScrollVideo videoSrc="/videos/slowsmoke.mp4" /> */}
        <HeroSection />
        <Carousel />
        {/* <BlenderAnimation /> */}
        <SolFactoryAdvantage />
        <MergedCards />
        {/* <AnimatedCards /> */}
        <TrustConesSection />
        {/* <SmokeOverlayText
          heading="Enter the Unknown"
          paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
        /> */}

        {/* <SmokeSection /> */}

        {/* <FullScreenSmoke
        heading="Enter the Unknown"
        paragraph="A cinematic, immersive experience powered by Three.js smoke particles."
      /> */}
    </div>
  )
}
