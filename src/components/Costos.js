import React, { useState } from 'react';
import { COST_BREAKDOWN } from '../utils/constants';
import { generateQuotePDF } from '../utils/pdfGenerator';

const Costos = () => {
  const [selectedPlan, setSelectedPlan] = useState('complete');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const plans = {
    mvp: {
      name: "MVP",
      price: 81300,
      currency: "C$",
      description: "Producto mínimo viable para validar el sistema",
      features: [
        "Dashboard básico",
        "Gestión de proyectos core",
        "Control de inventario básico",
        "Reportes esenciales",
        "3 usuarios máximo",
        "Módulos: Proyectos, Inventario, Reportes"
      ]
    },
    complete: {
      name: "Completo (Recomendado)",
      price: 162450,
      currency: "C$",
      description: "Solución integral recomendada para Korean Cable",
      features: [
        "Todos los 7 módulos ERP",
        "Dashboard avanzado con KPIs",
        "Integración MS Project/BIM",
        "Sistema de reportes completo",
        "Usuarios ilimitados",
        "Automatizaciones incluidas"
      ],
      recommended: true
    },
    enterprise: {
      name: "Enterprise",
      price: 258300,
      currency: "C$",
      description: "Solución empresarial con IA y funcionalidades avanzadas",
      features: [
        "Todos los módulos + personalizaciones",
        "IA y análisis predictivo",
        "Integraciones múltiples (ERP externos)",
        "Reportes ejecutivos con ML",
        "API personalizada",
        "Consultoría estratégica incluida"
      ]
    }
  };


  const calculateTotal = () => {
    return Object.values(COST_BREAKDOWN[selectedPlan]).reduce((total, category) => total + category.total, 0);
  };


  const handleGeneratePDF = async (planType) => {
    setIsGeneratingPDF(true);
    try {
      const clientInfo = {
        company: 'Korean Cable',
        contact: 'Gerencia General',
        email: 'aperez@koreancable.net',
        phone: '+505 8824-1003',
        whatsapp: '+505 8824-1003',
        provider: 'Software Nicaragua'
      };
      
      const result = await generateQuotePDF(planType, clientInfo);
      
      // Show success message
      alert(`PDF generado exitosamente: ${result.fileName}`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intente nuevamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Inversión y <span className="text-korean-blue">Costos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Propuesta transparente con opciones flexibles de pago e implementación
          </p>
        </div>

        {/* Planes de Precio */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Opciones de Implementación
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div 
                key={key}
                className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all duration-300 ${
                  selectedPlan === key 
                    ? 'ring-4 ring-korean-blue transform scale-105' 
                    : 'hover:shadow-xl'
                } ${key === 'complete' ? 'border-4 border-korean-blue' : ''}`}
                onClick={() => setSelectedPlan(key)}
              >
                {key === 'complete' && (
                  <div className="bg-korean-blue text-white text-center py-2 px-4 rounded-lg mb-4 font-bold">
                    RECOMENDADO
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-korean-blue mb-4">
                  {plan.currency}{plan.price.toLocaleString()}
                  <span className="text-lg text-gray-500 font-normal"> {plan.currency === 'C$' ? 'NIO' : 'USD'}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.excluded && plan.excluded.length > 0 && (
                  <div className="space-y-2 border-t pt-4">
                    <p className="text-sm font-semibold text-gray-500">No incluye:</p>
                    {plan.excluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={() => handleGeneratePDF(key)}
                    disabled={isGeneratingPDF}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 ${
                      isGeneratingPDF 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-korean-blue hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isGeneratingPDF ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando PDF...
                      </span>
                    ) : (
                      '📄 Descargar Cotización PDF'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desglose Detallado */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Desglose de Costos */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Desglose Detallado - Plan {plans[selectedPlan].name}
            </h3>
            
            {Object.entries(COST_BREAKDOWN[selectedPlan]).map(([key, category]) => (
              <div key={key} className="mb-8">
                <h4 className="text-lg font-bold text-korean-blue mb-4">{category.title}</h4>
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="py-3 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-korean-blue font-medium">
                            {item.unit}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              Cantidad: {item.quantity} unidades
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900 text-lg">
                            C${item.cost.toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              C${(item.cost / item.quantity).toLocaleString()} c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-korean-blue">
                  <span className="font-bold text-lg">Subtotal:</span>
                  <span className="font-bold text-lg text-korean-blue">
                    C${category.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-korean-blue text-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">TOTAL INVERSIÓN:</span>
                <span className="text-2xl font-bold">
                  C${calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Metodología de Pago */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Metodología de Pago por Entregables
            </h3>
            <div className="bg-korean-blue/10 border-l-4 border-korean-blue p-6 mb-6">
              <h4 className="font-bold text-lg text-korean-blue mb-2">Sistema Post-Pago por Validaciones</h4>
              <p className="text-gray-700">Pagos únicamente después de entregables validados y aprobados por Korean Cable</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="border-2 border-korean-blue rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-korean-blue">Fase 1 - Inicio</h4>
                  <span className="bg-korean-blue text-white px-2 py-1 rounded-full text-xs font-bold">15%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-gray-600">• Brief de desarrollo completo</p>
                  <p className="text-gray-600">• Equipo asignado y comunicación</p>
                  <p className="text-gray-600">• Infraestructura configurada</p>
                  <p className="text-gray-600">• Base de datos backend</p>
                  <p className="text-gray-600">• Repositorio establecido</p>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="font-bold text-korean-blue text-sm">
                    C${Math.round(calculateTotal() * 0.15).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-2 border-korean-red rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-korean-red">Fase 2a - Desarrollo</h4>
                  <span className="bg-korean-red text-white px-2 py-1 rounded-full text-xs font-bold">35%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-gray-600">• Módulos core completados</p>
                  <p className="text-gray-600">• Integraciones básicas</p>
                  <p className="text-gray-600">• Testing inicial</p>
                  <p className="text-gray-600">• Demo funcional</p>
                  <p className="text-gray-600">• Validación 30 días</p>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="font-bold text-korean-red text-sm">
                    C${Math.round(calculateTotal() * 0.35).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-2 border-orange-500 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-orange-600">Fase 2b - Finalización</h4>
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">35%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-gray-600">• Módulos avanzados</p>
                  <p className="text-gray-600">• Integraciones completas</p>
                  <p className="text-gray-600">• Testing exhaustivo</p>
                  <p className="text-gray-600">• Capacitación equipo</p>
                  <p className="text-gray-600">• Validación 45 días</p>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="font-bold text-orange-600 text-sm">
                    C${Math.round(calculateTotal() * 0.35).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-green-600">Fase 3 - Entrega</h4>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">15%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-gray-600">• Sistema en producción</p>
                  <p className="text-gray-600">• Migración de datos</p>
                  <p className="text-gray-600">• Documentación técnica</p>
                  <p className="text-gray-600">• Manuales de usuario</p>
                  <p className="text-gray-600">• Transferencia conocimiento</p>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="font-bold text-green-600 text-sm">
                    C${Math.round(calculateTotal() * 0.15).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Costos Operativos Mensuales:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Supabase Pro:</strong> C$1,300-1,850 según uso</li>
                <li>• <strong>Soporte bajo demanda:</strong> C$500/hora o C$1,400/día</li>
                <li>• <strong>Estimado Mensual:</strong> C$1,300-1,850 + soporte variable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparación con Alternativas */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Comparación con Alternativas del Mercado
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-korean-blue text-white">
                  <th className="border border-gray-300 p-4 text-left">Característica</th>
                  <th className="border border-gray-300 p-4 text-center">Software Nicaragua</th>
                  <th className="border border-gray-300 p-4 text-center">SAP Business One</th>
                  <th className="border border-gray-300 p-4 text-center">Oracle NetSuite</th>
                  <th className="border border-gray-300 p-4 text-center">Odoo Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Costo Inicial</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">C$162,450</td>
                  <td className="border border-gray-300 p-4 text-center">C$580,000+</td>
                  <td className="border border-gray-300 p-4 text-center">C$720,000+</td>
                  <td className="border border-gray-300 p-4 text-center">C$420,000+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">Costo Mensual</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">C$150</td>
                  <td className="border border-gray-300 p-4 text-center">C$4,200+</td>
                  <td className="border border-gray-300 p-4 text-center">C$5,800+</td>
                  <td className="border border-gray-300 p-4 text-center">C$2,100+</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Tiempo de Implementación</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">3-4 meses</td>
                  <td className="border border-gray-300 p-4 text-center">12-18 meses</td>
                  <td className="border border-gray-300 p-4 text-center">8-14 meses</td>
                  <td className="border border-gray-300 p-4 text-center">6-12 meses</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">Personalización para Electrificación</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">100% Especializado</td>
                  <td className="border border-gray-300 p-4 text-center">Requiere desarrollo</td>
                  <td className="border border-gray-300 p-4 text-center">Módulos genéricos</td>
                  <td className="border border-gray-300 p-4 text-center">Configuración básica</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Soporte Local Nicaragua</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">✓ Presencial</td>
                  <td className="border border-gray-300 p-4 text-center">No disponible</td>
                  <td className="border border-gray-300 p-4 text-center">Solo remoto</td>
                  <td className="border border-gray-300 p-4 text-center">Partners locales</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">Integración MS Project/BIM</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600 font-bold">✓ Nativa</td>
                  <td className="border border-gray-300 p-4 text-center">Costo adicional</td>
                  <td className="border border-gray-300 p-4 text-center">Limitada</td>
                  <td className="border border-gray-300 p-4 text-center">Módulos extra</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            *Costo estimado en ineficiencias, errores y tiempo perdido
          </p>
        </div>

        {/* Beneficios Post-Entrega */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            🛡️ Beneficios Post-Entrega Incluidos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>45 días de soporte técnico</strong> sin costos adicionales</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>Scripts de automatización</strong> para validar trazabilidad del sistema</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>Guías de uso completas</strong> para cada módulo</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>Manuales técnicos</strong> y de usuario detallados</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>Guía de escalabilidad</strong> para crecimiento futuro</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">✓</span>
                <span className="text-gray-700"><strong>Transferencia completa</strong> de conocimiento técnico</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Garantías y Términos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🎁 Beneficios Post-Entrega Incluidos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">45 días de soporte técnico sin costos adicionales</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Scripts de automatización para validar trazabilidad del sistema</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Guías de uso completas para cada módulo</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Manuales técnicos y de usuario detallados</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Guía de escalabilidad para crecimiento futuro</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Transferencia completa de conocimiento técnico</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-korean-blue mb-4">
              🚀 Proceso de Implementación
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Tiempo total: 4-6 semanas desarrollo + 7-10 días pruebas internas</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Entrega por fases funcionales con validación continua</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Pruebas exhaustivas con áreas pertinentes antes de go-live</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Acompañamiento especializado durante los primeros 45 días</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Documentación técnica y manuales de usuario completos</span>
              </li>
              <li className="flex items-start">
                <span className="text-korean-blue mr-2">•</span>
                <span className="text-gray-700">Scripts de automatización y validación incluidos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Costos;