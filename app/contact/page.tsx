"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { IconBrandGoogle } from '@tabler/icons-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />

      <main className="min-h-screen pt-24 md:pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif" style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>Headquarters</h2>
            <div className="glass-panel p-8 space-y-6">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
                  Address
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Solitude Flame Pvt Ltd
                  <br />
                  D63B, Site 4, Behind Fortis Hospital
                  <br />
                  Greater Noida 201310, India
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
                    Global Sales
                  </h4>
                  <p className="text-gray-300 text-sm">+1 (742) 688-0288</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
                    Support
                  </h4>
                  <p className="text-gray-300 text-sm">braj@thesolfactory.com</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                Connect With Us
              </h4>
              <div className="flex gap-4">
                <a href="#" className="social-btn">
                  <i className="fab fa-instagram text-white" />
                </a>
                <a href="#" className="social-btn">
                  <i className="fab fa-linkedin-in text-white" />
                </a>
                <a href="#" className="social-btn">
                  <i className="fab fa-twitter text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-10 order-1 lg:order-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={form.website}
                  onChange={handleChange}
                  className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us about your project requirements..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white resize-none"
              />
              <button
                type="submit"
                className="w-full btn-liquid py-4 text-xs font-bold uppercase tracking-widest"
                onMouseEnter={(e) =>
                  (e.currentTarget.classList.add("active"))
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.classList.remove("active"))
                }
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
