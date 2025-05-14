import React from "react";
import Pagination from "./Pagination";

const MainTable: React.FC = ({
  tableHead,
  tableRow,
  pageSize,
  pageSizeHandler,
  pageIndex,
  totalPages,
  pageChangeHandler,
}) => {
  const formatCellValue = (key, value, rowIndex) => {
    switch (key) {
      case "index":
        return (pageIndex - 1) * pageSize + rowIndex + 1;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              value === 1
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {value === 1 ? "فعال" : "غیرفعال"}
          </span>
        );
      case "twoFactorEnabled":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {value ? "فعال" : "غیرفعال"}
          </span>
        );
      case "type":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              value === 0
                ? "bg-blue-100 text-blue-700"
                : "bg-green-200 text-green-800"
            }`}
          >
            {value === 0 ? "سازمانی" : "شهروندی"}
          </span>
        );
      default:
        return value;
    }
  };
  return (
    <>
      <table className="min-w-full text-sm text-right">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {tableHead.map((head, index) => (
              <th key={index} className="p-3">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRow.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-gray-100 hover:bg-gray-50 transition"
            >
              {tableHead.map((head, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {formatCellValue(head.key, row[head.key], rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Pagination
          pageIndex={pageIndex}
          totalPages={totalPages}
          pageChangeHandler={pageChangeHandler}
        />
        <select
          value={pageSize}
          onChange={pageSizeHandler}
          className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
        </select>
      </div>
    </>
  );
};

export default MainTable;
