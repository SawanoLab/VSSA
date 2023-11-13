import React, { useState } from "react";


interface SetPositionSelectProps {}

const SetPositionSelect: React.FC<SetPositionSelectProps> = () => {
  const [LibroPosition, setLibroPosition] = useState([[0, 0],[0, 0],[0, 0]]);
  const [selectedBox, setSelectedBox] = useState<[number, number] | null>(null);
  const courtZoneName = [["Z5", "Z4"],["Z6", "Z3"],["Z1", "Z2"]]

  const handleBoxClick = (rowIndex: number, colIndex: number) => {
    if (selectedBox && selectedBox[0] === rowIndex && selectedBox[1] === colIndex) {
      setSelectedBox(null);
      setLibroPosition((prev) => {
        const next = [...prev];
        next[rowIndex][colIndex] = 0;
        return next;
      }
      );
    } else {
      setSelectedBox([rowIndex, colIndex]);
      setLibroPosition([[0, 0],[0, 0],[0, 0]]);
      setLibroPosition((prev) => {
        const next = [...prev];
        next[rowIndex][colIndex] = 1;
        return next;
      });
    }
  };

  return (
    <div>
      <h1 className="text-sm text-gray-500 p-1 w-80">セッターゾーン</h1>
      <table className="w-52">
        <tbody>
          {LibroPosition.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex} className="p-1">
                  <div
                    className={`w-20 h-10 border flex items-center justify-center cursor-pointer ${
                      col === 1 ? "bg-blue-200 text-white" : "bg-blue-100"
                    } ${selectedBox && selectedBox[0] === rowIndex && selectedBox[1] === colIndex ? "bg-blue-300" : ""}`}
                    onClick={() => handleBoxClick(rowIndex, colIndex)}
                  >
                    {courtZoneName[rowIndex][colIndex]}
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
