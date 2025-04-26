import React from 'react';
import { Search } from 'lucide-react';

function Header() {
  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between bg-white items-center">
      {/* Search bar */}
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none flex-grow"
        />
      </div>

      {/* Membership info */}
      <div>
        <h2 className="bg-primary p-1 rounded-full text-xs text-white font-medium flex items-center">
          🔥 Membership $1.99/Month
        </h2>
      </div>
    </div>
  );
}

export default Header;
