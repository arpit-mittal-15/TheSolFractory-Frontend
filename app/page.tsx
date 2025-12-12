import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
import HomePage from '@/src/views/HomePage'
import React from 'react'


export default function page() {
  return (
    <div className=''>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
