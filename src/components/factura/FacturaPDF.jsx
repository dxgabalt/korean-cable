import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Download, Printer } from 'lucide-react';

export const FacturaPDF = ({ factura, onPrint, onDownload }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(value);
  };

  const calcularSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const calcularTotal = (items, iva) => {
    const subtotal = calcularSubtotal(items);
    const ivaCalculado = (subtotal * iva) / 100;
    return subtotal + ivaCalculado;
  };

  const subtotal = calcularSubtotal(factura.items);
  const iva = (subtotal * factura.iva) / 100;
  const total = calcularTotal(factura.items, factura.iva);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto my-8">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">FACTURA</h1>
          <p className="text-gray-600">N° {factura.numeroFactura}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            <span className="font-semibold">Fecha:</span> {format(new Date(factura.fecha), 'dd/MM/yyyy', { locale: es })}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Vencimiento:</span> {format(new Date(factura.vencimiento), 'dd/MM/yyyy', { locale: es })}
          </p>
        </div>
      </div>

      {/* Datos del cliente */}
      <div className="mb-8 p-4 bg-gray-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Cliente</h2>
        <p className="font-medium">{factura.cliente.nombre}</p>
        <p className="text-gray-600">{factura.cliente.direccion}</p>
        <p className="text-gray-600">{factura.cliente.cuit}</p>
        <p className="text-gray-600">{factura.cliente.email}</p>
      </div>

      {/* Tabla de items */}
      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Descripción</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Cantidad</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Precio Unit.</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {factura.items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4 text-gray-800">{item.descripcion}</td>
                <td className="py-3 px-4 text-right text-gray-700">{item.cantidad}</td>
                <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(item.precio)}</td>
                <td className="py-3 px-4 text-right text-gray-700 font-medium">
                  {formatCurrency(item.precio * item.cantidad)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totales */}
      <div className="ml-auto max-w-xs">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-700">IVA ({factura.iva}%):</span>
          <span className="font-medium">{formatCurrency(iva)}</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold mt-2">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Notas */}
      {factura.notas && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="font-semibold mb-2">Notas:</h3>
          <p className="text-gray-600">{factura.notas}</p>
        </div>
      )}

      {/* Pie de página */}
      <div className="mt-12 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>{factura.empresa.nombre} - {factura.empresa.direccion}</p>
        <p>CUIT: {factura.empresa.cuit} - {factura.empresa.telefono}</p>
        <p>{factura.empresa.email} - {factura.empresa.web}</p>
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex justify-end space-x-4">
        <button 
          onClick={onPrint}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Printer className="mr-2" size={16} />
          Imprimir
        </button>
        <button 
          onClick={onDownload}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Download className="mr-2" size={16} />
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

// Datos de ejemplo para la factura
FacturaPDF.defaultProps = {
  factura: {
    numeroFactura: 'FAC-001-0001',
    fecha: new Date(),
    vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde hoy
    iva: 21,
    cliente: {
      nombre: 'Korean Cable S.A.',
      direccion: 'Av. Siempreviva 1234, CABA',
      cuit: '30-12345678-9',
      email: 'contacto@koreancable.com.ar',
    },
    items: [
      {
        descripcion: 'Desarrollo de aplicación web',
        cantidad: 1,
        precio: 150000,
      },
      {
        descripcion: 'Diseño de interfaz de usuario',
        cantidad: 1,
        precio: 50000,
      },
      {
        descripcion: 'Soporte técnico mensual',
        cantidad: 6,
        precio: 10000,
      },
    ],
    notas: 'Pago contra entrega. El precio incluye IVA.',
    empresa: {
      nombre: 'Tu Empresa S.R.L.',
      direccion: 'Av. Corrientes 1234, CABA',
      cuit: '30-98765432-1',
      telefono: '(011) 1234-5678',
      email: 'info@tuempresa.com',
      web: 'www.tuempresa.com',
    },
  },
  onPrint: () => window.print(),
  onDownload: () => alert('Descargando factura...'),
};
