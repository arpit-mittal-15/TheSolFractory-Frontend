import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import ConeViewer from "./ConeViewer";
import {
  type CustomizationState,
  getPaperTypeName,
  getFilterTypeName,
  getConeSizeName,
  getLotSizeName,
  // getQuantity,
  getTotalPrice,
} from "./types";

interface CheckoutProps {
  state: CustomizationState;
  updateState: (updates: Partial<CustomizationState>) => void;
  prevStep: () => void;
  handleAddToCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  state,
  updateState,
  prevStep,
  handleAddToCart,
}) => {
  // const quantity = getQuantity(state);
  const totalPrice = getTotalPrice(state);
  const canvasRef = useRef<HTMLCanvasElement>(null);

const handleDownload = async () => {
  try {
    const { exportConeToPDF } = await import("@/src/utils/pdfExportClient");
    
    // Get the canvas from the ConeViewer specifically
    const coneViewerCanvas = document.querySelector(".w-full.h-full canvas") as HTMLCanvasElement;
    
    if (coneViewerCanvas) {
      await exportConeToPDF(state, coneViewerCanvas);
    } else {
      console.error("Canvas not found");
      alert("Failed to find canvas. Please try again.");
    }
  } catch (error) {
    console.error("Failed to export PDF:", error);
    alert("Failed to export PDF. Please try again.");
  }
};

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center mt-14 mb-15">
        <h1
          className="text-3xl md:text-4xl text-white mb-4"
          style={{ textShadow: "0 0 2px rgba(255,255,255,0.6)" }}
        >
          Where Are You Located?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Left Column: Shipping Address */}
        <div className="checkout-card rounded-2xl w-[500px] border border-[#1f2d45] shadow-[0_12px_28px_rgba(0,0,0,0.35)] p-10 space-y-6">
          <div>
            <h2 className="text-white font-semibold text-lg mb-1">
              Shipping Address
            </h2>
            <p className="text-gray-400 text-xs">
              Provide your location details for an accurate shipping estimate.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-white text-xs font-medium mb-1 block">
                Country:
              </label>
              <Select
                value={state.country}
                onValueChange={(value) => updateState({ country: value })}
              >
                <SelectTrigger className="bg-[#0b101b] rounded-3xl border-[#2a3a53] text-gray-500 h-10 text-[12px]">
                  <SelectValue placeholder="Select your Country" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="in">India</SelectItem>
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
                className="bg-[#0b101b] rounded-3xl border-[#2a3a53] text-white placeholder:text-gray-500 h-10 text-sm"
              />
            </div>
          </div>

          {/* Shipping Estimate Warning */}
          <div className="bg-[#2a1214] border border-[#c1454d] rounded-xl p-3 flex items-start space-x-3">
            <AlertCircle className="h-4 w-4 text-[#f87171] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[#f87171] font-semibold text-sm mb-1">
                Shipping Estimate
              </div>
              <p className="text-[#fda4af] text-xs">
                Please complete your location details to get a shipping
                estimate.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <div className="checkout-card rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] p-8 space-y-4">
            <div className="text-white font-semibold text-lg">
              Order Summary
            </div>

            <div className="divide-y divide-white/10 text-sm text-gray-300">
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Paper Type:</span>
                <span className="text-white">
                  {getPaperTypeName(state.paperType)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Filter / Tip:</span>
                <span className="text-white">
                  {getFilterTypeName(state.filterType)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Cone Size:</span>
                <span className="text-white">
                  {getConeSizeName(state.coneSize)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Lot Size:</span>
                <span className="text-white">
                  {getLotSizeName(state.lotSize, state.customQuantity)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-white font-semibold text-base">
                Total Price:
              </span>
              <span className="text-white font-bold text-lg">{totalPrice}</span>
            </div>
          </div>
          <div className="flex justify-end pt-2 gap-15 mt-5">
            <Button
              variant="outline"
              onClick={prevStep}
              className="btn-liquid px-6 py-5 mr-1 text-xs font-semibold uppercase tracking-[0.15em] text-white border-white/30 bg-transparent hover:bg-white/10"
            >
              Back to Build Cone
            </Button>
            <Button
              onClick={handleAddToCart}
              className="btn-liquid active px-6 py-5 text-sm font-bold uppercase tracking-widest text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              Place Your Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
