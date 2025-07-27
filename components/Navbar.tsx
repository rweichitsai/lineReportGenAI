
import React from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { NiaEmblemIcon } from './icons/NiaEmblemIcon';

interface NavbarProps {
  onShowInstructions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowInstructions }) => (
  <nav className="bg-white shadow-md w-full sticky top-0 z-40 border-b-4 border-[#003366]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-4">
          <NiaEmblemIcon className="w-12 h-12" />
          <h1 className="text-xl font-bold text-[#003366]">
            移民署 Line 報告小幫手
          </h1>
        </div>
        <button
          onClick={onShowInstructions}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366]"
          aria-label="Show instructions"
        >
          <InfoIcon className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">使用說明</span>
        </button>
      </div>
    </div>
  </nav>
);
