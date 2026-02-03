import ContactPageSkeleton from "@/src/components/skeletons/ContactPageSkeleton";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <main>
        <ContactPageSkeleton />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

