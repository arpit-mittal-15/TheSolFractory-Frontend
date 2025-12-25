import React from "react";

interface HeaderProps {
  step: number;
}

const Header: React.FC<HeaderProps> = ({ step }) => {
  return (
    <div className="flex justify-center mt-6 mb-6">
      <div className="flex items-center max-w-4xl w-full px-4">
        <StepCircle active={step >= 1} stepNum={1} />
        <Connector active={step >= 2} />
        <StepCircle active={step >= 2} stepNum={2} />
        <Connector active={step >= 3} />
        <StepCircle active={step >= 3} stepNum={3} />
        <Connector active={step >= 4} />
        <StepCircle active={step >= 4} stepNum={4} />
      </div>
    </div>
  );
};

export default Header;

/* ---------- Sub Components ---------- */

const StepCircle = ({
  active,
  stepNum,
}: {
  active: boolean;
  stepNum: number;
}) => (
  <div className="shrink-0 mr-2 ml-2 flex items-start justify-center">
    <div
      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center
        ${
          active
            ? ""
            : "bg-white border-white/80 text-black/80"
        }`}
    >
      <span className="text-sm font-bold">{stepNum}</span>
    </div>
  </div>
);

const Connector = ({ active }: { active: boolean }) => (
  <div
    className={`h-[2px] flex-1 mx-[1px] ${
      active ? "bg-blue-700" : "bg-white/80"
    }`}
  />
);
