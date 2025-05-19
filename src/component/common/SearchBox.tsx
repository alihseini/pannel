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
        className="bg-blue-500  rounded-md  text-white p-2 border border-blue-500 h-10 cursor-pointer"
        onClick={onSearch}
      >
        جست و جو
      </button>
    </div>
  );
};

export default SearchBox;
