import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./CalendarView.styles";

type Mode = "day" | "week" | "month";

export default function CalendarView({
  mode,
  onModeChange,
  selectedDay,
  selectedWeek,
  selectedMonth,
  onDaySelect,
  onWeekSelect,
  onMonthSelect,
  citasPorDia,
  citasPorSemana,
  citasPorMes
}: any) {

  return (
    <View style={styles.container}>

      {/* ================= TABS ================= */}
      <View style={styles.tabs}>
        {["day", "week", "month"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tab, mode === m && styles.tabActive]}
            onPress={() => onModeChange(m as Mode)}
          >
            <Text style={[styles.tabText, mode === m && styles.tabTextActive]}>
              {m === "day" ? "Día" : m === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ============================================================
          VIEW: DÍA
      ============================================================ */}
      {mode === "day" && (
        <View style={styles.box}>
          <Text style={styles.title}>Día seleccionado: {selectedDay}</Text>

          <ScrollView style={{ maxHeight: 200 }}>
            {citasPorDia.map((cita: any, i: number) => (
              <View key={i} style={styles.citaCard}>
                <Text>{cita.cliente} — {cita.servicio}</Text>
                <Text>${cita.precio}</Text>
                <Text>{cita.estado}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ============================================================
          VIEW: SEMANA
      ============================================================ */}
      {mode === "week" && (
        <View style={styles.box}>
          <Text style={styles.title}>Semana seleccionada: {selectedWeek}</Text>

          <ScrollView style={{ maxHeight: 200 }}>
            {citasPorSemana.map((cita: any, i: number) => (
              <View key={i} style={styles.citaCard}>
                <Text>{cita.fecha}</Text>
                <Text>{cita.cliente} — {cita.servicio}</Text>
                <Text>${cita.precio}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ============================================================
          VIEW: MES
      ============================================================ */}
      {mode === "month" && (
        <View style={styles.box}>
          <Text style={styles.title}>Mes actual: {selectedMonth}</Text>

          <ScrollView style={{ maxHeight: 200 }}>
            {citasPorMes.map((day: any, i: number) => (
              <View key={i} style={styles.citaCard}>
                <Text>{day.fecha}: {day.total} citas</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

    </View>
  );
}
