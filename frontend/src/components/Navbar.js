import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-400 w-full h-[70px] flex justify-between items-center px-4">
      <div>
        <h1 className="text-lg font-bold text-gray-700">JWT</h1>
      </div>
      <div>
        <button className="px-3 py-2 font-semibold text-gray-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
