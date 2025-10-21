import React from 'react';
import { ERP_MODULES, DEPLOYMENT_OPTIONS } from '../utils/constants';

const Contenido = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sistema ERP <span className="text-korean-blue">Korean Cable</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solución integral para electrificación, obras civiles y administración centralizada
          </p>
        </div>

        {/* Módulos del Sistema */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Módulos del Sistema
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(ERP_MODULES).map((module, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{module.name}</h3>
                <ul className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-korean-blue mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Opciones de Despliegue */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Opciones de Implementación
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Intranet */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-korean-blue text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{DEPLOYMENT_OPTIONS.INTRANET.title}</h3>
                <p className="text-blue-100">{DEPLOYMENT_OPTIONS.INTRANET.description}</p>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Beneficios:</h4>
                <ul className="space-y-2 mb-6">
                  {DEPLOYMENT_OPTIONS.INTRANET.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-bold text-gray-900 mb-4">Especificaciones Técnicas:</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Servidor:</strong> {DEPLOYMENT_OPTIONS.INTRANET.technical.server}</p>
                  <p><strong>Base de Datos:</strong> {DEPLOYMENT_OPTIONS.INTRANET.technical.database}</p>
                  <p><strong>Seguridad:</strong> {DEPLOYMENT_OPTIONS.INTRANET.technical.security}</p>
                  <p><strong>Backup:</strong> {DEPLOYMENT_OPTIONS.INTRANET.technical.backup}</p>
                  <p><strong>Capacidad:</strong> {DEPLOYMENT_OPTIONS.INTRANET.technical.users}</p>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-korean-blue">
                    <strong>URL de Acceso:</strong> {DEPLOYMENT_OPTIONS.INTRANET.url}
                  </p>
                </div>
              </div>
            </div>

            {/* PWA Desktop */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-korean-red text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{DEPLOYMENT_OPTIONS.DESKTOP.title}</h3>
                <p className="text-red-100">{DEPLOYMENT_OPTIONS.DESKTOP.description}</p>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Beneficios:</h4>
                <ul className="space-y-2 mb-6">
                  {DEPLOYMENT_OPTIONS.DESKTOP.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-bold text-gray-900 mb-4">Especificaciones Técnicas:</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Tecnología:</strong> {DEPLOYMENT_OPTIONS.DESKTOP.technical.technology}</p>
                  <p><strong>Almacenamiento:</strong> {DEPLOYMENT_OPTIONS.DESKTOP.technical.storage}</p>
                  <p><strong>Modo Offline:</strong> {DEPLOYMENT_OPTIONS.DESKTOP.technical.offline}</p>
                  <p><strong>Sincronización:</strong> {DEPLOYMENT_OPTIONS.DESKTOP.technical.sync}</p>
                  <p><strong>Actualizaciones:</strong> {DEPLOYMENT_OPTIONS.DESKTOP.technical.updates}</p>
                </div>
                
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-korean-red">
                    <strong>Instalación:</strong> Un clic desde el navegador, funciona como app nativa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparación */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Comparación de Opciones
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4">Característica</th>
                  <th className="text-center py-4 px-4 text-korean-blue">Intranet Web</th>
                  <th className="text-center py-4 px-4 text-korean-red">PWA Desktop</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Acceso sin Internet</td>
                  <td className="py-3 px-4 text-center">❌</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Instalación Requerida</td>
                  <td className="py-3 px-4 text-center">❌</td>
                  <td className="py-3 px-4 text-center">✅ (Automática)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Actualizaciones</td>
                  <td className="py-3 px-4 text-center">Automáticas</td>
                  <td className="py-3 px-4 text-center">Automáticas</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Rendimiento</td>
                  <td className="py-3 px-4 text-center">Excelente</td>
                  <td className="py-3 px-4 text-center">Superior</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Seguridad de Datos</td>
                  <td className="py-3 px-4 text-center">Máxima</td>
                  <td className="py-3 px-4 text-center">Alta</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Costo de Mantenimiento</td>
                  <td className="py-3 px-4 text-center">Medio</td>
                  <td className="py-3 px-4 text-center">Bajo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recomendación */}
        <div className="mt-12 bg-gradient-to-r from-korean-blue to-korean-red text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Recomendación de Software Nicaragua</h3>
          <p className="text-lg mb-6">
            Para Korean Cable recomendamos implementar <strong>ambas opciones</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold mb-2">🏢 Oficina Principal - Intranet</h4>
              <p className="text-sm">
                Para administración, contabilidad y gestión centralizada con máxima seguridad.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold mb-2">🚛 Campo/Proyectos - PWA</h4>
              <p className="text-sm">
                Para técnicos en campo que necesitan acceso offline y sincronización automática.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contenido;