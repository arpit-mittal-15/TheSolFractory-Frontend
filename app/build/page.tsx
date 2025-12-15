"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Leaf, Droplets, Sparkles, Infinity, ChevronsDown, CircleDot, FileText, Sparkle, AlertCircle, X } from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";

type PaperType = "unbleached" | "hemp" | "bleached" | "colored";
type FilterType = "standard" | "crutch" | "branded" | "printed-pattern" | "natural";
type ConeSize = "70mm" | "84mm" | "98mm" | "109mm";
type LotSize = "sample" | "small" | "medium" | "large" | "custom";

interface CustomizationState {
  paperType: PaperType | null;
  filterType: FilterType | null;
  coneSize: ConeSize | null;
  lotSize: LotSize | null;
  customQuantity: string;
  country: string;
  zipCode: string;
}

const PAPER_TYPES = [
  {
    id: "unbleached" as PaperType,
    name: "Unbleached (Brown)",
    description: "Natural and organic, for a pure experience.",
    icon: Leaf,
  },
  {
    id: "hemp" as PaperType,
    name: "Hemp Paper",
    description: "Sustainable choice, with a unique texture.",
    icon: Leaf,
  },
  {
    id: "bleached" as PaperType,
    name: "Bleached (White)",
    description: "Clean and classic, for a smooth burn.",
    icon: Droplets,
  },
  {
    id: "colored" as PaperType,
    name: "Colored Paper",
    description: "Express your style, vibrant and distinct.",
    icon: Sparkles,
  },
];

const FILTER_TYPES = [
  {
    id: "standard" as FilterType,
    name: "Standard Filter Tip",
    description: "A classic, simple filter for a consistent and smooth experience.",
    icon: Infinity,
  },
  {
    id: "crutch" as FilterType,
    name: "Crutch Filter",
    description: "Provides robust structural support and enhances airflow for a cooler draw.",
    icon: ChevronsDown,
  },
  {
    id: "branded" as FilterType,
    name: "Branded Filter",
    description: "Customize your cones with your own logo or specific brand elements.",
    icon: FileText,
  },
  {
    id: "printed-pattern" as FilterType,
    name: "Printed Pattern Tip",
    description: "Add unique and expressive patterns to your tips for visual flair.",
    icon: Sparkle,
  },
  {
    id: "natural" as FilterType,
    name: "Natural / Unprinted Tip",
    description: "An eco-friendly option for a pure, unadulterated smoking experience.",
    icon: Leaf,
  },
];

const CONE_SIZES = [
  {
    id: "70mm" as ConeSize,
    name: "70mm",
    description: "Dogwalk / Mini",
  },
  {
    id: "84mm" as ConeSize,
    name: "84mm",
    description: "1/2 Gram",
  },
  {
    id: "98mm" as ConeSize,
    name: "98mm",
    description: "Standard / 3/4 Gram",
  },
  {
    id: "109mm" as ConeSize,
    name: "109mm",
    description: "King Size 1 Gram",
  },
];

const LOT_SIZES = [
  {
    id: "sample" as LotSize,
    name: "Sample Batch",
    quantity: "50-200 cones",
    leadTime: "5-7 Business Days",
    price: "$0.40 - $0.75 per cone",
  },
  {
    id: "small" as LotSize,
    name: "Small Batch",
    quantity: "3,000-10,000 cones",
    leadTime: "5-7 Business Days",
    price: "$0.40 - $0.75 per cone",
  },
  {
    id: "medium" as LotSize,
    name: "Medium Run",
    quantity: "50-200 cones",
    leadTime: "5-7 Business Days",
    price: "$0.40 - $0.75 per cone",
  },
  {
    id: "large" as LotSize,
    name: "Large Scale",
    quantity: "50-200 cones",
    leadTime: "5-7 Business Days",
    price: "$0.40 - $0.75 per cone",
  },
];

