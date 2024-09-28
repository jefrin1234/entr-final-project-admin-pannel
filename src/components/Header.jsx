import { User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-wider">Trends</h1>
        </div>

      
        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold tracking-wide">Admin Dashboard</h2>
        </div>

       
        <div className="flex items-center space-x-4">
          <Link to={'account'} className="flex items-center space-x-2">
            <User className="h-6 w-6 text-gray-300" />
            <span className="hidden sm:inline-block text-sm">Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
