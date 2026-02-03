import LoginPageSkeleton from "@/src/components/skeletons/LoginPageSkeleton";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";

export default function Loading() {
  return (
    <div className="">
      <Navbar />
      <main>
        <LoginPageSkeleton />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

