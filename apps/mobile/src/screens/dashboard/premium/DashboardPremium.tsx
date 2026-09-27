import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./DashboardPremium.styles";
import CalendarView from "./CalendarView";

export default function DashboardPremium() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");

  // Datos temporales (frontend)
  const stats = {
    citasSemana: 12,
    gananciasSemana: 80000,
    vistasPerfil: 240,
    vistasPublicaciones: 120,
  };

  const events = {
  "2025-01-18": [
    { status: "cancelled" },
    { status: "confirmed" },
  ],
  "2025-01-20": [
    { status: "done" },
    { status: "reserved" },
  ],
};


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ==================== TITULO ==================== */}
      <Text style={styles.title}>Dashboard Premium</Text>

      {/* ==================== 4 MÉTRICAS ==================== */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Citas semana</Text>
          <Text style={styles.metricValue}>{stats.citasSemana}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Ganancias semana</Text>
          <Text style={styles.metricValue}>${stats.gananciasSemana}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Vistas perfil</Text>
          <Text style={styles.metricValue}>{stats.vistasPerfil}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Publicaciones</Text>
          <Text style={styles.metricValue}>{stats.vistasPublicaciones}</Text>
        </View>
      </View>

      {/* ==================== TABS DIA/SEMANA/MES ==================== */}
      <View style={styles.tabsContainer}>
        {["day", "week", "month"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tab, viewMode === m && styles.tabActive]}
            onPress={() => setViewMode(m as any)}
          >
            <Text
              style={[
                styles.tabText,
                viewMode === m && styles.tabTextActive,
              ]}
            >
              {m === "day" ? "Día" : m === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ==================== CALENDARIO ==================== */}
      <CalendarView mode={viewMode} />

    </ScrollView>
  );
}
