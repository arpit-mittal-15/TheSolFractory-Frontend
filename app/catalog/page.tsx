"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogPageSkeleton from "@/src/components/skeletons/CatalogPageSkeleton";
import { toast } from "sonner";

// Mock product data
const products = [
  {
    id: "1",
    name: "Premium Silk Coated Stock",
    paperType: "Hemp",
    size: "A4 (210x297mm)",
    price: 250,
    image: "/homepage/conestack.png",
  },
  {
    id: "2",
    name: "Premium Silk Coated Stock",
    paperType: "Natural",
    size: "A4 (210x297mm)",
    price: 210,
    image: "/homepage/conestack.png",
  },
  {
    id: "3",
    name: "Premium Silk Coated Stock",
    paperType: "Organic",
    size: "A4 (210x297mm)",
    price: 150,
    image: "/homepage/conestack.png",
  },
  {
    id: "4",
    name: "Premium Silk Coated Stock",
    paperType: "Rice",
    size: "A4 (210x297mm)",
    price: 200,
    image: "/homepage/conestack.png",
  },
  {
    id: "5",
    name: "Premium Silk Coated Stock",
    paperType: "Blunt",
    size: "A4 (210x297mm)",
    price: 180,
    image: "/homepage/conestack.png",
  },
  {
    id: "6",
    name: "Premium Silk Coated Stock",
    paperType: "Hemp",
    size: "A4 (210x297mm)",
    price: 220,
    image: "/homepage/conestack.png",
  },
  {
    id: "7",
    name: "Premium Silk Coated Stock",
    paperType: "Natural",
    size: "A4 (210x297mm)",
    price: 190,
    image: "/homepage/conestack.png",
  },
  {
    id: "8",
    name: "Premium Silk Coated Stock",
    paperType: "Organic",
    size: "A4 (210x297mm)",
    price: 160,
    image: "/homepage/conestack.png",
  },
  {
    id: "9",
    name: "Premium Silk Coated Stock",
    paperType: "Rice",
    size: "A4 (210x297mm)",
    price: 240,
    image: "/homepage/conestack.png",
  },
];

const paperTypes = ["Blunt", "Hemp", "Natural", "Organic", "Rice"];
const packagingOptions = ["Tube", "Box", "Wrapped Bundle", "Custom"];

const heroSlides = [
  { src: "/homepage/conestack.png", label: "Natural Hemp Cones" },
  { src: "/homepage/sizechart.png", label: "Precision Size Options" },
  { src: "/homepage/conestack.png", label: "Production-Ready Inventory" },
];

