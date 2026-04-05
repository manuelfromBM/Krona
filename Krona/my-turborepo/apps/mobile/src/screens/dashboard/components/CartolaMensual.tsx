import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// 1. ESTRUCTURA DE DATOS (Interfaces)
interface Evento {
  cliente: string;
  servicio: string;
  precio: number;
  estado: string;
  pagado: boolean;
  fecha: Date;
  horaInicio: string;
}

interface CartolaMensualProps {
  eventos: Evento[];
  ingresos: number;
  perdidas: number;
  ganancias: number;
  totalCobrado: number;
  totalPendiente: number;
  totalCitas: number;
  totalCanceladas: number;
  clientesFrecuentes: { nombre: string; citas: number }[];
  mejoresServicios: { nombre: string; total: number }[];
  mesAnio: string;
}

// 2. EL COMPONENTE (La "maquinita" que hace el PDF)
export function CartolaMensual({
  eventos, ingresos, perdidas, ganancias, totalCobrado,
  totalPendiente, totalCitas, totalCanceladas,
  clientesFrecuentes, mejoresServicios, mesAnio
}: CartolaMensualProps) {
  const [loading, setLoading] = useState(false);

  const generarHTML = () => `
    <html>
      <head>
        <meta charset="UTF-8"/>
        <style>
          body { font-family: Arial; padding: 20px; color: #111827; }
          h1 { font-size: 20px; }
          .green { color: #16A34A; font-weight: bold; }
          .red { color: #EF4444; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h1>📊 Reporte Mensual: ${mesAnio}</h1>
        <p><b>Ingresos:</b> <span class="green">$${ingresos.toLocaleString("es-CL")}</span></p>
        <p><b>Cobrado:</b> $${totalCobrado.toLocaleString("es-CL")}</p>
        <p><b>Pendiente:</b> $${totalPendiente.toLocaleString("es-CL")}</p>
        <p><b>Pérdidas:</b> <span class="red">$${perdidas.toLocaleString("es-CL")}</span></p>

        <h2>👥 Clientes Frecuentes</h2>
        <table>
          <tr><th>Cliente</th><th>Citas</th></tr>
          ${clientesFrecuentes.map(c => `<tr><td>${c.nombre}</td><td>${c.citas}</td></tr>`).join("")}
        </table>

        <h2>🏆 Mejores Servicios</h2>
        <table>
          <tr><th>Servicio</th><th>Total</th></tr>
          ${mejoresServicios.map(s => `<tr><td>${s.nombre}</td><td>$${s.total.toLocaleString("es-CL")}</td></tr>`).join("")}
        </table>
      </body>
    </html>
  `;

  const descargarPDF = async () => {
    try {
      setLoading(true);
      const { uri } = await Print.printToFileAsync({ html: generarHTML() });
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert("Error", "No se pudo generar el PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📄 Cartola Mensual</Text>
      <TouchableOpacity style={styles.btn} onPress={descargarPDF} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Descargar PDF {mesAnio}</Text>}
      </TouchableOpacity>
    </View>
  );
}

// 3. TU PANTALLA PRINCIPAL (Donde calculamos todo para que no haya errores)
export default function PantallaReportes() {
  // Aquí asumo que ya tienes tus eventos. Si no, usa esta lista de ejemplo:
  const [eventosDelMes] = useState<Evento[]>([
    { cliente: "Juan Perez", servicio: "Corte", precio: 15000, estado: "agendado", pagado: true, fecha: new Date(), horaInicio: "10:00" },
    { cliente: "Maria Jara", servicio: "Manicure", precio: 20000, estado: "agendado", pagado: false, fecha: new Date(), horaInicio: "11:30" }
  ]);

  const currentDate = new Date();

  // --- AQUÍ CALCULAMOS TODO LO QUE TE MARCABA ERROR ---
  const stats = useMemo(() => {
    const cMap: Record<string, number> = {};
    const sMap: Record<string, number> = {};
    let ing = 0, perd = 0, cob = 0, pend = 0, canc = 0;

    eventosDelMes.forEach(ev => {
      cMap[ev.cliente] = (cMap[ev.cliente] || 0) + 1;
      if (ev.estado !== 'cancelado') {
        sMap[ev.servicio] = (sMap[ev.servicio] || 0) + ev.precio;
        ing += ev.precio;
        if (ev.pagado) cob += ev.precio; else pend += ev.precio;
      } else {
        perd += ev.precio;
        canc++;
      }
    });

    return {
      ingresos: ing, perdidas: perd, ganancias: ing,
      totalCobrado: cob, totalPendiente: pend,
      totalCitas: eventosDelMes.length, totalCanceladas: canc,
      clientesFrecuentes: Object.entries(cMap).map(([nombre, citas]) => ({ nombre, citas })).sort((a,b) => b.citas - a.citas).slice(0,5),
      mejoresServicios: Object.entries(sMap).map(([nombre, total]) => ({ nombre, total })).sort((a,b) => b.total - a.total).slice(0,5)
    };
  }, [eventosDelMes]);

  return (
    <ScrollView style={styles.container}>
      {/* LLAMADA CORREGIDA USANDO "stats." ANTES DE CADA NOMBRE */}
      <CartolaMensual
        eventos={eventosDelMes}
        ingresos={stats.ingresos}
        perdidas={stats.perdidas}
        ganancias={stats.ganancias}
        totalCobrado={stats.totalCobrado}
        totalPendiente={stats.totalPendiente}
        totalCitas={stats.totalCitas}
        totalCanceladas={stats.totalCanceladas}
        clientesFrecuentes={stats.clientesFrecuentes} // <--- Ya no es mayúscula ni está vacío
        mejoresServicios={stats.mejoresServicios}     // <--- Ya tiene datos
        mesAnio={currentDate.toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, elevation: 3 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  btn: { backgroundColor: "#3B82F6", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" }
});
