// DashboardPremium.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "./DashboardPremium.styles";

// ─── Screens internas ───
import CalendarView from "./CalendarView";

// ─── Componentes ───
import { FinancialSummaryCard } from "../components/FinancialSummary";
import { ObservacionesCard } from "../components/ObservacionesCard";
import { RiesgoFinancieroCard } from "../components/RiesgoFinancieroCard";
import { AlertasCard } from "../components/AlertasCard";
import { ClientesFrecuentesCard } from "../components/ClientesFrecuentesCard";
import { MejoresServiciosCard } from "../components/MejoresServiciosCard";
import { AsistenteIACard } from "../components/AccionesRapidas";
import { TendenciaChart } from "../components/TendenciaChart";
import { PagosVsPresupuestoChart } from "../components/PagosVsPresupuestoChart";
import { MetricsCards } from "../components/MetricsCards";
import { ClienteVIPCard } from "../components/ClienteVIPCard";
import { ClientesPerdidosCard } from "../components/ClientesPerdidosCard";
import { PrediccionCard } from "../components/PrediccionCard";
import { DiaRentableCard } from "../components/DiaRentableCard";

// ─── Hooks ───
import { useDashboardPremiumCalendarioData } from "@packages/hooks";
import { useDashboardMetricasData } from "@packages/hooks";

