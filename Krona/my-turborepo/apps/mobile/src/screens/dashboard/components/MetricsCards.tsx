// components/MetricsCards.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface MetricsCardsProps {
  totalCitas: number;
  totalCanceladas: number;
  totalCobrado: number;
  totalPendiente: number;
  onPress: (label: string) => void;
}

export function MetricsCards({
  totalCitas,
  totalCanceladas,
  totalCobrado,
  totalPendiente,
  onPress,
}: MetricsCardsProps) {

  const promedioPorCita =
    totalCitas > 0 ? Math.round(totalCobrado / totalCitas) : 0;

  const metrics = [
    { label: "Total citas",     value: totalCitas,                                    icon: "📅", color: "#3B82F6" },
    { label: "Cancelaciones",   value: totalCanceladas,                               icon: "❌", color: "#EF4444" },
    { label: "Total cobros",    value: `$${totalCobrado.toLocaleString("es-CL")}`,    icon: "💰", color: "#16A34A" },
    { label: "Total pendiente", value: `$${totalPendiente.toLocaleString("es-CL")}`,  icon: "⏳", color: "#F59E0B" },
    { label: "Promedio/cita",   value: `$${promedioPorCita.toLocaleString("es-CL")}`, icon: "📊", color: "#8B5CF6" },
  ];

  return (
    <View style={styles.metricsContainer}>
      {metrics.map((m, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.metricCard,
            metrics.length % 2 !== 0 && i === metrics.length - 1
              && styles.metricCardFull,
          ]}
          onPress={() => onPress(m.label)}
          activeOpacity={0.75}
        >
          <View style={[styles.metricColorBar, { backgroundColor: m.color }]} />
          <Text style={styles.metricIcon}>{m.icon}</Text>
          <Text style={styles.metricValue}>{m.value}</Text>
          <Text style={styles.metricLabel}>{m.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}