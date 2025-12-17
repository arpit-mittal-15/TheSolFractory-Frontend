"use client";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const lineItems = [
  {
    name: "Cosmic Cone - Supernova Grande",
    details: "Paper: Nebula | Filter: Carbon",
    qty: 10,
    price: "$50",
    img: "/homepage/conestack.png",
  },
  {
    name: "Stardust Flavour Cone",
    details: "Enhanced cone flavor",
    qty: 10,
    price: "$50",
    img: "/homepage/conestack.png",
  },
];

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#0c1727] text-white">
      <Navbar />
      <main className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-2xl md:text-3xl font-serif mb-8">
            Place Wholesale <span className="text-blue-300">Order</span>
          </h1>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
            {/* Left Column - Cart Summary */}
            <section className="btn-liquid-rect active rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
              <header className="px-5 py-4 border-b border-white/10 text-sm font-semibold">
                Cart Summary
              </header>
              <div className="p-5 space-y-6">
                {/* Image */}
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <img
                    src="/homepage/conestack.png"
                    alt="Pre-rolled cones"
                    className="w-full h-40 object-cover"
                  />
                </div>

                {/* Config Details */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                  <span>Paper Type:</span>
                  <span className="text-white text-right">Activated Carbon</span>
                  <span>Filter Type:</span>
                  <span className="text-white text-right">Supreme Grande</span>
                  <span>Size:</span>
                  <span className="text-white text-right">Supreme Grande</span>
                  <span>Lot Number:</span>
                  <span className="text-white text-right">SF-42-X-987</span>
                </div>

                {/* Line Items */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Line Items</h3>
                  <div className="space-y-3">
                    {lineItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{item.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{item.details}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300 text-xs">
                          <Button variant="outline" className="h-6 px-2 text-[11px] border-white/30">
                            +
                          </Button>
                          <span>{item.qty}</span>
                          <Button variant="outline" className="h-6 px-2 text-[11px] border-white/30">
                            -
                          </Button>
                        </div>
                        <div className="text-xs text-gray-100">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging / Totals */}
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Standard Recyclable Box</span>
                    <span className="text-white">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Collector's Tin (+ $49)</span>
                    <span className="text-white">$50</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packaging</span>
                      <span className="text-white">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax</span>
                      <span className="text-white">$50</span>
                    </div>
                    <div className="flex justify-between font-semibold text-white pt-1">
                      <span>Total (Excl. Shipping)</span>
                      <span>$2000</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column - Checkout */}
            <section className="space-y-4">
              <header className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-white">Checkout Details</span>
              </header>

              {/* Shipping Address */}
              <div className="btn-liquid-rect rounded-xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  <span>Shipping Address</span>
                </div>
                <div className="space-y-2 text-xs text-gray-200">
                  <div className="flex gap-2">
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="First Name" />
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Last Name" />
                  </div>
                  <Input className="h-9 bg-black/30 border-white/20" placeholder="Company Name" />
                  <Input className="h-9 bg-black/30 border-white/20" placeholder="Shipping Address" />
                  <div className="flex gap-2">
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Phone Number" />
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Email" />
                  </div>
                  <div className="flex gap-2">
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Country" />
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Zip / Postal" />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="btn-liquid-rect rounded-xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span role="img" aria-label="truck">
                    🚚
                  </span>
                  <span>Shipping Method</span>
                </div>
                <div className="space-y-2 text-xs text-gray-200">
                  {[
                    "Standard Stellar Delivery (3-7 days)",
                    "Expedited Galaxy Express (1-3 days)",
                    "Next-day Wormhole Warp (1 day)",
                  ].map((label, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between bg-black/20 border border-white/10 rounded px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" name="ship" defaultChecked={idx === 0} className="accent-blue-500" />
                        <span>{label}</span>
                      </div>
                      <span className="text-white">$50</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="btn-liquid-rect rounded-xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span role="img" aria-label="card">
                    💳
                  </span>
                  <span>Payment Method</span>
                </div>
                <div className="space-y-2 text-xs text-gray-200">
                  <Input className="h-9 bg-black/30 border-white/20" placeholder="Credit Card" />
                  <div className="flex gap-2">
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Name on card" />
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="Card Number" />
                    <Input className="h-9 bg-black/30 border-white/20" placeholder="CVV" />
                  </div>
                  <div className="flex gap-2">
                    <select className="w-1/2 h-9 bg-black/30 border border-white/20 rounded px-3">
                      <option>Saved Cards</option>
                    </select>
                    <select className="w-1/2 h-9 bg-black/30 border border-white/20 rounded px-3">
                      <option>Other Options</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="btn-liquid-rect rounded-xl border border-white/10 p-4 space-y-2 text-xs text-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging</span>
                  <span className="text-white">$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-white">$50</span>
                </div>
                <div className="flex justify-between font-semibold text-white pt-1 border-t border-white/10">
                  <span>Grand Total</span>
                  <span>$2000</span>
                </div>
              </div>

              {/* Order Notes */}
              <div className="btn-liquid-rect rounded-xl border border-white/10 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span role="img" aria-label="note">
                    📝
                  </span>
                  <span>Order Notes (Optional)</span>
                </div>
                <Textarea
                  className="min-h-[100px] bg-black/30 border-white/20 text-sm"
                  placeholder="Special instructions or additional details for your order..."
                />
              </div>

              <Button className="btn-liquid-rect active w-full rounded-xl py-3 text-sm font-semibold uppercase tracking-wide border border-blue-300">
                Place Order
              </Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

