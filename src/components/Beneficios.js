import React from 'react';
import { PROJECT_TYPES } from '../utils/constants';

const Beneficios = () => {
  const benefits = [
    {
      title: "Eficiencia Operativa",
      icon: "⚡",
      description: "Automatización de procesos manuales y optimización de flujos de trabajo",
      metrics: ["85% reducción en tiempo de reportes", "60% mejora en coordinación de equipos", "40% menos errores administrativos"],
      color: "bg-blue-500"
    },
    {
      title: "Control Financiero",
      icon: "💰",
      description: "Gestión precisa de costos, presupuestos y rentabilidad por proyecto",
      metrics: ["90% precisión en estimaciones", "Reducción 30% en sobrecostos", "Control en tiempo real del flujo de caja"],
      color: "bg-green-500"
    },
    {
      title: "Gestión de Inventario",
      icon: "📦",
      description: "Control inteligente de materiales, herramientas y equipos especializados",
      metrics: ["Reducción 50% en stock muerto", "Alertas automáticas de reposición", "Trazabilidad completa de materiales"],
      color: "bg-purple-500"
    },
    {
      title: "Productividad del Personal",
      icon: "👥",
      description: "Optimización de recursos humanos y mejora en la coordinación de equipos",
      metrics: ["25% aumento en productividad", "Reducción de tiempos muertos", "Mejor asignación de personal técnico"],
      color: "bg-orange-500"
    },
    {
      title: "Calidad y Cumplimiento",
      icon: "✅",
      description: "Estándares de calidad y cumplimiento normativo automatizado",
      metrics: ["100% trazabilidad de procesos", "Cumplimiento normativo automático", "Reducción de reclamos de calidad"],
      color: "bg-red-500"
    },
    {
      title: "Toma de Decisiones",
      icon: "📊",
      description: "Dashboards en tiempo real y reportes inteligentes para decisiones informadas",
      metrics: ["Reportes automáticos diarios", "KPIs en tiempo real", "Análisis predictivo de proyectos"],
      color: "bg-indigo-500"
    }
  ];

  const roi_data = [
    { period: "Mes 1-3", investment: 95000, savings: 15000, net: -80000 },
    { period: "Mes 4-6", investment: 0, savings: 45000, net: -35000 },
    { period: "Mes 7-12", investment: 0, savings: 90000, net: 55000 },
    { period: "Año 2", investment: 12000, savings: 180000, net: 223000 },
    { period: "Año 3", investment: 12000, savings: 200000, net: 411000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Beneficios del Sistema <span className="text-korean-blue">ERP</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformación digital que impacta directamente en la rentabilidad y eficiencia de Korean Cable
          </p>
        </div>

        {/* ROI Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Impacto Financiero del ERP</h3>
            
            {/* Investment Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-korean-blue/10 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-korean-blue mb-2">Inversión Total</h4>
                <p className="text-3xl font-bold text-korean-blue">C$162,450</p>
                <p className="text-sm text-gray-600">Pago único - Sin costos recurrentes</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-2">Ahorros Mensuales</h4>
                <p className="text-3xl font-bold text-green-600">C$53,000</p>
                <p className="text-sm text-gray-600">Desde el primer mes operativo</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-yellow-800 mb-2">Recuperación</h4>
                <p className="text-3xl font-bold text-yellow-600">4 meses</p>
                <p className="text-sm text-gray-600">Punto de equilibrio</p>
              </div>
            </div>

            {/* Business Impact */}
            <div className="bg-gradient-to-r from-korean-blue/5 to-green-50 p-6 rounded-lg mb-8 text-left">
              <h4 className="text-lg font-bold text-korean-blue mb-4 text-center">Ahorros Operativos Identificados</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-700">Reducción errores manuales</span>
                    <span className="font-bold text-green-600">C$20,000/mes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-700">Optimización de inventario</span>
                    <span className="font-bold text-green-600">C$15,000/mes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-700">Reducción tiempo administrativo (38%)</span>
                    <span className="font-bold text-green-600">C$18,000/mes</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-2">Beneficios Adicionales:</h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Reducción 15% en sobrecostos de proyectos</li>
                      <li>• Optimización 8% en compras de materiales</li>
                      <li>• Mejor coordinación de equipos técnicos</li>
                      <li>• Control en tiempo real de rentabilidad</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Simplified ROI Timeline */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-korean-blue text-white">
                    <th className="border border-gray-300 p-4 text-left">Período</th>
                    <th className="border border-gray-300 p-4 text-left">Ahorros Acumulados</th>
                    <th className="border border-gray-300 p-4 text-left">Beneficio Neto</th>
                    <th className="border border-gray-300 p-4 text-left">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-4 font-semibold">Mes 4</td>
                    <td className="border border-gray-300 p-4">C$212,000</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">C$600</td>
                    <td className="border border-gray-300 p-4 text-yellow-600 font-bold">Equilibrio</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-4 font-semibold">Año 1</td>
                    <td className="border border-gray-300 p-4">C$636,000</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">C$424,600</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">201%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-4 font-semibold">Año 2</td>
                    <td className="border border-gray-300 p-4">C$1,272,000</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">C$1,060,600</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">502%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-4 font-semibold">Año 3</td>
                    <td className="border border-gray-300 p-4">C$1,908,000</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">C$1,696,600</td>
                    <td className="border border-gray-300 p-4 text-green-600 font-bold">803%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h5 className="font-bold text-green-800 mb-1">Payback</h5>
                <p className="text-2xl font-bold text-green-600">4 meses</p>
              </div>
              <div className="bg-korean-blue/10 p-4 rounded-lg text-center">
                <h5 className="font-bold text-korean-blue mb-1">ROI Año 1</h5>
                <p className="text-2xl font-bold text-korean-blue">201%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h5 className="font-bold text-yellow-800 mb-1">ROI Año 3</h5>
                <p className="text-2xl font-bold text-yellow-600">803%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h5 className="font-bold text-purple-800 mb-1">Ahorro Total</h5>
                <p className="text-2xl font-bold text-purple-600">C$1.7M</p>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-korean-blue/10 border-l-4 border-green-500 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800 mb-2">
                  🎯 Cada córdoba invertido genera C$8.03 en 3 años
                </p>
                <p className="text-green-700 font-semibold">
                  Recuperación completa en 4 meses | Sin costos recurrentes adicionales
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Casos de Uso por Tipo de Proyecto */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Beneficios por Tipo de Proyecto
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECT_TYPES.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-korean-blue mb-4">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><strong>Duración:</strong> {project.duration}</p>
                  <p className="text-sm text-gray-600"><strong>Equipo:</strong> {project.team}</p>
                </div>
                <div className="space-y-2">
                  {index === 0 && (
                    <>
                      <p className="text-sm text-gray-600">• Control preciso de materiales eléctricos</p>
                      <p className="text-sm text-gray-600">• Programación optimizada de instalaciones</p>
                      <p className="text-sm text-gray-600">• Seguimiento de certificaciones y permisos</p>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <p className="text-sm text-gray-600">• Gestión de contratos complejos</p>
                      <p className="text-sm text-gray-600">• Control de cumplimiento normativo</p>
                      <p className="text-sm text-gray-600">• Coordinación de múltiples equipos</p>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <p className="text-sm text-gray-600">• Control de avance de obra</p>
                      <p className="text-sm text-gray-600">• Gestión de subcontratistas</p>
                      <p className="text-sm text-gray-600">• Control de calidad y seguridad</p>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <p className="text-sm text-gray-600">• Programación de mantenimientos</p>
                      <p className="text-sm text-gray-600">• Historial de equipos y servicios</p>
                      <p className="text-sm text-gray-600">• Alertas preventivas automáticas</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparación Antes/Después */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Transformación: Antes vs Después
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Antes */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 text-center">❌ Situación Actual</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800">Gestión Manual</h4>
                  <p className="text-red-700 text-sm">Hojas de cálculo, documentos dispersos, comunicación por WhatsApp</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800">Información Fragmentada</h4>
                  <p className="text-red-700 text-sm">Datos en diferentes sistemas, reportes manuales, falta de visibilidad</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800">Control Limitado</h4>
                  <p className="text-red-700 text-sm">Sobrecostos frecuentes, retrasos en proyectos, errores de inventario</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800">Decisiones Reactivas</h4>
                  <p className="text-red-700 text-sm">Información desactualizada, análisis tardío, oportunidades perdidas</p>
                </div>
              </div>
            </div>

            {/* Después */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600 text-center">✅ Con ERP Korean Cable</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800">Automatización Total</h4>
                  <p className="text-green-700 text-sm">Procesos digitalizados, flujos automatizados, notificaciones inteligentes</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800">Información Centralizada</h4>
                  <p className="text-green-700 text-sm">Base de datos única, reportes automáticos, dashboards en tiempo real</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800">Control Total</h4>
                  <p className="text-green-700 text-sm">Presupuestos precisos, seguimiento en tiempo real, inventario optimizado</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800">Decisiones Proactivas</h4>
                  <p className="text-green-700 text-sm">Análisis predictivo, alertas tempranas, optimización continua</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;