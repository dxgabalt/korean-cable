import React, { forwardRef } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    padding: '5 0',
  },
  description: {
    width: '50%',
  },
  qty: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  unit: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  total: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
  summary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  summaryLabel: {
    width: '70%',
    textAlign: 'right',
    paddingRight: 10,
  },
  summaryValue: {
    width: '30%',
    textAlign: 'right',
    paddingRight: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
});

// Formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(value);
};

// Componente de factura PDF
export const FacturaPDF = forwardRef(({ factura }, ref) => {
  const calcularSubtotal = () => {
    return factura.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const subtotal = calcularSubtotal();
  const iva = (subtotal * factura.iva) / 100;
  const total = subtotal + iva;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>FACTURA</Text>
            <Text>N° {factura.numeroFactura}</Text>
            <Text>Fecha: {format(new Date(factura.fecha), 'dd/MM/yyyy', { locale: es })}</Text>
            <Text>Vencimiento: {format(new Date(factura.vencimiento), 'dd/MM/yyyy', { locale: es })}</Text>
          </View>
          <View>
            <Image src="/logo.png" style={styles.logo} />
          </View>
        </View>

        {/* Datos del cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <Text>{factura.cliente.nombre}</Text>
          <Text>{factura.cliente.direccion}</Text>
          <Text>CUIT: {factura.cliente.cuit}</Text>
          <Text>Email: {factura.cliente.email}</Text>
        </View>

        {/* Items de la factura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle</Text>
          <View style={{ ...styles.row, fontWeight: 'bold' }}>
            <Text style={styles.description}>Descripción</Text>
            <Text style={styles.qty}>Cant.</Text>
            <Text style={styles.unit}>Precio Unit.</Text>
            <Text style={styles.total}>Total</Text>
          </View>
          
          {factura.items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.description}>{item.descripcion}</Text>
              <Text style={styles.qty}>{item.cantidad}</Text>
              <Text style={styles.unit}>{formatCurrency(item.precio)}</Text>
              <Text style={styles.total}>{formatCurrency(item.precio * item.cantidad)}</Text>
            </View>
          ))}
        </View>

        {/* Resumen */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>IVA ({factura.iva}%):</Text>
            <Text style={styles.summaryValue}>{formatCurrency(iva)}</Text>
          </View>
          <View style={{ ...styles.summaryRow, marginTop: 10, borderTopWidth: 1, borderTopColor: '#eeeeee', paddingTop: 5 }}>
            <Text style={{ ...styles.summaryLabel, fontWeight: 'bold' }}>Total:</Text>
            <Text style={{ ...styles.summaryValue, fontWeight: 'bold' }}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Notas */}
        {factura.notas && (
          <View style={{ marginTop: 20, fontSize: 10 }}>
            <Text>Notas: {factura.notas}</Text>
          </View>
        )}

        {/* Pie de página */}
        <View style={styles.footer} fixed>
          <Text>{factura.empresa.nombre} - {factura.empresa.direccion} - CUIT: {factura.empresa.cuit}</Text>
          <Text>Tel: {factura.empresa.telefono} - Email: {factura.empresa.email} - Web: {factura.empresa.web}</Text>
        </View>
      </Page>
    </Document>
  );
});

// Componente para manejar la generación del PDF
export const PDFGenerator = ({ factura, onGenerate }) => {
  return (
    <div style={{ display: 'none' }}>
      <FacturaPDF factura={factura} ref={onGenerate} />
    </div>
  );
};

export default PDFGenerator;
