import React from "react";

const SearchBox: React.FC = ({ search, setSearch, onSearch }) => {
  return (
    <div className="flex p-1.5  border rounded-md  border-gray-200">
      <input
        type="text"
        className="p-2   focus:outline-none    w-100 h-10"
        placeholder="جست و جو..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-[#d4e0ec] !text-blue-800 rounded-md p-2 h-10 cursor-pointer"
        onClick={onSearch}
      >
        جست و جو
      </button>
    </div>
  );
};

export default SearchBox;
