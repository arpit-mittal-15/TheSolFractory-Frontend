import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
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