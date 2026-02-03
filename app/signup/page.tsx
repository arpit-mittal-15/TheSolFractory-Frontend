import Footer from '@/src/components/global/Footer'
import Navbar from '@/src/components/global/Navbar'
import SignupPage from '@/src/views/SignupPage'
import React from 'react'


export default function page() {
  return (
    <div>
      <Navbar />
      <main>
        <SignupPage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}