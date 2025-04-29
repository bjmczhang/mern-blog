import React from "react";

const SearchBlog = (search, handleSearchChange, handleSearch) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full flex">
      <input
        className="py-2 px-4 mr-5 w-full bg-[#f7f8f9] focus:outline-none focus:border focus:border-slate-400 border border-transparent "
        type="text"
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="ID Checks Blog Here"
      />
      <button className="bg-[#1e73be] px-4 py-2 text-white">Search</button>
    </div>
  );
};

export default SearchBlog;