export default function DashboardPremium() {
  // ─────────────────────────────────────────
  // DATOS BASE
  // ─────────────────────────────────────────
  const { eventos, currentDate } = useDashboardPremiumCalendarioData();

  // ─────────────────────────────────────────
  // TODAS LAS MÉTRICAS EN UN SOLO HOOK
  // ─────────────────────────────────────────
  const metricas = useDashboardMetricasData({ eventos, currentDate });

  // ─────────────────────────────────────────
  // ESTADOS UI
  // ─────────────────────────────────────────
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const [showModal, setShowModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [tipoGrafico, setTipoGrafico] = useState<"line" | "pie">("line");
  const [userQuestion, setUserQuestion] = useState("");
  const [iaAnswer, setIaAnswer] = useState("");

  // ─────────────────────────────────────────
  // MOCK — reemplazar con datos reales
  // cuando estén disponibles en el hook
  // ─────────────────────────────────────────
  const clientesFrecuentes = [
    { nombre: "Juan Pérez", citas: 8 },
    { nombre: "Matías Palma", citas: 6 },
    { nombre: "Ariel Vilxes", citas: 4 },
  ];

  const mejoresServicios = [
    { nombre: "Corte de cabello", total: 168000 },
    { nombre: "Barba", total: 54000 },
    { nombre: "Lavado de cabello", total: 32000 },
  ];

  const tendencia = [
    { mes: "Enero", total: 250000 },
    { mes: "Febrero", total: 280000 },
    { mes: "Marzo", total: 320000 },
  ];

  // ─────────────────────────────────────────
  // ASISTENTE IA — lógica simple
  // TODO: conectar con API real
  // ─────────────────────────────────────────
  const handleAskIA = () => {
    if (userQuestion.toLowerCase().includes("cancelación")) {
      setIaAnswer("Recomiendo enviar recordatorios a clientes que hayan cancelado citas previamente.");
    } else if (userQuestion.toLowerCase().includes("meta")) {
      setIaAnswer(
        `Tu meta mensual es $${metricas.metaMensual.toLocaleString("es-CL")}, y llevas cobrado $${metricas.totalCobrado.toLocaleString("es-CL")}.`
      );
    } else {
      setIaAnswer("Gracias por tu pregunta, pronto la IA te dará una recomendación personalizada.");
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* TODO: Agregar nombre de la tienda + foto de perfil */}
      <Text style={styles.title}>Dashboard Premium</Text>

      {/* ── Métricas principales ── */}
      <MetricsCards
        totalCitas={metricas.totalCitas}
        totalCanceladas={metricas.totalCanceladas}
        totalCobrado={metricas.totalCobrado}
        totalPendiente={metricas.totalPendiente}
        onPress={(label) => {
          setSelectedMetric(label);
          setShowModal(true);
        }}
      />

      {/* ── Tabs Día / Semana / Mes ── */}
      <View style={styles.tabsContainer}>
        {["day", "week", "month"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tab, viewMode === m && styles.tabActive]}
            onPress={() => setViewMode(m as "day" | "week" | "month")}
          >
            <Text style={[styles.tabText, viewMode === m && styles.tabTextActive]}>
              {m === "day" ? "Día" : m === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Calendario ── */}
      <CalendarView
        mode={viewMode}
        onSwitchToDay={() => setViewMode("month")}
      />

      {/* ── Resumen financiero ── */}
      <FinancialSummaryCard
        ingresos={metricas.ingresos}
        perdidas={metricas.perdidas}
        ganancias={metricas.ganancias}
      />

      {/* ── Proyección próximo mes ── */}
      <PrediccionCard
        prediccionProximoMes={metricas.prediccionProximoMes}
        tendenciaPorcentaje={metricas.tendenciaPorcentaje}
      />

        {/* ── Día más rentable ── */}
      <DiaRentableCard
        diaMasRentable={metricas.diaMasRentable}
        rankingDias={metricas.rankingDias}
      />


      {/* ── Observaciones automáticas ── */}
      <ObservacionesCard observaciones={metricas.observaciones} />

      {/* ── Riesgo financiero ── */}
      <RiesgoFinancieroCard totalPendiente={metricas.totalPendiente} />

      {/* ── Alertas ── */}
      <AlertasCard
        alertas={metricas.alertas}
        setSelectedMetric={setSelectedMetric}
        setShowModal={setShowModal}
      />

      {/* ── Cliente VIP ── */}
      <ClienteVIPCard clienteVIP={metricas.clienteVIP} />

      {/* ── Clientes perdidos ── */}
      <ClientesPerdidosCard
        clientesPerdidos={metricas.clientesPerdidos}
      />

      {/* ── Clientes frecuentes ── */}
      {/* TODO: reemplazar mock por metricas.rankingVIPs */}
      <ClientesFrecuentesCard clientesFrecuentes={clientesFrecuentes} />


      {/* ── Mejores servicios ── */}
      {/* TODO: reemplazar mock por metricas.rankingCancelaciones */}
      <MejoresServiciosCard
        mejoresServicios={mejoresServicios}
        setSelectedMetric={setSelectedMetric}
        setShowModal={setShowModal}
      />

      {/* ── Asistente IA ── */}
      <AsistenteIACard
        tasaCancelacion={metricas.tasaCancelacion}
        totalPendiente={metricas.totalPendiente}
        totalCobrado={metricas.totalCobrado}
        metaMensual={metricas.metaMensual}
        userQuestion={userQuestion}
        setUserQuestion={setUserQuestion}
        iaAnswer={iaAnswer}
        handleAskIA={handleAskIA}
      />

      {/* ── Gráfico de tendencia ── */}
      {/* TODO: reemplazar mock por datos reales del hook */}
      <TendenciaChart
        tendencia={tendencia}
        tipoGrafico={tipoGrafico}
        setTipoGrafico={setTipoGrafico}
      />

      {/* ── Pagos vs Presupuesto ── */}
      <PagosVsPresupuestoChart
        totalCobrado={metricas.totalCobrado}
        metaMensual={metricas.metaMensual}
      />

      {/* ── Modal general ── */}
      {/* TODO: mover a componente separado ModalDetalleMetrica.tsx */}
      {showModal && (
        <Modal
          transparent
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Detalles de {selectedMetric}
              </Text>
              <Text style={styles.modalDescription}>
                Aquí puedes agregar más detalles relacionados con {selectedMetric}.
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}