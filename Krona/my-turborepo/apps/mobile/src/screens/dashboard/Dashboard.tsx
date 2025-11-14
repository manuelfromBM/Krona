import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { styles } from "./Dashboard.styles";
import { useDashboardData } from "@packages/hooks"; 
import { LineChart } from "react-native-chart-kit";// intalar la libreria: npx expo install react-native-chart-kit

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  // Aca llamamos las fuciones del los hooks
  const { 
    citas, 
    dinero, 
    visitas,
    serviciosPopulares,
    chartData 
    } = useDashboardData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard del Emprendedor</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Citas hoy</Text>
          <Text style={styles.metricValue}>{citas.hoy}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Citas esta semana</Text>
          <Text style={styles.metricValue}>{citas.semana}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Ganancias hoy</Text>
          <Text style={styles.metricValue}>${dinero.hoy}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Visitas / mes</Text>
          <Text style={styles.metricValue}>{visitas.mensual}</Text>
        </View>
      </View>

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

      <Text style={styles.sectionTitle}>Servicios más pedidos</Text>

      {serviciosPopulares.map((s, i) => (
        <View key={i} style={styles.serviceCard}>
          <Text style={styles.serviceName}>{s.nombre}</Text>
          <Text style={styles.serviceCount}>{s.cantidad} pedidos</Text>
        </View>
      ))}
    </ScrollView>
  );
}
