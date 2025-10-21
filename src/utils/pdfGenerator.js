import jsPDF from 'jspdf';
import { PRICING_STRUCTURE, COST_BREAKDOWN } from './constants';

export const generateQuotePDF = async (selectedPackage, clientInfo = {}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Colors
  const koreanBlue = [34, 91, 228];
  const koreanRed = [249, 52, 28];
  const darkGray = [51, 51, 51];
  const lightGray = [128, 128, 128];

  // Helper function to add header with logo
  const addHeader = async () => {
    // Header with company branding
    doc.setFillColor(0, 51, 102); // Korean blue
    doc.rect(0, 0, 210, 35, 'F');
    
    // Korean Cable logo - load asynchronously
    try {
      const logoResponse = await fetch('https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png');
      const logoBlob = await logoResponse.blob();
      const logoDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(logoBlob);
      });
      doc.addImage(logoDataUrl, 'PNG', 15, 10, 20, 15);
    } catch (error) {
      // Fallback if logo fails to load
      doc.setFillColor(255, 255, 255);
      doc.circle(25, 17.5, 8, 'F');
      doc.setTextColor(0, 51, 102);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('SN', 21, 21);
    }
    
    // Company name and tagline
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SOFTWARE NICARAGUA', 40, 18);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Soluciones ERP para Korean Cable', 40, 26);
    
    // Professional accent line
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(40, 28, 190, 28);
  };

  // Helper function to add footer
  const addFooter = (pageNum) => {
    doc.setTextColor(...lightGray);
    doc.setFontSize(8);
    doc.text(`Página ${pageNum}`, pageWidth - 30, pageHeight - 10);
    doc.text('Software Nicaragua', 20, pageHeight - 10);
  };

  // Page 1: Cover and Package Details
  await addHeader();
  
  // Date and quote number
  const today = new Date();
  const quoteNumber = `KC-ERP-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.text(`Fecha: ${today.toLocaleDateString('es-NI')}`, 20, 60);
  doc.text(`Cotización No: ${quoteNumber}`, 20, 67);
  
  // Client info section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACIÓN DEL CLIENTE', 20, 85);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Empresa: ${clientInfo.company || 'Korean Cable'}`, 20, 95);
  doc.text(`Contacto: ${clientInfo.contact || 'Gerencia General'}`, 20, 102);
  doc.text(`Email: ${clientInfo.email || 'aperez@koreancable.net'}`, 20, 109);

  
  // Package selected
  const packageData = PRICING_STRUCTURE[selectedPackage];
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('PAQUETE SELECCIONADO', 20, 135);
  
  // Package details box
  doc.setDrawColor(...koreanBlue);
  doc.setLineWidth(1);
  doc.rect(20, 145, 170, 40);
  
  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text(packageData.name, 25, 155);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(packageData.description, 25, 165);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanRed);
  doc.text(`Inversión: C$${packageData.price.toLocaleString()}`, 25, 175);
  
  // Features section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('CARACTERÍSTICAS INCLUIDAS', 20, 200);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  let yPos = 210;
  for (const feature of packageData.features) {
    if (yPos > 270) {
      addFooter(1);
      doc.addPage();
      await addHeader();
      yPos = 60;
    }
    doc.text(`• ${feature}`, 25, yPos);
    yPos += 6;
  }
  
  addFooter(1);
  
  // Page 2: Detailed Investment Breakdown
  doc.addPage();
  await addHeader();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('DESGLOSE DETALLADO DE INVERSIÓN', 20, 60);
  
  // Get detailed cost breakdown for selected package
  const costBreakdown = COST_BREAKDOWN[selectedPackage];
  let currentY = 75;
  
  // Development section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text(costBreakdown.development.title, 20, currentY);
  currentY += 10;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  for (const item of costBreakdown.development.items) {
    if (currentY > 270) {
      addFooter(2);
      doc.addPage();
      await addHeader();
      currentY = 60;
    }
    
    doc.text(`• ${item.name}`, 25, currentY);
    doc.text(`${item.unit}`, 25, currentY + 4);
    if (item.quantity > 1) {
      doc.text(`Cantidad: ${item.quantity} unidades`, 25, currentY + 8);
      currentY += 12;
    } else {
      currentY += 8;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(`C$${item.cost.toLocaleString()}`, 150, currentY - 4);
    if (item.quantity > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`C$${(item.cost / item.quantity).toLocaleString()} c/u`, 150, currentY - 8);
      doc.setFontSize(9);
    }
    doc.setFont('helvetica', 'normal');
    currentY += 5;
  }
  
  // Development subtotal
  doc.setDrawColor(...koreanBlue);
  doc.line(25, currentY, 180, currentY);
  currentY += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal Desarrollo:', 25, currentY);
  doc.text(`C$${costBreakdown.development.total.toLocaleString()}`, 150, currentY);
  currentY += 15;
  
  // Infrastructure section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text(costBreakdown.infrastructure.title, 20, currentY);
  currentY += 10;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  for (const item of costBreakdown.infrastructure.items) {
    if (currentY > 270) {
      addFooter(2);
      doc.addPage();
      await addHeader();
      currentY = 60;
    }
    
    doc.text(`• ${item.name}`, 25, currentY);
    doc.text(`${item.unit}`, 25, currentY + 4);
    if (item.quantity > 1) {
      doc.text(`Cantidad: ${item.quantity} unidades`, 25, currentY + 8);
      currentY += 12;
    } else {
      currentY += 8;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(`C$${item.cost.toLocaleString()}`, 150, currentY - 4);
    if (item.quantity > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`C$${(item.cost / item.quantity).toLocaleString()} c/u`, 150, currentY - 8);
      doc.setFontSize(9);
    }
    doc.setFont('helvetica', 'normal');
    currentY += 5;
  }
  
  // Infrastructure subtotal
  doc.setDrawColor(...koreanBlue);
  doc.line(25, currentY, 180, currentY);
  currentY += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal Infraestructura:', 25, currentY);
  doc.text(`C$${costBreakdown.infrastructure.total.toLocaleString()}`, 150, currentY);
  currentY += 10;
  
  // Total investment
  doc.setFillColor(...koreanBlue);
  doc.rect(20, currentY, 170, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const totalInvestment = costBreakdown.development.total + costBreakdown.infrastructure.total;
  doc.text('TOTAL INVERSIÓN:', 25, currentY + 8);
  doc.text(`C$${totalInvestment.toLocaleString()}`, 150, currentY + 8);
  
  let tableY = currentY + 20;
  
  // Payment terms
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('TÉRMINOS DE PAGO', 20, tableY + 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  const paymentTerms = [
    'Modalidad: 4 fases post-entrega',
    `Fase 1 (15%): C$${Math.round(totalInvestment * 0.15).toLocaleString()} - Al completar implementación`,
    `Fase 2a (35%): C$${Math.round(totalInvestment * 0.35).toLocaleString()} - Según avances validados (30 días)`,
    `Fase 2b (35%): C$${Math.round(totalInvestment * 0.35).toLocaleString()} - Según avances validados (45 días)`,
    `Fase 3 (15%): C$${Math.round(totalInvestment * 0.15).toLocaleString()} - Según avances validados (60 días)`,
    '',
    'Beneficios incluidos:',
    '• 45 días de soporte técnico gratuito',
    '• Scripts de automatización personalizados',
    '• Manuales de usuario detallados',
    '• Guía de escalabilidad del sistema'
  ];
  
  let paymentY = tableY + 35;
  for (const term of paymentTerms) {
    if (paymentY > 240) {
      addFooter(2);
      doc.addPage();
      await addHeader();
      paymentY = 60;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...koreanBlue);
      doc.text('TÉRMINOS DE PAGO (Continuación)', 20, 50);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...darkGray);
    }
    doc.text(term, 25, paymentY);
    paymentY += 7;
  }
  
  addFooter(2);
  
  // Page 3: Detailed Comparison Table
  doc.addPage();
  await addHeader();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('COMPARACIÓN DETALLADA DE PLANES', 20, 60);
  
  // Comparison table
  const comparisonData = [
    ['Concepto', 'MVP', 'Completo', 'Enterprise'],
    ['Tiempo de desarrollo', '3-4 semanas', '4-5 semanas', '4-6 semanas'],
    ['Base de datos (Supabase)', '2 GB (200,000 registros)', '5 GB (500,000 registros)', '10 GB (1,000,000+ registros)'],
    ['Almacenamiento archivos', '1 GB (docs esenciales)', '3 GB (multimedia)', '5 GB (archivos masivos)'],
    ['Usuarios concurrentes', 'Hasta 100 usuarios', 'Hasta 400 usuarios', 'Hasta 800 usuarios'],
    ['Roles de usuarios', 'Admin, Supervisor, Operador', 'Admin, Supervisor, Operador', 'Roles personalizados ilimitados'],
    ['Certificado seguridad', 'SSL incluido', 'SSL + MFA', 'SSL + MFA + Auditoría'],
    ['Panel administración', 'Módulos esenciales', 'Dashboard + KPIs', 'Dashboard IA + Analytics'],
    ['Gestión inventario', 'Carga masiva CSV', 'Multi-almacén + alertas', 'IA predictiva + automatización'],
    ['Automatización', 'Notificaciones esenciales', 'Workflows automáticos', 'IA + ML + Validaciones'],
    ['Reportes', 'Reportes estándar', 'Reportes personalizados', 'Analytics avanzado + BI'],
    ['Integraciones', 'API esencial', 'Webhooks + API REST', 'API completa + conectores'],
    ['Módulos incluidos', '3 módulos core', '7 módulos completos', '10+ módulos + personalizados']
  ];
  
  let compY = 80;
  const colWidths = [60, 40, 40, 50];
  
  for (let index = 0; index < comparisonData.length; index++) {
    const row = comparisonData[index];
    if (compY > 250) {
      addFooter(3);
      doc.addPage();
      await addHeader();
      compY = 60;
    }
    
    if (index === 0) {
      // Header row
      doc.setFillColor(...koreanBlue);
      doc.rect(20, compY - 5, 190, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
    } else {
      // Data rows
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(20, compY - 5, 190, 10, 'F');
      }
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
    }
    
    let xPos = 20;
    row.forEach((cell, cellIndex) => {
      const maxWidth = colWidths[cellIndex] - 2;
      const lines = doc.splitTextToSize(cell, maxWidth);
      
      if (lines.length > 1) {
        lines.forEach((line, lineIndex) => {
          doc.text(line, xPos + 2, compY + (lineIndex * 4));
        });
        if (lines.length > 2) compY += (lines.length - 1) * 4;
      } else {
        doc.text(cell, xPos + 2, compY);
      }
      
      xPos += colWidths[cellIndex];
    });
    
    compY += 12;
  }
  
  addFooter(3);
  
  // Page 4: BONO DE INICIO RÁPIDO
  doc.addPage();
  await addHeader();
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('BONO DE INICIO RÁPIDO EASY PRICE', 20, 60);
  
  doc.setFontSize(14);
  doc.setTextColor(220, 53, 69);
  doc.text(`Inicia tu proyecto con el 15% de su valor (C$${Math.round(totalInvestment * 0.15).toLocaleString()})`, 20, 75);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkGray);
  doc.text('¿Qué incluye este bono?', 20, 95);
  
  const bonoItems = [
    '1. Estrategia de implementación y plan de desarrollo.',
    '2. Asignación y reserva de tu equipo de trabajo.',
    '3. Acceso al Brief Detallado del proyecto.',
    '4. Diseño de base de datos de funcionalidades iniciales.',
    '5. Prototipo de tus primeras 5 pantallas de funcionalidades iniciales.',
    '6. Oferta EASY PRICE disponible durante vigencia de cotización.'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  let bonoY = 110;
  
  bonoItems.forEach(item => {
    doc.text(item, 25, bonoY);
    bonoY += 8;
  });
  
  // Metodología section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('METODOLOGÍA DE TRABAJO', 20, bonoY + 20);
  
  const metodologia = [
    '• Reunión de revisión con el cliente para demostrar las nuevas funcionalidades cuando los SCRUM estén actualizados.',
    '• Uso de tableros Scrum para el seguimiento visual del progreso.',
    '• Retroalimentación del cliente para realizar ajustes y planificar el siguiente sprint.',
    '• Entrega de Valor Continuo: Foco en la entrega de características que aporten el máximo valor al cliente de manera iterativa e incremental.'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  let metY = bonoY + 35;
  
  metodologia.forEach(item => {
    const lines = doc.splitTextToSize(item, 170);
    lines.forEach(line => {
      doc.text(line, 25, metY);
      metY += 6;
    });
    metY += 3;
  });
  
  addFooter(4);
  
  // Page 5: ROI Analysis
  doc.addPage();
  await addHeader();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('ANÁLISIS DE RETORNO DE INVERSIÓN', 20, 60);
  
  // ROI Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  doc.text('Proyección basada en casos similares en el sector eléctrico nicaragüense:', 20, 75);
  
  // ROI Table
  const roiData = [
    ['Período', 'Inversión', 'Ahorros', 'Beneficio Neto', 'ROI'],
    ['Mes 1-3', `C$${totalInvestment.toLocaleString()}`, 'C$35,000', `C$${(35000 - totalInvestment).toLocaleString()}`, 'N/A'],
    ['Mes 4-6', 'C$6,450', 'C$105,000', 'C$98,550', 'N/A'],
    ['Mes 7-12', 'C$12,900', 'C$210,000', 'C$197,100', '52%'],
    ['Año 2', 'C$25,800', 'C$483,000', 'C$457,200', '273%'],
    ['Año 3', 'C$27,090', 'C$555,450', 'C$528,360', '523%']
  ];
  
  let roiY = 90;
  const roiColWidths = [25, 35, 35, 35, 25];
  
  roiData.forEach((row, index) => {
    if (index === 0) {
      // Header
      doc.setFillColor(...koreanBlue);
      doc.rect(20, roiY - 3, 155, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'normal');
    }
    
    let xPos = 20;
    row.forEach((cell, cellIndex) => {
      doc.text(cell, xPos, roiY);
      xPos += roiColWidths[cellIndex];
    });
    
    roiY += 10;
  });
  
  // Benefits section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  doc.text('BENEFICIOS CUANTIFICABLES:', 20, roiY + 20);
  
  const benefits = [
    '• Reducción del 40% en tiempo de gestión de proyectos',
    '• Eliminación del 85% de errores en inventario',
    '• Mejora del 60% en tiempo de respuesta a clientes',
    '• Automatización del 70% de procesos administrativos',
    '• Reducción del 50% en costos operativos anuales'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let benefitsY = roiY + 35;
  
  benefits.forEach(benefit => {
    doc.text(benefit, 25, benefitsY);
    benefitsY += 8;
  });
  
  addFooter(5);
  
  // Page 6: Final Branding Page
  doc.addPage();
  await addHeader();
  
  // Main title with better positioning
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  const titleText = 'Propuesta Desarrollada por Software Nicaragua';
  const titleWidth = doc.getTextWidth(titleText);
  doc.text(titleText, (pageWidth - titleWidth) / 2, 80);
  
  // Tagline centered
  doc.setFontSize(18);
  doc.setTextColor(220, 53, 69);
  const taglineText = 'Imagina, Crea y Conecta';
  const taglineWidth = doc.getTextWidth(taglineText);
  doc.text(taglineText, (pageWidth - taglineWidth) / 2, 100);
  
  // Decorative line
  doc.setDrawColor(...koreanBlue);
  doc.setLineWidth(1);
  doc.line(50, 110, pageWidth - 50, 110);
  
  // Motivational text centered
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  const motivText1 = 'Con las herramientas digitales adecuadas,';
  const motivText2 = 'no hay límites para lo que tu negocio puede alcanzar';
  const motiv1Width = doc.getTextWidth(motivText1);
  const motiv2Width = doc.getTextWidth(motivText2);
  doc.text(motivText1, (pageWidth - motiv1Width) / 2, 130);
  doc.text(motivText2, (pageWidth - motiv2Width) / 2, 145);
  
  // Website URL highlighted
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  const urlText = 'www.softwarenicaragua.com/servicios';
  const urlWidth = doc.getTextWidth(urlText);
  doc.text(urlText, (pageWidth - urlWidth) / 2, 165);
  
  // Contact section with better layout
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...koreanBlue);
  const contactTitle = 'INFORMACIÓN DE CONTACTO';
  const contactTitleWidth = doc.getTextWidth(contactTitle);
  doc.text(contactTitle, (pageWidth - contactTitleWidth) / 2, 190);
  
  // Contact info in two columns
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  // Left column
  const leftColumn = [
    'Software Nicaragua',
    'Especialistas en Soluciones ERP',
    '',
    'Email: info@softwarenicaragua.com',
    'Web: softwarenicaragua.com'
  ];
  
  // Right column
  const rightColumn = [
    'Contacto Directo',
    'Atención Personalizada',
    '',
    'Teléfono: +505 8824-1003',
    'WhatsApp: +505 8824-1003'
  ];
  
  let leftY = 205;
  leftColumn.forEach(info => {
    if (info === 'Software Nicaragua' || info === 'Contacto Directo') {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    doc.text(info, 30, leftY);
    leftY += 8;
  });
  
  let rightY = 205;
  rightColumn.forEach(info => {
    if (info === 'Software Nicaragua' || info === 'Contacto Directo') {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    doc.text(info, 120, rightY);
    rightY += 8;
  });
  
  // Footer info centered
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...lightGray);
  const validityText = `Validez de la cotización: 30 días | Generada: ${today.toLocaleDateString('es-NI')} ${today.toLocaleTimeString('es-NI')}`;
  const validityWidth = doc.getTextWidth(validityText);
  doc.text(validityText, (pageWidth - validityWidth) / 2, 260);
  
  addFooter(6);
  
  // Generate and download PDF
  const fileName = `Cotizacion_Korean_Cable_${selectedPackage}_${quoteNumber}.pdf`;
  doc.save(fileName);
  
  return {
    fileName,
    quoteNumber,
    packageName: packageData.name,
    totalAmount: packageData.price
  };
};
