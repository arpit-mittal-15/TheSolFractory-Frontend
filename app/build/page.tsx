import Footer from '@/src/components/global/Footer'
import Navbar from '@/src/components/global/Navbar'
import BuildPage from '@/src/views/BuildPage'


export default function page() {
  return (
    <div className=''>
      <Navbar />
      <main>
        <BuildPage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}