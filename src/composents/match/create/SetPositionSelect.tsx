import React, { useEffect, useState } from "react";

import { useMatch } from "../../../hooks/match/useMatch";
import { SetterPositionName } from "../../../types/player";
import { typeOfTeam } from "../../../types/team";

interface SetPositionSelectProps {
  type: typeOfTeam;
  courtZoneName: SetterPositionName[][];
}

const SetPositionSelect: React.FC<SetPositionSelectProps> = ({
  type,
  courtZoneName,
}) => {
  const { setSetterPosition } = useMatch();
  const [selectedBox, setSelectedBox] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (type === typeOfTeam.home) {
      setSelectedBox([1, 1]);
    } else {
      setSelectedBox([1, 0]);
    }
    console.log("selectedBox ", selectedBox);
  }, []);

  const handleBoxClick = (rowIndex: number, colIndex: number) => {
    const isSelectedBox =
      selectedBox?.[0] === rowIndex && selectedBox?.[1] === colIndex;
    setSelectedBox(isSelectedBox ? null : [rowIndex, colIndex]);
    setSetterPosition(
      type,
      isSelectedBox
        ? SetterPositionName.NULL
        : courtZoneName[rowIndex][colIndex]
    );
  };

  return (
    <div>
      <h1 className="text-sm text-gray-500 p-1 w-80">セッターゾーン</h1>
      <table className="w-52">
        <tbody>
          {courtZoneName.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex} className="p-1">
                  <div
                    className={`w-40 h-10 border flex items-center justify-center cursor-pointer 
                      ${
                        selectedBox?.[0] === rowIndex &&
                        selectedBox?.[1] === colIndex
                          ? "bg-blue-300"
                          : "bg-white"
                      }`}
                    onClick={() => handleBoxClick(rowIndex, colIndex)}
                  >
                    {col}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetPositionSelect;
