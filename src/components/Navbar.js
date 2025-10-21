import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import koreanLogo from '../assets/korean-cable-logo.jpg';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Portada' },
    { path: '/contenido', label: 'Contenido' },
    { path: '/beneficios', label: 'Beneficios' },
    { path: '/costos', label: 'Costos' },
    { path: '/demo', label: 'Demo Interactiva' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-4 border-korean-blue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src={koreanLogo} 
              alt="Korean Cable" 
              className="h-12 w-auto rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-korean-blue">Korean Cable</h1>
              <p className="text-sm text-gray-600">Propuesta ERP - Software Nicaragua</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-korean-blue text-white'
                    : 'text-gray-700 hover:text-korean-blue hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 hover:text-korean-blue"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
