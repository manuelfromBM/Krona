import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./DashboardPremium.styles";
import { useDashboardPremiumData } from "../../../../../../packages/hooks/src/dashboard/useDashboardPremiumData";
import { LineChart } from "react-native-chart-kit";

// HOOK de calendario (lo usaremos en el paso 4)
import { useDashboardPremiumCalendarioData } from "../../../../../../packages/hooks/src/dashboard/useDashboardPremiumCalendarioData";

const screenWidth = Dimensions.get("window").width;

export default function DashboardPremium() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");

  // Hook con TODAS las métricas
  const {
    citas,
    dinero,
    citasCanceladas,
    vistas,
    ingresosEsperados,
    clientes,
    serviciosPopulares,
    serviciosMenosPedidos,
    chartData,
  } = useDashboardPremiumData();

  // HOOK para calendario (Paso 4)
  const calendario = useDashboardPremiumCalendarioData();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Dashboard Premium</Text>

      {/* ===================== TABS DAY / WEEK / MONTH ===================== */}
      <View style={styles.tabsContainer}>
        {["day", "week", "month"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.tab, viewMode === mode && styles.tabActive]}
            onPress={() => setViewMode(mode as any)}
          >
            <Text
              style={[
                styles.tabText,
                viewMode === mode && styles.tabTextActive,
              ]}
            >
              {mode === "day" ? "Día" : mode === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===================== CONTENIDO DINÁMICO ===================== */}
      <View style={styles.sectionBlock}>
        {/* ========== VISTA DÍA ========== */}
        {viewMode === "day" && (
          <View>
            <Text style={styles.sectionTitle}>Resumen del día</Text>

            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Citas hoy</Text>
                <Text style={styles.metricValue}>{citas.hoy}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Ganancias hoy</Text>
                <Text style={styles.metricValue}>${dinero.hoy}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Vistas del día</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Perfil</Text>
                <Text style={styles.metricValue}>{vistas.perfil.dia}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Publicaciones</Text>
                <Text style={styles.metricValue}>{vistas.publicacion.dia}</Text>
              </View>
            </View>
          </View>
        )}

        {/* ========== VISTA SEMANA ========== */}
        {viewMode === "week" && (
          <View>
            <Text style={styles.sectionTitle}>Resumen semanal</Text>

            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Citas semana</Text>
                <Text style={styles.metricValue}>{citas.semana}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Ganancias semana</Text>
                <Text style={styles.metricValue}>${dinero.semana}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Vistas de la semana</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Perfil</Text>
                <Text style={styles.metricValue}>{vistas.perfil.semana}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Publicaciones</Text>
                <Text style={styles.metricValue}>{vistas.publicacion.semana}</Text>
              </View>
            </View>
          </View>
        )}

        {/* ========== VISTA MES ========== */}
        {viewMode === "month" && (
          <View>
            <Text style={styles.sectionTitle}>Resumen del mes</Text>

            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Citas (mes)</Text>
                <Text style={styles.metricValue}>{citas.mes}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Ganancias (mes)</Text>
                <Text style={styles.metricValue}>${dinero.mes}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Citas canceladas</Text>
                <Text style={styles.metricValue}>{citasCanceladas.mes}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Vistas del mes</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Perfil</Text>
                <Text style={styles.metricValue}>{vistas.perfil.mes}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Publicaciones</Text>
                <Text style={styles.metricValue}>{vistas.publicacion.mes}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Ingresos esperados</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Meta</Text>
                <Text style={styles.metricValue}>
                  ${ingresosEsperados.metaMensual}
                </Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Actual</Text>
                <Text style={styles.metricValue}>${ingresosEsperados.actual}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* ===================== GRÁFICO ===================== */}
      <Text style={styles.sectionTitle}>Citas últimos 7 días</Text>

      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.values }],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => "#000",
        }}
        style={styles.chart}
      />

      {/* ===================== CLIENTES ===================== */}
      <Text style={styles.sectionTitle}>Clientes</Text>
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Fieles</Text>
          <Text style={styles.metricValue}>{clientes.fieles}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Frecuentes</Text>
          <Text style={styles.metricValue}>{clientes.frecuentes}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Ocasionales</Text>
          <Text style={styles.metricValue}>{clientes.ocasionales}</Text>
        </View>
      </View>

      {/* ===================== SERVICIOS ===================== */}
      <Text style={styles.sectionTitle}>Servicios más pedidos</Text>
      {serviciosPopulares.map((s, i) => (
        <View key={i} style={styles.serviceCard}>
          <Text style={styles.serviceName}>{s.nombre}</Text>
          <Text style={styles.serviceCount}>{s.cantidad} pedidos</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Servicios menos pedidos</Text>
      {serviciosMenosPedidos.map((s, i) => (
        <View key={i} style={styles.serviceCardDanger}>
          <Text style={styles.serviceName}>{s.nombre}</Text>
          <Text style={styles.serviceCount}>{s.cantidad} pedidos</Text>
        </View>
      ))}
    </ScrollView>
  );
}