export default function BuildPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CustomizationState>({
    paperType: "hemp",
    filterType: "crutch",
    coneSize: "109mm",
    lotSize: "sample",
    customQuantity: "",
    country: "",
    zipCode: "",
  });

  const updateState = (updates: Partial<CustomizationState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate quantity based on lot size
  const getQuantity = (): number => {
    if (state.lotSize === "custom") {
      const qty = parseInt(state.customQuantity) || 0;
      return qty > 0 ? qty : 5000; // Default to 5000 if invalid
    }
    
    switch (state.lotSize) {
      case "sample":
        return 125; // Average of 50-200
      case "small":
        return 6500; // Average of 3,000-10,000
      case "medium":
        return 50000; // Estimate
      case "large":
        return 100000; // Estimate
      default:
        return 5000;
    }
  };

  // Calculate price based on quantity (using $0.40 - $0.75 per cone range)
  const getPricePerCone = (): number => {
    const quantity = getQuantity();
    // Lower price per cone for larger quantities
    if (quantity >= 100000) return 0.40;
    if (quantity >= 50000) return 0.45;
    if (quantity >= 10000) return 0.50;
    if (quantity >= 5000) return 0.55;
    if (quantity >= 1000) return 0.60;
    if (quantity >= 200) return 0.65;
    return 0.75; // For sample batches
  };

  const getTotalPrice = () => {
    const quantity = getQuantity();
    const pricePerCone = getPricePerCone();
    const total = quantity * pricePerCone;
    return `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getTotalPriceNumber = (): number => {
    const quantity = getQuantity();
    const pricePerCone = getPricePerCone();
    return quantity * pricePerCone;
  };

  const handleAddToCart = () => {
    if (!state.paperType || !state.filterType || !state.coneSize || !state.lotSize) {
      alert("Please complete all customization steps before adding to cart.");
      return; // Don't add if required fields are missing
    }

    const quantity = getQuantity();
    const totalPrice = getTotalPriceNumber(); // Total price for the lot

    // Generate unique ID based on customization
    const itemId = `custom-${state.paperType}-${state.filterType}-${state.coneSize}-${state.lotSize}-${Date.now()}`;

    // Create descriptive name with all customization details
    const itemName = `Custom Cone - ${getPaperTypeName()}, ${getFilterTypeName()}, ${getConeSizeName()}, ${getLotSizeName()}`;

    // Create cart item
    const cartItem = {
      id: itemId,
      name: itemName,
      paperType: getPaperTypeName(),
      quantity: 1, // This represents 1 "lot" in the cart
      price: totalPrice, // Total price for this lot
      image: "/homepage/conestack.png", // Default image
    };

    addItem(cartItem);
    
    // Show success message
    alert(`Added to cart! ${quantity.toLocaleString()} cones - ${getTotalPrice()}`);
    
    // Optionally redirect to catalog
    // router.push("/catalog");
  };

  const getPaperTypeName = () => {
    const paper = PAPER_TYPES.find((p) => p.id === state.paperType);
    return paper?.name || "Hemp Paper";
  };

  const getFilterTypeName = () => {
    const filter = FILTER_TYPES.find((f) => f.id === state.filterType);
    return filter?.name || "Branded Filter";
  };

  const getConeSizeName = () => {
    if (!state.coneSize) return "109mm (King Size)";
    const size = CONE_SIZES.find((s) => s.id === state.coneSize);
    return `${size?.id}${size?.description ? ` (${size.description})` : ""}`;
  };

  const getLotSizeName = () => {
    if (!state.lotSize) return "Small Batch (5,000 cones)";
    if (state.lotSize === "custom") return `Custom (${state.customQuantity})`;
    const lot = LOT_SIZES.find((l) => l.id === state.lotSize);
    return `${lot?.name} (${lot?.quantity})`;
  };

  return (
    <div className="min-h-screen bg-[#132135]">
      <Navbar />
      <main className="pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm font-medium">
              STEP {step} OF 5
            </div>
          </div>

          {/* Step 1: Paper Type Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                Create your cone exactly the way you{" "}
                <span className="text-blue-400">want it.</span>
              </h1>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Dive into a world of endless possibilities. Select the perfect paper for
                your custom cones and begin crafting your unique smoking experience.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 min-h-[500px]">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-2">Current Filter:</div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                      <div className="w-32 h-32 bg-amber-900/30 rounded-lg mb-2"></div>
                      <p className="text-gray-900 font-medium">Unbleached (Brown)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                      <div className="w-32 h-32 bg-white rounded-lg mb-2 border border-gray-300"></div>
                      <p className="text-gray-900 font-medium">Bleached (White)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                      <div className="w-32 h-32 bg-green-100 rounded-lg mb-2"></div>
                      <p className="text-gray-900 font-medium">Hemp Paper</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 rounded-lg mb-2"></div>
                      <p className="text-gray-900 font-medium">Colored Paper (Pink, Blue, Green, Seasonal)</p>
                    </div>
                  </div>
                </div>

                {/* Paper Type Options */}
                <div className="grid grid-cols-2 gap-4">
                  {PAPER_TYPES.map((paper) => {
                    const Icon = paper.icon;
                    const isSelected = state.paperType === paper.id;
                    return (
                      <button
                        key={paper.id}
                        onClick={() => updateState({ paperType: paper.id })}
                        className={`relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border-2 transition-all ${
                          isSelected
                            ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col items-center space-y-4">
                          <Icon className="h-12 w-12 text-white" />
                          <div className="text-center">
                            <h3 className="text-white font-semibold text-lg mb-2">
                              {paper.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{paper.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK TO CATALOG
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  NEXT: SELECT FILTER TYPE
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Filter/Tip Selection */}
          {step === 2 && (
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Select Your Filter / Tip
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 min-h-[500px]">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-4">Current Filter: Standard Filter</div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {["Standard Filter", "Slim Filter", "Hemp Filter", "Colored Filter"].map(
                      (name, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-4 flex flex-col items-center"
                        >
                          <div
                            className={`w-24 h-32 rounded-t-full ${
                              idx === 0
                                ? "bg-amber-900/30"
                                : idx === 1
                                ? "bg-white border border-gray-300"
                                : idx === 2
                                ? "bg-green-100"
                                : "bg-pink-200"
                            } mb-2`}
                          ></div>
                          <p className="text-gray-900 font-medium text-sm">{name}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Filter Options */}
                <div className="space-y-4">
                  {FILTER_TYPES.map((filter) => {
                    const Icon = filter.icon;
                    const isSelected = state.filterType === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => updateState({ filterType: filter.id })}
                        className={`relative w-full bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border-2 text-left transition-all ${
                          isSelected
                            ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="flex items-center space-x-4">
                          <Icon className="h-8 w-8 text-white flex-shrink-0" />
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-1">
                              {filter.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{filter.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  NEXT: CHOOSE SIZE
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Cone Size Selection */}
          {step === 3 && (
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Choose Cone Size
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 min-h-[500px] flex flex-col">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-2">Current Size:</div>
                  <div className="text-gray-900 font-semibold text-lg mb-8">
                    {state.coneSize ? `${state.coneSize} Length x 5mm Diameter` : "100mm Length x 5mm Diameter"}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {/* Placeholder for cone visualization */}
                  </div>
                  <p className="text-gray-700 text-sm mt-auto">
                    Your custom cone will be{" "}
                    {state.coneSize ? `${state.coneSize} long` : "100mm long"} and 5mm in diameter.
                  </p>
                </div>

                {/* Size Options */}
                <div className="grid grid-cols-2 gap-4">
                  {CONE_SIZES.map((size) => {
                    const isSelected = state.coneSize === size.id;
                    return (
                      <button
                        key={size.id}
                        onClick={() => updateState({ coneSize: size.id })}
                        className={`relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border-2 transition-all ${
                          isSelected
                            ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col items-center space-y-3">
                          <div className="text-4xl font-bold text-white">A</div>
                          <div className="text-white font-semibold text-xl">{size.name}</div>
                          <div className="text-gray-400 text-sm">{size.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  NEXT: SELECT QUANTITY / LOT
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Lot Size Selection */}
          {step === 4 && (
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Select Your Lot Size
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 min-h-[500px] flex flex-col">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-2">Current Size:</div>
                  <div className="text-gray-900 font-semibold text-lg mb-8">
                    100mm Length x 5mm Diameter
                  </div>
                  <div className="flex-1"></div>
                  <p className="text-gray-700 text-sm">
                    Your custom cone will be 100mm long and 5mm in diameter.
                  </p>
                </div>

                {/* Lot Size Options & Your Selection */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Lot Size Options - Top 4 cards in 2x2 grid */}
                  {LOT_SIZES.map((lot) => {
                    const isSelected = state.lotSize === lot.id;
                    return (
                      <button
                        key={lot.id}
                        onClick={() => updateState({ lotSize: lot.id })}
                        className={`relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 transition-all ${
                          isSelected
                            ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3 className="text-white font-semibold text-lg">{lot.name}</h3>
                          <p className="text-gray-400 text-sm">{lot.quantity}</p>
                          <p className="text-gray-400 text-sm">{lot.leadTime}</p>
                          <p className="text-gray-300 text-sm font-medium">{lot.price}</p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Lot Size */}
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 border-gray-700">
                    <h3 className="text-white font-semibold text-lg mb-3">Custom Lot Size</h3>
                    <Input
                      placeholder="ENTER QUANTITY (E.G., 25000)"
                      value={state.customQuantity}
                      onChange={(e) => {
                        updateState({ customQuantity: e.target.value, lotSize: "custom" as LotSize });
                      }}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 mb-2"
                    />
                    <p className="text-gray-400 text-sm">
                      Enter a specific quantity outside the predefined batches.
                    </p>
                  </div>

                  {/* Your Selection */}
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 border-gray-700">
                    <h3 className="text-white font-semibold text-lg mb-4">Your Selection</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Lot Size:</span>
                        <span className="text-white">
                          {state.lotSize === "custom"
                            ? `Custom (${state.customQuantity})`
                            : state.lotSize
                            ? LOT_SIZES.find((l) => l.id === state.lotSize)?.name || "Sample Batch"
                            : "Sample Batch"}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Estimated Lead Time:</span>
                        <span className="text-white">5-7 Business Days</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Price Per Unit:</span>
                        <span className="text-white">$0.40 - $0.75 per cone</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  NEXT: SELECT QUANTITY / LOT
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Location/Shipping */}
          {step === 5 && (
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Where Are You Located?
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Shipping Address */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border-2 border-gray-700">
                    <h2 className="text-white font-semibold text-xl mb-2">Shipping Address</h2>
                    <p className="text-gray-400 text-sm mb-6">
                      Provide your location details for an accurate shipping estimate.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Country:</label>
                        <Select value={state.country} onValueChange={(value) => updateState({ country: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white h-11">
                            <SelectValue placeholder="SELECT A COUNTRY" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Zip / Postal Code (Optional):
                        </label>
                        <Input
                          placeholder="e.g., 90210"
                          value={state.zipCode}
                          onChange={(e) => updateState({ zipCode: e.target.value })}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Estimate Warning */}
                  <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-400 font-semibold mb-1">Shipping Estimate</div>
                      <p className="text-red-300 text-sm">
                        Please complete your location details to get a shipping estimate.
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      BACK
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>

                {/* Right Column: Your Selection Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border-2 border-gray-700 overflow-hidden sticky top-24">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                      <h2 className="text-white font-semibold text-lg">Your Selection</h2>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Product Item */}
                    <div className="p-4">
                      <div className="bg-gray-700/30 backdrop-blur-lg rounded-lg p-4 border border-gray-600 flex items-start space-x-3">
                        {/* Product Image Placeholder */}
                        <div className="w-16 h-16 bg-gray-600 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1">{getPaperTypeName()}</h3>
                          <p className="text-gray-400 text-sm mb-1">Paper Type</p>
                          <p className="text-gray-400 text-sm">Qty: {getQuantity().toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-white font-semibold">{getTotalPrice()}</div>
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                        </div>
                      </div>
                    </div>

                    {/* Total Estimate */}
                    <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
                      <span className="text-white font-semibold">Total Estimate</span>
                      <span className="text-white font-semibold text-lg">{getTotalPrice()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 space-y-3 border-t border-gray-700">
                      <Button
                        className="w-full bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        onClick={handleAddToCart}
                      >
                        PLACE ORDER
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-2 border-blue-400 text-white hover:bg-blue-400/10"
                        onClick={() => {
                          // Handle request quote
                        }}
                      >
                        REQUEST QUOTE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
