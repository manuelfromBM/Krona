import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  totalPendiente: number;
}

export const RiesgoFinancieroCard = ({ totalPendiente }: Props) => {

  const nivel =
    totalPendiente > 100000
      ? "Alto"
      : totalPendiente > 50000
      ? "Medio"
      : "Bajo";

  const color =
    totalPendiente > 100000
      ? "#EF4444"
      : totalPendiente > 50000
      ? "#F59E0B"
      : "#16A34A";

  return (
    <View style={[styles.card, { backgroundColor: "#F3F4F6", marginTop: 10 }]}>
      <Text style={styles.cardTitle}>⚠️ Riesgo financiero</Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: color,
        }}
      >
        {nivel}
      </Text>

      <Text style={{ fontSize: 12, color: "#6B7280" }}>
        Basado en pagos pendientes y cancelaciones
      </Text>
    </View>
  );
};