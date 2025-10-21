// Constantes del Sistema ERP Korean Cable
export const COMPANY_INFO = {
  name: "Korean Cable",
  fullName: "Korean Cable - Electrificación y Obras Civiles",
  address: "Managua, Nicaragua",
  phone: "+505 2222-3333",
  email: "aperez@koreancable.net"
};

export const ERP_MODULES = {
  COLABORACION: {
    name: "Colaboración en Tiempo Real",
    icon: "🤝",
    features: [
      "Gerencia y jefes de proyecto conectados",
      "RRHH, compras y logística integrados",
      "Administración de obra centralizada",
      "Comunicación instantánea entre equipos",
      "Notificaciones automáticas"
    ]
  },
  RECURSOS: {
    name: "Gestión de Recursos",
    icon: "📋",
    features: [
      "Mano de obra y subcontratos",
      "Materiales y equipos especializados",
      "Control de bodegas múltiples",
      "Asignación optimizada de recursos",
      "Trazabilidad completa"
    ]
  },
  SEGUIMIENTO: {
    name: "Seguimiento del Progreso",
    icon: "📊",
    features: [
      "Avance físico y financiero",
      "Catálogos de presupuesto cargables",
      "Control de cronogramas",
      "Alertas de desviaciones",
      "Reportes de avance automáticos"
    ]
  },
  ANALISIS: {
    name: "Análisis de Datos",
    icon: "📈",
    features: [
      "KPIs por actividad/capítulo/subcapítulo",
      "Dashboards en tiempo real",
      "Análisis predictivo",
      "Comparativas históricas",
      "Métricas de rendimiento"
    ]
  },
  REPORTES: {
    name: "Generación de Informes",
    icon: "📄",
    features: [
      "Informes diarios automáticos",
      "Reportes semanales ejecutivos",
      "Dashboards mensuales",
      "Exportación a Excel/PDF",
      "Programación de envíos"
    ]
  },
  INTEGRACION: {
    name: "Integración de Sistemas",
    icon: "🔗",
    features: [
      "MS Project sincronización",
      "BIM y modelos 3D",
      "Sistemas contables existentes",
      "APIs personalizadas",
      "Importación/exportación de datos"
    ]
  },
  PRESUPUESTOS: {
    name: "Presupuestos y Finanzas",
    icon: "💰",
    features: [
      "Flujo de caja proyectado",
      "Costos reales vs estimados",
      "Control de sobrecostos",
      "Análisis de rentabilidad",
      "Transparencia para licitaciones ENATREL"
    ]
  }
};

export const DEPLOYMENT_OPTIONS = {
  INTRANET: {
    title: "Sistema Web Intranet Corporativo",
    description: "Plataforma web accesible desde la red interna de Korean Cable",
    benefits: [
      "Acceso desde cualquier dispositivo con navegador",
      "Actualizaciones automáticas centralizadas",
      "Backup automático en servidor local",
      "Control total de datos en instalaciones propias",
      "Integración con sistemas existentes"
    ],
    technical: {
      server: "Servidor dedicado en oficinas Korean Cable",
      database: "PostgreSQL con replicación",
      security: "VPN para acceso remoto, SSL/TLS",
      backup: "Respaldo diario automático",
      users: "Hasta 100 usuarios simultáneos"
    },
    url: "https://erp.koreancable.local"
  },
  DESKTOP: {
    title: "Aplicación Progresiva de Escritorio (PWA)",
    description: "App instalable que funciona offline con sincronización",
    benefits: [
      "Funciona sin conexión a internet",
      "Instalación como aplicación nativa",
      "Sincronización automática al conectarse",
      "Notificaciones push del sistema",
      "Rendimiento optimizado"
    ],
    technical: {
      technology: "React PWA con Service Workers",
      storage: "IndexedDB local + sincronización",
      offline: "Funcionalidad completa offline",
      sync: "Sincronización bidireccional automática",
      updates: "Actualizaciones automáticas en segundo plano"
    }
  }
};

export const PROJECT_TYPES = [
  {
    name: "Electrificación Residencial",
    description: "Instalaciones eléctricas en viviendas",
    duration: "2-4 semanas",
    team: "2-4 técnicos"
  },
  {
    name: "Electrificación Comercial",
    description: "Sistemas eléctricos para empresas",
    duration: "1-3 meses",
    team: "4-8 técnicos"
  },
  {
    name: "Obras Civiles",
    description: "Construcción y remodelación",
    duration: "2-6 meses",
    team: "6-15 trabajadores"
  },
  {
    name: "Mantenimiento Industrial",
    description: "Servicios de mantenimiento preventivo",
    duration: "Continuo",
    team: "2-6 técnicos especializados"
  }
];

