import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { styles } from "./Dashboard.styles";
import { useDashboardData } from "@packages/hooks";
import { LineChart } from "react-native-chart-kit";// intalar la libreria: npx expo install react-native-chart-kit

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {

  /**
   * Hook centralizado con todas las métricas del backend.
   * (ahora los cabros pueden mockear los datos,
   *  pueden conectar a los microservicio FastAPI y PostgreSQL)
   */
  const {
    citas,
    dinero,
    visitas,
    serviciosPopulares,
    serviciosMenosPedidos,
    clientes,
    citasCanceladas,
    vistas,
    ingresosEsperados,
    chartData,
  } = useDashboardData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard del Emprendedor</Text>

      {/* ===================== MÉTRICAS PRINCIPALES ===================== */}
      <View style={styles.metricsContainer}>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Citas hoy</Text>
          <Text style={styles.metricValue}>{citas.hoy}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Ganancias hoy</Text>
          <Text style={styles.metricValue}>${dinero.hoy}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Visitas (mes)</Text>
          <Text style={styles.metricValue}>{visitas.mensual}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Citas Canceladas (mes)</Text>
          <Text style={styles.metricValue}>{citasCanceladas.mes}</Text>
        </View>
      </View>

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

      {/* ===================== GRÁFICO DE CITAS ===================== */}
      <Text style={styles.sectionTitle}>Citas últimos 7 días</Text>

      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.values }],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: () => "#000",
          decimalPlaces: 0,
        }}
        style={styles.chart}
      />

      {/* ===================== SERVICIOS MÁS PEDIDOS ===================== */}
      <Text style={styles.sectionTitle}>Servicios más pedidos (mes)</Text>

      {serviciosPopulares.map((s, i) => (
        <View key={i} style={styles.serviceCard}>
          <Text style={styles.serviceName}>{s.nombre}</Text>
          <Text style={styles.serviceCount}>{s.cantidad} pedidos</Text>
        </View>
      ))}

      {/* ===================== SERVICIOS MENOS PEDIDOS ===================== */}
      <Text style={styles.sectionTitle}>Servicios menos pedidos (mes)</Text>

      {serviciosMenosPedidos.map((s, i) => (
        <View key={i} style={styles.serviceCardDanger}>
          <Text style={styles.serviceName}>{s.nombre}</Text>
          <Text style={styles.serviceCount}>{s.cantidad} pedidos</Text>
        </View>
      ))}

      {/* ===================== INGRESOS ESPERADOS ===================== */}
      <Text style={styles.sectionTitle}>Ingresos Esperados</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Meta</Text>
          <Text style={styles.metricValue}>${ingresosEsperados.metaMensual}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Actual</Text>
          <Text style={styles.metricValue}>${ingresosEsperados.actual}</Text>
        </View>
      </View>

      {/* ===================== VISTAS ===================== */}
      <Text style={styles.sectionTitle}>Vistas</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Perfil (mes)</Text>
          <Text style={styles.metricValue}>{vistas.perfil.mes}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Publicaciones (mes)</Text>
          <Text style={styles.metricValue}>{vistas.publicacion.mes}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
