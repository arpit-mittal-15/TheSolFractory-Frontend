"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCartDialog } from "@/components/ShoppingCartDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/src/contexts/CartContext";
import { useUser } from "@/src/contexts/UserContext";
import { UserProfileDialog } from "@/src/components/user/UserProfileDialog";
import { IconUserFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Product", href: "/catalog" },
  { id: "builder", label: "Build", href: "/build" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const ismobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isOverlappingVideo, setIsOverlappingVideo] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, isLoading } = useUser();

  const itemCount = getItemCount();
  const isHomePage = pathname === "/";

  const handleClick = () => {
    if(!isAuthenticated) {
      router.push("/login");
    }
    else {
      router.push("/profile");
    }
  };

  useEffect(() => {
    // Only apply scroll-based logic on HomePage
    if (!isHomePage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOverlappingVideo(false); // Always show classes on other pages
      return;
    }

    const handleScroll = () => {
      // VideoHero is h-screen, so check if scroll is less than viewport height
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsOverlappingVideo(scrollY < viewportHeight);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  const isActive = useMemo(
    () => (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href)),
    [pathname]
  );

  return (
    <>
      {/*border-b bg-[#132135]/80*/} 
      {/* fixed */}
       <header className={`fixed top-0 left-0 right-0 z-50 w-full border-white/5 transition-all duration-300 ${
         (!isOverlappingVideo || !isHomePage) ? "backdrop-blur-xl" : ""
       }`}>

        <div className="max-w-350 mx-auto px-4 md:px-6 h-20 flex justify-between items-center relative z-50">
          <div className="flex items-center gap-3">
            <Link href="/" className="h-10 md:h-14 block group cursor-pointer ml-3">
              <Image
                src="/logo.png"
                alt=""
                width={80}
                height={20}
                className="md:mt-0.5"
              />
            </Link>
            
            {/* Burning Cigarette Animation */}
            {/* <BurningCigarette /> */}
          </div>

          <nav className="hidden lg:flex gap-4 ml-10">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={` ${(!isOverlappingVideo || !isHomePage) ? "nav-btn btn-liquid" : ""} px-6 py-2 w-[120px] text-center text-xs font-bold uppercase tracking-widest text-[#0F2238] hover:text-white hover:active ${
                  isActive(link.href) ? "active" : ""
                }`}
                onMouseEnter={
                  !isActive(link.href)
                    ? (e) => e.currentTarget.classList.add("active")
                    : undefined
                }
                onMouseLeave={
                  !isActive(link.href)
                    ? (e) => e.currentTarget.classList.remove("active")
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={handleClick}
              className={`relative group w-9.75 h-9.75 cursor-pointer flex items-center justify-center rounded-full transition ${
                (!isOverlappingVideo || !isHomePage) ? "btn-liquid active" : ""
              }`}
              aria-label="User profile"
            >
              <IconUserFilled className="w-5.5 h-5.5 text-white" />
            </button>
            {/* {!isLoading && ( isAuthenticated ? (
              <div className="hidden lg:block ml-21 mr-5">
                <UserProfileDialog />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`hidden lg:block auth-btn w-25 text-center items-center ${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-gray-300 hover:text-white ${
                    isActive("/login") ? "active" : ""
                  }`}
                  onMouseEnter={
                    !isActive("/login")
                      ? (e) => e.currentTarget.classList.add("active")
                      : undefined
                  }
                  onMouseLeave={
                    !isActive("/login")
                      ? (e) => e.currentTarget.classList.remove("active")
                      : undefined
                  }
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`hidden lg:block auth-btn ${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} w-25 text-center px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-white ${
                    isActive("/signup") ? "active" : ""
                  }`}
                  onMouseEnter={
                    !isActive("/signup")
                      ? (e) => e.currentTarget.classList.add("active")
                      : undefined
                  }
                  onMouseLeave={
                    !isActive("/signup")
                      ? (e) => e.currentTarget.classList.remove("active")
                      : undefined
                  }
                >
                  Sign Up
                </Link>
              </>
            ))} */}

            <button
              onClick={() => setCartOpen(true)}
              className="relative group ml-0 
                         w-8 h-8 md:w-10 md:h-10
                         flex items-center justify-center
                         rounded-full"
              aria-label="Open cart"
              // onMouseEnter={
              //    (e) => e.currentTarget.classList.add("active")
              // }
              // onMouseLeave={
              //   (e) => e.currentTarget.classList.remove("active")
              // }
            >
              <span
                className={`${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} w-full h-full flex items-center justify-center rounded-full overflow-hidden`}
              >
                <i className="fas fa-shopping-cart text-sm md:text-base text-gray-300 group-hover:text-white transition" />
              </span>

              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5
                             w-4 h-4 md:w-5 md:h-5
                             bg-blue-600 rounded-full
                             text-white text-[10px] md:text-xs
                             flex items-center justify-center
                             font-bold z-10"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>





            {ismobile ? <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`relative ${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} group ml-1
                        w-8 h-8 md:w-10 md:h-10
                        flex items-center justify-center
                        rounded-full`}
              style={{ borderRadius: "50%" }}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-lg`} />
            </button>: null}
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`fixed inset-0 z-40 flex flex-col pt-28 px-6 space-y-4 lg:hidden h-screen overflow-y-auto ${
            mobileOpen ? "open" : ""
          }`}
        >
          {/* <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Menu</h3> */}
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} w-full py-4 text-left px-6 text-sm font-bold uppercase tracking-widest ${
                isActive(link.href) ? "active" : ""
              }`}
            >
              {link.label === "Build" ? "Build-a-Cone" : link.label}
            </Link>
          ))}

          {/* <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mt-6 mb-2">
            Account
          </h3> */}
          {!isAuthenticated && (
            <div className="flex gap-4 mt-25">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={`flex-1 ${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} py-4 text-center text-sm font-bold uppercase tracking-widest ${
                  isActive("/login") ? "active" : ""
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className={`flex-1 ${(!isOverlappingVideo || !isHomePage) ? "btn-liquid" : ""} btn-primary py-4 text-center text-sm font-bold uppercase tracking-widest ${
                  isActive("/signup") ? "active" : ""
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="mt-25 flex items-center justify-center">
              <div className="w-full">
                <UserProfileDialog />
              </div>
            </div>
          )}

          {/* <div className="mt-8 flex justify-center gap-6">
            <a href="#" className="social-btn">
              <i className="fab fa-instagram text-white" />
            </a>
            <a href="#" className="social-btn">
              <i className="fab fa-twitter text-white" />
            </a>
          </div> */}
        </div>
      </header>

      <ShoppingCartDialog open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

