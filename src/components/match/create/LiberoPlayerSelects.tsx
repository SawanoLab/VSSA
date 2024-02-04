import React from "react";

import LiberoPlayerSelect from "./LiberoPlayerSelection";
import { typeOfTeam } from "../../../types/team";

interface LiberoPlayerSelectsProps {}
export const LiberoPlayerSelects: React.FC<LiberoPlayerSelectsProps> = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2">
        <p className="text-sm text-gray-500 p-1 w-50">リベロを選択</p>
        <div className="my-1">
          <LiberoPlayerSelect type={typeOfTeam.home} />
          <LiberoPlayerSelect type={typeOfTeam.home} />
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <p className="text-sm text-gray-500 p-1 w-100">リベロを選択</p>
        <div className="my-1">
          <LiberoPlayerSelect type={typeOfTeam.away} />
          <LiberoPlayerSelect type={typeOfTeam.away} />
        </div>
      </div>
    </div>
  );
};
