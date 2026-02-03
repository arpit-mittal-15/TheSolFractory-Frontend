import SignupPageSkeleton from "@/src/components/skeletons/SignupPageSkeleton";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <main>
        <SignupPageSkeleton />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

