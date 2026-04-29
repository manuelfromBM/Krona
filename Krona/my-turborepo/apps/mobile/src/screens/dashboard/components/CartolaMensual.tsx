// CartolaMensual.tsx
// Genera y descarga el PDF de la cartola mensual
// Cristian San Martin – BM Code Lab

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
interface Evento {
  cliente: string;
  servicio: string;
  precio: number;
  estado: string;
  pagado: boolean;
  fecha: Date;
  horaInicio: string;
}

interface ClientePerdido {
  nombre: string;
  diasSinVenir: number;
  totalGastado: number;
}

interface ClienteVIP {
  nombre: string;
  totalGastado: number;
  totalCitas: number;
  ticketPromedio: number;
}

interface HoraRentable {
  hora: string;
  totalIngresos: number;
  totalCitas: number;
}

interface DiaRentable {
  dia: string;
  totalIngresos: number;
  totalCitas: number;
}

interface ServicioCancelado {
  servicio: string;
  totalCancelaciones: number;
  porcentaje: number;
}

export interface CartolaMensualProps {
  // Base
  eventos: Evento[];
  mesAnio: string;

  // Financiero
  ingresos: number;
  perdidas: number;
  ganancias: number;
  totalCobrado: number;
  totalPendiente: number;
  metaMensual: number;
  porcentajeMeta: number;

  // Citas
  totalCitas: number;
  totalCanceladas: number;
  tasaCancelacion: number;

  // Rankings
  clientesFrecuentes: { nombre: string; citas: number }[];
  mejoresServicios: { nombre: string; total: number }[];

