"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconTrafficCone } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Leaf, Droplets, Sparkles, Infinity, ChevronsDown, CircleDot, FileText, Sparkle, AlertCircle, X, ArrowRight } from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";
import { toast } from "sonner";

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
  const { addItem } = useCart();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CustomizationState>({
    paperType: null,
    filterType: null,
    coneSize: null,
    lotSize: null,
    customQuantity: "",
    country: "",
    zipCode: "",
  });

  const updateState = (updates: Partial<CustomizationState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const selectAndNext = (updates: Partial<CustomizationState>) => {
    updateState(updates);
    setTimeout(() => {
      if (step < 5) setStep((prev) => Math.min(prev + 1, 5));
    }, 120);
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
      return qty > 0 ? qty : 0;
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
        return 0;
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
      toast.error("Complete customization first", {
        description: "Please finish all steps before adding to cart.",
      });
      return; // Don't add if required fields are missing
    }

    const quantity = getQuantity();
    const totalPrice = getTotalPriceNumber(); // Total price for the lot

    // Generate unique ID based on customization
    const itemId = `custom-${state.paperType}-${state.filterType}-${state.coneSize}-${state.lotSize}-${crypto.randomUUID()}`;

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
    toast.success("Custom cone added to cart", {
      description: `${quantity.toLocaleString()} cones • ${getTotalPrice()}`,
    });
    
    // Optionally redirect to catalog
    // router.push("/catalog");
  };

  const getPaperTypeName = () => {
    const paper = PAPER_TYPES.find((p) => p.id === state.paperType);
    return paper?.name || "Select Paper";
  };

  const getFilterTypeName = () => {
    const filter = FILTER_TYPES.find((f) => f.id === state.filterType);
    return filter?.name || "Select Filter";
  };

  const getConeSizeName = () => {
    if (!state.coneSize) return "Choose Size";
    const size = CONE_SIZES.find((s) => s.id === state.coneSize);
    return `${size?.id}${size?.description ? ` (${size.description})` : ""}`;
  };

  const getLotSizeName = () => {
    if (!state.lotSize) return "Choose Lot Size";
    if (state.lotSize === "custom") return `Custom (${state.customQuantity || "Enter quantity"})`;
    const lot = LOT_SIZES.find((l) => l.id === state.lotSize);
    return `${lot?.name} (${lot?.quantity})`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Step Indicator */}
          {/* <div className="flex justify-center mb-8">
            <div className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm font-medium">
              STEP {step} OF 5
            </div>
          </div> */}

          {/* Step 1: Paper Type Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl mt-14 font-bold text-white text-center mb-2" style={{ textShadow: "0 0 3px rgba(255,255,255,0.5)" }}>
                Create your cone exactly the way you{" "}
                <span className="text-blue-400">want it.</span>
              </h1>
              <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto text-sm">
                Dive into a world of endless possibilities. Select the perfect paper for
                your custom cones and begin crafting your unique smoking experience.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Preview */}
                <div className="rounded-xl border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.25)] p-4 min-h-[340px]">
                  <h2 className="text-xl font-semibold text-white mb-3 mt-1" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>Visual Preview</h2>
                  <div className="bg-white/80 rounded-lg p-4 flex flex-col items-center justify-center min-h-[250px]">
                    {state.paperType ? (
                      <>
                        <div
                          className="w-24 h-24 rounded-lg mb-3 border border-gray-200"
                          style={
                            state.paperType === "unbleached"
                              ? { backgroundColor: "rgba(120,72,25,0.15)" }
                              : state.paperType === "hemp"
                              ? { backgroundColor: "rgba(74,222,128,0.2)" }
                              : state.paperType === "bleached"
                              ? { backgroundColor: "rgba(255,255,255,0.9)" }
                              : { background: "linear-gradient(to bottom right, #fbcfe8, #bfdbfe, #bbf7d0)" }
                          }
                        ></div>
                        <p className="text-gray-900 font-medium text-center">{getPaperTypeName()}</p>
                      </>
                    ) : (
                      <p className="text-gray-700 text-sm text-center">Select a paper type to preview it here.</p>
                    )}
                  </div>
                </div>

                {/* Paper Type Options */}
                <div className="grid grid-cols-2 gap-3">
                  {PAPER_TYPES.map((paper) => {
                    const Icon = paper.icon;
                    const isSelected = state.paperType === paper.id;
                    return (
                      <button
                        key={paper.id}
                        onClick={() => selectAndNext({ paperType: paper.id })}
                        className={`relative btn-liquid-rect rounded-xl p-4 border transition-all text-left ${
                          isSelected
                            ? "active border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.4)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                            <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </div>
                        )}
                        <div className="flex flex-col items-center space-y-3">
                          <Icon className="h-9 w-9 text-white" />
                          <div className="text-center">
                            <h3 className="text-white font-semibold text-base mb-1">
                              {paper.name}
                            </h3>
                            <p className="text-gray-400 text-xs leading-snug">{paper.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="nav-btn btn-liquid md:w-48 px-5 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK TO CATALOG
                </Button>
                <Button
                  onClick={nextStep}
                  className="nav-btn md:w-48 w-48 btn-liquid active px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  Next
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Filter/Tip Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-3xl mt-14 md:text-4xl font-bold text-white text-center mb-10"style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>
                Select Your <span className="text-blue-400">Filter / Tip</span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.25)] p-4 min-h-[340px]">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Visual Preview</h2>
                  <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center min-h-[250px]">
                    {state.filterType ? (
                      <>
                        <div className="w-24 h-28 rounded-t-full bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-200 mb-3"></div>
                        <p className="text-gray-900 font-medium text-center">{getFilterTypeName()}</p>
                      </>
                    ) : (
                      <p className="text-gray-700 text-sm text-center">Select a filter to preview it here.</p>
                    )}
                  </div>
                </div>

                {/* Filter Options */}
                <div className="space-y-3">
                  {FILTER_TYPES.map((filter) => {
                    const Icon = filter.icon;
                    const isSelected = state.filterType === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => selectAndNext({ filterType: filter.id })}
                        className={`relative w-full btn-liquid-rect rounded-xl p-4 border text-left transition-all ${
                          isSelected
                            ? "active border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.4)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                            <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </div>
                        )}
                        <div className="flex items-center space-x-4">
                          <Icon className="h-8 w-8 text-white flex-shrink-0" />
                          <div>
                            <h3 className="text-white font-semibold text-base mb-1">
                              {filter.name}
                            </h3>
                            <p className="text-gray-400 text-xs leading-snug">{filter.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="nav-btn btn-liquid md:w-48 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="nav-btn btn-liquid md:w-48 active px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  NEXT
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Cone Size Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-3xl mt-14 md:text-4xl font-bold text-white text-center mb-10" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>
                Choose <span className="text-blue-400">Cone Size</span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.25)] p-4 min-h-[340px] flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-2">Current Size:</div>
                  <div className="text-gray-900 font-semibold text-base mb-6">
                    {state.coneSize ? `${state.coneSize} Length x 5mm Diameter` : "Pick a size to preview"}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {state.coneSize ? (
                      <div className="flex flex-col items-center space-y-2">
                        <IconTrafficCone size={72} stroke={1.2} />
                        <p className="text-gray-800 text-sm">Approximate preview</p>
                      </div>
                    ) : (
                      <p className="text-gray-700 text-sm text-center">Select a size to see a preview.</p>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mt-auto">
                    {state.coneSize ? `Your custom cone will be ${state.coneSize} long and 5mm in diameter.` : "Choose a size to continue."}
                  </p>
                </div>

                {/* Size Options */}
                <div className="grid grid-cols-2 gap-3">
                  {CONE_SIZES.map((size) => {
                    const isSelected = state.coneSize === size.id;
                    return (
                      <button
                        key={size.id}
                        onClick={() => selectAndNext({ coneSize: size.id })}
                        className={`relative btn-liquid-rect rounded-xl p-4 border transition-all ${
                          isSelected
                            ? "active border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.4)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                            <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </div>
                        )}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-3xl font-bold text-white"><IconTrafficCone size={60} stroke={1.3} /></div>
                          <div className="text-white font-semibold text-lg">{size.name}</div>
                          <div className="text-gray-400 text-xs text-center leading-snug">{size.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="nav-btn btn-liquid md:w-48 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="nav-btn btn-liquid md:w-48 active px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  NEXT
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Lot Size Selection */}
          {step === 4 && (
            <div className="space-y-6">
              <h1 className="text-3xl mt-14 md:text-4xl font-bold text-white text-center mb-10" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>
                Select Your <span className="text-blue-400">Lot Size</span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Preview */}
                <div className="bg-[#E8E8E8] rounded-xl border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.25)] p-4 min-h-[340px] flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Visual Preview</h2>
                  <div className="text-red-600 font-medium mb-2">Current Lot:</div>
                  <div className="text-gray-900 font-semibold text-base mb-4">
                    {state.lotSize ? getLotSizeName() : "Choose a lot size to preview"}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {state.lotSize ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-16 bg-gray-200 border border-gray-300 rounded-lg"></div>
                        <p className="text-gray-800 text-sm">{getQuantity().toLocaleString()} cones estimated</p>
                      </div>
                    ) : (
                      <p className="text-gray-700 text-sm text-center">Select a lot to continue.</p>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mt-auto">
                    Lead time estimates update after you choose a lot size.
                  </p>
                </div>

                {/* Lot Size Options & Your Selection */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Lot Size Options - Top 4 cards in 2x2 grid */}
                  {LOT_SIZES.map((lot) => {
                    const isSelected = state.lotSize === lot.id;
                    return (
                      <button
                        key={lot.id}
                        onClick={() => selectAndNext({ lotSize: lot.id })}
                        className={`relative btn-liquid-rect rounded-xl p-4 border transition-all ${
                          isSelected
                            ? "active border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.4)]"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                            <Check className="h-3 w-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3 className="text-white font-semibold text-base">{lot.name}</h3>
                          <p className="text-gray-400 text-xs">{lot.quantity}</p>
                          <p className="text-gray-400 text-xs">{lot.leadTime}</p>
                          <p className="text-gray-300 text-xs font-medium">{lot.price}</p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Lot Size */}
                  <div className="btn-liquid-rect rounded-xl p-4 border border-gray-700">
                    <h3 className="text-white font-semibold text-base mb-2">Custom Lot Size</h3>
                    <Input
                      placeholder="ENTER QUANTITY (E.G., 25000)"
                      value={state.customQuantity}
                      onChange={(e) => {
                        updateState({ customQuantity: e.target.value, lotSize: "custom" as LotSize });
                      }}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 mb-2 h-10 text-sm"
                    />
                    <p className="text-gray-400 text-xs leading-snug">
                      Enter a specific quantity outside the predefined batches.
                    </p>
                  </div>

                  {/* Your Selection */}
                  <div className="btn-liquid-rect rounded-xl p-4 border border-gray-700">
                    <h3 className="text-white font-semibold text-base mb-3">Your Selection</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-gray-300">
                        <span>Lot Size:</span>
                        <span className="text-white">
                          {state.lotSize === "custom"
                            ? `Custom (${state.customQuantity || "Enter quantity"})`
                            : state.lotSize
                            ? LOT_SIZES.find((l) => l.id === state.lotSize)?.name || "Sample Batch"
                            : "Not selected"}
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
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="nav-btn btn-liquid md:w-48 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
                <Button
                  onClick={nextStep}
                  className="nav-btn btn-liquid md:w-48 active px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  NEXT
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Location/Shipping */}
          {step === 5 && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-3xl mt-14 md:text-4xl font-bold text-white text-center mb-9" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>
                Where Are You <span className="text-blue-400">Located?</span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
                {/* Left Column: Shipping Address */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bor-shadow rounded-xl p-4 border border-gray-700">
                    <h2 className="text-white font-semibold text-lg mb-2">Shipping Address</h2>
                    <p className="text-gray-400 text-xs mb-4">
                      Provide your location details for an accurate shipping estimate.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-white text-xs font-medium mb-1 block">Country:</label>
                        <Select value={state.country} onValueChange={(value) => updateState({ country: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white h-10 text-sm">
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
                        <label className="text-white text-xs font-medium mb-1 block">
                          Zip / Postal Code (Optional):
                        </label>
                        <Input
                          placeholder="e.g., 90210"
                          value={state.zipCode}
                          onChange={(e) => updateState({ zipCode: e.target.value })}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 h-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Estimate Warning */}
                  <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-3 flex items-start space-x-3">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-400 font-semibold text-sm mb-1">Shipping Estimate</div>
                      <p className="text-red-300 text-xs">
                        Please complete your location details to get a shipping estimate.
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="nav-btn btn-liquid md:w-48 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      BACK
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      className="nav-btn btn-liquid md:w-48 active px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>

                {/* Right Column: Your Selection Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bor-shadow active bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden sticky top-20">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-700">
                      <h2 className="text-white font-semibold text-base">Your Selection</h2>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Product Item */}
                    <div className="p-3">
                      <div className="bg-gray-700/30 mt-1 mb-1 backdrop-blur-lg rounded-lg p-3 border border-gray-600 flex items-start space-x-3">
                        {/* Product Image Placeholder */}
                        <div className="w-16 h-16 bg-gray-600 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1 text-sm">{getPaperTypeName()}</h3>
                          <p className="text-gray-400 text-xs mb-1">Paper Type</p>
                          <p className="text-gray-400 text-xs">Qty: {getQuantity() > 0 ? getQuantity().toLocaleString() : "—"}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-white font-semibold text-sm">{getQuantity() > 0 ? getTotalPrice() : "$0.00"}</div>
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                        </div>
                      </div>
                    </div>

                    {/* Total Estimate */}
                    <div className="px-3 py-3 border-t border-gray-700 flex justify-between items-center">
                      <span className="text-white font-semibold text-sm">Total Estimate</span>
                      <span className="text-white font-semibold text-base">{getQuantity() > 0 ? getTotalPrice() : "$0.00"}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-3 space-y-4 border-t border-gray-700">
                      <Button
                        className="btn-liquid-rect active w-full bg-transparent border border-blue-400 text-white hover:bg-blue-400/10 shadow-[0_0_14px_rgba(59,130,246,0.4)]"
                        onClick={handleAddToCart}
                      >
                        PLACE ORDER
                      </Button>
                      <Button
                        variant="outline"
                        className="btn-liquid-rect w-full bg-transparent border border-blue-400 text-white hover:bg-blue-400/10"
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
