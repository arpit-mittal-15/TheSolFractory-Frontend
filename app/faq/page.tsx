"use client";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";

// FaqComponent.tsx
// Next.js + React + TypeScript single-file FAQ component styled with Tailwind CSS.
// Drop this file into your components folder and import it on a page.

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "general",
    title: "General Questions",
    items: [
      { id: "g1", question: "What is Cone and what services do you offer?", answer: "Cone is an example company delivering paper and packaging products. We offer product design, manufacturing, and sustainable packaging solutions." },
      { id: "g2", question: "How can I get started with Cone?", answer: "Start by contacting our sales team or requesting a sample through the contact form. We'll match you with a specialist for your project." },
      { id: "g3", question: "Do you work with small businesses or only large enterprises?", answer: "We work with businesses of every size and tailor solutions to fit budget and volume requirements." },
    ],
  },
  {
    id: "ordering",
    title: "Ordering & Production",
    items: [
      { id: "o1", question: "What is the minimum order quantity for custom products?", answer: "MOQ depends on the product. Contact us with specs and we'll provide options and pricing." },
      { id: "o2", question: "What is your typical production lead time?", answer: "Lead times vary by product complexity and season. Typical lead times range from 2-6 weeks." },
    ],
  },
  {
    id: "customization",
    title: "Customization Questions",
    items: [
      { id: "c1", question: "What customization options are available for packaging?", answer: "We offer printing, embossing, window cutouts, and multiple paper stocks to fit your brand." },
      { id: "c2", question: "Can I provide my own dieline/print files?", answer: "Yes — provide high-res print-ready files and we'll check them against our templates." },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ item, openId, setOpenId }: { item: FaqItem; openId: string | null; setOpenId: (id: string | null) => void; }) {
  const isOpen = openId === item.id;
  return (
    <div className="w-full">
      <button
        onClick={() => setOpenId(isOpen ? null : item.id)}
        className="flex items-center justify-between gap-4 w-full px-4 py-3 rounded-full bg-white/5 hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
        aria-expanded={isOpen}
      >
        <span className="text-left text-sm md:text-base">{item.question}</span>
        <Chevron open={isOpen} />
      </button>

      <div
        className={`mt-2 px-4 overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!isOpen}
      >
        <p className="text-sm text-slate-300 pt-2 pb-4">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqComponent() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // flattened items for search
  const allItems = FAQ_SECTIONS.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })));

  const filteredSections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((it) => {
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q);
    }),
  })).filter((s) => s.items.length > 0);

  return (
<>
<Navbar />
    <section className="min-h-screen text-slate-100 pt-34 pb-4">

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left header + search */}
          <div className="lg:col-span-2">
            <nav className="text-sm text-slate-400 mb-3">Home / Support / FAQ</nav>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Frequently Asked Questions</h1>
            <p className="mt-3 text-slate-400 max-w-2xl">Find answers to common inquiries about Cone products and services, from ordering to sustainability practices.</p>

            <div className="mt-6">
              <label htmlFor="faq-search" className="sr-only">Search questions</label>
              <div className="relative max-w-xl">
                <input
                  id="faq-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search our FAQs..."
                  className="box-shadow w-full rounded-full px-4 py-3 bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="clear" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* FAQ content */}
            <div className="mt-10 space-y-8">
              {filteredSections.length === 0 ? (
                <p className="text-slate-400">No results found for “{query}”.</p>
              ) : (
                filteredSections.map((section) => (
                  <div key={section.id}>
                    <h3 className="text-slate-200 font-medium mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <AccordionItem key={item.id} item={item} openId={openId} setOpenId={setOpenId} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Right card with question mark image / illustration */}
          <aside className="hidden lg:block">
            <div className="w-full h-full bg-gradient-to-b from-slate-800/40 to-slate-800/20 rounded-lg p-6 flex flex-col items-center justify-center border border-slate-700">
              <div className="w-full h-44 rounded-sm bg-slate-700/30 border-dashed border-2 border-slate-600 flex items-center justify-center">
                <span className="text-6xl font-extrabold text-slate-300">
                    <Image
                    alt="image"
                    src={'/bluetshirt.png'}
                    // width={600}
                    // height={600}
                    fill
                     />
                </span>
              </div>
              <p className="mt-4 text-slate-400 text-center">Can't find what you're looking for? Reach out to our support team.</p>
              <button className="btn-liquid active mt-4 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white">Contact support</button>
            </div>
          </aside>
        </div>

        {/* bottom spacing */}
        <div className="h-12" />
      </div>
    </section>
<Footer />
</>

  );
}
