import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, Palette, Image as ImageIcon } from "lucide-react";
import { FILTER_TYPES, type CustomizationState } from "./types";
import Header from "./Header";
import FilterViewer from "./FilterViewer";
import StepIndicator from "./StepIndicator";

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
      {/* <Header step={step} /> */}
      <div className="mt-11 mb-10 flex justify-center items-center">
        <div className="flex flex-col items-start bg-blue-900/40 border-2 border-blue-400 rounded-4xl px-6 py-3 max-w-md w-[90%] shadow-2xl">
          <div className="flex items-center space-x-2 mb-1">
            <Palette className="text-white w-4.5 h-4.5" />
            <h3 className="text-white font-semibold text-lg">
              Select your Filter type.
            </h3>
          </div>
          <p className="text-gray-300 text-[12px] w-full truncate whitespace-nowrap overflow-hidden">
            Choose ideal paper option for your perfect cone from the gallery below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 items-start">
        {/* Visual Preview - 3D Filter Paper */}
        <div className="space-y-4">
          <div className="relative">
            <StepIndicator currentStep={2} />
            <FilterViewer
              filterType={state.filterType}
              filterColorHex={state.filterColorHex}
              filterTextureUrl={state.filterTextureUrl}
              coneSize={state.coneSize}
            />
            {/* Color + upload controls */}
            <div className="absolute top-0 right-3 flex items-center gap-2 z-10">
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
                className={`w-9 h-9 rounded-full bg-black/60 border flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/40 transition relative ${
                  state.filterTextureUrl 
                    ? "border-green-400 bg-green-500/40" 
                    : "border-white/20"
                }`}
                title={state.filterTextureUrl ? "Image uploaded - Click to change" : "Upload image"}
              >
                <ImageIcon className="w-4 h-4 text-white" />
                {state.filterTextureUrl && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                )}
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
              key={state.filterTextureUrl ? "has-texture" : "no-texture"}
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-2 h-91 gap-5 w-xl lg:ml-auto">
          <div className="col-span-2  mb-0.5">
            <h4 className="text-sm text-gray-300 font-medium tracking-wide">
              Available Options
            </h4>
            <div className="h-px w-36 bg-gradient-to-r from-gray-400/40 to-transparent" />
          </div>
          {FILTER_TYPES.map((filter) => {
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
          <div className="flex justify-between items-center mt-3">
            <Button
              variant="outline"
              onClick={prevStep}
              className="btn-glass-panel ml-3 cursor-pointer w-30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!state.paperType}
              className="btn-glass-panel ml-75 cursor-pointer w-30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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