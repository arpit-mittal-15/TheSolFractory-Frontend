import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
import ProfilePage from '@/src/views/ProfilePage'
import React from 'react'


export default function page() {
  return (
    <div className=''>
      <Navbar />
      <main className='pt-20 min-h-screen'>
        <ProfilePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