export default function CatalogPage() {
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  // Filter states
  const [selectedPaperTypes, setSelectedPaperTypes] = useState<string[]>(["Blunt", "Hemp", "Natural", "Organic", "Rice"]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>(["Tube"]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 500]);
  const [lotSize, setLotSize] = useState<[number, number]>([1000, 5000]);
  const [sortBy, setSortBy] = useState("featured");

  // Hero slider state
  const [activeSlide, setActiveSlide] = useState(0);

  // Collapsible filter states
  const [paperTypeOpen, setPaperTypeOpen] = useState(false);
  const [sizeRangeOpen, setSizeRangeOpen] = useState(false);
  const [lotSizeOpen, setLotSizeOpen] = useState(false);
  const [packagingOpen, setPackagingOpen] = useState(false);

  const handlePaperTypeToggle = (type: string) => {
    setSelectedPaperTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePackagingToggle = (option: string) => {
    setSelectedPackaging((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // Auto-advance hero slider on desktop
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      paperType: product.paperType,
      quantity: 1, // Add 1 item at a time
      price: product.price,
      image: product.image,
    });

    toast.success("Added to cart", {
      description: `${product.name} (${product.paperType})`,
    });
  };

  const clearFilters = () => {
    setSelectedPaperTypes([]);
    setSelectedPackaging([]);
    setSizeRange([0, 500]);
    setLotSize([1000, 5000]);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (
      selectedPaperTypes.length > 0 &&
      !selectedPaperTypes.includes(product.paperType)
    ) {
      return false;
    }
    // Add more filter logic as needed
    return true;
  });

  if (isMobile === null) return <CatalogPageSkeleton />;

  return (
    <div className="min-h-screen h-screen overflow-y-scroll scrollbar-hide">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20">
        {/* Header Section */}
        <div className="max-w-400 mx-auto px-0 md:px-6 mb-10">
          <div className="px-4 md:px-0">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-serif mb-3"
              style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>
                Wholesale <span className="text-blue-400">Inventory</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Select products to build your wholesale quote.
              </p>
            </div>
          </div>

          {/* Full-width hero image slider (one image at a time, reduced height) */}
          {isMobile? null : <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden bor-shadow backdrop-blur-lg border border-white/15">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === activeSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={idx === activeSlide} // optional: preload current slide
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-3 flex items-end">
                  <p className="text-white text-sm md:text-base font-semibold">
                    {slide.label}
                  </p>
                </div>
              </div>
            ))}
          </div>}

        </div>

        {/* Main Content */}
        <div className="max-w-400 mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {isMobile ? (null) : <aside className="w-full lg:w-1/5">
            <div className="glass-panel p-6 rounded-xl lg:sticky lg:top-32 max-h-[80vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h2 className="font-serif text-lg" style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-400 hover:text-white transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Material (Paper Type) */}
              <div className="mb-6">
                <button
                  onClick={() => setPaperTypeOpen(!paperTypeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">
                    Material
                  </span>
                  {paperTypeOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {paperTypeOpen && (
                  <div className="space-y-2">
                    {paperTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePaperTypeToggle(type)}
                        className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-all ${
                          selectedPaperTypes.includes(type)
                            ? "bg-white/10 text-white"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{type}</span>
                        <span
                          className={`w-3 h-3 rounded-full border border-white/30 ${
                            selectedPaperTypes.includes(type)
                              ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                              : "bg-transparent"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Range */}
              <div className="mb-6">
                <button
                  onClick={() => setSizeRangeOpen(!sizeRangeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">
                    Size Range [mm]
                  </span>
                  {sizeRangeOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {sizeRangeOpen && (
                  <div className="space-y-3">
                    <Slider
                      value={sizeRange}
                      onValueChange={(value) =>
                        setSizeRange(value as [number, number])
                      }
                      min={0}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Min: {sizeRange[0]}mm</span>
                      <span>Max: {sizeRange[1]}mm</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lot Size */}
              <div className="mb-6">
                <button
                  onClick={() => setLotSizeOpen(!lotSizeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">
                    Lot Size (Units)
                  </span>
                  {lotSizeOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {lotSizeOpen && (
                  <div className="space-y-3">
                    <Slider
                      value={lotSize}
                      onValueChange={(value) =>
                        setLotSize(value as [number, number])
                      }
                      min={1000}
                      max={10000}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Min: {lotSize[0].toLocaleString()}</span>
                      <span>Max: {lotSize[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Packaging */}
              <div className="mb-6">
                <button
                  onClick={() => setPackagingOpen(!packagingOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">
                    Packaging
                  </span>
                  {packagingOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {packagingOpen && (
                  <div className="space-y-2">
                    {packagingOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handlePackagingToggle(option)}
                        className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-all ${
                          selectedPackaging.includes(option)
                            ? "bg-white/10 text-white"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{option}</span>
                        <span
                          className={`w-3 h-3 rounded-full border border-white/30 ${
                            selectedPackaging.includes(option)
                              ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                              : "bg-transparent"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Actions */}
              <div className="space-y-3 pt-2 border-t border-white/10 mt-4">
                <Button
                  className="w-full btn-liquid btn-primary py-3 text-[10px] font-bold uppercase tracking-widest"
                  onClick={() => {
                    // Apply filters logic
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full btn-liquid py-3 text-[10px] font-bold uppercase tracking-widest bg-transparent border-white/20 text-gray-200 hover:text-white"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </aside>}

          {/* Product Grid */}
          <div className="w-full lg:w-4/5">
            {/* Mobile Horizontal Filter Bar */}
            {isMobile && (
              <div className="mb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {/* Paper Type Filters */}
                  {paperTypes.map((type) => {
                    const isSelected = selectedPaperTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => handlePaperTypeToggle(type)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
                          isSelected
                            ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-sm font-medium">{type}</span>
                        {isSelected && <X className="h-3 w-3" />}
                      </button>
                    );
                  })}

                  {/* Packaging Filters */}
                  {packagingOptions.map((option) => {
                    const isSelected = selectedPackaging.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handlePackagingToggle(option)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
                          isSelected
                            ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-sm font-medium">{option}</span>
                        {isSelected && <X className="h-3 w-3" />}
                      </button>
                    );
                  })}

                  {/* Clear All Button */}
                  {(selectedPaperTypes.length > 0 ||
                    selectedPackaging.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 whitespace-nowrap transition-all"
                    >
                      <X className="h-4 w-4" />
                      <span className="text-sm font-medium">Clear All</span>
                    </button>
                  )}
                </div>

                {/* Size Range Display for Mobile */}
                <div className="mt-3 px-2">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      Size: {sizeRange[0]} - {sizeRange[1]} mm
                    </span>
                    <span>
                      Lot: {lotSize[0].toLocaleString()} -{" "}
                      {lotSize[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-serif" style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>Products</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] glass-panel !bg-black/40 border-white/10 text-white px-3 py-2 h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#132135] border-white/10 text-white">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const description = `${product.paperType} • ${product.size}`;
                return (
                  <div
                    key={product.id}
                    className="glass-panel rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="aspect-[4/5] bg-white/5 p-6 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={250}
                        className="object-contain drop-shadow-2xl group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full btn-liquid btn-primary py-3 text-[10px] font-bold uppercase tracking-widest"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <div className="p-5 border-t border-white/5">
                      <h3 className="text-sm font-bold truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1 mb-2">
                        {description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-light">
                          ${product.price}
                        </span>
                        <span className="text-[9px] text-gray-500">MOQ 1k</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
        <Footer />
    </div>
  );
}
