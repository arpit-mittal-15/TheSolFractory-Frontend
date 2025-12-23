"use client";

import { IconBrandWhatsapp, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className="w-full">
      <div className="w-full bg-[#0D1624] text-white py-7 px-6">
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
              <Image src="/logo.png" alt="" width={80} height={50} />
            </Link>
            <p className="text-sm text-white/70 mt-3 leading-relaxed max-w-sm">
              Exceptional quality. Endless customization. True scalability.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mt-8">
              <Link href="/" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandInstagram size={26} stroke={1.5} />
              </Link>

              <Link href="/" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandLinkedin size={26} stroke={1.5} />
              </Link>

              <Link href="/" className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                <IconBrandWhatsapp size={26} stroke={1.5} /> {/* WhatsApp */}
              </Link>
            </div>
          </div>

          {/* COLUMN 2 — Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-2">Explore</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="/home" className="hover:text-white">Home</a></li>
              <li><a href="/catalog" className="hover:text-white">Products</a></li>
              <li><a href="/build" className="hover:text-white">Build</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* COLUMN 3 — Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-2">Links</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:col-span-3 bg-zinc-300 text-center text-[#132135] text-sm py-4">
        © {new Date().getFullYear()} SolFractory · Powered by{" "}
        <Link
          href="https://mondtech.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-800 underline underline-offset-2 hover:opacity-80 transition"
        >
          mondtech.in
        </Link>
        . All rights reserved.
      </div>

    </footer>
  );
}
