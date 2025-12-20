"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCartDialog } from "@/components/ShoppingCartDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/src/contexts/CartContext";

const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Product", href: "/catalog" },
  { id: "builder", label: "Build", href: "/build" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const ismobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getItemCount } = useCart();

  const itemCount = getItemCount();

  const isActive = useMemo(
    () => (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href)),
    [pathname]
  );

  return (
    <>
      <header className="fixed w-full border-b bg-[#132135] z-50 border-white/5  backdrop-blur-xl transition-all duration-300">
        <div className="max-w-350 mx-auto px-4 md:px-6 h-20 flex justify-between items-center relative z-50">
          <div className="flex items-center gap-3">
            <Link href="/" className="h-10 md:h-14 block group cursor-pointer ml-3">
              <Image
                src="/logo.png"
                alt=""
                width={100}
                height={60}
                className="md:mt-0.5"
              />
            </Link>
            
            {/* Burning Cigarette Animation */}
            {/* <BurningCigarette /> */}
          </div>

          <nav className="hidden lg:flex gap-4 ml-30">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`nav-btn btn-liquid px-6 py-2 w-[120px] text-center text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white hover:active ${
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

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`hidden lg:block auth-btn w-25 text-center items-center btn-liquid px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-gray-300 hover:text-white ${
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
              className={`hidden lg:block auth-btn btn-liquid w-25 text-center px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-white ${
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
                className="btn-liquid w-full h-full flex items-center justify-center rounded-full overflow-hidden"
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
              className="relative btn-liquid group ml-1
                        w-8 h-8 md:w-10 md:h-10
                        flex items-center justify-center
                        rounded-full"
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
              className={`btn-liquid w-full py-4 text-left px-6 text-sm font-bold uppercase tracking-widest ${
                isActive(link.href) ? "active" : ""
              }`}
            >
              {link.label === "Build" ? "Build-a-Cone" : link.label}
            </Link>
          ))}

          {/* <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mt-6 mb-2">
            Account
          </h3> */}
          <div className="flex gap-4 mt-25">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={`flex-1 btn-liquid py-4 text-center text-sm font-bold uppercase tracking-widest ${
                isActive("/login") ? "active" : ""
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className={`flex-1 btn-liquid btn-primary py-4 text-center text-sm font-bold uppercase tracking-widest ${
                isActive("/signup") ? "active" : ""
              }`}
            >
              Sign Up
            </Link>
          </div>

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

