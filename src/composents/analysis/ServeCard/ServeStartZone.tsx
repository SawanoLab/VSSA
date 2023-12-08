import React from "react";

import { useCard } from "../../../hooks/card/use-cardController";
import PlayCardLayout from "../PlayCardLayout";


interface ServeStartZoneProps {
  nextStep: string;
}

const ServeStartZone: React.FC<ServeStartZoneProps> = ({
  nextStep
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  const serve_zone = ["1", "9", "6", "7", "5"];
  return (
    <PlayCardLayout
    title="サーブ"
    subTitle="サーブスタートゾーン"
    type={currentTeam}
    >
      <div className="relative w-max h-50">
        {currentTeam === "home" ? (
          <img
            src="/volleyball-court3.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        ) : (
          <img
            src="/volleyball-court4.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        )}
        <div
          className="absolute left-0 w-full
        flex flex-row justify-center items-center"
          style={{ top: currentTeam === "home" ? 30 : 230 }}
        >
          {Array.from(Array(5).keys()).map((i) => (
            <button
              className="border-x border-dashed border-white p-4"
              key={`button-${i}`}
              onClick={onClick}
            >
              {currentTeam === "home" ? serve_zone[i] : serve_zone[4 - i]}
            </button>
          ))}
        </div>
      </div>
    </PlayCardLayout>
  );
};

export default ServeStartZone;
