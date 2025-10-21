import React, { useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const Demo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  // Roles disponibles con iconos profesionales
  const availableRoles = [
    {
      id: 'gerencia',
      name: 'Gerencia General',
      icon: '👔',
      description: 'Vista ejecutiva con KPIs, análisis financiero y toma de decisiones estratégicas',
      modules: ['dashboard', 'projects', 'inventory', 'employees', 'finances', 'analytics']
    },
    {
      id: 'rrhh',
      name: 'Recursos Humanos',
      icon: '👥',
      description: 'Gestión de personal, nóminas, capacitaciones y evaluaciones de desempeño',
      modules: ['dashboard', 'employees', 'payroll', 'training', 'performance']
    },
    {
      id: 'contabilidad',
      name: 'Contabilidad',
      icon: '💰',
      description: 'Control financiero, facturación, cuentas por pagar/cobrar y reportes contables',
      modules: ['dashboard', 'accounting', 'invoicing', 'payments', 'financial-reports']
    },
    {
      id: 'compras',
      name: 'Compras y Logística',
      icon: '📦',
      description: 'Gestión de proveedores, órdenes de compra, inventario y control de almacén',
      modules: ['dashboard', 'inventory', 'suppliers', 'purchases', 'warehouse']
    },
    {
      id: 'proyectos',
      name: 'Jefe de Proyectos',
      icon: '🏗️',
      description: 'Planificación, seguimiento y control de proyectos de electrificación',
      modules: ['dashboard', 'projects', 'planning', 'progress', 'resources', 'inventory']
    },
    {
      id: 'tecnico',
      name: 'Técnico de Campo',
      icon: '⚡',
      description: 'Reportes de avance, materiales utilizados y registro de actividades diarias',
      modules: ['dashboard', 'field-reports', 'materials', 'tasks', 'mobile']
    },
    {
      id: 'admin',
      name: 'Administrador',
      icon: '⚙️',
      description: 'Configuración del sistema, usuarios, permisos y mantenimiento general',
      modules: ['dashboard', 'users', 'settings', 'backup', 'maintenance', 'projects', 'inventory', 'employees']
    }
  ];

  // Datos simulados para la demo
  const demoData = {
    projects: [
      {
        id: 1,
        name: "Electrificación Residencial Las Flores",
        client: "Urbanización Las Flores S.A.",
        status: "En Progreso",
        progress: 65,
        budget: 45000,
        spent: 28500,
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        team: ["Carlos Mendoza", "Ana Ruiz", "José García"],
        tasks: [
          { name: "Instalación medidores", status: "Completado", progress: 100 },
          { name: "Cableado principal", status: "En progreso", progress: 80 },
          { name: "Conexiones domiciliares", status: "Pendiente", progress: 0 }
        ]
      },
      {
        id: 2,
        name: "Mantenimiento Industrial PEMEX",
        client: "PEMEX Nicaragua",
        status: "Planificado",
        progress: 15,
        budget: 85000,
        spent: 5200,
        startDate: "2024-02-01",
        endDate: "2024-05-30",
        team: ["Roberto Silva", "María López"],
        tasks: [
          { name: "Diagnóstico inicial", status: "Completado", progress: 100 },
          { name: "Compra de materiales", status: "En progreso", progress: 60 },
          { name: "Instalación", status: "Pendiente", progress: 0 }
        ]
      }
    ],
    inventory: [
      { item: "Cable THHN 12 AWG", stock: 2500, min: 500, unit: "metros", cost: 2.50 },
      { item: "Breakers 20A", stock: 45, min: 20, unit: "piezas", cost: 15.00 },
      { item: "Medidores monofásicos", stock: 8, min: 15, unit: "piezas", cost: 85.00 },
      { item: "Tubería PVC 3/4", stock: 150, min: 100, unit: "metros", cost: 3.20 }
    ],
    employees: [
      { name: "Carlos Mendoza", role: "Técnico Electricista", status: "Activo", projects: 2 },
      { name: "Ana Ruiz", role: "Ingeniera de Proyectos", status: "Activo", projects: 3 },
      { name: "José García", role: "Técnico Junior", status: "En capacitación", projects: 1 },
      { name: "Roberto Silva", role: "Supervisor", status: "Activo", projects: 2 }
    ]
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div id="kpi-projects" className="bg-gradient-to-br from-korean-blue to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Proyectos Activos</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-blue-100">+2 este mes • 8 residencial, 3 comercial, 1 civil</p>
        </div>
        <div id="kpi-efficiency" className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Eficiencia Operativa</h3>
          <p className="text-3xl font-bold">94%</p>
          <p className="text-sm text-green-100">vs 78% promedio sector • +16% mejora</p>
        </div>
        <div id="kpi-revenue" className="bg-gradient-to-br from-korean-red to-red-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Rentabilidad Mensual</h3>
          <p className="text-3xl font-bold">C$2.1M</p>
          <p className="text-sm text-red-100">+15% vs mes anterior • Margen 23%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div id="project-list" className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-korean-blue">
          <h3 className="text-lg font-bold mb-4 text-korean-blue">Proyectos Recientes</h3>
          <div className="space-y-3">
            {demoData.projects.map(project => (
              <div key={project.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.client}</p>
                  <p className="text-xs text-korean-blue font-medium">Avance: {project.progress}% • C${project.budget.toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'En progreso' ? 'bg-korean-blue text-white' : 
                  project.status === 'Completado' ? 'bg-green-500 text-white' : 
                  'bg-yellow-500 text-white'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="inventory-alerts" className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-korean-red">
          <h3 className="text-lg font-bold mb-4 text-korean-red">🚨 Alertas de Inventario</h3>
          <div className="space-y-3">
            {demoData.inventory.filter(item => item.stock <= item.min).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-red-800">{item.name}</p>
                  <p className="text-sm text-red-600">Stock actual: {item.stock} unidades | Mínimo requerido: {item.min}</p>
                  <p className="text-xs text-gray-600">Proveedor: {item.supplier || 'ENEL Nicaragua'} • Tiempo entrega: 3-5 días</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-korean-red text-white rounded-full text-sm font-medium">
                    Crítico
                  </span>
                  <p className="text-xs text-red-600 mt-1">Reordenar ahora</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Proyectos</h2>
        <button className="bg-korean-blue text-white px-4 py-2 rounded-lg">
          + Nuevo Proyecto
        </button>
      </div>

      <div className="grid gap-6">
        {demoData.projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
               onClick={() => setSelectedProject(project)}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'En Progreso' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Progreso</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-korean-blue h-2 rounded-full" style={{width: `${project.progress}%`}}></div>
                </div>
                <p className="text-sm font-medium">{project.progress}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Presupuesto</p>
                <p className="font-bold">${project.budget.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Gastado: ${project.spent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Equipo</p>
                <p className="font-medium">{project.team.length} miembros</p>
                <p className="text-sm text-gray-600">{project.team.join(', ')}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Inicio: {project.startDate}</span>
              <span>Fin: {project.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{selectedProject.name}</h3>
              <button onClick={() => setSelectedProject(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold">Tareas del Proyecto:</h4>
              {selectedProject.tasks.map((task, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>{task.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-korean-blue h-2 rounded-full" style={{width: `${task.progress}%`}}></div>
                    </div>
                    <span className="text-sm">{task.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Control de Inventario</h2>
        <button className="bg-korean-blue text-white px-4 py-2 rounded-lg">
          + Agregar Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Mínimo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo Unitario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {demoData.inventory.map((item, idx) => (
              <tr key={idx} className={item.stock <= item.min ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.stock} {item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.min} {item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.cost}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.stock <= item.min 
                      ? 'bg-red-100 text-red-800' 
                      : item.stock <= item.min * 1.5 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {item.stock <= item.min ? 'Crítico' : item.stock <= item.min * 1.5 ? 'Bajo' : 'Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recursos Humanos</h2>
        <button className="bg-korean-blue text-white px-4 py-2 rounded-lg">
          + Nuevo Empleado
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoData.employees.map((employee, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-korean-blue rounded-full flex items-center justify-center text-white font-bold">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold">{employee.name}</h3>
                <p className="text-gray-600">{employee.role}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  employee.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Proyectos:</span>
                <span className="font-medium">{employee.projects}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Driver.js tour configuration - Comprehensive role-based tours
  const startTour = () => {
    const roleBasedSteps = {
      gerencia: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '👔 Dashboard Ejecutivo - Korean Cable',
            description: 'Panel de control con KPIs en tiempo real: 12 proyectos activos, 94% eficiencia operativa, C$2.1M rentabilidad mensual. Monitoreo completo de operaciones desde una vista consolidada.',
            side: "left"
          }
        },
        {
          element: '#kpi-projects',
          popover: {
            title: '📊 Proyectos Estratégicos',
            description: 'Vista ejecutiva de cartera: 8 proyectos residenciales, 3 comerciales, 1 industrial. Análisis de rentabilidad por proyecto, ROI proyectado y impacto en flujo de caja.',
            side: "bottom"
          }
        },
        {
          element: '#project-list',
          popover: {
            title: '💼 Cartera de Proyectos',
            description: 'Cada proyecto muestra: margen de ganancia, avance vs presupuesto, riesgos identificados y próximos hitos críticos para toma de decisiones estratégicas.',
            side: "right"
          }
        },
        {
          element: '#inventory-alerts',
          popover: {
            title: '⚠️ Alertas Críticas de Negocio',
            description: 'Monitoreo de riesgos operativos que pueden impactar rentabilidad: stock crítico, retrasos en proveedores, sobrecostos detectados.',
            side: "bottom"
          }
        }
      ],
      rrhh: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '👥 Centro de Recursos Humanos',
            description: 'Panel especializado para gestión del capital humano: 45 empleados activos, matriz de competencias, seguimiento de certificaciones eléctricas.',
            side: "left"
          }
        },
        {
          element: '#demo-employees',
          popover: {
            title: '👨‍💼 Gestión de Personal Técnico',
            description: 'Base de datos completa: electricistas certificados por ENATREL, técnicos especializados en alta tensión, supervisores de obra con experiencia comprobada.',
            side: "left"
          }
        },
        {
          element: '#employee-skills',
          popover: {
            title: '🎓 Matriz de Competencias',
            description: 'Control detallado: certificaciones vigentes, capacitaciones pendientes, evaluaciones de desempeño, disponibilidad por proyecto y especialización técnica.',
            side: "bottom"
          }
        }
      ],
      contabilidad: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '💰 Centro de Control Financiero',
            description: 'Dashboard contable: flujo de caja en tiempo real, cuentas por cobrar/pagar, análisis de costos por proyecto, reportes fiscales automatizados.',
            side: "left"
          }
        },
        {
          element: '#project-list',
          popover: {
            title: '📋 Control de Costos por Proyecto',
            description: 'Seguimiento financiero detallado: presupuesto vs real, análisis de desviaciones, control de gastos por categoría, rentabilidad por cliente.',
            side: "right"
          }
        }
      ],
      compras: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '📦 Centro de Compras y Logística',
            description: 'Panel de control de suministros: inventario de materiales eléctricos, órdenes de compra activas, evaluación de proveedores certificados.',
            side: "left"
          }
        },
        {
          element: '#inventory-alerts',
          popover: {
            title: '🚨 Sistema de Alertas Inteligentes',
            description: 'Monitoreo predictivo: stock mínimo por material, tiempos de entrega de proveedores, precios fluctuantes, materiales críticos para proyectos.',
            side: "bottom"
          }
        }
      ],
      proyectos: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '🏗️ Centro de Gestión de Proyectos',
            description: 'Dashboard de proyectos: cronogramas integrados con MS Project, asignación de recursos, seguimiento de avance físico vs financiero.',
            side: "left"
          }
        },
        {
          element: '#project-list',
          popover: {
            title: '📋 Proyectos Activos en Detalle',
            description: 'Vista completa: cronograma de actividades, equipo asignado, materiales requeridos, hitos críticos, riesgos identificados y planes de contingencia.',
            side: "right"
          }
        }
      ],
      tecnico: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '⚡ Portal Técnico de Campo',
            description: 'Interfaz móvil optimizada: reportes de avance diario, consumo de materiales, incidencias técnicas, fotos de progreso, sincronización offline.',
            side: "left"
          }
        },
        {
          element: '#field-reports',
          popover: {
            title: '📱 Reportes de Campo en Tiempo Real',
            description: 'Funcionalidad móvil: captura de avance con GPS, registro de materiales utilizados, reporte de incidencias, comunicación directa con supervisión.',
            side: "bottom"
          }
        }
      ],
      admin: [
        {
          element: '#demo-dashboard',
          popover: {
            title: '⚙️ Centro de Administración del Sistema',
            description: 'Panel de control técnico: gestión de usuarios y permisos, configuración de módulos, respaldos automáticos, monitoreo de rendimiento.',
            side: "left"
          }
        },
        {
          element: '#system-config',
          popover: {
            title: '🔧 Configuración Avanzada',
            description: 'Herramientas administrativas: creación de roles personalizados, configuración de integraciones, mantenimiento de base de datos, logs del sistema.',
            side: "bottom"
          }
        }
      ]
    };

    const steps = roleBasedSteps[selectedRole] || roleBasedSteps.gerencia;
    
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: steps
    });
    driverObj.drive();
  };

  // Render functional modules for Técnico de Campo
  const renderFieldReports = () => (
    <div id="field-reports" className="p-6">
      <h2 className="text-2xl font-bold mb-6">📱 Reportes de Campo</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">📍 Reporte Diario de Avance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Proyecto:</span>
              <span className="font-medium">Residencial Las Flores</span>
            </div>
            <div className="flex justify-between">
              <span>Ubicación:</span>
              <span className="font-medium">Sector A-12</span>
            </div>
            <div className="flex justify-between">
              <span>Avance:</span>
              <span className="font-medium text-green-600">85% completado</span>
            </div>
            <div className="flex justify-between">
              <span>Materiales usados:</span>
              <span className="font-medium">Cable 12AWG: 150m</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">⚡ Incidencias Técnicas</h3>
          <div className="space-y-2">
            <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <p className="text-sm font-medium">Transformador con sobrecarga</p>
              <p className="text-xs text-gray-600">Reportado: 10:30 AM</p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
              <p className="text-sm font-medium">Instalación completada Sector B</p>
              <p className="text-xs text-gray-600">Completado: 2:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div id="materials" className="p-6">
      <h2 className="text-2xl font-bold mb-6">🔧 Control de Materiales</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4">Materiales Asignados - Hoy</h3>
        <div className="space-y-3">
          {[
            { name: "Cable 12AWG", asignado: 200, usado: 150, restante: 50 },
            { name: "Conectores", asignado: 50, usado: 35, restante: 15 },
            { name: "Tubería PVC", asignado: 100, usado: 80, restante: 20 }
          ].map((material, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{material.name}</span>
              <div className="text-sm">
                <span className="text-gray-600">Usado: {material.usado}/{material.asignado}</span>
                <span className="ml-2 text-green-600">Restante: {material.restante}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div id="tasks" className="p-6">
      <h2 className="text-2xl font-bold mb-6">✅ Tareas Asignadas</h2>
      <div className="space-y-4">
        {[
          { task: "Instalación medidores Sector A", status: "Completado", time: "9:00 AM" },
          { task: "Conexión transformador principal", status: "En progreso", time: "11:00 AM" },
          { task: "Pruebas de continuidad", status: "Pendiente", time: "3:00 PM" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{item.task}</p>
              <p className="text-sm text-gray-600">{item.time}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              item.status === 'Completado' ? 'bg-green-100 text-green-800' :
              item.status === 'En progreso' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch(currentView) {
      case 'dashboard': return renderDashboard();
      case 'projects': return renderProjects();
      case 'inventory': return renderInventory();
      case 'employees': return renderEmployees();
      case 'field-reports': return renderFieldReports();
      case 'materials': return renderMaterials();
      case 'tasks': return renderTasks();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div id="demo-header" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Demo <span className="text-korean-blue">Interactiva</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explora el sistema ERP Korean Cable en acción. Navega por las diferentes secciones y experimenta la funcionalidad.
          </p>
          
          {!isLoggedIn && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-center mb-6">Selecciona tu Rol para Acceder al Sistema</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {availableRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedRole === role.id
                        ? 'border-korean-blue bg-korean-blue/10 transform scale-105'
                        : 'border-gray-200 hover:border-korean-blue/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{role.icon}</div>
                      <h3 className="font-bold text-gray-800 mb-1">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    if (selectedRole) {
                      setIsLoggedIn(true);
                    } else {
                      alert('Por favor selecciona un rol para continuar');
                    }
                  }}
                  disabled={!selectedRole}
                  className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                    selectedRole
                      ? 'bg-korean-red text-white hover:bg-red-700 shadow-lg animate-pulse'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  🚀 Ingresar al Sistema
                </button>
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={startTour}
                className="bg-korean-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 animate-pulse shadow-lg shadow-korean-blue/40 transform hover:scale-105"
              >
                🎯 Iniciar Tour Guiado
              </button>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setSelectedRole('');
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-2xl">{availableRoles.find(r => r.id === selectedRole)?.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">Conectado como:</p>
                  <p className="font-bold text-korean-blue">{availableRoles.find(r => r.id === selectedRole)?.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div id="demo-interface" className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Navigation Bar */}
            <div className="bg-korean-blue text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-korean-blue font-bold text-sm">KC</span>
                  </div>
                  <h2 className="text-xl font-bold">ERP Korean Cable</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">{availableRoles.find(r => r.id === selectedRole)?.name}</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">{availableRoles.find(r => r.id === selectedRole)?.icon}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r min-h-screen">
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-4">Módulos Disponibles</h3>
                  <div className="space-y-2">
                    {availableRoles.find(r => r.id === selectedRole)?.modules.map((module) => {
                      const moduleConfig = {
                        dashboard: { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', name: 'Dashboard' },
                        projects: { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Proyectos' },
                        inventory: { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10', name: 'Inventario' },
                        employees: { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M13 7a4 4 0 11-8 0 4 4 0 018 0z', name: 'Personal' },
                        payroll: { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', name: 'Nóminas' },
                        training: { icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', name: 'Capacitación' },
                        performance: { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', name: 'Desempeño' },
                        accounting: { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', name: 'Contabilidad' },
                        invoicing: { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', name: 'Facturación' },
                        payments: { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', name: 'Pagos' },
                        'financial-reports': { icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', name: 'Reportes' },
                        suppliers: { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Proveedores' },
                        purchases: { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', name: 'Compras' },
                        warehouse: { icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0l1 16h8l1-16', name: 'Almacén' },
                        planning: { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', name: 'Planificación' },
                        progress: { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', name: 'Progreso' },
                        resources: { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', name: 'Recursos' },
                        'field-reports': { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', name: 'Reportes Campo' },
                        materials: { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10', name: 'Materiales' },
                        tasks: { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', name: 'Tareas' },
                        mobile: { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', name: 'Móvil' },
                        users: { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', name: 'Usuarios' },
                        settings: { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', name: 'Configuración' },
                        backup: { icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10', name: 'Respaldo' },
                        maintenance: { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', name: 'Mantenimiento' },
                        finances: { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', name: 'Finanzas' },
                        analytics: { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', name: 'Análisis' }
                      };
                      
                      const config = moduleConfig[module];
                      if (!config) return null;
                      
                      return (
                        <button 
                          key={module}
                          onClick={() => setCurrentView(module)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                            currentView === module ? 'bg-korean-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                          </svg>
                          <span>{config.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-8">
                {renderCurrentView()}
              </div>
            </div>
          </div>
        )}

        {/* Features Showcase */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-bold mb-2">Tiempo Real</h3>
            <p className="text-gray-600">Datos actualizados instantáneamente en todos los dispositivos</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-bold mb-2">Seguro</h3>
            <p className="text-gray-600">Encriptación de datos y acceso controlado por roles</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-bold mb-2">Multiplataforma</h3>
            <p className="text-gray-600">Acceso desde computadoras, tablets y móviles con sincronización automática</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-korean-blue to-korean-red text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Transformar Korean Cable?</h2>
          <p className="text-xl mb-8">Implementemos este sistema y llevemos tu empresa al siguiente nivel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/50588241003?text=Hola,%20me%20interesa%20solicitar%20una%20cotización%20formal%20para%20el%20sistema%20ERP%20de%20Korean%20Cable.%20¿Podrían%20enviarme%20más%20información?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-korean-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center"
            >
              Solicitar Cotización Formal
            </a>
            <a 
              href="https://wa.me/50588241003?text=Hola,%20me%20gustaría%20agendar%20una%20reunión%20técnica%20para%20conocer%20más%20detalles%20sobre%20el%20sistema%20ERP%20propuesto%20para%20Korean%20Cable."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors text-center"
            >
              Agendar Reunión Técnica
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;