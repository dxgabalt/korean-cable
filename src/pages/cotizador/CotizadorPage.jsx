import React, { useState, useCallback, useRef } from 'react';
import { GanttChart } from '../../components/gantt/GanttChart';
import { FacturaPDF, PDFGenerator } from '../../components/factura/PDFGenerator';
import { Button } from '../../components/ui/button';
import { Plus, Download, Printer, ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';

export const CotizadorPage = () => {
  const componentRef = useRef();
  const [isPrintView, setIsPrintView] = useState(false);
  
  // Estado para las tareas del Gantt
  const [tareas, setTareas] = useState([
    {
      id: uuidv4(),
      name: 'Análisis de Requerimientos',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'Equipo de Análisis',
      color: '#3b82f6',
      precio: 50000,
    },
    {
      id: uuidv4(),
      name: 'Diseño de UI/UX',
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'Diseñador',
      color: '#8b5cf6',
      precio: 75000,
    },
    {
      id: uuidv4(),
      name: 'Desarrollo Frontend',
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'Desarrollador Frontend',
      color: '#10b981',
      precio: 150000,
    },
    {
      id: uuidv4(),
      name: 'Desarrollo Backend',
      startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'Desarrollador Backend',
      color: '#f59e0b',
      precio: 180000,
    },
    {
      id: uuidv4(),
      name: 'Pruebas y Ajustes',
      startDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'QA',
      color: '#ef4444',
      precio: 45000,
    },
  ]);

  // Estado para la factura
  const [factura, setFactura] = useState({
    numeroFactura: `FAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    fecha: new Date(),
    vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde hoy
    iva: 21,
    cliente: {
      nombre: 'Korean Cable S.A.',
      direccion: 'Av. Siempreviva 1234, CABA',
      cuit: '30-12345678-9',
      email: 'contacto@koreancable.com.ar',
    },
    items: [],
    empresa: {
      nombre: 'Tu Empresa S.R.L.',
      direccion: 'Av. Corrientes 1234, CABA',
      cuit: '30-98765432-1',
      telefono: '(011) 1234-5678',
      email: 'info@tuempresa.com',
      web: 'www.tuempresa.com',
    },
  });

  // Actualizar factura cuando cambian las tareas
  const actualizarFactura = useCallback((tareasActualizadas) => {
    const itemsFactura = tareasActualizadas.map(tarea => ({
      descripcion: tarea.name,
      cantidad: 1,
      precio: tarea.precio,
    }));

    setFactura(prev => ({
      ...prev,
      items: itemsFactura,
    }));
  }, []);

  // Manejar actualización de tareas
  const handleTareasUpdate = (nuevasTareas) => {
    setTareas(nuevasTareas);
    actualizarFactura(nuevasTareas);
  };

  // Agregar nueva tarea
  const agregarTarea = () => {
    const nuevaTarea = {
      id: uuidv4(),
      name: 'Nueva Tarea',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      responsable: 'Asignar responsable',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      precio: 0,
    };
    
    const nuevasTareas = [...tareas, nuevaTarea];
    setTareas(nuevasTareas);
    actualizarFactura(nuevasTareas);
  };

  // Configurar la impresión
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page { 
        size: A4;
        margin: 1cm;
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  });

  // Calcular totales
  const subtotal = factura.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const iva = (subtotal * factura.iva) / 100;
  const total = subtotal + iva;

  // Vista de impresión
  if (isPrintView) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vista de Impresión</h1>
          <Button 
            onClick={() => setIsPrintView(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al editor
          </Button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <div ref={componentRef}>
            <FacturaPDF factura={factura} />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button 
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <PDFDownloadLink 
              document={<FacturaPDF factura={factura} />} 
              fileName={`factura-${factura.numeroFactura}.pdf`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {({ blob, url, loading, error }) => 
                loading ? 'Generando PDF...' : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar PDF
                  </>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cotizador - Korean Cable</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={agregarTarea} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Tarea
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsPrintView(true)}
          >
            <Printer className="mr-2 h-4 w-4" />
            Vista de Impresión
          </Button>
          <PDFDownloadLink 
            document={<FacturaPDF factura={factura} />} 
            fileName={`factura-${factura.numeroFactura}.pdf`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {({ blob, url, loading, error }) => 
              loading ? 'Generando...' : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Cronograma del Proyecto</h2>
          <div className="h-[600px] overflow-y-auto">
            <GanttChart 
              tasks={tareas} 
              onTasksUpdate={handleTareasUpdate} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Vista Previa de la Factura</h2>
          <div className="overflow-y-auto">
            <FacturaPDF 
              factura={factura} 
              onPrint={handlePrint}
              onDownload={() => {}}
            />
          </div>
        </div>
      </div>
      
      {/* Componente oculto para la generación de PDF */}
      <div className="hidden">
        <PDFGenerator 
          factura={factura} 
          ref={componentRef} 
        />
      </div>
    </div>
  );
};

export default CotizadorPage;
