import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Palette, Image as ImageIcon } from "lucide-react";
import { PAPER_TYPES, type CustomizationState } from "./types";
import Header from "./Header";
import PaperViewer from "./PaperViewer";

interface Step1Props {
  step: number;
  state: CustomizationState;
  updateState: (updates: Partial<CustomizationState>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step1: React.FC<Step1Props> = ({
  step,
  state,
  updateState,
  nextStep,
  prevStep,
}) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ paperColorHex: event.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateState({ paperTextureUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">

      {/* Step indicator directly under heading */}
      <Header step={step} mt={10} mb={10} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: 3D Paper Viewer */}
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <PaperViewer
              paperType={state.paperType}
              paperColorHex={state.paperColorHex}
              paperTextureUrl={state.paperTextureUrl}
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
              value={state.paperColorHex || "#ffffff"}
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
        </div>

        {/* Right Panel: Selection Buttons */}
        <div className="grid h-100 grid-cols-2 mt-1 gap-4">
          {PAPER_TYPES.map((paper) => {
            const Icon = paper.icon;
            const isSelected = state.paperType === paper.id;
            return (
              <button
                key={paper.id}
                onClick={() => updateState({ paperType: paper.id })}
                className={`relative rounded-lg p-[16px] border transition-all text-left bg-black/40 backdrop-blur-xl glass-panel ${
                  isSelected
                    ? "active border-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check
                      className="h-5 w-5 text-white font-bold"
                      strokeWidth={3}
                    />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-4">
                  <Icon
                    className={`h-12 w-12 ${
                      isSelected ? "text-blue-400" : "text-white"
                    }`}
                    strokeWidth={1.5}
                  />
                  <div className="text-center">
                    <h3
                      className={`font-semibold text-base mb-2 ${
                        isSelected ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {paper.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {paper.description}
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

export default Step1;
