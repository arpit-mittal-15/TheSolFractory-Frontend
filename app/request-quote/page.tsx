
"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/global/Navbar";
import Footer from "@/src/components/global/Footer";

export default function RequestQuotePage() {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
    // new fields for Request a Quote
    quantity: 10000,
    paperType: "Hemp",
    filterType: "Standard",
    coneSize: "King Size",
    country: "India",
    estimatedDelivery: "",
  });

  const PAPER_OPTIONS = ["Hemp", "Unbleached", "Premium Silk Coated", "Organic"];
  const FILTER_OPTIONS = ["Standard", "Activated Carbon", "Double Layer"];
  // Replace these with your real cone sizes (e.g. from CONE_DIMENSIONS or the cone builder)
  const CONE_SIZES = ["100mm", "110mm", "King Size", "Pre-Rolled (Short)"];
  const COUNTRIES = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "China",
    "Australia",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "quantity" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(form.quantity) < 10000) {
      alert("Minimum quantity is 10,000 units.");
      return;
    }

    // TODO: wire this up to your API
    console.log("Request a Quote payload:", form);
    alert("Request submitted — check console for payload (replace with real API).);");
  };

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />
      <main className="min-h-screen pt-10 md:pt-14 pb-16 relative z-10">
        <div className="text-center">
          <h1
            className="text-3xl md:text-4xl font-semibold text-white mb-10 md:mb-14 mt-10 md:mt-14"
            style={{ textShadow: "0 0 2px rgba(255,255,255,0.6)" }}
          >
            Request a <span className="text-blue-400">Quote</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10 md:space-y-12 mt-[30]">
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 md:gap-12 w-full">
            {/* Left: Product Preview */}
            <div className="w-full lg:w-1/3 h-full">
              <div className="glass-panel p-5 md:p-6 rounded-2xl border border-white/10 h-full">
                <h3 className="text-sm font-semibold mb-3">Selected Configuration</h3>
                <div className="w-full h-48 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center text-xs text-gray-400 mb-4">
                  Image Preview
                </div>
                <ul className="text-xs text-gray-300 space-y-2">
                  <li><strong>Quantity:</strong> {form.quantity}</li>
                  <li><strong>Paper:</strong> {form.paperType}</li>
                  <li><strong>Filter:</strong> {form.filterType}</li>
                  <li><strong>Cone Size:</strong> {form.coneSize}</li>
                  <li><strong>Country:</strong> {form.country}</li>
                </ul>
              </div>
            </div>

            {/* Right: Wide Form */}
            <div className="w-full lg:w-2/3">
              <section className="glass-panel p-6 md:p-7 rounded-2xl border border-white/10 w-full h-full relative overflow-hidden flex flex-col">
                <div className="mb-4 md:mb-5 space-y-1 flex justify-center items-center flex-col">
                  <h2 className="text-lg md:text-xl font-semibold">Tell us what you need</h2>
                  <p className="text-xs md:text-sm text-gray-300">Share quantity, materials and delivery timeframe and we’ll get back with pricing.</p>
                </div>

                <form className="space-y-3 flex-1 flex flex-col" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                    <input
                      type="text"
                      name="jobTitle"
                      placeholder="Job Title"
                      value={form.jobTitle}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Work Email"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={form.company}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      value={form.website}
                      onChange={handleChange}
                      className="bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-xs md:text-sm text-white"
                    />
                  </div>

                  {/* New quote-specific fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col text-xs text-gray-300">
                      Quantity (min 10,000)
                      <input
                        type="number"
                        name="quantity"
                        min={10000}
                        value={form.quantity}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      />
                    </label>

                    <label className="flex flex-col text-xs text-gray-300">
                      Paper Type
                      <select
                        name="paperType"
                        value={form.paperType}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      >
                        {PAPER_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col text-xs text-gray-300">
                      Filter Type
                      <select
                        name="filterType"
                        value={form.filterType}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      >
                        {FILTER_OPTIONS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col text-xs text-gray-300">
                      Cone Size
                      <select
                        name="coneSize"
                        value={form.coneSize}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      >
                        {CONE_SIZES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col text-xs text-gray-300">
                      Choose Country
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col text-xs text-gray-300">
                      Estimated Time of Delivery
                      <input
                        type="date"
                        name="estimatedDelivery"
                        value={form.estimatedDelivery}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white"
                      />
                    </label>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Additional requirements or notes..."
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg px-3 py-3 text-sm text-white resize-none"
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="block w-full mt-2.75 mb-1 md:w-65 mx-auto btn-liquid py-3 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                      Request a Quote
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
