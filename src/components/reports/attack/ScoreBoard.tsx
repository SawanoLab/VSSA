import React from "react";

interface scoreBoardProps {
  score: number;
  setScore: number;
}
export const ScoreBoard: React.FC<scoreBoardProps> = ({ score, setScore }) => (
  <p>
    {setScore} | {score}
  </p>
);