export const COST_BREAKDOWN = {
  mvp: {
    development: {
      title: "Desarrollo del Sistema",
      items: [
        { name: "Pantallas Frontend + Figma", cost: 35000, quantity: 10, unit: "C$3,500 por pantalla" },
        { name: "Endpoints Backend", cost: 30000, quantity: 15, unit: "C$2,000 por endpoint" },
        { name: "Sistema de Reportes Básico", cost: 8000, quantity: 1, unit: "C$8,000 módulo básico" },
        { name: "Testing y QA", cost: 5000, quantity: 1, unit: "C$5,000 testing básico" }
      ],
      total: 78000
    },
    infrastructure: {
      title: "Infraestructura y Servicios",
      items: [
        { name: "Supabase Pro", cost: 1300, quantity: 12, unit: "C$1,300 plan básico" },
        { name: "Dominio y SSL", cost: 800, quantity: 1, unit: "C$800 configuración anual" },
        { name: "CDN y Optimización", cost: 400, quantity: 1, unit: "C$400 configuración básica" },
        { name: "Backup y Seguridad", cost: 800, quantity: 1, unit: "C$800 configuración básica" }
      ],
      total: 3300
    }
  },
  complete: {
    development: {
      title: "Desarrollo del Sistema",
      items: [
        { name: "Pantallas Frontend + Figma", cost: 63000, quantity: 18, unit: "C$3,500 por pantalla" },
        { name: "Endpoints Backend", cost: 60000, quantity: 30, unit: "C$2,000 por endpoint" },
        { name: "Integración MS Project/BIM", cost: 15000, quantity: 1, unit: "C$15,000 integración completa" },
        { name: "Sistema de Reportes", cost: 12000, quantity: 1, unit: "C$12,000 módulo completo" },
        { name: "Testing y QA", cost: 8000, quantity: 1, unit: "C$8,000 testing completo" }
      ],
      total: 158000
    },
    infrastructure: {
      title: "Infraestructura y Servicios",
      items: [
        { name: "Supabase Pro", cost: 1850, quantity: 12, unit: "C$1,300-1,850 según uso" },
        { name: "Dominio y SSL", cost: 800, quantity: 1, unit: "C$800 configuración anual" },
        { name: "CDN y Optimización", cost: 600, quantity: 1, unit: "C$600 configuración inicial" },
        { name: "Backup y Seguridad", cost: 1200, quantity: 1, unit: "C$1,200 configuración completa" }
      ],
      total: 4450
    }
  },
  enterprise: {
    development: {
      title: "Desarrollo del Sistema",
      items: [
        { name: "Pantallas Frontend + Figma", cost: 87500, quantity: 25, unit: "C$3,500 por pantalla" },
        { name: "Endpoints Backend", cost: 80000, quantity: 40, unit: "C$2,000 por endpoint" },
        { name: "Integración MS Project/BIM", cost: 15000, quantity: 1, unit: "C$15,000 integración completa" },
        { name: "Sistema de Reportes Avanzado", cost: 18000, quantity: 1, unit: "C$18,000 módulo avanzado con IA" },
        { name: "IA y Análisis Predictivo", cost: 25000, quantity: 1, unit: "C$25,000 módulo IA completo" },
        { name: "API Personalizada", cost: 15000, quantity: 1, unit: "C$15,000 API custom" },
        { name: "Testing y QA Avanzado", cost: 12000, quantity: 1, unit: "C$12,000 testing enterprise" }
      ],
      total: 252500
    },
    infrastructure: {
      title: "Infraestructura y Servicios",
      items: [
        { name: "Supabase Pro", cost: 2200, quantity: 12, unit: "C$2,200 plan enterprise" },
        { name: "Dominio y SSL", cost: 800, quantity: 1, unit: "C$800 configuración anual" },
        { name: "CDN y Optimización", cost: 1000, quantity: 1, unit: "C$1,000 configuración enterprise" },
        { name: "Backup y Seguridad", cost: 1800, quantity: 1, unit: "C$1,800 configuración enterprise" }
      ],
      total: 5800
    }
  }
};

export const PRICING_STRUCTURE = {
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
    ]
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

export const KOREAN_COLORS = {
  blue: "#225BE4",
  red: "#F9341C",
  gray: "#6b7280"
};