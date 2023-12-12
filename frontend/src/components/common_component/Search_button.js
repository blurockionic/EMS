import React from "react";
import { IoSearch } from "react-icons/io5";
const Search_button = () => {
  return (
    <div>
      <div className="flex w-56 mx-auto py-1  px-1 rounded-lg bg-slate-900">
        <div>
          <input className="bg-gray-600  rounded-lg" type="text" />
        </div>
        <div className="flex mx-auto text-lg text-white ">
          <button>
            <IoSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search_button;
