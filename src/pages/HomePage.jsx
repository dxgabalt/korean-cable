import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, Zap, CheckCircle, DollarSign, Settings, Users, BarChart2 } from 'lucide-react';

const features = [
  {
    name: 'Cotizaciones Rápidas',
    description: 'Genera cotizaciones profesionales en minutos con nuestra interfaz intuitiva.',
    icon: FileText,
  },
  {
    name: 'Seguimiento en Tiempo Real',
    description: 'Monitorea el progreso de tus proyectos con nuestra vista de cronograma interactiva.',
    icon: Clock,
  },
  {
    name: 'Facturación Automática',
    description: 'Genera facturas profesionales al instante basadas en tus cotizaciones.',
    icon: DollarSign,
  },
  {
    name: 'Gestión de Clientes',
    description: 'Mantén un registro organizado de todos tus clientes y sus proyectos.',
    icon: Users,
  },
  {
    name: 'Reportes Detallados',
    description: 'Obtén informes detallados sobre el rendimiento de tus proyectos y finanzas.',
    icon: BarChart2,
  },
  {
    name: 'Personalización',
    description: 'Ajusta la plataforma según las necesidades específicas de tu negocio.',
    icon: Settings,
  },
];

export const HomePage = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Sistema de Cotizaciones</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Potencia tu negocio con nuestra solución todo en uno
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            La plataforma definitiva para gestionar cotizaciones, proyectos y facturación de manera eficiente.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex justify-center">
            <Link
              to="/cotizador"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Zap className="-ml-1 mr-2 h-5 w-5" />
              Crear Nueva Cotización
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Todo lo que necesitas en un solo lugar
            </h2>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 bg-blue-50 rounded-lg p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-blue-500" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">¿Listo para comenzar?</h3>
          <p className="mt-2 text-gray-600">
            Crea tu primera cotización en minutos. Sin contratos, sin tarjetas de crédito.
          </p>
          <div className="mt-6">
            <Link
              to="/cotizador"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Zap className="-ml-1 mr-2 h-5 w-5" />
              Empezar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
