"use client";

import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  const isMobile = useIsMobile();

  return (
    <footer className="w-full bg-[#0D1624] text-white py-7 px-6">
    <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-10" : "gap-65"}`}>

        {/* LEFT — Brand + Social */}
        <div>
          <Link href="/" className="h-10 md:h-14 block group cursor-pointer ml-1">
            <Image
              src="/logo.png"
              alt=""
              width={80}
              height={50}
            />
          </Link>
          <p className="text-sm text-white/70 mt-3 leading-relaxed">
            Exceptional quality. Endless customization. True scalability.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 mt-8">
            <a
              href="#"
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              <Instagram size={20} />
            </a>

            <a
              href="#"
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="#"
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* COLUMN 2 — Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-3 text-white/70">
            <li><a href="/home" className="hover:text-white">Home</a></li>
            <li><a href="/catalog" className="hover:text-white">Products</a></li>
            <li><a href="/build" className="hover:text-white">Build</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* COLUMN 3 — Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-3 text-white/70">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* COLUMN 4 — Contacts */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Contacts</h3>
          <ul className="space-y-3 text-white/70">
            <li>Address..</li>
            <li>hello@solfrance.com</li>
            <li>8 AM to 8 PM</li>
            <li>Monday - Friday</li>
            <li>8976XXXXXX</li>
          </ul>
        </div> */}

      </div>
    </footer>
  );
}
