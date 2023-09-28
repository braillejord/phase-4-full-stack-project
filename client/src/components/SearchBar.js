import React from "react";

function SearchBar() {
  return (
    <form>
      <input id="search-bar" type="search" placeholder="Search" />
      <button className="search-btn" type="submit">
        <i className="ti ti-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
