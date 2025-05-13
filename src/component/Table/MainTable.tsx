import React from "react";

const MainTable: React.FC = ({ tableHead, tableRow }) => {
  const formatCellValue = (key: string, value: any) => {
    switch (key) {
      case "status":
        return value === 1 ? "فعال" : "غیرفعال";
      case "twoFactorEnabled":
        return value === true ? "فعال" : "غیرفعال";
      case "type":
        return value === 0 ? "سازمانی" : "شهروندی";
      default:
        return value;
    }
  };
  return (
    <table className="w-full">
      <thead>
        <tr>
          {tableHead.map((head, index) => (
            <th key={index}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRow.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {tableHead.map((head, colIndex) => (
              <td key={colIndex} className="text-center">{formatCellValue(head.key, row[head.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
