import React from "react";

const SearchBox: React.FC = ({ search, setSearch }) => {
  return (
    <div className="flex">
      <input
        type="text"
        className="p-2 bg-gray-200 rounded-r-full rounded-l-none focus:outline-none border border-gray-300 w-100 h-10"
        placeholder="جست و جو..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-l-full rounded-r-none border border-blue-500 h-10 cursor-pointer"
      >
        جست و جو
      </button>
    </div>
  );
};

export default SearchBox;
