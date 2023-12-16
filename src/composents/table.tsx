/* eslint-disable */
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import React from 'react';

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
  fontSize?: string;
  tableHeight?: string;
  hover?: boolean;
  deleteButton?: (id: string) => void;
  editButton?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onRowClick,
  fontSize,
  tableHeight = '700px',
  hover = false,
  deleteButton,
  editButton,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null);

  const handleRowClick = (item: any) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const handleRowHover = (index: number) => {
    if (hover) {
      setHoveredRowIndex(index);
    }
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(null);
  };


  return (
  <div style={{ height: tableHeight, overflowY: 'auto', overflowX: 'hidden' }}>
      <table className="min-w-full">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left ${fontSize ? fontSize : 'text-xs'} font-medium text-gray-500 tracking-wider ${
                  column.className || ''
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
              className="hover:bg-gray-100 relative"
              onClick={() => handleRowClick(item)}
              onMouseOver={() => handleRowHover(index)}
              onMouseLeave={handleRowLeave}
            >
              {columns?.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 text-sm leading-5 text-gray-500 border-b ${
                    column.className || ''
                  }`}
                >
                  {column.cellRenderer ? column.cellRenderer(item) : item[column.accessor]}
                </td>
              ))}
              {hoveredRowIndex === index && (
                <div className="absolute right-0 top-2 mt-2 mr-2 text-gray-500 animate-slide-in-blurred-right">
                  <button className="mr-2">
                    <AiFillEdit
                      onClick={() => {
                        editButton &&
                        editButton(item.uuid);
                      }}
                    />
                  </button>
                  <button>
                    <AiFillDelete
                      onClick={() => {
                        deleteButton &&
                        deleteButton(item.uuid);
                      }}
                    />
                  </button>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
