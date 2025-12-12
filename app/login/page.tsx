import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
import LoginPage from '@/src/views/LoginPage'
import React from 'react'


export default function page() {
  return (
    <div className=''>
      <Navbar />
      <main>
        <LoginPage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}