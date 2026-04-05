import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  ingresos: number;
  perdidas: number;
  ganancias: number;
}

export const FinancialSummaryCard = ({
  ingresos,
  perdidas,
  ganancias,
}: Props) => {
  return (
    <View style={styles.financialCard}>
      <Text style={styles.financialTitle}>💼 Resumen financiero</Text>

      {[
        { label: "Ingresos", value: ingresos, color: "#16A34A" },
        { label: "Pérdidas", value: perdidas, color: "#EF4444" },
      ].map((f, i) => (
        <View key={i} style={styles.financialRow}>
          <Text style={styles.financialLabel}>{f.label}</Text>
          <Text style={{ color: f.color }}>
            ${f.value.toLocaleString("es-CL")}
          </Text>
        </View>
      ))}

      <View style={styles.financialDivider} />

      <View style={styles.financialRow}>
        <Text style={styles.financialTotalLabel}>Ganancias</Text>
        <Text style={{ color: ganancias >= 0 ? "#16A34A" : "#EF4444" }}>
          ${ganancias.toLocaleString("es-CL")}
        </Text>
      </View>
    </View>
  );
};