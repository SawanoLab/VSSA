import React from "react";

interface LayoutProps {
  videoComponent: React.ReactNode;
  analysisInputForm: React.ReactNode;
  matchUtilityComponent: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  videoComponent,
  analysisInputForm,
  matchUtilityComponent,
}) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <div className="border col-span-2">{videoComponent}</div>
      <div className="border row-span-2 col-span-1">{matchUtilityComponent}</div>
      <div className="border col-span-2">{analysisInputForm}</div>
    </div>
  );
};
