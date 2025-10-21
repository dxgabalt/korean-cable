import React from 'react';
import koreanLogo from '../assets/korean-cable-logo.jpg';

const Portada = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Logos */}
          <div className="flex justify-center items-center space-x-12 mb-12">
            <div className="text-center">
              <img 
                src={koreanLogo} 
                alt="Korean Cable" 
                className="h-24 w-auto mx-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm font-medium text-gray-600">Korean Cable</p>
            </div>
            <div className="text-6xl text-korean-blue font-bold">+</div>
            <div className="text-center">
              <div className="h-24 w-24 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center p-2">
                <img 
                  src="https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png" 
                  alt="Software Nicaragua" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-600">Software Nicaragua</p>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Propuesta de Plataforma
            <span className="text-korean-blue block">ERP para Korean Cable</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Solución integral para electrificación, obras civiles y administración centralizada
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contenido"
              className="bg-korean-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg text-center"
            >
              Ver Propuesta Completa
            </a>
            <a 
              href="/demo"
              className="border-2 border-korean-red text-korean-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-korean-red hover:text-white transition-colors duration-200 text-center animate-pulse shadow-lg shadow-korean-red/30"
            >
              🎯 Demo Interactiva
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-korean-blue">
            <div className="text-korean-blue mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión Integral</h3>
            <p className="text-gray-600">
              Control completo de proyectos, recursos humanos, materiales y equipos en una sola plataforma.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-korean-red">
            <div className="text-korean-red mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis en Tiempo Real</h3>
            <p className="text-gray-600">
              KPIs, dashboards y reportes automáticos para toma de decisiones informadas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-gray-500">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Control de Costos</h3>
            <p className="text-gray-600">
              Seguimiento preciso de presupuestos, flujo de caja y costos reales vs estimados.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-korean-blue rounded-2xl p-12 mt-20 text-white text-center">
          <h2 className="text-3xl font-bold mb-8">Resultados Esperados</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <p className="text-blue-100">Reducción en sobrecostos</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">60%</div>
              <p className="text-blue-100">Mejora en eficiencia</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Transparencia en procesos</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Acceso desde cualquier dispositivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portada;
