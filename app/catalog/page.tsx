"use client";

import React, { useState } from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogPageSkeleton from "@/src/components/skeletons/CatalogPageSkeleton";

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

export default function CatalogPage() {
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  // Filter states
  const [selectedPaperTypes, setSelectedPaperTypes] = useState<string[]>(["Blunt"]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>(["Tube"]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 500]);
  const [lotSize, setLotSize] = useState<[number, number]>([1000, 5000]);
  const [sortBy, setSortBy] = useState("featured");

  // Collapsible filter states
  const [paperTypeOpen, setPaperTypeOpen] = useState(true);
  const [sizeRangeOpen, setSizeRangeOpen] = useState(true);
  const [lotSizeOpen, setLotSizeOpen] = useState(true);
  const [packagingOpen, setPackagingOpen] = useState(true);

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

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      paperType: product.paperType,
      quantity: 1, // Add 1 item at a time
      price: product.price,
      image: product.image,
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
    <div className="min-h-screen bg-[#132135]">
      <Navbar />
      <main className="pt-24 pb-12 px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Wholesale <span className="text-blue-400">Inventory</span>
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Select products to build your wholesale quote.
          </p>

          {/* Selected Items Preview */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex gap-2 min-h-[80px]">
                <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-500 rounded-lg" />
                </div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-500 rounded-full" />
                </div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-500 rounded-lg" />
                </div>
              </div>
              <div className="w-8 flex flex-col items-center gap-1">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="flex-1 border-l border-gray-600" />
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
                <div className="flex-1 border-l border-gray-600" />
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>

              {/* Paper Type Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setPaperTypeOpen(!paperTypeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="font-medium">Paper Type</span>
                  {paperTypeOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {paperTypeOpen && (
                  <div className="space-y-2">
                    {paperTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`paper-${type}`}
                          checked={selectedPaperTypes.includes(type)}
                          onCheckedChange={() => handlePaperTypeToggle(type)}
                          className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <Label
                          htmlFor={`paper-${type}`}
                          className="text-gray-300 cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Range Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setSizeRangeOpen(!sizeRangeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="font-medium">Size Range [mm]</span>
                  {sizeRangeOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
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
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Min: {sizeRange[0]}</span>
                      <span>Max: {sizeRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lot Size Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setLotSizeOpen(!lotSizeOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="font-medium">Lot Size (Units)</span>
                  {lotSizeOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
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
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Min: {lotSize[0].toLocaleString()}</span>
                      <span>Max: {lotSize[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Packaging Options Filter */}
              <div className="mb-6">
                <button
                  onClick={() => setPackagingOpen(!packagingOpen)}
                  className="flex items-center justify-between w-full mb-3 text-white"
                >
                  <span className="font-medium">Packaging Options</span>
                  {packagingOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {packagingOpen && (
                  <div className="space-y-2">
                    {packagingOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`packaging-${option}`}
                          checked={selectedPackaging.includes(option)}
                          onCheckedChange={() => handlePackagingToggle(option)}
                          className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <Label
                          htmlFor={`packaging-${option}`}
                          className="text-gray-300 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    // Apply filters logic
                  }}
                >
                  APPLY FILTERS
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={clearFilters}
                >
                  CLEAR FILTERS
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
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
                            : "bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500"
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
                            : "bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <span className="text-sm font-medium">{option}</span>
                        {isSelected && <X className="h-3 w-3" />}
                      </button>
                    );
                  })}
                  
                  {/* Clear All Button */}
                  {(selectedPaperTypes.length > 0 || selectedPackaging.length > 0) && (
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
                    <span>Size: {sizeRange[0]} - {sizeRange[1]} mm</span>
                    <span>Lot: {lotSize[0].toLocaleString()} - {lotSize[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Catalog Explorer
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className="relative aspect-square bg-gray-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-center pb-4">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-600 font-semibold"
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-1">
                      Paper Type
                    </p>
                    <p className="text-white font-semibold text-lg">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
        <Footer />
    </div>
  );
}
