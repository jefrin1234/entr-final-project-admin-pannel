import { User } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Section: Logo or Brand */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-wider">Trends</h1>
        </div>

        {/* Center Section: Admin Dashboard */}
        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold tracking-wide">Admin Dashboard</h2>
        </div>

        {/* Right Section: User Icon */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-gray-300" />
            <span className="hidden sm:inline-block text-sm">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