  // Métricas avanzadas
  clienteVIP?: ClienteVIP | null;
  clientesPerdidos?: ClientePerdido[];
  horaMasRentable?: HoraRentable | null;
  rankingHoras?: HoraRentable[];
  diaMasRentable?: DiaRentable | null;
  rankingDias?: DiaRentable[];
  servicioMasCancelado?: ServicioCancelado | null;
  prediccionProximoMes?: number;
  tendenciaPorcentaje?: number;
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const fmt = (n: number) => `$${n.toLocaleString("es-CL")}`;

const tendenciaTexto = (pct: number) => {
  if (pct > 0) return `▲ +${pct}% vs mes anterior`;
  if (pct < 0) return `▼ ${pct}% vs mes anterior`;
  return `→ Sin cambios vs mes anterior`;
};

// ─────────────────────────────────────────────
// GENERADOR HTML DEL PDF
// ─────────────────────────────────────────────
const generarHTML = (props: CartolaMensualProps): string => {
  const {
    mesAnio,
    ingresos, perdidas, ganancias,
    totalCobrado, totalPendiente,
    metaMensual, porcentajeMeta,
    totalCitas, totalCanceladas, tasaCancelacion,
    clientesFrecuentes, mejoresServicios,
    clienteVIP, clientesPerdidos,
    horaMasRentable, rankingHoras,
    diaMasRentable, rankingDias,
    servicioMasCancelado,
    prediccionProximoMes, tendenciaPorcentaje,
    eventos,
  } = props;

  return `
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 30px; color: #111827; background: #fff; }

        /* HEADER */
        .header { background: #1E3A5F; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; }
        .header h1 { font-size: 22px; margin-bottom: 4px; }
        .header p  { font-size: 13px; opacity: 0.8; }

        /* SECCIONES */
        h2 { font-size: 15px; font-weight: 700; color: #1E3A5F;
             border-bottom: 2px solid #3B82F6; padding-bottom: 6px;
             margin: 24px 0 12px; }

        /* GRID DE MÉTRICAS */
        .grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 8px; }
        .metric-card {
          flex: 1; min-width: 140px;
          background: #F9FAFB; border-radius: 10px;
          padding: 14px; border-left: 4px solid #3B82F6;
        }
        .metric-card.green  { border-left-color: #16A34A; }
        .metric-card.red    { border-left-color: #EF4444; }
        .metric-card.yellow { border-left-color: #F59E0B; }
        .metric-card.purple { border-left-color: #8B5CF6; }
        .metric-label { font-size: 11px; color: #6B7280; margin-bottom: 4px; }
        .metric-value { font-size: 18px; font-weight: 800; color: #111827; }
        .metric-sub   { font-size: 11px; color: #6B7280; margin-top: 2px; }

        /* BARRA DE PROGRESO */
        .progress-bg { background: #E5E7EB; border-radius: 6px; height: 10px; margin-top: 6px; }
        .progress-fill { background: #22C55E; border-radius: 6px; height: 10px; }

        /* TABLAS */
        table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
        th { background: #1E3A5F; color: white; padding: 8px 10px; text-align: left; }
        td { padding: 7px 10px; border-bottom: 1px solid #E5E7EB; }
        tr:nth-child(even) td { background: #F9FAFB; }
        .badge {
          display: inline-block; padding: 2px 8px; border-radius: 999px;
          font-size: 11px; font-weight: 700;
        }
        .badge-green  { background: #DCFCE7; color: #16A34A; }
        .badge-red    { background: #FEE2E2; color: #EF4444; }
        .badge-yellow { background: #FEF9C3; color: #B45309; }
        .badge-blue   { background: #DBEAFE; color: #1D4ED8; }

        /* VIP */
        .vip-box {
          background: linear-gradient(135deg, #FEF3C7, #FDE68A);
          border-radius: 12px; padding: 16px; border: 1px solid #F59E0B;
        }
        .vip-nombre { font-size: 18px; font-weight: 800; color: #92400E; }
        .vip-monto  { font-size: 24px; font-weight: 900; color: #16A34A; margin: 4px 0; }

        /* PREDICCIÓN */
        .prediccion-box {
          background: #EFF6FF; border-radius: 12px;
          padding: 16px; border: 1px solid #BFDBFE; text-align: center;
        }
        .prediccion-monto { font-size: 28px; font-weight: 900; color: #1E3A5F; }

        /* FOOTER */
        .footer { margin-top: 32px; text-align: center; font-size: 11px; color: #9CA3AF; }
      </style>
    </head>
    <body>

      <!-- HEADER -->
      <div class="header">
        <h1>📊 Reporte Mensual Krona</h1>
        <p>${mesAnio} &nbsp;·&nbsp; Generado el ${new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      <!-- RESUMEN FINANCIERO -->
      <h2>💰 Resumen Financiero</h2>
      <div class="grid">
        <div class="metric-card green">
          <div class="metric-label">Ingresos del mes</div>
          <div class="metric-value">${fmt(ingresos)}</div>
        </div>
        <div class="metric-card green">
          <div class="metric-label">Total cobrado</div>
          <div class="metric-value">${fmt(totalCobrado)}</div>
          <div class="progress-bg">
            <div class="progress-fill" style="width: ${Math.min(porcentajeMeta, 100).toFixed(0)}%"></div>
          </div>
          <div class="metric-sub">${porcentajeMeta.toFixed(0)}% de la meta ${fmt(metaMensual)}</div>
        </div>
        <div class="metric-card yellow">
          <div class="metric-label">Pendiente de cobro</div>
          <div class="metric-value">${fmt(totalPendiente)}</div>
        </div>
        <div class="metric-card red">
          <div class="metric-label">Pérdidas (cancelados)</div>
          <div class="metric-value">${fmt(perdidas)}</div>
        </div>
        <div class="metric-card ${ganancias >= 0 ? "green" : "red"}">
          <div class="metric-label">Ganancias netas</div>
          <div class="metric-value">${fmt(ganancias)}</div>
        </div>
      </div>

      <!-- CITAS -->
      <h2>📅 Resumen de Citas</h2>
      <div class="grid">
        <div class="metric-card">
          <div class="metric-label">Total citas</div>
          <div class="metric-value">${totalCitas}</div>
        </div>
        <div class="metric-card red">
          <div class="metric-label">Canceladas</div>
          <div class="metric-value">${totalCanceladas}</div>
          <div class="metric-sub">Tasa: ${tasaCancelacion.toFixed(0)}%</div>
        </div>
        <div class="metric-card green">
          <div class="metric-label">Completadas</div>
          <div class="metric-value">${totalCitas - totalCanceladas}</div>
        </div>
      </div>

      <!-- DETALLE DE CITAS -->
      <h2>📋 Detalle de Citas del Mes</h2>
      <table>
        <tr>
          <th>Cliente</th>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Pagado</th>
        </tr>
        ${eventos.map(e => `
          <tr>
            <td>${e.cliente}</td>
            <td>${e.servicio}</td>
            <td>${fmt(e.precio)}</td>
            <td>
              <span class="badge ${
                e.estado === "confirmado" ? "badge-green" :
                e.estado === "cancelado"  ? "badge-red"   :
                e.estado === "reagendado" ? "badge-yellow" :
                "badge-blue"
              }">${e.estado.toUpperCase()}</span>
            </td>
            <td>${e.pagado ? "✅ Sí" : "⏳ No"}</td>
          </tr>
        `).join("")}
      </table>

      <!-- CLIENTE VIP -->
      ${clienteVIP ? `
        <h2>👑 Cliente VIP del Mes</h2>
        <div class="vip-box">
          <div class="vip-nombre">🏆 ${clienteVIP.nombre}</div>
          <div class="vip-monto">${fmt(clienteVIP.totalGastado)}</div>
          <div style="font-size:12px; color:#92400E;">
            ${clienteVIP.totalCitas} visitas &nbsp;·&nbsp;
            Ticket promedio: ${fmt(clienteVIP.ticketPromedio)}
          </div>
        </div>
      ` : ""}

      <!-- CLIENTES FRECUENTES -->
      <h2>👥 Clientes Frecuentes</h2>
      <table>
        <tr><th>#</th><th>Cliente</th><th>Citas</th></tr>
        ${clientesFrecuentes.map((c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${c.nombre}</td>
            <td>${c.citas} cita${c.citas !== 1 ? "s" : ""}</td>
          </tr>
        `).join("")}
      </table>

      <!-- MEJORES SERVICIOS -->
      <h2>🏆 Servicios Más Rentables</h2>
      <table>
        <tr><th>#</th><th>Servicio</th><th>Total generado</th></tr>
        ${mejoresServicios.map((s, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${s.nombre}</td>
            <td>${fmt(s.total)}</td>
          </tr>
        `).join("")}
      </table>

      <!-- HORA MÁS RENTABLE -->
      ${horaMasRentable ? `
        <h2>⏰ Horas Más Rentables</h2>
        <table>
          <tr><th>#</th><th>Hora</th><th>Ingresos</th><th>Citas</th></tr>
          ${(rankingHoras ?? []).slice(0, 5).map((h, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${h.hora} hrs</td>
              <td>${fmt(h.totalIngresos)}</td>
              <td>${h.totalCitas}</td>
            </tr>
          `).join("")}
        </table>
      ` : ""}

      <!-- DÍA MÁS RENTABLE -->
      ${diaMasRentable ? `
        <h2>📅 Días Más Rentables</h2>
        <table>
          <tr><th>#</th><th>Día</th><th>Ingresos</th><th>Citas</th></tr>
          ${(rankingDias ?? []).slice(0, 5).map((d, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${d.dia}</td>
              <td>${fmt(d.totalIngresos)}</td>
              <td>${d.totalCitas}</td>
            </tr>
          `).join("")}
        </table>
      ` : ""}

      <!-- SERVICIO MÁS CANCELADO -->
      ${servicioMasCancelado ? `
        <h2>❌ Servicios con Más Cancelaciones</h2>
        <table>
          <tr><th>Servicio</th><th>Cancelaciones</th><th>% del total</th></tr>
          <tr>
            <td>${servicioMasCancelado.servicio}</td>
            <td>${servicioMasCancelado.totalCancelaciones}</td>
            <td>${servicioMasCancelado.porcentaje}%</td>
          </tr>
        </table>
      ` : ""}

      <!-- CLIENTES PERDIDOS -->
      ${clientesPerdidos && clientesPerdidos.length > 0 ? `
        <h2>👻 Clientes Sin Venir (${clientesPerdidos.length})</h2>
        <table>
          <tr><th>Cliente</th><th>Días sin venir</th><th>Total histórico</th></tr>
          ${clientesPerdidos.map(c => `
            <tr>
              <td>${c.nombre}</td>
              <td style="color: #EF4444; font-weight: 700;">${c.diasSinVenir} días</td>
              <td>${fmt(c.totalGastado)}</td>
            </tr>
          `).join("")}
        </table>
      ` : ""}

      <!-- PREDICCIÓN -->
      ${prediccionProximoMes !== undefined && prediccionProximoMes > 0 ? `
        <h2>🔮 Proyección Próximo Mes</h2>
        <div class="prediccion-box">
          <div style="font-size:13px; color:#6B7280; margin-bottom:6px;">Ingresos estimados</div>
          <div class="prediccion-monto">${fmt(prediccionProximoMes)}</div>
          <div style="margin-top:8px; font-size:13px; font-weight:700; color:${(tendenciaPorcentaje ?? 0) >= 0 ? "#16A34A" : "#EF4444"};">
            ${tendenciaTexto(tendenciaPorcentaje ?? 0)}
          </div>
        </div>
      ` : ""}

      <!-- FOOTER -->
      <div class="footer">
        Generado por Krona · BM Code Lab · ${new Date().getFullYear()}
      </div>

    </body>
    </html>
  `;
};

// ─────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────
export function CartolaMensual(props: CartolaMensualProps) {
  const [loading, setLoading] = useState(false);

  const descargarPDF = async () => {
    try {
      setLoading(true);
      const { uri } = await Print.printToFileAsync({
        html: generarHTML(props),
        base64: false,
      });
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: `Reporte ${props.mesAnio}`,
      });
    } catch {
      Alert.alert("Error", "No se pudo generar el PDF. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.card}>
      <Text style={s.title}>📄 Cartola Mensual</Text>
      <Text style={s.subtitle}>
        Reporte completo con métricas, citas, clientes y proyección
      </Text>
      <TouchableOpacity
        style={[s.btn, loading && s.btnDisabled]}
        onPress={descargarPDF}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={s.btnText}>⬇️ Descargar PDF — {props.mesAnio}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#1E3A5F",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});