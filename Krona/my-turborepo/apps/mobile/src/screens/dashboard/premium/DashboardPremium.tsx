// DashboardPremium.tsx
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Dimensions, TextInput, Modal } from "react-native";
import { styles } from "./DashboardPremium.styles";

import CalendarView from "./CalendarView";
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

import { useDashboardPremiumCalendarioData } from "@packages/hooks";
export default function DashboardPremium() {
  const { eventos, currentDate } = useDashboardPremiumCalendarioData();
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const screenWidth = Dimensions.get("window").width - 40;

  

  // ==========================
  // FILTRO EVENTOS DEL MES
  // ==========================
  const eventosDelMes = eventos.filter(
    (evento) =>
      evento.fecha.getMonth() === currentDate.getMonth() &&
      evento.fecha.getFullYear() === currentDate.getFullYear()
  );

  // ==========================
  // RESUMEN FINANCIERO
  // ==========================
  const ingresos = eventosDelMes
    .filter((e) => e.estado !== "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);

  const perdidas = eventosDelMes
    .filter((e) => e.estado === "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);

  const ganancias = ingresos - perdidas;
  const totalCitas = eventosDelMes.length;
  const totalCanceladas = eventosDelMes.filter((e) => e.estado === "cancelado").length;


  const totalCobrado = eventosDelMes
    .filter((e) => e.pagado && e.estado !== "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);
  const totalPendiente = ingresos - totalCobrado;
  const metaMensual = 500000;
  const porcentajeMeta = metaMensual > 0 ? (totalCobrado / metaMensual) * 100 : 0;
  const tasaCancelacion = totalCitas > 0 ? (totalCanceladas / totalCitas) * 100 : 0;

  // ==========================
  // OBSERVACIONES Y ALERTAS
  // ==========================
  const observaciones: string[] = [];
  if (totalCitas > 0) {
    if (tasaCancelacion > 30)
      observaciones.push(`Tienes una tasa de cancelación del ${Math.round(tasaCancelacion)}%.`);
    if (totalPendiente > 0)
      observaciones.push(`Tienes $${totalPendiente.toLocaleString("es-CL")} pendientes de pago.`);
    if (porcentajeMeta >= 100) observaciones.push("¡Felicitaciones! Superaste tu meta mensual.");
  }
  if (observaciones.length === 0) observaciones.push("Tu rendimiento mensual es estable.");

  const alertas: string[] = [];
  if (tasaCancelacion > 30) alertas.push("Muchísimas cancelaciones este mes");
  if (totalPendiente > 0) alertas.push("Tienes pagos pendientes");

  
  // ==========================
  // MOCK CLIENTES Y SERVICIOS
  // ==========================
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


  // ==========================
  // TOGGLE GRÁFICO TENDENCIA
  // ==========================
  const [tipoGrafico, setTipoGrafico] = useState<"line" | "pie">("line");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);


  const [userQuestion, setUserQuestion] = useState("");
  const [iaAnswer, setIaAnswer] = useState("");

  const handleAskIA = () => {
    // Por ahora, simulamos respuestas
    if (userQuestion.toLowerCase().includes("cancelación")) {
      setIaAnswer("Recomiendo enviar recordatorios a clientes que hayan cancelado citas previamente.");
    } else if (userQuestion.toLowerCase().includes("meta")) {
      setIaAnswer(`Tu meta mensual es ${metaMensual.toLocaleString("es-CL")}, y llevas cobrado ${totalCobrado.toLocaleString("es-CL")}.`);
    } else {
      setIaAnswer("Gracias por tu pregunta, pronto la IA te dará una recomendación personalizada.");
    }
  };
  

  // ==========================
  // RENDER
  // ==========================
  return (
    <ScrollView style={styles.container } showsVerticalScrollIndicator={false}>
      {/* Impremnetar nombre de la tienda del cliente mas su foto de perfil */}
      <Text style={styles.title}>Dashboard Premium</Text>
      

      {/* Métricas del mes */}
      <MetricsCards
        totalCitas={totalCitas}
        totalCanceladas={totalCanceladas}
        totalCobrado={totalCobrado}
        totalPendiente={totalPendiente}
        onPress={(label) => {
          setSelectedMetric(label);
          setShowModal(true);
        }}
      />
      

      {/* Tabs de calendario */}
      <View style={styles.tabsContainer}>
        {["day", "week", "month"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tab, viewMode === m && styles.tabActive]}
            onPress={() => setViewMode(m as any)}
          >
            <Text style={[styles.tabText, viewMode === m && styles.tabTextActive]}>
              {m === "day" ? "Día" : m === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendario */}
      <CalendarView
        mode={viewMode}
        onSwitchToDay={() => setViewMode("day")}
      />

      {/* Resumen financiero */}
      <FinancialSummaryCard
        ingresos={ingresos}
        perdidas={perdidas}
        ganancias={ganancias}
      />

      {/* Observaciones */}
      <ObservacionesCard observaciones={observaciones} />

      {/* Riesgo financiero */}
      <RiesgoFinancieroCard totalPendiente={totalPendiente} />
            
      <AlertasCard
        alertas={alertas}
        setSelectedMetric={setSelectedMetric}
        setShowModal={setShowModal}
      />
            
      {/* Clientes frecuentes */}
      <ClientesFrecuentesCard clientesFrecuentes={clientesFrecuentes} />
            
      {/* Mejores servicios */}
      <MejoresServiciosCard
        mejoresServicios={mejoresServicios}
        setSelectedMetric={setSelectedMetric}
        setShowModal={setShowModal}
      />
            
     {/* Asistente IA */}
      <AsistenteIACard
        tasaCancelacion={tasaCancelacion}
        totalPendiente={totalPendiente}
        totalCobrado={totalCobrado}
        metaMensual={metaMensual}
        userQuestion={userQuestion}
        setUserQuestion={setUserQuestion}
        iaAnswer={iaAnswer}
        handleAskIA={handleAskIA}
      />

      <TendenciaChart
        tendencia={tendencia}
        tipoGrafico={tipoGrafico}
        setTipoGrafico={setTipoGrafico}
      />

      <PagosVsPresupuestoChart
        totalCobrado={totalCobrado}
        metaMensual={metaMensual}
      />
      
      
      {/* Modal general */}
      {/* Lo que se puede hacer con este modal es crear una pantalla aparte 
          para que asi pueda ser el codigo mas ordenado
      */}
      {showModal && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles de {selectedMetric}</Text>
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