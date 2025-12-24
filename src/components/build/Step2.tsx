import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, Palette, Image as ImageIcon } from "lucide-react";
import { FILTER_TYPES, type CustomizationState } from "./types";
import Header from "./Header";
import FilterViewer from "./FilterViewer";

interface Step2Props {
  step: number;
  state: CustomizationState;
  updateState: (updates: Partial<CustomizationState>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const Step2: React.FC<Step2Props> = ({
  step,
  state,
  updateState,
  prevStep,
  nextStep,
}) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ filterColorHex: event.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateState({ filterTextureUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">

      {/* Step indicator */}
      <Header step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 items-start">
        {/* Visual Preview - 3D Filter Paper */}
        <div className="space-y-4">
          <div className="relative">
            <FilterViewer
              filterType={state.filterType}
              filterColorHex={state.filterColorHex}
              filterTextureUrl={state.filterTextureUrl}
              coneSize={state.coneSize}
            />
            {/* Color + upload controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={() => colorInputRef.current?.click()}
                className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/40 transition"
              >
                <Palette className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/40 transition"
              >
                <ImageIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <input
              ref={colorInputRef}
              type="color"
              className="hidden"
              value={state.filterColorHex || "#ffffff"}
              onChange={handleColorChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-xs md:text-sm text-gray-400 text-center max-w-md mx-auto">
            Watch your filter paper animate as you switch between Folded, Spiral,
            Ceramic, and Glass styles. Rotate to inspect every detail.
          </p>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-2 h-91 gap-5 w-xl lg:ml-auto">
          {FILTER_TYPES.map((filter) => {
            const Icon = filter.icon;
            const isSelected = state.filterType === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => updateState({ filterType: filter.id })}
                className={`relative rounded-lg p-5 border transition-all text-left bg-black/40 backdrop-blur-xl glass-panel ${
                  isSelected
                    ? "active border-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                    <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <Icon className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h3 className="text-white font-semibold text-sm md:text-base">
                      {filter.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-snug">
                      {filter.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              className="btn-liquid px-6 ml-3 py-5 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white border-gray-700"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              BACK
            </Button>
            <Button
              onClick={nextStep}
              disabled={!state.filterType}
              className="btn-liquid active ml-87 px-6 py-5 text-sm font-bold uppercase tracking-widest text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;


