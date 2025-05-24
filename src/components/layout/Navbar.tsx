import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <nav
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-teal-700 font-bold text-xl">CityPulse</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-teal-700 bg-teal-50' 
                  : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/report') 
                  ? 'text-teal-700 bg-teal-50' 
                  : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              Report Issue
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-teal-700 bg-teal-50' 
                  : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              Issues Dashboard
            </Link>
            <Link 
              to="/stats" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/stats') 
                  ? 'text-teal-700 bg-teal-50' 
                  : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              Stats
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-700 hover:bg-teal-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-teal-700 bg-teal-50' 
                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/report"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/report') 
                ? 'text-teal-700 bg-teal-50' 
                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
            }`}
          >
            Report Issue
          </Link>
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard') 
                ? 'text-teal-700 bg-teal-50' 
                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
            }`}
          >
            Issues Dashboard
          </Link>
          <Link
            to="/stats"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/stats') 
                ? 'text-teal-700 bg-teal-50' 
                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
            }`}
          >
            Stats
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;