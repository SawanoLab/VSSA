/* eslint-disable */

import React from "react";

interface Column {
  header: string;
  accessor: string;
  cellRenderer?: (item: any) => React.ReactNode;
  className?: string;
}

interface TableProps {
  data?: any[];
  columns?: Column[];
  onRowClick?: (item: any) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onRowClick }) => {
  const handleRowClick = (item: any) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns?.map((column, index) => (
            <th
              key={index}
              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider ${
                column.className || ""
              }`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100"
            onClick={() => handleRowClick(item)}
          >
            {columns?.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`px-6 py-4 text-sm leading-5 text-gray-500 border-b ${
                  column.className || ""
                }`}
              >
                {column.cellRenderer
                  ? column.cellRenderer(item)
                  : item[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
