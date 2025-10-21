import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Portada' },
    { path: '/contenido', label: 'Contenido / Alcances' },
    { path: '/beneficios', label: 'Beneficios' },
    { path: '/costos', label: 'Costos e Inversión' },
    { path: '/demo', label: 'Demo Interactiva' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-korean-blue">Menú</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-korean-blue text-white'
                    : 'text-gray-700 hover:text-korean-blue hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <div className="text-center">
              <h3 className="text-lg font-bold text-korean-blue mb-2">Korean Cable</h3>
              <p className="text-sm text-gray-600">Propuesta ERP</p>
              <p className="text-sm text-gray-600">Software Nicaragua</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;