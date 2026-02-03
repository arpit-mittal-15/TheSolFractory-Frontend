"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";

export function WhatsappFab() {
  return (
    <Link
      href="https://wa.me/919730400001"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[1000000] flex items-center justify-center h-14 w-14 rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <IconBrandWhatsapp size={30} stroke={1.6} />
    </Link>
  );
}

