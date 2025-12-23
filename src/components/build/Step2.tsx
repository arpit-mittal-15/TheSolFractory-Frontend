import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { FILTER_TYPES, type CustomizationState } from "./types";
import Header from "./Header";
import ConeViewer from "./ConeViewer";

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
  return (
    <div className="space-y-8">

      {/* Step indicator */}
      <Header step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 items-start">
        {/* Visual Preview - 3D Cone */}
        <div className="space-y-4">
          <ConeViewer state={state} focusStep="filter" />
          <p className="text-xs md:text-sm text-gray-400 text-center max-w-md mx-auto">
            Filters update the tip of your cone. Rotate the model and select different
            filters to see how they change the look.
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


