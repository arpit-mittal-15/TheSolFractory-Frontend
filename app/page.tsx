import Footer from '@/src/components/global/Footer'
import Navbar from '@/src/components/global/Navbar'
import HomePage from '@/src/views/HomePage'
import React from 'react'


export default function page() {
  return (
    <div className=''>
      <Navbar />
      <main className='pt-16'>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
