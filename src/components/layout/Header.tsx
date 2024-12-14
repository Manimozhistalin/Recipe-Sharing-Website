import React from 'react';
import { ChefHat, LogOut } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { User } from '../../types/auth';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowForm: () => void;
  user: User | null;
  onSignOut: () => void;
}

export function Header({ onSearch, onShowForm, user, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ChefHat className="text-orange-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Recipe Share</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={onShowForm}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-200"
                >
                  Share Recipe
                </button>
                <button
                  onClick={onSignOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}