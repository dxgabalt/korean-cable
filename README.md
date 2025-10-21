# Propuesta ERP Korean Cable - Software Nicaragua

## 📋 Descripción

Propuesta web completa para el sistema ERP de Korean Cable, desarrollada por Software Nicaragua. Incluye módulos especializados para electrificación, obras civiles y administración centralizada.

## 🚀 Características Principales

- **Colaboración en tiempo real** entre gerencia, jefes de proyecto, RRHH, compras y logística
- **Gestión integral de recursos** (mano de obra, subcontratos, materiales, equipos, bodegas)
- **Seguimiento del progreso** con avance físico y financiero
- **Análisis de datos** con KPIs por actividad/capítulo/subcapítulo
- **Generación de informes** diarios, semanales y mensuales
- **Integración** con MS Project, BIM y sistemas contables
- **Control de presupuestos** y flujo de caja

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + TailwindCSS
- **Navegación:** React Router DOM
- **Demo Interactiva:** Driver.js
- **Despliegue:** Netlify
- **Base de datos propuesta:** Supabase

## 💰 Estructura de Costos

### Precios por Desarrollo
- **Frontend (pantallas + Figma):** C$3,500 por pantalla
- **Backend (endpoints):** C$2,000 por endpoint
- **Soporte técnico:** C$500/hora o C$1,400/día
- **Supabase Pro:** $35-50 USD mensual

### Planes Disponibles
- **Plan Básico:** C$120,000 (12 pantallas, 20 endpoints)
- **Plan Completo:** C$211,000 (18 pantallas, 30 endpoints) - **RECOMENDADO**
- **Plan Enterprise:** C$280,000 (25+ pantallas, 40+ endpoints)

## 🏗️ Estructura del Proyecto

```
korean-cable-proposal/
├── public/
│   ├── _redirects          # Configuración Netlify
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Navegación principal
│   │   ├── MobileMenu.js   # Menú móvil
│   │   ├── Portada.js      # Página de inicio
│   │   ├── Contenido.js    # Módulos y alcances
│   │   ├── Beneficios.js   # Beneficios y ROI
│   │   ├── Costos.js       # Costos e inversión
│   │   └── Demo.js         # Demo interactiva
│   ├── utils/
│   │   └── constants.js    # Datos y configuración
│   ├── App.js
│   └── index.js
├── tailwind.config.js      # Colores Korean Cable
└── package.json
```

## 🎨 Identidad Visual

- **Colores corporativos:** 
  - Azul: #225BE4
  - Rojo: #F9341C
- **Logo oficial:** [Descargar aquí](https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/280745411_120748993951524_1444694637903029694_n.jpg)

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 📦 Despliegue en Netlify

### Opción 1: Drag & Drop
1. Ejecutar `npm run build`
2. Arrastrar carpeta `build/` a [Netlify Drop](https://app.netlify.com/drop)

### Opción 2: Git Integration
1. Subir código a GitHub/GitLab
2. Conectar repositorio en Netlify
3. Configurar:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18

### Opción 3: Netlify CLI
```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod --dir=build
```

## 🔧 Configuración Netlify

El archivo `public/_redirects` ya está configurado para SPA:
```
/*    /index.html   200
```

## 📱 Demo Interactiva

La demo incluye:
- **Tour guiado** con Driver.js
- **Módulos funcionales:** Dashboard, Proyectos, Inventario, Personal
- **Datos simulados** representativos de Korean Cable
- **Interfaz responsive** para móvil y desktop

## 🎯 Próximos Pasos

1. **Descargar logo oficial** y reemplazar placeholder
2. **Personalizar datos** con información real de Korean Cable
3. **Configurar dominio** personalizado en Netlify
4. **Integrar analytics** (Google Analytics/Netlify Analytics)

## 📞 Contacto

**Software Nicaragua**
- Propuesta para: Korean Cable
- Sistema: ERP Integral
- Modalidades: Intranet + PWA

## 📄 Licencia

Propuesta comercial - Software Nicaragua © 2024
