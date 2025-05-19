import React, { useState } from "react";
import moment from "moment-jalaali";

const MainTable: React.FC = ({
  tableHead,
  tableRow,
  pageSize,
  pageIndex,
  actions,
  expandFields,
}) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRowIndex((prev) => (prev === index ? null : index));
  };

  const formatCellValue = (
    key: string,
    value: any,
    rowIndex: number,
    row: any
  ) => {
    switch (key) {
      case "index":
        return (pageIndex - 1) * pageSize + rowIndex + 1;

      case "fullName":
        return `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim();

      case "status":
      case "twoFactorEnabled":
        const isActive = key === "status" ? value === 1 : value;
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "فعال" : "غیرفعال"}
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

      case "gender":
        if (value === 0) return "مرد";
        if (value === 1) return "زن";
        return "نامشخص";

      case "birthDate":
        if (!value) return "—";
        return moment(value).format("jYYYY/jMM/jDD");

      case "actions":
        return actions?.(row);

      default:
        return value ?? "—";
    }
  };

  return (
    <table className="min-w-full text-sm text-right">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th className="p-3 text-center w-10"></th>
          {tableHead.map((head, index) => (
            <th key={index} className="p-3">
              {head.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRow.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr className="even:bg-gray-100 hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRow(rowIndex);
                  }}
                  className="focus:outline-none"
                >
                  <i
                    className={`fal ${
                      expandedRowIndex === rowIndex
                        ? "fa-chevron-down"
                        : "fa-chevron-left"
                    } text-md cursor-pointer`}
                  ></i>
                </button>
              </td>
              {tableHead.map((head, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {formatCellValue(head.key, row[head.key], rowIndex, row)}
                </td>
              ))}
            </tr>

            {expandedRowIndex === rowIndex && expandFields && (
              <tr className="bg-gray-50 border-t">
                <td
                  colSpan={tableHead.length + 1}
                  className="px-4 py-3 text-gray-600"
                >
                  <div className="text-sm space-y-2">
                    {expandFields.map((field, i) => (
                      <div key={i}>
                        <p>
                          {field.label}:{" "}
                          {formatCellValue(
                            field.key,
                            row[field.key],
                            rowIndex,
                            row
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
