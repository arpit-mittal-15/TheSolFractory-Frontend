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
import MachinerySection from '../components/homepage/desktop/MachinerySection'
import FullScreenColor from '../components/homepage/desktop/FullScreenColor'
// import { MergeAnimationViewer } from '../components/build/ConeMergeAnimtaion'
// import FullScreenSmoke from '../testcomponents/FullScreenSmoke'
// import SmokeOverlayText from '../testcomponents/SmokeOverlayText'
// import AnimatedCards from '../components/homepage/desktop/AnimatedCards'
// import SmokeCursor from '../sharedcomponents/SmokeCursor'
// import ConeCursor from '../sharedcomponents/ConeCursor'

export default function HomePage() {
  return (
    <div className='relative '> {/* cursor-cone */}
        {/* Hero Section */}
        <VideoHero />
        {/* <FullScreenColor /> */}
        {/* <ScrollVideo videoSrc="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/outpukh1.mp4" /> */}
        {/* <FullScreenColor /> */}
        {/* <HeroSection /> */}
        <main className="relative z-10 bg-[#001534]">
        {/* <main className="relative z-10 bg-[#001534]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(15,23,42,0.9)]"> */}
        <ScrollVideo videoSrc="/videos/outrobin2.mp4" />
            {/* <Carousel /> */}
            {/* <BlenderAnimation /> */}
            <SolFactoryAdvantage />
            <MergedCards />
            <MachinerySection />
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
      </main>
    </div>
  )
}
