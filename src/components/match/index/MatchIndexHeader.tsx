import React from "react";
import { Link } from "react-router-dom";

export const MatchIndexHeader: React.FC = () => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-3sm">試合</h1>
      <Link
        className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded"
        to="/match/create"
      >
        新しい試合
      </Link>
    </div>
  );
};
