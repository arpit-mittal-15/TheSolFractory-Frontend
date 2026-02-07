"use client";
 
import { IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import Image from "next/image";
import Link from "next/link";
 
export default function Footer() {
  return (
    <footer className="relative z-[50] w-full mb-0">
      {/* Increased padding from py-7 to py-20 to make it "longer" */}
      <div className="w-full bg-[#0b1d33] text-white py-20 px-6">
        <div
          className={`
            max-w-7xl mx-auto
            grid grid-cols-1
            md:grid-cols-[2fr_1fr_1fr]
            gap-y-12 md:gap-x-20
          `}
        >
          {/* LEFT — Brand + Social */}
          <div>
            <Link href="/" className="h-10 md:h-14 block group cursor-pointer ml-1">
              <Image src="/logo.png" alt="SOL FRANCE" width={80} height={50} />
            </Link>
            <p className="text-sm text-white/70 mt-5 leading-relaxed max-w-sm">
              Exceptional quality. Endless customization. True scalability.
            </p>
 
            <div className="flex gap-5 mt-10">
              <Link href="https://www.instagram.com/thesolfactory" target="_blank" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandInstagram size={26} stroke={1.5} />
              </Link>
 
              <Link href="https://www.linkedin.com/in/prerolledcones" target="_blank" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandLinkedin size={26} stroke={1.5} />
              </Link>
 
              <Link href="https://x.com/Thesolfrance" target="_blank" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandTwitter size={26} stroke={1.5} />
              </Link>
            </div>
          </div>
 
          {/* COLUMN 2 — Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-6 mt-2">Explore</h3>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Products</Link></li>
              <li><Link href="/build" className="hover:text-white transition">Build</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
 
          {/* COLUMN 3 — Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 mt-2">Links</h3>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
 
      {/* Bottom Bar - slightly darker than the main footer */}
      <div className="w-full bg-[#071324] text-center text-white/50 text-sm py-6">
        © {new Date().getFullYear()} SolFactory. All rights reserved.
      </div>
    </footer>
  );
}