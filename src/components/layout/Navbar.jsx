import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Settings, Zap } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Inicio', path: '/', icon: <Home size={18} /> },
    { name: 'Cotizador', path: '/cotizador', icon: <FileText size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex
          ">
            <div className="flex-shrink-0 flex items-center">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Korean Cable</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => window.location.href = '/cotizador'}
            >
              Nueva Cotización
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
