import React from "react";

const Pagination: React.FC = ({ pageIndex, totalPages, pageChangeHandler }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevious = () => {
    if (pageIndex > 1) {
      pageChangeHandler(pageIndex - 1);
    }
  };

  const handleNext = () => {
    if (pageIndex < totalPages) {
      pageChangeHandler(pageIndex + 1);
    }
  };

  return (
    <div style={{textAlign: "center" }}>
      <button
        onClick={handlePrevious}
        disabled={pageIndex === 1}
        style={{
          margin: "0 5px",
          padding: "6px 12px",
          backgroundColor: pageIndex === 1 ? "#ddd" : "#007bff",
          color: pageIndex === 1 ? "#888" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: pageIndex === 1 ? "not-allowed" : "pointer",
        }}
      >
        قبلی
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => pageChangeHandler(page)}
          style={{
            margin: "0 5px",
            padding: "6px 12px",
            backgroundColor: page === pageIndex ? "#007bff" : "#f0f0f0",
            color: page === pageIndex ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={pageIndex === totalPages}
        style={{
          margin: "0 5px",
          padding: "6px 12px",
          backgroundColor: pageIndex === totalPages ? "#ddd" : "#007bff",
          color: pageIndex === totalPages ? "#888" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: pageIndex === totalPages ? "not-allowed" : "pointer",
        }}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
