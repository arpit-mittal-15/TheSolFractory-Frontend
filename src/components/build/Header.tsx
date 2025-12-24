import React from "react";

interface HeaderProps {
  step: number;
  mb?: number;
  mt?: number;
}

const Header: React.FC<HeaderProps> = ({ step, mb, mt }) => {
  return (
    <div className={`flex items-center justify-center mb-${mb} mt-${mt}`}>
      <div className="flex items-center gap-6 max-w-5xl w-full px-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-9 h-9 border-white/80 rounded-full flex items-center justify-center border-2 transition-all bg-blue-700`}
          >
            <span
              className={`text-sm font-bold text-white`}
            >
              1
            </span>
          </div>
        </div>

        {/* Connector Line */}
        <div
          className={`h-[2px] mb-1 flex-1 min-w-[160px] transition-all ${
            step >= 2 ? "bg-blue-700" : "bg-white/80"
          }`}
        ></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-9 h-9 border-white/80 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 2
                ? "bg-blue-700"
                : "border-white/80 bg-white/95"
            }`}
          >
            <span
              className={`text-sm font-bold ${
                step >= 2 ? "text-white" : "text-black/80"
              }`}
            >
              2
            </span>
          </div>
        </div>

        {/* Connector Line */}
        <div
          className={`h-[2px] mb-1 flex-1 min-w-[160px] transition-all ${
            step >= 3 ? "bg-blue-700" : "bg-white/80"
          }`}
        ></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 3
                ? "bg-blue-700"
                : "border-white/80 bg-white/95"
            }`}
          >
            <span
              className={`text-sm font-bold ${
                step >= 3 ? "text-white" : "text-black/80"
              }`}
            >
              3
            </span>
          </div>
        </div>

        {/* Connector Line */}
        <div
          className={`h-[2px] mb-1 flex-1 min-w-[160px] transition-all ${
            step >= 4 ? "bg-blue-700" : "bg-white/80"
          }`}
        ></div>

        {/* Step 4 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 4
                ? "bg-blue-700"
                : "border-white/80 bg-white/95"
            }`}
          >
            <span
              className={`text-sm font-bold ${
                step >= 4 ? "text-white" : "text-black/80"
              }`}
            >
              4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;


