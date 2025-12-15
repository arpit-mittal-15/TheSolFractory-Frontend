"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Content */}
{/* Left Content */}
<div className="space-y-6">
  <h1 className="text-5xl font-semibold text-gray-900">Contact Us</h1>

  <p className="text-gray-500 max-w-md leading-relaxed">
    A better future is possible. Contact us to learn more about our mission and work, or to become involved yourself.
  </p>

  {/* Email */}
  <a
    href="mailto:braj@thesolfactory.com"
    className="text-blue-600 font-medium block"
  >
    braj@thesolfactory.com
  </a>

  {/* Company & Address */}
  <div className="text-gray-500 space-y-4">
    <p className="font-medium text-gray-700">Solitude Flame Private Limited</p>
    <p className="flex items-start gap-2 w-200">
      <MapPin className="h-4 w-4 mt-1" />
      D63B, Site 4, Behind Fortis Hospital,
      <br />
      Greater Noida 201310
    </p>
  </div>

  {/* Social icons */}
  <div className="flex gap-4 pt-4">
    <div className="h-9 w-9 rounded-full border flex items-center justify-center">
      <span className="text-sm font-medium">in</span>
    </div>
    <div className="h-9 w-9 rounded-full border flex items-center justify-center">
      <span className="text-sm font-medium">X</span>
    </div>
    <div className="h-9 w-9 rounded-full border flex items-center justify-center">
      <span className="text-sm font-medium">IG</span>
    </div>
  </div>
</div>


          {/* Right Form */}
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">First Name*</label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Last Name*</label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Email*</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Message*</label>
                <Textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 resize-none"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12">
                Send →
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
