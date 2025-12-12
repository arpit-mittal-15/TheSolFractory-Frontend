"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { BorderGradient } from "@/src/sharedcomponents/BorderGradient";
import { useIsMobile } from "@/hooks/use-mobile";

const menus = [
  { name: "HOME", path: "/" },
  { name: "CATALOG", path: "/catalog" },
  { name: "BUILD", path: "/build" },
  { name: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const activeLogin = pathname === "/login";
  const activeSignup = pathname === "/signup";
  const activeCart = pathname === "/cart";


  const isMobile = useIsMobile();

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef, isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-4 px-8 flex items-center justify-between bg-[#132135]">
      <Link href="/" className="text-white font-semibold tracking-wide text-lg">
        SOL FACTORY
      </Link>

      {isMobile ? (
        // MOBILE
        <>
          <div className="flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-[#040E1C] overflow-hidden transition-all duration-500"
            style={{ maxHeight: isOpen ? `${menuHeight}px` : "0px" }}
          >
            <div className="flex flex-col items-center gap-3 py-4">
              {menus.map((m) => {
                const active = pathname === m.path;
                return (
                  <Link
                    key={m.path}
                    href={m.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-6 py-2 rounded-full border border-gray-500 text-sm transition-all duration-300 ${
                      active
                        ? "text-white border-blue-400 shadow-[0_0_15px_#3b82f6]"
                        : "text-gray-300 hover:text-white hover:border-white"
                    }`}
                  >
                    {m.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 ${
                    activeLogin
                      ? "text-white border-blue-400 shadow-[0_0_15px_#3b82f6]"
                      : "text-gray-300 border-gray-500 hover:text-white hover:border-white"
                  }`}
                >
                  LOGIN
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 ${
                    activeSignup
                      ? "text-white border-blue-400 shadow-[0_0_15px_#3b82f6]"
                      : "text-gray-300 border-gray-500 hover:text-white hover:border-white"
                  }`}
                >
                  SIGN UP
                </Link>

                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full border transition-all duration-300 ${
                      activeCart
                        ? "text-white border-blue-400 shadow-[0_0_15px_#3b82f6]"
                        : "text-gray-300 border-gray-500 hover:text-white hover:border-white"
                    }`}
                  >
                  <ShoppingCart size={18} />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        // DESKTOP
        <>
          <div className="flex items-center gap-4">
            {menus.map((m) => {
              const active = pathname === m.path;
              return (
                <Link
                  key={m.path}
                  href={m.path}
                  className={`px-6 py-2 rounded-full border border-gray-500 text-sm transition-all duration-300 ${
                    active
                      ? "text-white border-blue-400 shadow-[0_0_15px_#3b82f6]"
                      : "text-gray-300 hover:text-white hover:border-white hover:text-white hover:border-white transition hover:text-white hover:border-blue-400 hover:shadow-[0_0_15px_#3b82f6]"
                  }`}
                >
                  {m.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
          <Link href="/login">
            <BorderGradient text="LOGIN" active={activeLogin} />
          </Link>

          <Link href="/signup">
            <BorderGradient text="SIGN UP" active={activeSignup} />
          </Link>


            <Link
              href="/cart"
              className="p-2 rounded-full border border-gray-500 text-gray-300 hover:border-white transition hover:text-white hover:border-blue-400 hover:shadow-[0_0_15px_#3b82f6]
              "
            >
              <ShoppingCart size={18} />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
