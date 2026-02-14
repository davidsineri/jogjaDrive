
import React from 'react';

interface NavbarProps {
  onShowHistory: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onShowHistory }) => {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              JogjaDrive
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Armada</a>
            <button 
              onClick={onShowHistory}
              className="hover:text-indigo-600 transition-colors"
            >
              Pesanan Saya
            </button>
            <a href="#" className="hover:text-indigo-600 transition-colors">Kontak</a>
          </div>
          <button 
            onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md"
          >
            Sewa Sekarang
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
